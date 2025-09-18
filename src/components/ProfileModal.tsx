import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shortAddress } from '../utils';
import { HapticTab } from './hapticTab';
import { ThemedText } from './themedText';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ACCENT = '#007bffff';
const CARD = '#23232aff';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  userAddress?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onClose,
  userName = 'Testing User',
  userAddress = '0xa9EAe6b4C9a85748'
}) => {


  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;



  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {

      return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {

      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        handleClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });


  const handleAddWallet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Add wallet pressed');
  };

  const handleWalletSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Wallet settings pressed');
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
      opacity.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Pressable style={styles.backdropPressable} onPress={handleClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: "black",
            transform: [{ translateY }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <SafeAreaView style={styles.safeArea}>

          <View style={styles.dragHandle} />
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('@/src/assets/images/react-logo.png')}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <ThemedText style={styles.userName}>{userName}</ThemedText>
                <View style={styles.walletBadge}>
                  <Ionicons name="wallet-outline" size={12} color="white" />
                </View>
              </View>
              <ThemedText style={styles.userAddress}>
                {shortAddress(userAddress)}
              </ThemedText>
            </View>
          </View>


          <HapticTab style={styles.settingsButton} onPress={handleWalletSettings}>
            <ThemedText style={styles.settingsButtonText}>Wallet settings</ThemedText>
          </HapticTab>

          <HapticTab style={styles.addWalletButton} onPress={handleAddWallet}>
            <View style={styles.addWalletIcon}>
              <Ionicons name="add" size={20} color="white" />
            </View>
            <ThemedText style={styles.addWalletText}>Add wallet</ThemedText>
          </HapticTab>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  backdropPressable: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  safeArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: CARD,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
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
  walletBadge: {
    backgroundColor: ACCENT,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  userAddress: {
    fontSize: 14,
    color: '#9BA1A6',
  },
  settingsButton: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  addWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addWalletText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  addWalletIcon: {
    width: 28,
    height: 28,
    backgroundColor: CARD,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileModal;