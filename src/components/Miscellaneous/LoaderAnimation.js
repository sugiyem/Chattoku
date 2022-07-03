import { useEffect, useRef } from "react";
import { Animated, Dimensions, Platform, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const Circle = ({ delay }) => {
  const oscilate = useRef(new Animated.Value(1)).current;

  const state1 = {
    toValue: 2,
    duration: 600,
    useNativeDriver: true
  };

  const state2 = {
    toValue: 1,
    duration: 600,
    useNativeDriver: true
  };

  useEffect(
    () =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(oscilate, state1),
            Animated.timing(oscilate, state2),
            Animated.delay(600)
          ]),
          []
        )
      ]).start(),
    []
  );

  return (
    <Animated.View
      style={[
        styles.circle,
        { transform: [{ scaleX: oscilate }, { scaleY: oscilate }] }
      ]}
    />
  );
};

const FlickeringText = () => {
  const flicker = useRef(new Animated.Value(1)).current;

  const state1 = {
    toValue: 0,
    duration: 600,
    useNativeDriver: true
  };

  const state2 = {
    toValue: 1,
    duration: 600,
    useNativeDriver: true
  };

  useEffect(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(flicker, state1),
          Animated.timing(flicker, state2),
          Animated.delay(600)
        ]),
        []
      ).start(),
    []
  );

  return (
    <Animated.Text style={[styles.title, { opacity: flicker }]}>
      Loading
    </Animated.Text>
  );
};

const LoaderAnimation = () => {
  return (
    <Container>
      <FlickeringText />
      <CirclesContainer>
        <Circle delay={0} />
        <Circle delay={400} />
        <Circle delay={800} />
      </CirclesContainer>
    </Container>
  );
};

export default LoaderAnimation;

const width = Dimensions.get("screen").width;

const Container = styled.View`
  width: ${width}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CirclesContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "darkblue",
    width: 25,
    height: 25,
    borderRadius: 100,
    margin: 30,
    padding: 5
  },
  title: {
    fontSize: 24,
    color: "darkblue",
    fontWeight: "300"
  }
});
