import React from "react";
import {
  StatusBar,
  StatusBarProps,
  View,
  ViewStyle,
} from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

interface MyStatusBarProps extends StatusBarProps {
  backgroundColor: string;
}

interface Styles {
  statusBar: ViewStyle;
}

const styles: Styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
};

const MyStatusBar: React.FC<MyStatusBarProps> = ({
  backgroundColor,
  ...props
}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default MyStatusBar;
