'use client';

import { useBlockchain } from '@/contexts/BlockchainContext';
import { CryptoService } from '@/services/crypto/core';
import { Transaction } from '@/types';
import { SecureCard } from '../core/SecureCard';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const TransactionProcessor = () => {
  const { dispatch } = useBlockchain();
  const { user, verifyBiometrics } = useAuth();
  const [transactionState, setTransactionState] = useState<Partial<Transaction>>({
    type: 'transfer',
    status: 'pending'
  });
  const [verificationStep, setVerificationStep] = useState(0);
  const [cryptoProof, setCryptoProof] = useState<string>('');

  const handleInitiateTransaction = async () => {
    try {
      // Step 1: Biometric Verification
      const bioVerified = await verifyBiometrics();
      if (!bioVerified) throw new Error('Biometric verification failed');
      
      // Step 2: Cryptographic Signing
      const txPayload = JSON.stringify(transactionState);
      const digitalSignature = CryptoService.signTransaction(txPayload, user!.privateKey);
      
      // Step 3: Create Proof
      const proof = CryptoService.generateLocationProof(user!.location);
      
      // Step 4: Dispatch to Blockchain
      const newTransaction: Transaction = {
        ...transactionState,
        id: `TX-${CryptoService.randomHash(16)}`,
        cryptographicProof: {
          digitalSignature,
          locationHash: proof,
          witnessConsensus: []
        },
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      setVerificationStep(3);
    } catch (error) {
      console.error('Transaction failed:', error);
      setVerificationStep(4);
    }
  };

  return (
    <SecureCard securityLevel="high" className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">🔐 Secure Transaction Gateway</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <TransactionInput 
            label="From"
            value={user?.publicKey}
            readOnly
          />
          <TransactionInput 
            label="To"
            onChange={(value) => setTransactionState({ ...transactionState, to: value })}
          />
          <AssetSelector 
            onSelect={(asset) => setTransactionState({ ...transactionState, assetId: asset.id })}
          />
        </div>

        <div className="space-y-4">
          <VerificationProgress step={verificationStep} />
          {verificationStep === 0 && (
            <BiometricVerification onVerify={() => setVerificationStep(1)} />
          )}
          {verificationStep === 1 && (
            <PinEntry 
              onComplete={(pin) => {
                setTransactionState({ ...transactionState, amount: parseFloat(pin) });
                setVerificationStep(2);
              }}
            />
          )}
        </div>
      </div>

      {cryptoProof && (
        <div className="p-4 bg-security-blue rounded-lg">
          <p className="font-mono text-sm break-words">🔒 Proof: {cryptoProof}</p>
        </div>
      )}
    </SecureCard>
  );
};

const VerificationProgress = ({ step }: { step: number }) => (
  <div className="space-y-2">
    <div className={`security-step ${step >= 0 ? 'active' : ''}`}>1. Identity Verification</div>
    <div className={`security-step ${step >= 1 ? 'active' : ''}`}>2. Transaction Authorization</div>
    <div className={`security-step ${step >= 2 ? 'active' : ''}`}>3. Blockchain Consensus</div>
  </div>
);