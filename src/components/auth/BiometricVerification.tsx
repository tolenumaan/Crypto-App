'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { SecureCard } from '../core/SecureCard';

export const BiometricVerification = ({ onVerify }: { onVerify: () => void }) => {
  const { verifyBiometrics } = useAuth();

  useEffect(() => {
    const performVerification = async () => {
      const success = await verifyBiometrics();
      if (success) {
        onVerify();
      }
    };
    
    performVerification();
  }, [onVerify, verifyBiometrics]);

  return (
    <SecureCard securityLevel="medium">
      <div className="text-center space-y-4">
        <div className="biometric-animation" />
        <p className="text-security-green">Scanning biometric signature...</p>
        <p className="text-sm text-security-gray">Ensure your face is well lit</p>
      </div>
    </SecureCard>
  );
};