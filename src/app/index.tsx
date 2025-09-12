import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GnoBalanceWebView from "../components/GnoBalanceWebView";

export default function HomeScreen() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchAddress, setFetchAddress] = useState<string>("");

  const touchAnim = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(touchAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(touchAnim, { toValue: 1, useNativeDriver: true }).start();

  const isValidGnoAddress = (addr: string) => addr.startsWith("g1") && addr.length > 10;

  const onFetch = async () => {
    const addr = address.trim();
    if (!isValidGnoAddress(addr)) {
      Alert.alert("Invalid G1 address", "Please enter a valid g1... address.");
      return;
    }
    setError(null);
    setBalance(null);
    setLoading(true);
    setFetchAddress(addr);
  };

  const handleResult = (res: any) => {
    // Called by WebView when it posts the result
    console.log(res,'res');
    
    if (res?.type === "balance") {
      if (res?.ok) {
        setBalance(String(res.gnot) + " GNOT");
      } else {
        setError(res?.error || "Failed to fetch balance");
        setBalance("0 GNOT");
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>GNO Balance (WebView)</Text>

        <Text style={styles.label}>G1 Address</Text>
        <TextInput
          style={styles.input}
          placeholder="g1..."
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
        />

        <Animated.View style={{ transform: [{ scale: touchAnim }] }}>
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onFetch}
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Fetch Balance</Text>}
          </Pressable>
        </Animated.View>

        {address ? (
          <>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{address}</Text>
          </>
        ) : null}

        <Text style={styles.label}>Balance</Text>
        <Text style={styles.value}>{balance ?? (loading ? "Loading..." : "--")}</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Keep the WebView mounted but hidden; it does the network work */}
        <View style={{ marginTop: 16 }}>
          <GnoBalanceWebView fetchAddress={fetchAddress} onResult={handleResult} hidden />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "flex-start", flexGrow: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "600", marginTop: 16 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginTop: 6 },
  button: { backgroundColor: "#1a73e8", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonPressed: { opacity: 0.9 },
  buttonText: { color: "#fff", fontWeight: "600" },
  value: { fontSize: 16, marginTop: 4 },
  error: { color: "crimson", marginTop: 12 },
});