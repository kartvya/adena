
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
import { favoriteTokens, getChainColor, getChainIcon, getTokenIcon, topTokens } from '../utils'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')


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
    translateY.setValue(SCREEN_HEIGHT)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const chains = ['All', 'Ethereum', 'Unichain', 'Base']

  return (
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

          <View style={[
            styles.dragHandle, 
            { backgroundColor: isDragging ? '#9CA3AF' : '#D1D5DB' }
          ]} />
          

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

  )
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