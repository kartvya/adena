import { navigate } from 'expo-router/build/global-state/routing';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HapticButton from '../components/haptic-loading-button';
import ScreenWrapper from '../components/ScreenWrapper';
import Spacer from '../components/Spacer';
import { ThemedText } from '../components/themed-text';

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <LottieView
          source={require('../assets/animations/CryptocurrencyLottieAnimation.json')}
          autoPlay
          loop
          style={{ width: '100%', flex: 1 }}
          speed={0.4}
        />
      </View>
      <View style={{ flex: 0.3, justifyContent: 'flex-end', marginHorizontal: 20, marginBottom: 10 }}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>Welcome to adena! </ThemedText>
        <Spacer gap={10} />
        <HapticButton
          title='Connect your wallet'
          isLoading={false}
          onPress={() => navigate('/connectWallet')}
        />
        <Spacer gap={18} />
        <ThemedText type="subtitle" style={styles.privacyText}>
          By continuing, I agree to the Terms of Service and Privacy Policy
        </ThemedText>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeTextBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bffff',
    height: 50,
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  }
})