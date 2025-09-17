import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const navigation = useRouter();

  useEffect(() => {
    navigation.replace("/welcome");
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="connectWallet" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(main)" />
      <Stack.Screen
        name="searchAssets"
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 300,
          headerShown: false,
          ...(Platform.OS === 'android' && {
            statusBarStyle: 'light',
            statusBarTranslucent: true,
            statusBarBackgroundColor: 'transparent',
          }),
        }}
      />
      <Stack.Screen
        name="swapAssets"
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 300,
          headerShown: false,
          ...(Platform.OS === 'android' && {
            statusBarStyle: 'light',
            statusBarTranslucent: true,
            statusBarBackgroundColor: 'transparent',
          }),
        }}
      />
    </Stack>
  );
};


export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainLayout />
    </GestureHandlerRootView>
  );
}
