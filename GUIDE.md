If you are reading this, then you will likely be in receviership of SNACK tokens via a Vesting contract. 

This guide will help you to see your vesting contract, teh schedule, amount allocated and how many tokens you would be able to receive right now.

The easiest method is to connect your wallet on the trusted BNB explorer website [BSCScan.com](https://bscscan.com/address/0x3dF9D9c76326D019CABFC3e569E335d0E2A94443#readContract)

You can visit the Crypto Snack vesting contract [here](https://bscscan.com/address/0x3dF9D9c76326D019CABFC3e569E335d0E2A94443#readContract). Our Vesting Contract address is `0x3dF9D9c76326D019CABFC3e569E335d0E2A94443` for your reference.

### How to see my Vesting schedule and how many tokens I can reclaim
If you navigate to the `Contract` tab, and click on the `Read Contract` button, you will be able to query the vesting contract, using your wallet address, to see the vesting schedule, as well as how many tokens you are able to reclaim right now:

- **getReleasableAmount**() - Insert your wallet address and this will tell you how many tokens you can reclaim right now.
- **getVestingSchedule**() - Insert your wallet address and this will tell you the vesting schedule.
  eg. \["16663000000000000000000","1774278000","1774278060","5184000","0",true,false\]
  The format is: \["tokens amount", "start timestamp", "cliff end timestamp", "vesting duration", "tokens already released", "if contract is revocable", "if it has been revoked or not"]

NOTE: Please note that all token values are in baseunits, which are `10^18`. ie. 100 SNACK tokens will be displayed as `100,000,000,000,000,000,000`. 

### How to Reclaim tokens

On the `Contract` tab, you can click on the  `Write Contract` button ([click here to go there](https://bscscan.com/address/0x3dF9D9c76326D019CABFC3e569E335d0E2A94443#writeContract)). You will have the option to connect your wallet via the `Connect to Web3` button. Connect using your wallet that the vesting contract is for. If you have vesting contracts with multiple addresses, you will have to do this for each address.

Once connected, you can simply click on the function `release`. This will release all the tokens that can be released at this time and transfer them directly to your wallet. 

You can check your transaction history. Please make sure you add the SNACK token in your wallet, so its visible. You can read this guide to add SNACK token to your wallet if you have not already got it: https://cryptosnack.com/how-to-add-the-snack-token-to-your-wallet/ 

