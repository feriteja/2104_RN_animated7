import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const NumBall = [...Array(4)];

const BallMain = ({index}: {index?: number}) => {
  const tranY = useSharedValue(0);
  const tranX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: tranY.value}, {translateX: tranX.value}],
    };
  });

  useEffect(() => {
    tranX.value = withDelay(
      0,
      withRepeat(
        withSequence(
          withTiming(45, {duration: 500, easing: Easing.linear}),
          withTiming(0, {duration: 500, easing: Easing.linear}),
          withTiming(-45, {duration: 500, easing: Easing.linear}),
          withTiming(0, {duration: 500, easing: Easing.linear}),
        ),
        4,
      ),
    );

    tranY.value = withDelay(
      0,
      withSequence(
        withTiming(320, {duration: 4000, easing: Easing.linear}),
        withTiming(0, {duration: 4000, easing: Easing.linear}),
      ),
    );
  }, []);

  return (
    <Animated.View
      style={[styles.ball, {borderColor: '#00ffff'}, animatedStyle]}
    />
  );
};

const Ball = ({index}: {index: number}) => {
  const tranY = useSharedValue(0);
  const time = 1000;
  console.log(index);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: tranY.value}],
    };
  });

  useEffect(() => {
    tranY.value = withDelay(
      0,
      withSequence(
        withDelay(
          time * index,
          withTiming(-80, {duration: 1000, easing: Easing.linear}),
        ),
        withDelay(
          time * (NumBall.length - index - 1) +
            time * (NumBall.length - index - 1),
          withTiming(0, {duration: 1000, easing: Easing.linear}),
        ),
      ),
    );
  }, []);

  return (
    <TouchableOpacity onPress={() => console.log(index)}>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.contentContainer}>
          <BallMain />
          {NumBall.map((a, i) => (
            <Ball key={i} index={i} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 200,
    elevation: 15,
  },
  contentContainer: {
    height: 420,
    width: 140,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  ball: {
    backgroundColor: '#777',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 1,
    height: 40,
    width: 40,
    borderRadius: 30,
    marginVertical: 20,
  },
});
