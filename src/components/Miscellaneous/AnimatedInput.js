import { BlurView } from "expo-blur";
import { useEffect, useRef } from "react";
import { Animated, View, TextInput, Text, StyleSheet } from "react-native";

const AnimatedInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false
}) => {
  const position = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const offset = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -35]
  });

  const size = position.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9]
  });

  const inverseOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const focusAnimation = Animated.timing(position, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true
  });

  const focusColor = Animated.timing(opacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true
  });

  const blurAnimation = Animated.timing(position, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true
  });

  const blurColor = Animated.timing(opacity, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true
  });

  if (value) {
    focusAnimation.start();
  }

  function handleFocus() {
    const animations = [focusAnimation, focusColor];

    Animated.parallel(animations).start();
  }

  function handleBlur() {
    const animations = [blurColor];
    if (!value) {
      animations.push(blurAnimation);
    }
    Animated.parallel(animations).start();
  }

  return (
    <View style={styles.padder}>
      <View style={styles.container}>
        {/* First Placeholder*/}
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color: "gray",
              opacity: inverseOpacity,
              transform: [
                { translateY: offset },
                { scaleX: size },
                { scaleY: size }
              ]
            }
          ]}
        >
          {placeholder}
        </Animated.Text>
        {/* Second Placeholder */}
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color: "navy",
              opacity: opacity,
              transform: [
                { translateY: offset },
                { scaleX: size },
                { scaleY: size }
              ]
            }
          ]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};

export default AnimatedInput;

const styles = StyleSheet.create({
  padder: {
    paddingTop: 20,
    margin: 5
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1
  },
  placeholder: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 16,
    left: 5,
    zIndex: 10,
    padding: 0
  },
  input: {
    fontSize: 16,
    padding: 7,
    paddingLeft: 5,
    borderRadius: 10,
    width: "100%",
    zIndex: 20
  }
});
