import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Picker,
  Button,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const ModalComponent = props => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const Item = Picker.Item;
  const title = props.title.toUpperCase();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.hideVisible(true)}
        activeOpacity={1}
      >
        <View style={styles.modalBox}>
          <Text style={styles.title}>{title}</Text>
          {title === "FILTER" ? (
            <View style={styles.containerFilter}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.containerPicker}>
                <Picker
                  selectedValue={status}
                  style={{ height: 35 }}
                  onValueChange={val => {
                    setStatus(val);
                  }}
                >
                  <Item label="Done" value="Done" />
                  <Item label="Waiting" value="Waiting" />
                </Picker>
              </View>
            </View>
          ) : null}
          {title !== "SEARCH" ? (
            <React.Fragment>
              <View style={styles.containerFilter}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.containerPicker}>
                  <Picker
                    selectedValue={category}
                    style={{ height: 35 }}
                    onValueChange={val => {
                      setCategory(val);
                    }}
                  >
                    <Item label="Important" value="Important" />
                    <Item label="Event" value="Event" />
                  </Picker>
                  {category ? (
                    <View
                      style={{
                        height: 5,
                        width: "100%",
                        marginTop: 10,
                        backgroundColor:
                          category === "Important"
                            ? Colors.important
                            : Colors.event
                      }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={styles.containerButton}>
                <View style={{ width: 100, overflow: "hidden" }}>
                  <Button
                    title="Cancel"
                    color={Colors.primary}
                    onPress={() => props.hideVisible(true)}
                  />
                </View>
                <View style={{ width: 100, overflow: "hidden" }}>
                  <Button
                    title={title === "FILTER" ? "FILTER" : "ADD TODO"}
                    color={Colors.secondary}
                  />
                </View>
              </View>
            </React.Fragment>
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)"
  },
  modalBox: {
    paddingVertical: 20,
    width: width / 1.2,
    backgroundColor: Colors.background,
    borderRadius: 10
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary
  },
  containerFilter: {
    marginVertical: width / 30
  },
  label: {
    marginLeft: 10,
    marginBottom: 5
  },
  containerPicker: {
    borderColor: Colors.border,
    borderWidth: 1,
    marginHorizontal: 10
  },
  containerButton: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default ModalComponent;
