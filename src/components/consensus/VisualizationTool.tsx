'use client';

import { useEffect, useState } from 'react';
import { SecureCard } from '../core/SecureCard';

export const ConsensusVisualizer = ({ transactionId }: { transactionId: string }) => {
  const [consensusState, setConsensusState] = useState({
    nodes: [
      { id: 1, status: 'verifying' },
      { id: 2, status: 'pending' },
      { id: 3, status: 'pending' }
    ]
  });

  useEffect(() => {
    const simulateConsensus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConsensusState(prev => ({
        nodes: prev.nodes.map(node => 
          node.id === 2 ? {...node, status: 'verifying'} : node
        )
      }));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConsensusState(prev => ({
        nodes: prev.nodes.map(node => 
          node.status === 'verifying' ? {...node, status: 'verified'} : node
        )
      }));
    };

    simulateConsensus();
  }, []);

  return (
    <SecureCard securityLevel="medium" className="p-6 space-y-4">
      <h3 className="text-xl font-bold">🔄 Consensus Progress</h3>
      
      <div className="consensus-nodes">
        {consensusState.nodes.map(node => (
          <div key={node.id} className={`consensus-node ${node.status}`}>
            <div className="node-status-indicator" />
            <span>Node {node.id}</span>
            <span className="node-status">{node.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
      
      <div className="consensus-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${(consensusState.nodes.filter(n => n.status === 'verified').length / 3 * 100)}%` }}
        />
      </div>
    </SecureCard>
  );
};