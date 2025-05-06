'use client';

import { useState } from 'react';
import { SecureCard } from '../core/SecureCard';
import { useAuth } from '@/hooks/useAuth';
import { CryptoService } from '@/services/crypto/core';

export const AssetTokenizer = () => {
  const { user } = useAuth();
  const [assetDetails, setAssetDetails] = useState({
    title: '',
    type: 'nft',
    value: 0,
    metadata: ''
  });

  const handleTokenize = async () => {
    const newAsset = {
      id: `AST-${CryptoService.randomHash(16)}`,
      owner: user!.publicKey,
      ...assetDetails,
      proof: CryptoService.generateOwnershipProof(user!.publicKey)
    };

    // Dispatch to blockchain
    console.log('Asset tokenized:', newAsset);
  };

  return (
    <SecureCard securityLevel="high" className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🛡️ Asset Tokenization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label>Asset Title</label>
          <input
            type="text"
            className="security-input"
            onChange={(e) => setAssetDetails({...assetDetails, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label>Asset Type</label>
          <select
            className="security-select"
            onChange={(e) => setAssetDetails({...assetDetails, type: e.target.value})}
          >
            <option value="nft">Digital Collectible</option>
            <option value="land">Virtual Land</option>
            <option value="stock">Security Token</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleTokenize}
        className="security-button primary"
      >
        🛡️ Create Digital Twin
      </button>
    </SecureCard>
  );
};