import ScreenWrapper from '@/src/components/ScreenWrapper'
import { HapticTab } from '@/src/components/haptic-tab'
import { ThemedText } from '@/src/components/themed-text'
import { useAppStore } from '@/src/store'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Switch, View } from 'react-native'


const CARD = '#23232aff'
const MUTED = '#9BA1A6'

const Settings = () => {
  const user = useAppStore((s) => s.user)
  const [hapticEnabled, setHapticEnabled] = React.useState(true)

  const address = '0xa9EA5C...1d5748'

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <HapticTab onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </HapticTab>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        <HapticTab style={styles.profileSection}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarWrap}>
              <Image source={require('@/src/assets/images/react-logo.png')} style={styles.avatarImg} />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <ThemedText style={styles.userName}>{user?.name ?? 'kartvya'}</ThemedText>
                <View style={styles.walletPill}>
                  <Ionicons name="wallet-outline" size={12} color="white" />
                </View>
              </View>
              <ThemedText style={styles.userAddress}>{address}</ThemedText>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={MUTED} />
        </HapticTab>


        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
        </View>

        <View style={styles.settingsGroup}>
          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="moon" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Theme</ThemedText>
            </View>
            <View style={styles.settingRight}>
              <ThemedText style={styles.settingValue}>Auto</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={MUTED} />
            </View>
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="cash-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Local currency</ThemedText>
            </View>
            <View style={styles.settingRight}>
              <ThemedText style={styles.settingValue}>USD</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={MUTED} />
            </View>
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <MaterialIcons name="translate" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Language</ThemedText>
            </View>
            <View style={styles.settingRight}>
              <ThemedText style={styles.settingValue}>English</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={MUTED} />
            </View>
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="notifications-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Notifications</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="bar-chart-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Portfolio balance</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="pulse-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Haptic touch</ThemedText>
            </View>
            <Switch
              value={hapticEnabled}
              onValueChange={setHapticEnabled}
              trackColor={{ false: '#3e3e3e', true: '#ff1493' }}
              thumbColor={hapticEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="settings-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Advanced</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Privacy and security</ThemedText>
        </View>

        <View style={styles.settingsGroup}>
          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="finger-print-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Face/Fingerprint unlock</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="key-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Recovery phrase</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="cloud-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Google Drive backup</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>

          <HapticTab style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#2d2d2d' }]}>
                <Ionicons name="shield-checkmark-outline" size={18} color="white" />
              </View>
              <ThemedText style={styles.settingText}>Permissions</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={MUTED} />
          </HapticTab>
        </View>

    
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Support</ThemedText>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Settings

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#2d2d2d',
    marginRight: 12,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  walletPill: {
    backgroundColor: '#ff1493',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  userAddress: {
    fontSize: 14,
    color: MUTED,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: MUTED,
  },
  settingsGroup: {
    backgroundColor: CARD,
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2d2d2d',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 16,
    color: MUTED,
  },
})
