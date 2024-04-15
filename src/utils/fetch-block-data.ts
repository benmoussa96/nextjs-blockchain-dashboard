import { type NetworkData } from '@/config/networks';
const DECIMALS = 10e17;

export async function fetchBlocksData(network: NetworkData, apikey?: string) {
  if (apikey)
    try {
      const query = new URLSearchParams({
        apikey,
        type: 'block',
      }).toString();

      const resp = await fetch(`${network.apiUrl}blocks?${query}`, {
        method: 'GET',
        cache: 'force-cache',
      });

      if (!resp || resp.status != 200) {
        throw new Error('Failed to fetch data');
      }

      const data = await resp.json();

      const blocksData = data.items.map((block: any) => ({
        key: network.name + block.hash,
        network: network.name,
        hash: block.hash,
        number: Number(block.height),
        timestamp: block.timestamp,
        size: Number(block.size),
        validator: block.miner.hash,
        txnCount: Number(block.tx_count),
        rewardETH: Number(
          (
            block.rewards.reduce(
              (acc: number, cur: { reward: string; type: string }) => {
                return Number(acc) + Number(cur.reward);
              },
              0
            ) / DECIMALS
          ).toFixed(8)
        ),
        gas: {
          gasUsed: Number(block.gas_used),
          gasUsedPercent: Number(
            parseFloat(block.gas_used_percentage).toFixed(2)
          ),
          gasTargetPercent: Number(
            parseFloat(block.gas_target_percentage).toFixed(2)
          ),
        },
        fees: {
          burntFees: Number((block.burnt_fees / DECIMALS).toFixed(8)),
          burntFeesPercent: Number(
            parseFloat(block.burnt_fees_percentage).toFixed(2)
          ),
        },
      }));

      return {
        blocksData,
        blockHeight: blocksData[0].number,
      };
    } catch (error) {
      console.log(error);
    }
}

export async function fetchBlockData(
  network: NetworkData,
  blockId: string,
  apikey?: string
) {
  if (apikey)
    try {
      const query = new URLSearchParams({
        apikey,
      }).toString();

      const resp = await fetch(`${network.apiUrl}blocks/${blockId}?${query}`, {
        method: 'GET',
        cache: 'force-cache',
      });

      if (!resp || resp.status != 200) {
        throw new Error('Failed to fetch data');
      }

      const block = await resp.json();
      return {
        key: network.name + block.height,
        network: network.name,
        height: block.height,
        hash: block.hash,
        validator: block.miner.hash,
        size: block.size,
        timestamp: block.timestamp,
        txCount: block.tx_count,
        withdrawalsCount: block.withdrawals_count,
        blockRewardETH: Number(
          (
            block.rewards.reduce(
              (acc: number, cur: { reward: string; type: string }) => {
                return Number(acc) + Number(cur.reward);
              },
              0
            ) / DECIMALS
          ).toFixed(8)
        ),
        txFees: block.tx_fees / DECIMALS,
        gas: {
          gasLimit: block.gas_limit,
          gasUsed: Number(block.gas_used),
          gasUsedPercent: Number(
            parseFloat(block.gas_used_percentage).toFixed(2)
          ),
          gasTargetPercent: Number(
            parseFloat(block.gas_target_percentage).toFixed(2)
          ),
        },
        fees: {
          burntFees: Number((block.burnt_fees / DECIMALS).toFixed(8)),
          burntFeesPercent: Number(
            parseFloat(block.burnt_fees_percentage).toFixed(2)
          ),
        },
        baseFeePerGas: {
          eth: Number(block.base_fee_per_gas / DECIMALS).toFixed(18),
          gwei: Number(block.base_fee_per_gas / 10e8),
        },
        priorityFee: block.priority_fee / DECIMALS,
        difficulty: block.difficulty,
        totalDifficulty: block.total_difficulty,
        parentHash: block.parent_hash,
        nonce: block.nonce,
      };
    } catch (error) {
      console.log(error);
    }
}

export async function fetchAllTransactions(
  network: NetworkData,
  blockId: string,
  apikey?: string,
  nextPage?: any
): Promise<any> {
  if (apikey)
    try {
      let res: any[] = [];
      const query = nextPage
        ? new URLSearchParams({
            apikey,
            block_number: nextPage.block_number,
            index: nextPage.index,
            items_count: nextPage.items_count,
          }).toString()
        : new URLSearchParams({
            apikey,
          }).toString();

      const resp = await fetch(
        `${network.apiUrl}blocks/${blockId}/transactions?${query}`,
        {
          method: 'GET',
          cache: 'force-cache',
        }
      );

      if (!resp || resp.status != 200) {
        throw new Error('Failed to fetch data');
      }

      const data = await resp.json();
      const transactionData = data.items.map((transaction: any) => ({
        key: network.name + transaction.hash,
        network: network.name,
        number: transaction.block,
        hash: transaction.hash,
        timestamp: transaction.timestamp,
        result: transaction.result,
        type: transaction.tx_types.includes('token_transfer')
          ? 'Token Transfer'
          : transaction.tx_types.includes('coin_transfer')
            ? 'Coin Transfer'
            : transaction.tx_types.includes('contract_call')
              ? 'Contract Call'
              : 'Transaction',
        method: transaction.method,
        fromTo: {
          from: transaction.from.hash,
          to: transaction.to.hash,
        },
        value:
          Number((transaction.value / DECIMALS).toFixed(8)) > 0
            ? (transaction.value / DECIMALS).toFixed(8)
            : 0,
        fee: Number((transaction.fee.value / DECIMALS).toFixed(8)),
      }));

      res = res.concat(transactionData);
      if (data.next_page_params) {
        res = res.concat(
          await fetchAllTransactions(
            network,
            blockId,
            apikey,
            data.next_page_params
          )
        );
      }
      return res;
    } catch (error) {
      console.log(error);
    }
}
