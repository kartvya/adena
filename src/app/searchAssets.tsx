
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../components/themed-text'
import { useThemeColor } from '../hooks/use-theme-color'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

// Mock token data
const favoriteTokens = [
  { symbol: 'ETH', name: 'Ethereum', price: '$4,482.45', change: '-0.40%', isNegative: true, icon: '⟠' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: '$116,277.00', change: '+0.61%', isNegative: false, icon: '₿' },
]

const topTokens = [
  { rank: 1, symbol: 'USDT', name: 'Tether', price: '$1.00', volume: '$994.42M Vol', change: '-0.02%', isNegative: true, color: '#26A17B' },
  { rank: 2, symbol: 'USDC', name: 'USD Coin', price: '$1.00', volume: '$894.31M Vol', change: '0.00%', isNegative: false, color: '#2775CA' },
  { rank: 3, symbol: 'BUSD', name: 'Binance Bridged USD...', price: '$1.00', volume: '$747.45M Vol', change: '-0.02%', isNegative: true, color: '#F0B90B' },
  { rank: 4, symbol: 'ETH', name: 'Ethereum', price: '$4,500.10', volume: '$673.26M Vol', change: '-0.60%', isNegative: true, color: '#627EEA' },
  { rank: 5, symbol: 'BASE ETH', name: 'Base ETH', price: '$4,500.10', volume: '$507.77M Vol', change: '-0.54%', isNegative: true, color: '#0052FF' },
  { rank: 6, symbol: 'ALCX', name: 'AlCell', price: '$0.00254', volume: '$415.75M Vol', change: '-0.23%', isNegative: true, color: '#FF6B9D' },
  { rank: 7, symbol: 'USDC', name: 'USD Coin', price: '$1.00', volume: '$219.61M Vol', change: '-0.26%', isNegative: true, color: '#2775CA' },
  { rank: 8, symbol: 'UNI ETH', name: 'Unichain ETH', price: '$4,502.69', volume: '$176.34M Vol', change: '-0.54%', isNegative: true, color: '#FF007A' },
]

const CARD = '#23232aff'

const SearchAssets = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChain, setSelectedChain] = useState('All')
  const [isDragging, setIsDragging] = useState(false)
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  
  const translateY = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.back()
    })
  }

  // Pan responder for drag to dismiss
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
    },
    onPanResponderGrant: () => {
      setIsDragging(true)
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy)
        // Fade backdrop based on drag distance
        const progress = Math.min(gestureState.dy / 200, 1)
        opacity.setValue(1 - progress * 0.5)
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      setIsDragging(false)
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        handleClose()
      } else {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          })
        ]).start()
      }
    },
  })

  useEffect(() => {
    // Animate in on mount
    translateY.setValue(SCREEN_HEIGHT)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const chains = ['All', 'Ethereum', 'Unichain', 'Base']

  return (
    // <ThemedView style={styles.fullScreen}>
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Animated.View 
          style={[
            styles.container, 
            { 
         backgroundColor: backgroundColor,
              transform: [{ translateY }] 
            }
          ]}
          {...panResponder.panHandlers}
        >
        <SafeAreaView style={styles.safeArea}>
          {/* Drag Handle */}
          <View style={[
            styles.dragHandle, 
            { backgroundColor: isDragging ? '#9CA3AF' : '#D1D5DB' }
          ]} />
          
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={[styles.searchInputContainer, { backgroundColor: CARD }]}>
              <Feather name="search" size={20} color="#9CA3AF" />
              <TextInput
                style={[styles.searchInput, { color: textColor }]}
                placeholder="Search tokens and wallets"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={false}
              />
            </View>
          </View>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
   
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle} >
                  Favorite tokens
                </ThemedText>
                <Feather name="more-horizontal" size={30} color="#9CA3AF" />
              </View>
              
              <View style={styles.favoriteGrid}>
                {favoriteTokens.map((token, index) => (
                  <View key={index} style={[styles.favoriteCard, { backgroundColor: CARD }]}>
                    <View style={styles.favoriteHeader}>
                      <Text style={styles.tokenIcon}>{token.icon}</Text>
                      <ThemedText type="defaultSemiBold" style={styles.tokenSymbol} >
                        {token.symbol}
                      </ThemedText>
                    </View>
                    <ThemedText type="title" style={styles.tokenPrice}>
                      {token.price}
                    </ThemedText>
                    <Text style={[styles.tokenChange, { color: token.isNegative ? '#EF4444' : '#10B981' }]}>
                      {token.isNegative ? '▼' : '▲'} {token.change}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Top Tokens */}
            <View style={styles.section}>
              <View style={styles.topTokensHeader}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Top tokens
                </ThemedText>
                <View style={[styles.volumeButton, { backgroundColor: CARD }]}>
                  <ThemedText style={styles.volumeText}>Volume</ThemedText>
                  <Feather name="chevron-down" size={16} color={textColor} />
                </View>
              </View>

              {/* Chain Filter */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chainFilter}>
                {chains.map((chain, index) => (
                  <Pressable 
                    key={index}
                    onPress={() => setSelectedChain(chain)}
                    style={[
                      styles.chainButton, 
                      { 
                        backgroundColor: selectedChain === chain 
                          ? (CARD)
                          : 'transparent'
                      }
                    ]}
                  >
                    {chain !== 'All' && (
                      <View style={[styles.chainIcon, { backgroundColor: getChainColor(chain) }]}>
                        <Text style={styles.chainIconText}>{getChainIcon(chain)}</Text>
                      </View>
                    )}
                    <ThemedText style={styles.chainButtonText}>{chain}</ThemedText>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Token List */}
              <View style={styles.tokenList}>
                {topTokens.map((token, index) => (
                  <Pressable key={index} style={styles.tokenItem}>
                    <View style={styles.tokenLeft}>
                      <Text style={styles.tokenRank}>{token.rank}</Text>
                      <View style={[styles.tokenIconContainer, { backgroundColor: token.color }]}>
                        <Text style={styles.tokenIconText}>{getTokenIcon(token.symbol)}</Text>
                      </View>
                      <View style={styles.tokenInfo}>
                        <ThemedText type="defaultSemiBold" style={styles.tokenName}>
                          {token.name}
                        </ThemedText>
                        <Text style={[styles.tokenVolume, { color: '#9CA3AF' }]}>
                          {token.volume}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tokenRight}>
                      <ThemedText type="defaultSemiBold" style={styles.tokenPrice}>
                        {token.price}
                      </ThemedText>
                      <Text style={[styles.tokenChange, { color: token.isNegative ? '#EF4444' : '#10B981' }]}>
                        {token.isNegative ? '▼' : '▲'} {token.change}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        </Animated.View>
      </Animated.View>
    // </ThemedView>
  )
}

// Helper functions
const getChainColor = (chain: string): string => {
  switch (chain) {
    case 'Ethereum': return '#627EEA'
    case 'Unichain': return '#FF007A'
    case 'Base': return '#0052FF'
    default: return '#9CA3AF'
  }
}

const getChainIcon = (chain: string): string => {
  switch (chain) {
    case 'Ethereum': return '⟠'
    case 'Unichain': return '🦄'
    case 'Base': return '🔵'
    default: return '●'
  }
}

const getTokenIcon = (symbol: string): string => {
  switch (symbol) {
    case 'USDT': return '₮'
    case 'USDC': return '$'
    case 'BUSD': return '₿'
    case 'ETH': return '⟠'
    case 'BASE ETH': return '⟠'
    case 'ALCX': return '◈'
    case 'UNI ETH': return '🦄'
    default: return '●'
  }
}

export default SearchAssets

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  backdrop: {
    flex:1
  },
  container: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.95,
    marginTop: SCREEN_HEIGHT * 0.05,
    
  },
  safeArea: {
    flex: 1,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,

    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical:Platform.OS === 'ios' ? 10 : 2,
    gap: 12,

  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },  
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',

  },
  favoriteGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  favoriteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tokenIcon: {
    fontSize: 20,
  },
  tokenSymbol: {
    fontSize: 16,
  },
  tokenPrice: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  tokenChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  topTokensHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  volumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  volumeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chainFilter: {
    marginBottom: 20,
  },
  chainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  chainIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chainIconText: {
    fontSize: 12,
    color: 'white',
  },
  chainButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tokenList: {
    gap: 16,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenRank: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    width: 20,
    marginRight: 16,
  },
  tokenIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tokenIconText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    marginBottom: 2,
  },
  tokenVolume: {
    fontSize: 14,
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
})