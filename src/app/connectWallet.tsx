import { replace } from 'expo-router/build/global-state/routing'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import HapticButton from '../components/hapticLoadingButton'
import HeaderBackButton from '../components/headerBackButton'

import ScreenWrapper from '../components/screenWrapper'
import Spacer from '../components/spacer'
import { ThemedText } from '../components/themedText'
import { useAppStore } from '../store'

const ConnectWallet = () => {
    const setUser = useAppStore((s) => s.setUser)
    const fullNameRef = React.useRef<TextInput>(null);
    const walletIdRef = React.useRef<TextInput>(null);
    const seedPhraseRef = React.useRef<TextInput>(null);
    const [fullName, setFullName] = React.useState('');
    const [walletId, setWalletId] = React.useState('');
    const [seedPhrase, setSeedPhrase] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<{ fullName?: string; walletId?: string; seedPhrase?: string }>({});
    const getSeedWords = (text: string) => text.trim().split(/\s+/).filter(Boolean);
    const isWalletValid = (t: string) => t.startsWith('g1') && t.length > 10 && !/\s/.test(t);

    const validateInputs = () => {
        const newErrors: { fullName?: string; walletId?: string; seedPhrase?: string } = {};
        const trimmedName = fullName.trim();
        if (!trimmedName) {
            newErrors.fullName = 'Full name is required.';
        }
        const trimmedWallet = walletId.trim();
        if (!trimmedWallet) {
            newErrors.walletId = 'Wallet ID is required.';
        } else if (/\s/.test(trimmedWallet)) {
            newErrors.walletId = 'Wallet ID must not contain spaces.';
        } else if (!isWalletValid(trimmedWallet)) {
            newErrors.walletId = 'Wallet ID must start with "g1" and be more than 10 characters.';
        }

        const words = getSeedWords(seedPhrase);
        if (words.length === 0) {
            newErrors.seedPhrase = 'Seed phrase is required.';
        } 

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleConnect = () => {
        // if (!validateInputs()) return;
        setIsLoading(true);
        try {
            setTimeout(() => {
                setUser({ id: walletId.trim(), name: fullName.trim() })
                setIsLoading(false);
                replace('/(main)/dashboard');
            }, 0);
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.select({ ios: 12, android: 0 })}
            >
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
                <HeaderBackButton />
                <Spacer gap={10} />
                <ThemedText type='title' style={{ textAlign: 'center' }}>Connect Wallet</ThemedText>
                <Spacer gap={5} />
                <ThemedText type='default' style={{ textAlign: 'center' }}>Connect your wallet with <ThemedText type='defaultSemiBold'>Id</ThemedText> and <ThemedText type='defaultSemiBold'>Seeds</ThemedText> to get started!</ThemedText>
                <Spacer gap={15} />
                <View>
                    <TextInput
                        ref={fullNameRef}
                        placeholder="Full name"
                        style={[styles.walletIdInput, errors.fullName && styles.inputError]}
                        onChangeText={(text) => {
                            setFullName(text);
                            setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        autoFocus
                        returnKeyType='next'
                        onSubmitEditing={() => walletIdRef.current?.focus()}
                        submitBehavior='blurAndSubmit'
                        autoCapitalize='words'
                        autoCorrect={false}
                        placeholderTextColor={'#999'}
                        value={fullName}
                    />
                    {errors.fullName ? (
                        <ThemedText type='default' style={styles.errorText}>{errors.fullName}</ThemedText>
                    ) : null}
                </View>
                <Spacer gap={10} />
                <View>
                    <TextInput
                        ref={walletIdRef}
                        placeholder="Wallet ID"
                        style={[styles.walletIdInput, errors.walletId && styles.inputError]}
                        onChangeText={(text) => {
                            setWalletId(text);
                            setErrors(prev => ({ ...prev, walletId: '' }));
                        }}
                        returnKeyType='next'
                        onSubmitEditing={() => seedPhraseRef.current?.focus()}
                        submitBehavior='blurAndSubmit'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={'#999'}
                        value={walletId}
                    />
                    {errors.walletId ? (
                        <ThemedText type='default' style={styles.errorText}>{errors.walletId}</ThemedText>
                    ) : null}
                </View>
                <Spacer gap={10} />
                <View>
                    <TextInput
                        ref={seedPhraseRef}
                        placeholder="Seed Phrase"
                        style={[styles.seedPhraseInput, errors.seedPhrase && styles.inputError]}
                        onChangeText={(text) => {
                            setSeedPhrase(text);
                            setErrors(prev => ({ ...prev, seedPhrase: '' }));
                        }}
                        placeholderTextColor={'#999'}
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline
                        numberOfLines={10}
                        textAlignVertical="top"
                        value={seedPhrase}
                        onSubmitEditing={handleConnect}
                    />
                    {errors.seedPhrase ? (
                        <ThemedText type='default' style={styles.errorText}>{errors.seedPhrase}</ThemedText>
                    ) : null}
                </View>
            </ScrollView>
            <HapticButton
                title='Connect'
                isLoading={isLoading}
                onPress={handleConnect}
            />
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default ConnectWallet

const styles = StyleSheet.create({
    walletIdInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
    },
    seedPhraseInput: {
        fontSize: 16,
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
        paddingTop: 10
    },
    inputError: {
        borderColor: '#ff4d4f'
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 13,
    },
    connectButton: {
        backgroundColor: '#007bffff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})