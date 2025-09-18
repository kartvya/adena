import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HapticButton from '../components/haptic-loading-button'
import { HapticTab } from '../components/haptic-tab'
import NumericKeyboard from '../components/NumericKeyboard'
import { ThemedText } from '../components/themed-text'
import { useThemeColor } from '../hooks/use-theme-color'
import { getTokenColor, getTokenIcon } from '../utils'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const CARD = '#23232aff'
const ACCENT = '#007bffff'
const MUTED = '#9BA1A6'


const tokens = [
  { symbol: 'ETH', name: 'Ethereum', icon: getTokenIcon('ETH'), color: getTokenColor('ETH') },
  { symbol: 'USDC', name: 'USD Coin', icon: getTokenIcon('USDC'), color: getTokenColor('USDC') },
  { symbol: 'USDT', name: 'Tether', icon: getTokenIcon('USDT'), color: getTokenColor('USDT') },
  { symbol: 'BTC', name: 'Bitcoin', icon: getTokenIcon('BTC'), color: getTokenColor('BTC') },
]

const SwapAssets = () => {
  const [fromAmount, setFromAmount] = useState('0')
  const [toAmount, setToAmount] = useState('0')
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[1])
  const [isDragging, setIsDragging] = useState(false)
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from')
  
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

  const handleSwapTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleNumberPress = (num: string) => {
    if (activeInput === 'from') {
      if (fromAmount === '0') {
        setFromAmount(num)
      } else {
        setFromAmount(prev => prev + num)
      }
    } else {
      if (toAmount === '0') {
        setToAmount(num)
      } else {
        setToAmount(prev => prev + num)
      }
    }
  }

  const handleBackspace = () => {
    if (activeInput === 'from') {
      setFromAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
    } else {
      setToAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
    }
  }

  const handlePercentage = (percentage: number) => {
    const mockBalance = 1000
    const amount = (mockBalance * percentage / 100).toString()
    setFromAmount(amount)
  }


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
          

          <View style={styles.header}>
            <ThemedText type="title" style={styles.headerTitle}>Swap</ThemedText>
            <HapticTab style={styles.settingsButton} onPress={handleClose}>
              <Feather name="settings" size={20} color={textColor} />
            </HapticTab>
          </View>


          <View style={styles.swapContainer}>

            <Pressable 
              style={[styles.tokenInput, { backgroundColor: CARD }]}
              onPress={() => setActiveInput('from')}
            >
              <View style={styles.tokenInputLeft}>
                <ThemedText style={styles.amountText}>{fromAmount}</ThemedText>
              </View>
              <View style={styles.tokenSelector}>
                <View style={[styles.tokenIcon, { backgroundColor: fromToken.color }]}>
                  <Text style={styles.tokenIconText}>{fromToken.icon}</Text>
                </View>
                <ThemedText style={styles.tokenSymbol}>{fromToken.symbol}</ThemedText>
              </View>
            </Pressable>


            <View style={styles.swapButtonContainer}>
              <HapticTab style={styles.swapButton} onPress={handleSwapTokens}>
                <Feather name="arrow-down" size={20} color="white" />
              </HapticTab>
            </View>
          </View>


          <View style={styles.tokenSelection}>
            {tokens.map((token, index) => (
              <HapticTab 
                key={index}
                style={[styles.tokenSelectButton, { backgroundColor: CARD }]}
                onPress={() => {
                  if (activeInput === 'from') {
                    setFromToken(token)
                  } else {
                    setToToken(token)
                  }
                }}
              >
                <View style={[styles.tokenSelectIcon, { backgroundColor: token.color }]}>
                  <Text style={styles.tokenSelectIconText}>{token.icon}</Text>
                </View>
              </HapticTab>
            ))}
            <HapticTab style={styles.selectTokenButton}>
              <ThemedText style={styles.selectTokenText}>Select token</ThemedText>
            </HapticTab>
          </View>

       
          <View style={styles.percentageContainer}>
            {[25, 50, 75].map((percentage) => (
              <HapticTab 
                key={percentage}
                style={[styles.percentageButton, { backgroundColor: CARD }]}
                onPress={() => handlePercentage(percentage)}
              >
                <ThemedText style={styles.percentageText}>{percentage}%</ThemedText>
              </HapticTab>
            ))}
            <HapticTab 
              style={[styles.percentageButton, { backgroundColor: CARD }]}
              onPress={() => handlePercentage(100)}
            >
              <ThemedText style={styles.percentageText}>Max</ThemedText>
            </HapticTab>
          </View>

       

 
          <NumericKeyboard
            onNumberPress={handleNumberPress}
            onBackspace={handleBackspace}
            showDecimal={true}
            buttonStyle={styles.numberButton}
            textStyle={styles.numberText}
          />
          
          <View style={styles.bottomTextContainer}>
            <HapticButton title="Select A token" onPress={handleSwapTokens} style={styles.selectTokenBottomText} isLoading={false} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </Animated.View>
  )
}

export default SwapAssets

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  container: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.95,
    marginTop: SCREEN_HEIGHT * 0.05,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapContainer: {
    marginBottom: 30,
  },
  tokenInput: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tokenInputLeft: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  amountInput: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    padding: 0,
    margin: 0,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenIconText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  tokenSymbol: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
  },
  tokenSelectButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenSelectIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenSelectIconText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  selectTokenButton: {
    flex: 1,
    height: 48,
    backgroundColor: CARD,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectTokenText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  percentageContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  percentageButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  numberButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
  bottomTextContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomText: {
    fontSize: 16,
    color: MUTED,
  },
  selectTokenBottomText: {
    borderRadius: 24,
    width: '100%',
  },
})
