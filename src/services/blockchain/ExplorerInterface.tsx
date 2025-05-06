'use client';

import { useBlockchain } from '@/contexts/BlockchainContext';
import { SecureCard } from '../core/SecureCard';
import { Transaction } from '@/types';

export const BlockchainExplorer = () => {
  const { state } = useBlockchain();

  return (
    <SecureCard securityLevel="medium" className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🔍 Blockchain Explorer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        {state.confirmedTransactions.map((tx) => (
          <TransactionDetail key={tx.id} transaction={tx} />
        ))}
      </div>
    </SecureCard>
  );
};

const TransactionDetail = ({ transaction }: { transaction: Transaction }) => (
  <div className="transaction-item security-border">
    <div className="transaction-header">
      <span className="tx-hash">🔗 {transaction.id}</span>
      <span className={`tx-status ${transaction.status}`}>
        {transaction.status.toUpperCase()}
      </span>
    </div>
    <div className="transaction-body">
      <p>From: {transaction.from.slice(0, 12)}...</p>
      <p>To: {transaction.to.slice(0, 12)}...</p>
      <p>Value: {transaction.amount} CRED</p>
    </div>
  </div>
);