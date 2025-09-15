import ScreenWrapper from '@/src/components/ScreenWrapper'
import Spacer from '@/src/components/Spacer'
import { ThemedText } from '@/src/components/themed-text'
import { useAppStore } from '@/src/store'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Home = () => {
  const user = useAppStore((s) => s.user)

  return (
    <ScreenWrapper>
      <Spacer gap={10} />
      <ThemedText type="title">My Wallet</ThemedText>
      <Spacer gap={16} />

      {!user ? (
        <View style={styles.emptyCard}>
          <ThemedText type="default">No wallet connected.</ThemedText>
          <Spacer gap={6} />
          <ThemedText type="defaultSemiBold">Please connect your wallet to continue.</ThemedText>
        </View>
      ) : (
        <>
          <View style={styles.balanceCard}>
            <ThemedText type="default" style={styles.balanceLabel}>
              Available balance
            </ThemedText>
            <Spacer gap={6} />
            <View style={styles.balanceRow}>
              <ThemedText type="title" style={styles.balanceValue}>
                1,234.56
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.balanceToken}>
                G1
              </ThemedText>
            </View>
            <Spacer gap={4} />
            <ThemedText type="default" style={styles.balanceFiat}>
              ≈ $987.65 USD
            </ThemedText>
          </View>
        </>
      )}
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  
  emptyCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(59,130,246,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  nameText: {
    fontSize: 18,
  },
  
 
  
 
  
  balanceCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.18)',
  },
  balanceLabel: {
    opacity: 0.85,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  balanceValue: {
    fontSize: 28,
    lineHeight: 32,
  },
  balanceToken: {
    marginBottom: 3,
    opacity: 0.9,
  },
  balanceFiat: {
    opacity: 0.8,
    fontSize: 12,
  },
})