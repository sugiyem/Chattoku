import styled from "styled-components/native";

const Selector = ({ onPress, isChosen }) => {
  if (isChosen) {
    return (
      <ChosenContainer onPress={onPress}>
        <ChosenBullet />
      </ChosenContainer>
    );
  } else {
    return (
      <NonChosenContainer onPress={onPress}>
        <NonChosenBullet />
      </NonChosenContainer>
    );
  }
};

export default Selector;

const ChosenContainer = styled.TouchableOpacity`
  background-color: white;
  padding: 5px;
  border-color: blue;
  border-width: 2px;
  border-radius: 30px;
`;

const ChosenBullet = styled.View`
  background-color: blue;
  border-radius: 15px;
  width: 15px;
  height: 15px;
`;

const NonChosenContainer = styled.TouchableOpacity`
  background-color: lightgray;
  padding: 5px;
  border-color: gray;
  border-width: 2px;
  border-radius: 30px;
`;

const NonChosenBullet = styled.View`
  background-color: gray;
  border-radius: 15px;
  width: 15px;
  height: 15px;
`;
