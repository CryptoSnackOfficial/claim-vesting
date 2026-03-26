export interface VestingSchedule {
  tokensAmount: bigint;
  startTimestamp: bigint;
  cliffEndTimestamp: bigint;
  vestingDuration: bigint;
  tokensAlreadyReleased: bigint;
  revocable: boolean;
  revoked: boolean;
}

export interface VestingData {
  releasableAmount: bigint;
  schedule: VestingSchedule | null;
  totalAllocated: bigint;
  totalReleased: bigint;
  claimablePercent: number;
  cliffDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
}
