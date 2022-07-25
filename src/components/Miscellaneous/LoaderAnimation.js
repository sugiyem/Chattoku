import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Platform, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { FUN_FACTS } from "../../assets/funfacts";

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

function getRandomIndex() {
  return Math.floor(Math.random() * FUN_FACTS.length);
}

const LoaderAnimation = () => {
  const [index, setIndex] = useState(getRandomIndex());
  const fact = FUN_FACTS[index];

  return (
    <Container onPress={() => setIndex(getRandomIndex())}>
      <FlickeringText />
      <CirclesContainer>
        <Circle delay={0} />
        <Circle delay={400} />
        <Circle delay={800} />
      </CirclesContainer>
      <FunFactTitle>{fact.animeName}</FunFactTitle>
      <FunFact>{fact.fact}</FunFact>
    </Container>
  );
};

export default LoaderAnimation;

const width = Dimensions.get("screen").width;

const Container = styled.TouchableOpacity`
  width: ${width}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FunFactTitle = styled.Text`
  font-size: 20px;
  color: #eee;
  text-align: center;
  padding: 0px 10px;
`;

const FunFact = styled.Text`
  font-size: 16px;
  color: #eee;
  text-align: center;
  padding: 0px 10px;
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
