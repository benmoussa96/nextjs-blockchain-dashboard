import { type NetworkData } from '@/config/networks';
const DECIMALS = 10e17;

export type Block = {
  key: string;
  network: string;
  hash: string;
  height: number;
  timestamp: number;
  size: number;
  validator: string;
  txCount: number;
  withdrawalsCount: number;
  blockRewardETH: number;
  gas: {
    gasLimit: number;
    gasUsed: number;
    gasUsedPercent: number;
    gasTargetPercent: number;
  };
  fees: {
    txFees: number;
    burntFees: number;
    burntFeesPercent: number;
    baseFeePerGas: {
      eth: number;
      gwei: number;
    };
    priorityFee: number;
  };
  difficulty: string;
  totalDifficulty: string;
  parentHash: string;
  nonce: string;
};

export async function fetchStats(network: NetworkData, apikey?: string) {
  if (apikey)
    try {
      const query = new URLSearchParams({}).toString();

      const resp = await fetch(`${network.apiUrl}stats?${query}`, {
        method: 'GET',
      });

      if (!resp || resp.status != 200) {
        throw new Error('Failed to fetch data');
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
}

export async function fetchAllBlocks(network: NetworkData, apikey?: string) {
  if (apikey)
    try {
      const query = new URLSearchParams({
        apikey,
        type: 'block',
      }).toString();

      const resp = await fetch(`${network.apiUrl}blocks?${query}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!resp || resp.status != 200) {
        throw new Error('Failed to fetch data');
      }

      const data = await resp.json();

      const blocks = data.items.map((block: any) => ({
        key: network.name + block.hash,
        network: network.name,
        hash: block.hash,
        height: Number(block.height),
        timestamp: block.timestamp,
        size: Number(block.size),
        validator: block.miner.hash,
        txCount: Number(block.tx_count),
        withdrawalsCount: Number(block.withdrawals_count),
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
        gas: {
          gasLimit: Number(block.gas_limit),
          gasUsed: Number(block.gas_used),
          gasUsedPercent: Number(
            parseFloat(block.gas_used_percentage).toFixed(2)
          ),
          gasTargetPercent: Number(
            parseFloat(block.gas_target_percentage).toFixed(2)
          ),
        },
        fees: {
          txFees: block.tx_fees / DECIMALS,
          burntFees: Number((block.burnt_fees / DECIMALS).toFixed(8)),
          burntFeesPercent: Number(
            parseFloat(block.burnt_fees_percentage).toFixed(2)
          ),
          baseFeePerGas: {
            eth: Number((block.base_fee_per_gas / DECIMALS).toFixed(18)),
            gwei: Number(block.base_fee_per_gas / 10e8),
          },
          priorityFee: block.priority_fee / DECIMALS,
        },
        difficulty: block.difficulty,
        totalDifficulty: block.total_difficulty,
        parentHash: block.parent_hash,
        nonce: block.nonce,
      }));

      return {
        blocks,
        blockHeight: blocks[0].height,
      };
    } catch (error) {
      console.log(error);
    }
}

export async function fetchBlock(
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
        hash: block.hash,
        height: block.height,
        timestamp: block.timestamp,
        size: block.size,
        validator: block.miner.hash,
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
          txFees: block.tx_fees / DECIMALS,
          burntFees: Number((block.burnt_fees / DECIMALS).toFixed(8)),
          burntFeesPercent: Number(
            parseFloat(block.burnt_fees_percentage).toFixed(2)
          ),
          baseFeePerGas: {
            eth: Number((block.base_fee_per_gas / DECIMALS).toFixed(18)),
            gwei: Number(block.base_fee_per_gas / 10e8),
          },
          priorityFee: block.priority_fee / DECIMALS,
        },
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
        height: transaction.block,
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
