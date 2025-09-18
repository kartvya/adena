
export const getChainColor = (chain: string): string => {
  switch (chain) {
    case 'Ethereum': return '#627EEA';
    case 'Unichain': return '#FF007A';
    case 'Base': return '#0052FF';
    default: return '#9CA3AF';
  }
};

export const getChainIcon = (chain: string): string => {
  switch (chain) {
    case 'Ethereum': return '⟠';
    case 'Unichain': return '🦄';
    case 'Base': return '🔵';
    default: return '●';
  }
};
