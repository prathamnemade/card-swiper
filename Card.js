import { Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

const { width, height } = Dimensions.get("window");
const SNAP_POINTS = [-width / 2, 0, width / 2];
const CARD_WIDTH = width - 80;
const CARD_HEIGHT = height * 0.6;
const Card = ({ data }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = clamp(ctx.x + translationX, -width / 2, width / 2);
      translateY.value = clamp(ctx.y + translationY, -height / 2, height / 2);
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateY.value = withSpring(dest);
      if (dest == 0) {  
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(dest > 0 ? width : -width,{velocity:velocityX});
      }
    },
  });

  const movementStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View
        style={[
          styles.cardWrapper,
          { backgroundColor: data.color },
          movementStyle,
        ]}
      >
        <Text>{data.name}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    position: "absolute",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
