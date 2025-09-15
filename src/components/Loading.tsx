import { useThemeColor } from '@/src/hooks/use-theme-color';
import { ActivityIndicator } from "react-native";

interface Iprops {
  size?: number | "large" | "small" | undefined;
  lightColor?: string;
  darkColor?: string;
}

const Loading = (props: Iprops) => {
  const color = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');
  return (
    <ActivityIndicator
      color={color}
      size={props?.size ? props?.size : "large"}
    />
  );
};

export default Loading;
