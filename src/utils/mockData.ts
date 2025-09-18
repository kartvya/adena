import { getTokenColor, getTokenIcon } from './token';

export interface FavoriteToken {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isNegative: boolean;
  icon: string;
}

export interface TopToken {
  rank: number;
  symbol: string;
  name: string;
  price: string;
  volume: string;
  change: string;
  isNegative: boolean;
  color: string;
}

export interface Token {
  name: string;
  symbol: string;
  price: string;
  change: number;
}

export const favoriteTokens: FavoriteToken[] = [
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: '$4,482.45', 
    change: '-0.40%', 
    isNegative: true, 
    icon: getTokenIcon('ETH') 
  },
  { 
    symbol: 'WBTC', 
    name: 'Wrapped Bitcoin', 
    price: '$116,277.00', 
    change: '+0.61%', 
    isNegative: false, 
    icon: getTokenIcon('WBTC') 
  },
];

export const topTokens: TopToken[] = [
  { 
    rank: 1, 
    symbol: 'USDT', 
    name: 'Tether', 
    price: '$1.00', 
    volume: '$994.42M Vol', 
    change: '-0.02%', 
    isNegative: true, 
    color: getTokenColor('USDT') 
  },
  { 
    rank: 2, 
    symbol: 'USDC', 
    name: 'USD Coin', 
    price: '$1.00', 
    volume: '$894.31M Vol', 
    change: '0.00%', 
    isNegative: false, 
    color: getTokenColor('USDC') 
  },
  { 
    rank: 3, 
    symbol: 'BUSD', 
    name: 'Binance Bridged USD...', 
    price: '$1.00', 
    volume: '$747.45M Vol', 
    change: '-0.02%', 
    isNegative: true, 
    color: getTokenColor('BUSD') 
  },
  { 
    rank: 4, 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: '$4,500.10', 
    volume: '$673.26M Vol', 
    change: '-0.60%', 
    isNegative: true, 
    color: getTokenColor('ETH') 
  },
  { 
    rank: 5, 
    symbol: 'BASE ETH', 
    name: 'Base ETH', 
    price: '$4,500.10', 
    volume: '$507.77M Vol', 
    change: '-0.54%', 
    isNegative: true, 
    color: getTokenColor('BASE ETH') 
  },
  { 
    rank: 6, 
    symbol: 'ALCX', 
    name: 'AlCell', 
    price: '$0.00254', 
    volume: '$415.75M Vol', 
    change: '-0.23%', 
    isNegative: true, 
    color: getTokenColor('ALCX') 
  },
  { 
    rank: 7, 
    symbol: 'USDC', 
    name: 'USD Coin', 
    price: '$1.00', 
    volume: '$219.61M Vol', 
    change: '-0.26%', 
    isNegative: true, 
    color: getTokenColor('USDC') 
  },
  { 
    rank: 8, 
    symbol: 'UNI ETH', 
    name: 'Unichain ETH', 
    price: '$4,502.69', 
    volume: '$176.34M Vol', 
    change: '-0.54%', 
    isNegative: true, 
    color: getTokenColor('UNI ETH') 
  },
];

export const TOKENS: Token[] = [
  { name: 'Ethereum', symbol: 'ETH', price: '$4,502.13', change: -0.44 },
  { name: 'USD Coin', symbol: 'USDC', price: '$1.00', change: 0.0 },
  { name: 'Pepe', symbol: 'PEPE', price: '$0.00000108', change: 0.69 },
  { name: 'POL', symbol: 'POL', price: '$0.256', change: -2.71 },
  { name: 'BNB Smart C...', symbol: 'BNB', price: '$928.76', change: 1.05 },
];
