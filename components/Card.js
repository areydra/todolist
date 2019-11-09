import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

const Card = props => {
  let color = "";
  if (props.category === "important") {
    color = Colors.important;
  } else if (props.category === "event") {
    color = Colors.event;
  } else if (props.category === "done") {
    color = Colors.secondary;
  } else {
    color = Colors.border;
  }

  return (
    <View style={{ ...styles.container, borderLeftColor: color }}>
      <View style={styles.cardHeader}>
        <Text style={styles.textContent}>{props.content}</Text>
      </View>
      <View style={ styles.cardFooter }>
        <Image
          source={require("../assets/icons/close.png")}
          style={styles.iconActionClose}
        />
        <View style={styles.containerDate}>
          <Image
            source={
              props.category !== "done"
                ? require("../assets/icons/hourglass.png")
                : null
            }
            style={styles.iconDate}
          />
          <Text style={styles.textDate}>{props.date}</Text>
        </View>
        {props.category !== "done" ? (
          <Image
            source={require("../assets/icons/done.png")}
            style={styles.iconActionDone}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: width / 25,
    marginVertical: 15,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderTopColor: Colors.border,
    borderBottomColor: Colors.border,
    borderRightColor: Colors.border
  },
  cardHeader: {
    marginBottom: 10
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  textContent: {
    textAlign: "center",
    fontSize: 15
  },
  textDate: {
    fontSize: 10
  },
  containerDate: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconDate: {
    height: 10,
    width: 10,
    marginRight: 5
  },
  iconActionDone: {
    height: 15,
    width: 15
  },
  iconActionClose: {
    height: 13,
    width: 13
  }
});

export default Card;
