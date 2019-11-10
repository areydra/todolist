import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

const Card = props => {
  let color = "";
  if (props.category === "important") {
    color = Colors.important;
  } else if (props.category === "event") {
    color = Colors.event;
  } else {
    color = Colors.border;
  }

  return (
    <View style={{ ...styles.container, borderLeftColor: color }}>
      <View style={styles.cardHeader}>
        <Text style={styles.textTitle}>{props.title}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => props.onDeleteTodo(props.id, props.status)}>
          <Image
            source={require("../assets/icons/close.png")}
            style={styles.iconActionClose}
          />
        </TouchableOpacity>
        <View style={styles.containerDate}>
          <Image
            source={
              props.status !== "done"
                ? require("../assets/icons/hourglass.png")
                : null
            }
            style={styles.iconDate}
          />
          <Text style={styles.textDate}>{props.date}</Text>
        </View>
        {props.status !== "done" ? (
          <TouchableOpacity onPress={() => props.onUpdateTodo(props.id)}>
            <Image
              source={require("../assets/icons/done.png")}
              style={styles.iconActionDone}
            />
          </TouchableOpacity>
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
  textTitle: {
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
