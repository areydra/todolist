import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const CircleTop = props => {
  let icon = props.icon === 'search' ? require('../assets/icons/search.png') : require(`../assets/icons/information.png`)

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
    top: -35
  },
  circleLeft: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: Colors.primary,
    left: -35,
    top: -35
  },
  iconLeft: {
    height: 30,
    width: 30,
    top: 48,
    left: 43
  },
  iconRight: {
    height: 30,
    width: 30,
    top: 48,
    left: 25
  }
});

export default CircleTop;
