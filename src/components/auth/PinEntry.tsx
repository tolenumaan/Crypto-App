'use client';

import { useState } from 'react';
import { SecureCard } from '../core/SecureCard';

export const PinEntry = ({ onComplete }: { onComplete: (pin: string) => void }) => {
  const [pin, setPin] = useState<string>('');
  
  const handlePinEntry = (digit: string) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 6) {
        onComplete(newPin);
      }
    }
  };

  return (
    <SecureCard securityLevel="high">
      <div className="space-y-4">
        <p className="text-security-blue">Enter Security PIN</p>
        <div className="flex gap-2 justify-center">
          {Array(6).fill(0).map((_, i) => (
            <div 
              key={i}
              className={`pin-dot ${i < pin.length ? 'filled' : ''}`}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num) => (
            <button
              key={num}
              onClick={() => num !== '⌫' ? handlePinEntry(num.toString()) : setPin('')}
              className="security-button"
              disabled={num === ''}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </SecureCard>
  );
};