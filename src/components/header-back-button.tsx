import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';
import { HapticTab } from './haptic-tab';

interface HeaderBackButtonProps {
    lightColor?: string;
    darkColor?: string;
}

const HeaderBackButton = ({
    lightColor,
    darkColor,
}: HeaderBackButtonProps) => {
  const navigation = useNavigation();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
  return (
    <HapticTab style={{alignSelf:'flex-start',marginTop:10}} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={25} color={color} />
    </HapticTab>
  )
}

export default HeaderBackButton

const styles = StyleSheet.create({})