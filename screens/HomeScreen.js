import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import Colors from "../constants/Colors";

import CircleTop from "../components/CircleTop";
import CircleBottom from "../components/CircleBottom";
import Card from "../components/Card";
import ModalComponent from "../components/ModalComponent";

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  const handleHideVisible = bool => {
    bool ? setVisible(!bool) : null;
  };

  const handleShowVisible = (bool, title) => {
    if (bool) {
      setTitle(title);
      setVisible(bool);
    }
  };

  return (
    <View style={styles.container}>
      <ModalComponent
        title={title}
        visible={visible}
        hideVisible={handleHideVisible}
      />
      <View style={styles.logo}>
        <Text style={styles.title}>Todolist</Text>
        <CircleTop
          position="left"
          icon="information"
          title="Information"
          onPress={handleShowVisible}
        />
        <CircleTop
          position="right"
          icon="search"
          title="Search"
          onPress={handleShowVisible}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          category="event"
          content="Create mockup todolist Create mockup todolist Create mockup todolist Create mockup todolist"
          date="Jumat, 08/11/2019"
        />
      </ScrollView>
      <CircleBottom
        position="left"
        icon="filter"
        title="Filter"
        onPress={handleShowVisible}
      />
      <CircleBottom
        position="right"
        icon="add"
        title="Add Todo"
        onPress={handleShowVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  logo: {
    height: 65,
    marginBottom: 10,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary
  }
});

export default HomeScreen;
