import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";

const ImageSlider = ({
  img,
  onChangePage = () => {},
  imageRef = useRef(),
  state = useState(0)
}) => {
  const [imageIndex, setImageIndex] = state;
  const isFirstImage = imageIndex === 0;
  const isLastImage = img.length - 1 === imageIndex;

  function handleNextImage() {
    setImageIndex(imageIndex + 1);
    onChangePage(imageIndex + 1);
    imageRef.current.scrollTo({
      x: (imageIndex + 1) * IMAGE_WIDTH,
      y: 0,
      animated: true
    });
  }

  function handlePrevImage() {
    setImageIndex(imageIndex - 1);
    onChangePage(imageIndex - 1);
    imageRef.current.scrollTo({
      x: (imageIndex - 1) * IMAGE_WIDTH,
      y: 0,
      animated: true
    });
  }

  return (
    <Container>
      <PrevIconWrapper onPress={handlePrevImage}>
        {!isFirstImage && (
          <Icon name="navigate-before" type="material" size={50} />
        )}
      </PrevIconWrapper>
      <Border>
        <ImagesContainer
          pagingEnabled={true}
          horizontal={true}
          scrollEventThrottle={16}
          contentOffset={{ x: 0, y: 0 }}
          ref={imageRef}
          scrollEnabled={false}
        >
          {img.map((src) => (
            <UploadedImage key={src} source={{ uri: src }} />
          ))}
        </ImagesContainer>
      </Border>
      <NextIconWrapper onPress={handleNextImage}>
        {!isLastImage && (
          <Icon name="navigate-next" type="material" size={50} />
        )}
      </NextIconWrapper>
    </Container>
  );
};

export default ImageSlider;

const width = Dimensions.get("screen").width;
const IMAGE_WIDTH = width - 80;

const Border = styled.View`
  background-color: white;
  padding: 4px;
  border-width: 1px;
  border-color: black;
  margin: 20px;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImagesContainer = styled.ScrollView`
  height: ${IMAGE_WIDTH}px;
  width: ${IMAGE_WIDTH}px;
  align-self: center;
`;

const UploadedImage = styled.Image`
  height: ${IMAGE_WIDTH}px;
  width: ${IMAGE_WIDTH}px;
`;

const PrevIconWrapper = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  background-color: white;
  border-radius: 100px;
  z-index: 40;
`;

const NextIconWrapper = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  right: 0px;
  background-color: white;
  border-radius: 100px;
  z-index: 40;
`;
