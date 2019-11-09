import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const CircleBottom = props => {
  let icon =
    props.icon === "filter"
      ? require("../assets/icons/filter.png")
      : require(`../assets/icons/add.png`);

  return (
    <TouchableOpacity
      onPress={props.onPress ? () => props.onPress(true, props.title) : null}
      style={props.position === "left" ? styles.circleLeft : styles.circleRight}
    >
      <Image
        source={icon}
        style={props.position === "left" ? styles.iconLeft : styles.iconRight}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleRight: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: Colors.secondary,
    right: -35,
    bottom: -40
  },
  circleLeft: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: Colors.primary,
    left: -35,
    bottom: -40
  },
  iconLeft: {
    height: 30,
    width: 30,
    top: 20,
    left: 43
  },
  iconRight: {
    height: 30,
    width: 30,
    top: 20,
    left: 25
  }
});

export default CircleBottom;
