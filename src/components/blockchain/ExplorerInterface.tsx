'use client';

import { useBlockchain } from '@/contexts/BlockchainContext';
import { SecureCard } from '../core/SecureCard';
import { Transaction } from '@/types';
import { FixedSizeList as List } from 'react-window';

export const BlockchainExplorer = () => {
  const { state } = useBlockchain();

  const TransactionRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <TransactionDetail transaction={state.confirmedTransactions[index]} />
    </div>
  );

  return (
    <SecureCard securityLevel="medium" className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🔍 Blockchain Explorer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="blockchain-stats">
          <h3>Network Health</h3>
          <div className="security-meter">
            <div className="security-fill" style={{ width: '95%' }} />
          </div>
        </div>
        
        <div className="blockchain-stats">
          <h3>Finalized Blocks</h3>
          <p className="security-number">
            {state.confirmedTransactions.length}
          </p>
        </div>
      </div>

      <div className="transaction-list">
        <List
          height={600}
          itemCount={state.confirmedTransactions.length}
          itemSize={120}
          width="100%"
        >
          {TransactionRow}
        </List>
      </div>
    </SecureCard>
  );
};

const TransactionDetail = ({ transaction }: { transaction: Transaction }) => (
  <div className="transaction-item security-border mb-4 p-4">
    <div className="transaction-header flex justify-between items-center mb-2">
      <span className="tx-hash font-mono text-sm">🔗 {transaction.id}</span>
      <span className={`tx-status ${transaction.status} px-2 py-1 rounded`}>
        {transaction.status.toUpperCase()}
      </span>
    </div>
    <div className="transaction-body space-y-1">
      <p className="text-sm">From: {transaction.from.slice(0, 12)}...</p>
      <p className="text-sm">To: {transaction.to.slice(0, 12)}...</p>
      <p className="text-sm font-medium">Value: {transaction.amount} CRED</p>
      {transaction.cryptographicProof && (
        <p className="text-xs text-gray-500 mt-2">
          🔐 Proof: {transaction.cryptographicProof.digitalSignature.slice(0, 24)}...
        </p>
      )}
    </div>
  </div>
);