# CryptoSnackVesting Contract - Developer Integration Guide

## Overview

The updated `CryptoSnackVesting` contract supports **multiple independent vesting schedules per beneficiary**. This is a breaking change from the previous single-schedule design.

---

## Key Changes for Developers

### Old Behavior
- Each user had **one** vesting schedule
- `release()` claimed tokens from that single schedule

### New Behavior
- Each user can have **unlimited** vesting schedules simultaneously
- Each schedule is independent (different start time, cliff, duration, amount)
- `release()` **aggregates ALL releasable tokens across ALL schedules** in a single transaction
- Fully-vested schedules are **automatically deleted** from storage (no manual cleanup)

---

## Contract Address (Testnet)

```
Vesting: 0x2A37B65c6A4eB815bA008f4100fcc7B89809Ac2b
Token:  0x28b71950479c787CD14592e200d95A4C89170Ad1
```

---

## Important: Token Decimals

All token amounts in this contract are in **base units** (smallest denomination), NOT human-readable amounts.

- 1 token = `10^18` base units
- Example: `1000000000000000000` = 1 token (18 decimals)

---

## Read Methods (View Functions)

### 1. `getVestingSchedules(address beneficiary)`

Returns all active vesting schedules for a beneficiary.

**Returns:** `VestingSchedule[]`
```javascript
struct VestingSchedule {
    uint256 totalAmount;      // Total tokens allocated (base units)
    uint256 startTime;        // Unix timestamp when vesting begins
    uint256 cliff;           // Unix timestamp before which nothing is releasable
    uint256 duration;        // Total vesting duration in seconds
    uint256 releasedAmount;  // Tokens already released
    bool revocable;          // Whether owner can revoke this schedule
    bool revoked;            // Always false for active schedules
}
```

### 2. `getVestingScheduleCount(address beneficiary)`

Returns the number of active schedules for a beneficiary.

**Returns:** `uint256`

### 3. `getReleasableAmount(address beneficiary)`

Returns the **aggregate** amount all schedules can release right now.

**Returns:** `uint256` (base units)

### 4. `getReleasableAmount(address beneficiary, uint256 scheduleIndex)`

Returns the releasable amount for a **specific schedule** by index.

**Parameters:**
- `beneficiary`: Wallet address
- `scheduleIndex`: Index of the schedule (use `getVestingSchedules()` first to get current indices)

**Returns:** `uint256` (base units)

### 5. `getTotalAllocated()`

Returns total tokens locked across all beneficiaries.

**Returns:** `uint256` (base units)

---

## Write Methods (Transactions)

### 1. `release()` - Claim Tokens

**Important:** Call this from the **beneficiary's wallet** (not owner).

Claims all currently releasable tokens across ALL active schedules in a single transfer.

**No parameters required** - uses `msg.sender` automatically.

**Process:**
1. Query `getReleasableAmount(beneficiary)` to show user how much they can claim
2. User triggers `release()` from their wallet
3. Contract transfers aggregate releasable amount to beneficiary
4. Fully-vested schedules are automatically removed

**Notes for UI:**
- No need to loop through schedules - contract handles aggregation
- If nothing is releasable yet, transaction will revert with `NothingToRelease`
- Consider checking `getReleasableAmount()` before prompting user to claim

### 2. `createVestingSchedule(...)` - Owner Only

Creates a new vesting schedule for a beneficiary. Can be called multiple times for the same beneficiary.

**Parameters:**
```javascript
createVestingSchedule(
    address beneficiary,     // Wallet receiving tokens
    uint256 amount,        // Total amount in base units
    uint256 startTime,     // Unix timestamp (must be >= now, <= now + 365 days)
    uint256 cliffDuration, // Seconds until cliff expires (must be > 0)
    uint256 vestingDuration, // Total vesting period in seconds (must be > cliffDuration)
    bool revocable        // Whether owner can revoke
)
```

**Validation (will revert if invalid):**
- `beneficiary` cannot be zero address
- `amount` cannot be zero
- `startTime` must be >= block.timestamp and <= block.timestamp + 365 days
- `cliffDuration` must be > 0 and <= `vestingDuration`
- `vestingDuration` cannot exceed 10 years
- Contract must hold sufficient tokens

### 3. `revokeSchedule(address beneficiary, uint256 scheduleIndex)` - Owner Only

Revokes a specific schedule. Transfers earned-but-unreleased tokens to beneficiary, refunds unvested remainder to owner.

**Parameters:**
- `beneficiary`: Target wallet
- `scheduleIndex`: Index of schedule to revoke (query `getVestingSchedules()` first - indices may change after deletions)

### 4. `revokeAll(address beneficiary)` - Owner Only

Revokes all revocable schedules for a beneficiary in one transaction.

---

## Index Stability Warning

**Critical:** Schedule indices are **NOT stable**. After any deletion (via `release()` auto-cleanup or `revokeSchedule()`), remaining schedules are reindexed via swap-and-pop.

**Always query `getVestingSchedules(beneficiary)` immediately before performing any index-based operation.**

---

## Example Integration Flow

### Display User's Claimable Balance
```javascript
const releasable = await vestingContract.getReleasableAmount(userAddress);
console.log(`Claimable: ${ethers.formatUnits(releasable, 18)} tokens`);
```

### Display User's Schedules
```javascript
const schedules = await vestingContract.getVestingSchedules(userAddress);
schedules.forEach((schedule, index) => {
    console.log(`Schedule ${index}:`);
    console.log(`  Total: ${ethers.formatUnits(schedule.totalAmount, 18)}`);
    console.log(`  Start: ${new Date(schedule.startTime * 1000)}`);
    console.log(`  Cliff ends: ${new Date(schedule.cliff * 1000)}`);
    console.log(`  Released: ${ethers.formatUnits(schedule.releasedAmount, 18)}`);
});
```

### Claim Button Handler
```javascript
// User clicks "Claim Tokens"
const releasable = await vestingContract.getReleasableAmount(userAddress);
if (releasable === 0n) {
    alert("Nothing to claim yet");
    return;
}
// Prompt wallet connection if not connected
await vestingContract.connect(userWallet).release();
// Refresh balance display
```

---

## Test Results Summary

| Test | Result |
|------|--------|
| Deploy token contract | PASS |
| Deploy vesting contract | PASS |
| Fund vesting with tokens | PASS |
| Create multiple schedules per wallet | PASS |
| Query schedule data | PASS |
| Aggregate release() across multiple schedules | PASS |
| Multiple sequential claims | PASS |
| Schedule revocation | PASS |
| Auto-cleanup of fully-vested schedules | PASS |

**All tests passed on BSC Testnet.**

---

## Notes

- Contract is deployed on BSC Testnet for testing; production deployment to BSC mainnet required
- No contract modifications were needed - the implementation worked as specified
- Gas costs are reasonable (~100k-200k gas per claim depending on number of schedules)
