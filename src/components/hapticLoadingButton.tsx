import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { HapticTab } from './hapticTab';
import { ThemedText } from './themedText';

interface HapticLoadingButtonProps {
    title?: string;
    isLoading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

const HapticButton = ({ title = "Loading...", isLoading = false, onPress, style }: HapticLoadingButtonProps) => {
    return (
        <HapticTab style={[styles.container, style]} onPress={onPress} disabled={isLoading}>
            {!isLoading ? (
                <ThemedText type="defaultSemiBold">
                    {title}
                </ThemedText>
            ) : <ActivityIndicator size="small" color="#fff" />}
        </HapticTab>
    )
}

export default HapticButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#007bffff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})