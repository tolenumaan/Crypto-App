'use client';

import { useBlockchain } from '@/contexts/BlockchainContext';
import { SecureCard } from '../core/SecureCard';

export const CryptographicAudit = () => {
  const { state } = useBlockchain();

  return (
    <SecureCard securityLevel="high" className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🔏 Cryptographic Audit Trail</h2>
      
      <div className="audit-list">
        {state.confirmedTransactions.map(tx => (
          <div key={tx.id} className="audit-entry">
            <div className="audit-header">
              <span className="tx-id">{tx.id}</span>
              <span className="tx-timestamp">{tx.timestamp}</span>
            </div>
            
            <div className="audit-body">
              <p className="audit-proof">
                🔐 Signature: {tx.cryptographicProof.digitalSignature.slice(0, 24)}...
              </p>
              <p className="audit-proof">
                🌍 Location Lock: {tx.cryptographicProof.locationHash}
              </p>
              <div className="consensus-proof">
                {tx.cryptographicProof.witnessConsensus.map((w, i) => (
                  <span key={i} className="witness-badge">
                    Witness {i+1}: ✅ Verified
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SecureCard>
  );
};