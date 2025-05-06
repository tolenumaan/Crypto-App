// Core Types
export type UserID = string;

export interface DigitalIdentity {
  publicKey: string;
  anagramHash: string;
  biometricSignature: string;
}

export interface TokenizedAsset {
  id: string;
  type: 'land' | 'vehicle' | 'nft' | 'stock';
  title: string;
  value: number;
  issuer: string;
  metadata: Record<string, unknown>;
  transferPolicy: 'open' | 'restricted';
  ownershipHistory: OwnershipRecord[];
}

interface OwnershipRecord {
  owner: UserID;
  timestamp: string;
  transactionHash: string;
}

export interface Transaction {
  id: string;
  type: 'transfer' | 'trade' | 'mint';
  from: UserID;
  to: UserID;
  amount: number;
  assetId?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  cryptographicProof: CryptographicProof;
  timestamp: string;
}

interface CryptographicProof {
  digitalSignature: string;
  locationHash: string;
  witnessConsensus: string[];
}