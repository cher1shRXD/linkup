import { View, StyleSheet, Animated, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/theme/themeContext";

const Skeleton = ({ width, height, style }:{ width:number, height:number, style:ViewStyle | ViewStyle[] }) => {
  const animatedValue = new Animated.Value(0);
  const { theme } = useTheme();

  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    })
  ).start();

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.skeletonContainer,{backgroundColor:theme.borderColor}, { width, height }, style]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={[theme.borderColor, theme.boxBorderColor, theme.borderColor]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    overflow: "hidden",
  },
});

export default Skeleton;
