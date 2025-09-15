import { ReactNode } from "react";
import { Platform, ViewStyle } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from "../hooks/use-theme-color";
import MyStatusBar from "./CustomeStatusBar";
import { ThemedView } from "./themed-view";


interface ScreenWrapperProps {
  children: ReactNode;
  bg?: string;
  conatinerStyle?: ViewStyle;
  statusBarColor?: string;
  lightColor?: string;
  darkColor?: string;
}

const ScreenWrapper = ({
  children,
  conatinerStyle,
  statusBarColor,
  lightColor,
  darkColor
}: ScreenWrapperProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return (
    <ThemedView style={{flex:1}}>
      {Platform.OS === 'ios' && <MyStatusBar
        backgroundColor={statusBarColor ? statusBarColor : backgroundColor}
        barStyle="light-content"
      />}
      <SafeAreaView
        style={[{
          flex: 1,
          marginHorizontal: 20,
        }, conatinerStyle]}
      >
        {children}
      </SafeAreaView>
    </ThemedView>
  );
};

export default ScreenWrapper;
