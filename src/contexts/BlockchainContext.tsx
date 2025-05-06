'use client';

import { createContext, useContext, useReducer } from 'react';
import { Transaction, UserID } from '@/types';

type BlockchainState = {
  pendingTransactions: Transaction[];
  confirmedTransactions: Transaction[];
};

type BlockchainAction = 
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'CONFIRM_TRANSACTION'; payload: string };

const BlockchainContext = createContext<{
  state: BlockchainState;
  dispatch: React.Dispatch<BlockchainAction>;
} | undefined>(undefined);

function blockchainReducer(state: BlockchainState, action: BlockchainAction): BlockchainState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        pendingTransactions: [...state.pendingTransactions, action.payload]
      };
    case 'CONFIRM_TRANSACTION':
      return {
        pendingTransactions: state.pendingTransactions.filter(tx => tx.id !== action.payload),
        confirmedTransactions: [
          ...state.confirmedTransactions,
          state.pendingTransactions.find(tx => tx.id === action.payload)!
        ]
      };
    default:
      return state;
  }
}

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(blockchainReducer, {
    pendingTransactions: [],
    confirmedTransactions: []
  });

  return (
    <BlockchainContext.Provider value={{ state, dispatch }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}
