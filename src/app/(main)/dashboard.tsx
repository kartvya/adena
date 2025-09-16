import ScreenWrapper from '@/src/components/ScreenWrapper'
import Spacer from '@/src/components/Spacer'
import { HapticTab } from '@/src/components/haptic-tab'
import { ThemedText } from '@/src/components/themed-text'
import { useAppStore } from '@/src/store'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'

const ACCENT = '#007bffff'
const CARD = '#23232aff'
const MUTED = '#9BA1A6'
const SUCCESS = '#2ecc71'

type Token = {
  name: string
  symbol: string
  price: string
  change: number
}

const TOKENS: Token[] = [
  { name: 'Ethereum', symbol: 'ETH', price: '$4,502.13', change: -0.44 },
  { name: 'USD Coin', symbol: 'USDC', price: '$1.00', change: 0.0 },
  { name: 'Pepe', symbol: 'PEPE', price: '$0.00000108', change: 0.69 },
  { name: 'POL', symbol: 'POL', price: '$0.256', change: -2.71 },
  { name: 'BNB Smart C...', symbol: 'BNB', price: '$928.76', change: 1.05 },
]

function shortAddress(addr: string) {
  if (!addr) return ''
  return addr.slice(0, 4) + addr.slice(4, 6) + '...' + addr.slice(-4)
}

const Dashboard = () => {
  const user = useAppStore((s) => s.user)
  const address = '0xa9EAe6b4C9a85748'

  const copyAddress = React.useCallback(() => {
    Clipboard.setStringAsync(address)
  }, [address])

  return (
    <ScreenWrapper>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <View style={styles.avatarWrap}>
              <Image source={require('@/src/assets/images/react-logo.png')} style={styles.avatarImg} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <ThemedText style={styles.userName}>{user?.name ?? 'kartvya'}</ThemedText>
                <View style={styles.walletPill}>
                  <Ionicons name="wallet-outline" size={12} color="white" />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <ThemedText style={{ color: MUTED, fontSize: 14 }}>{shortAddress(address)}</ThemedText>
                <Pressable onPress={copyAddress} hitSlop={8}>
                  <Feather name="copy" size={14} color={MUTED} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Pressable style={styles.iconCircle}>
              <Ionicons name="scan-outline" size={18} color="white" />
            </Pressable>
            <Pressable style={styles.iconCircle}>
              <Ionicons name="settings-outline" size={18} color="white" />
            </Pressable>
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Spacer gap={10} />
        <View>
            <ThemedText type='title' >$0.00</ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={styles.greenDot} />
            <ThemedText type='subtitle' style={{ color: SUCCESS, fontSize: 14 }}>0.00%</ThemedText>
          </View>
        </View>

        <Spacer gap={10} />

        <View style={styles.actionsRow}>
          <HapticTab style={styles.actionTile}>
            <MaterialCommunityIcons name="bank-outline" size={20} color={ACCENT} />
            <ThemedText style={styles.actionLabel} type='subtitle'>Buy/Sell</ThemedText>
          </HapticTab>
          <HapticTab style={styles.actionTile} >
            <Ionicons name="send" size={20} color={ACCENT} />
            <ThemedText style={styles.actionLabel} type='subtitle'>Send</ThemedText>
          </HapticTab>
          <HapticTab style={styles.actionTile}>
            <FontAwesome5 name="arrow-circle-down" size={20} color={ACCENT} />
            <ThemedText style={styles.actionLabel} type='subtitle'>Receive</ThemedText>
          </HapticTab>
        </View>

        <Spacer gap={10} />

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
            <View style={styles.cardIcon}>
              <Ionicons name="card-outline" size={18} color="white" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={{ fontSize: 16, fontFamily: 'Montserrat-Bold' }}>Get your first token</ThemedText>
              <ThemedText style={{ color: MUTED, fontSize: 13 }} type='subtitle'>Fund your wallet by buying crypto or transferring from another account.</ThemedText>
            </View>
          </View>
          <View style={styles.requiredPill}>
            <ThemedText style={{ fontSize: 12, color: '#D1D5DB' }}>Required</ThemedText>
          </View>
        </View>

        <Spacer gap={14} />

        <ThemedText type="subtitle" style={{ marginBottom: 10 }}>Explore tokens</ThemedText>
        {TOKENS.map((t) => (
          <View key={t.symbol} style={styles.tokenRow}>
            <View style={styles.tokenLeft}>
              <View style={styles.tokenIcon}>
                {t.symbol === 'ETH' ? (
                  <MaterialCommunityIcons name="ethereum" size={20} color="#627EEA" />
                ) : (
                  <ThemedText style={{ fontFamily: 'Montserrat-Bold' }}>{t.symbol[0]}</ThemedText>
                )}
              </View>
              <View>
                <ThemedText style={{ fontSize: 16 }}>{t.name}</ThemedText>
                <ThemedText style={{ color: MUTED, fontSize: 13 }}>{t.symbol}</ThemedText>
              </View>
            </View>
            <View style={styles.tokenRight}>
              <ThemedText style={{ fontSize: 16 }}>{t.price}</ThemedText>
              <ThemedText style={{ color: t.change >= 0 ? SUCCESS : '#ef4444', fontSize: 13 }}>
                {t.change >= 0 ? '▲ ' : '▼ '}
                {Math.abs(t.change).toFixed(2)}%
              </ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom search pill */}
      <View style={styles.bottomBar} pointerEvents="box-none">
        <View style={styles.searchPill}>
          <Feather name="search" size={18} color={MUTED} />
          <TextInput
            editable={false}
            placeholder="Search"
            placeholderTextColor={MUTED}
            style={{ color: 'white', flex: 1, paddingVertical: Platform.OS === 'ios' ? 10 : 6 }}
          />
        </View>
        <Pressable style={styles.swapBtn}>
          <ThemedText style={styles.swapText}>Swap</ThemedText>
        </Pressable>
      </View>
    </ScreenWrapper>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  avatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    backgroundColor: CARD,
  },
  avatarImg: { width: '100%', height: '100%' },
  userName: { fontSize: 18, fontFamily: 'Montserrat-SemiBold' },
  walletPill: {
    backgroundColor: ACCENT,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SUCCESS,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionTile: {
    flex: 1,
    backgroundColor: '#0A1F3D',
    paddingVertical: 15,
    borderRadius: 16,
    gap: 8,
    paddingLeft: 15,
  },
  actionLabel: { fontSize: 14, fontFamily: 'Montserrat-bold', color: ACCENT },
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2b2b33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requiredPill: {
    backgroundColor: '#2b2b33',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tokenRow: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2b2b33',
  },
  tokenLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tokenIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenRight: { alignItems: 'flex-end' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: CARD,
    paddingHorizontal: 14,
    borderRadius: 26,
    height: 52,
    marginRight: 12,
  },
  swapBtn: {
    backgroundColor: ACCENT,
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapText: { color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold' },
})