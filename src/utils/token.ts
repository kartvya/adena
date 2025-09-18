export const getTokenIcon = (symbol: string): string => {
  switch (symbol) {
    case 'USDT': return '₮';
    case 'USDC': return '$';
    case 'BUSD': return '₿';
    case 'ETH': return '⟠';
    case 'BASE ETH': return '⟠';
    case 'ALCX': return '◈';
    case 'UNI ETH': return '🦄';
    case 'BTC': return '₿';
    case 'WBTC': return '₿';
    default: return '●';
  }
};

export const getTokenColor = (symbol: string): string => {
  switch (symbol) {
    case 'ETH':
    case 'BASE ETH': return '#627EEA';
    case 'USDC': return '#2775CA';
    case 'USDT': return '#26A17B';
    case 'BTC':
    case 'WBTC': return '#F7931A';
    case 'BUSD': return '#F0B90B';    
    case 'ALCX': return '#FF6B9D';
    case 'UNI ETH': return '#FF007A';
    default: return '#9CA3AF';
  }
};
