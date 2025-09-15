import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { HapticTab } from './haptic-tab';
import { ThemedText } from './themed-text';

interface HapticLoadingButtonProps {
    title?: string;
    isLoading?: boolean;
    onPress?: () => void;
}

const HapticButton = ({ title = "Loading...", isLoading = false, onPress }: HapticLoadingButtonProps) => {
    return (
        <HapticTab style={styles.container} onPress={onPress} disabled={isLoading}>
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