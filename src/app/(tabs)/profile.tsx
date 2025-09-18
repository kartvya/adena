import ScreenWrapper from '@/src/components/screenWrapper'
import Spacer from '@/src/components/spacer'
import { ThemedText } from '@/src/components/themedText'
import { useAppStore } from '@/src/store'
import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Profile = () => {
  const user = useAppStore((s) => s.user)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (!user?.id) return
    await Clipboard.setStringAsync(user.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <ScreenWrapper>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <ThemedText type="defaultSemiBold" style={styles.avatarText}>
            {user?.name?.trim()?.[0]?.toUpperCase() || 'U'}
          </ThemedText>
        </View>

        <View style={{ flex: 1 }}>
          <ThemedText type="defaultSemiBold" style={styles.nameText}>
            {user?.name}
          </ThemedText>
          <Spacer gap={1} />
          <View style={styles.idRow}>
            <ThemedText type="default" style={styles.walletId} numberOfLines={1}>
              {user?.id}
            </ThemedText>
            {/* <Pressable onPress={handleCopy} style={styles.copyButton} hitSlop={8}>
              <ThemedText type="defaultSemiBold" style={styles.copyText}>
                {copied ? 'Copied' : 'Copy'}
              </ThemedText>
            </Pressable> */}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
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
  label: {
    opacity: 0.8,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  walletId: {
    flexShrink: 1,
    fontSize: 14,
    letterSpacing: 0.4,
  },
  copyButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(59,130,246,0.15)',
  },
  copyText: {
    fontSize: 12,
  },
})