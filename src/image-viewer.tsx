import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
const width = Dimensions.get('screen').width;

export const ThreeSixtyView = ({
  urls,
  rotationRatio = 0.9,
  imageStyle,
  loader,
  ImageComponent = Image,
}: {
  urls: string[];
  rotationRatio?: number;
  imageStyle?: ViewStyle;
  loader?: ReactNode;
  ImageComponent?: typeof Image;
}) => {
  const [rotation, setRotation] = useState(0);
  const [index, setIndex] = useState(0);
  const rotatePeriod = 360 / urls.length;
  let startX = useRef().current;
  let currentX = useRef().current;
  let startRotation = useRef().current;
  const startMoving = (gestureState: PanResponderGestureState) => {
    // @ts-ignore
    startX = gestureState.moveX;
    // @ts-ignore
    startRotation = rotation;
  };

  const moving = (gestureState: PanResponderGestureState) => {
    // @ts-ignore
    currentX = gestureState.moveX;
    updateRotation();
  };

  const endMoving = (gestureState: PanResponderGestureState) => {
    // @ts-ignore
    currentX = gestureState.moveX;
    updateRotation();
  };
  const updateRotation = () => {
    const deltaRotation =
      // @ts-ignore
      ((currentX - startX) * 180) / ((rotationRatio * width) / 2);
    // @ts-ignore
    const newRotation: number = startRotation + deltaRotation;
    const mRotation = newRotation - Math.floor(newRotation / 360) * 360;
    const newIndex = Math.floor(mRotation / rotatePeriod);
    setRotation(newRotation);
    setIndex(newIndex);
  };
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: (_e, g) => startMoving(g),
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_e, g) => moving(g),
      onPanResponderRelease: (_e, g) => endMoving(g),
    })
  ).current;
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // all loaded in dom
    if (count === urls.length) {
      setLoading(false);
    }
  }, [count, urls.length]);
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[{ width, height: 240 }, imageStyle]}
    >
      <>
        {loading && (
          <View
            style={[StyleSheet.absoluteFill, { zIndex: 500, elevation: 10 }]}
          >
            {loader}
          </View>
        )}
        {urls.map((uri, i) => (
          <View
            key={i}
            style={{
              width: '100%',
              height: '100%',
              zIndex: i === index ? 200 : -100,
              elevation: i === index ? 0 : -1,
              position: 'absolute',
            }}
          >
            <ImageComponent
              source={{ uri: uri }}
              onLoad={() => {
                setCount(count + 1);
              }}
              style={[
                {
                  width: '100%',
                  height: '100%',
                },
              ]}
            />
          </View>
        ))}
      </>
    </Animated.View>
  );
};
