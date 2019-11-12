import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Picker,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Alert
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const ModalComponent = props => {
  const [status, setStatus] = useState("false");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("false");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateShow, setDateShow] = useState("Select your date limit");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  const Item = Picker.Item;
  const titleShow = props.title.toUpperCase();
  const filterCondition = useSelector(
    state => state.todolist.filterCondition,
    []
  );

  useEffect(() => {
    setVisible(props.visible);
    resetState();
  }, [props.visible, filterCondition]);

  const resetState = () => {
    if (titleShow === "ADD TODO") {
      setTitle("");
      setCategory("false");
      setDate("");
      setDateShow("Select your date limit");
    } else if (titleShow === "FILTER") {
      if (filterCondition.status) {
        setStatus(filterCondition.status.toString());
        setCategory(filterCondition.category.toString());
      } else {
        setCategory("false");
        setStatus("false");
      }
    } else if (titleShow === "SEARCH") {
      setSearch("");
    }
  };

  const createTodolist = async () => {
    setLoading(true);
    if(!title.length){
      Alert.alert('Error', 'title cannot be null', ['Ok'])
      setLoading(false)
      return
    }
    if(!date){
      Alert.alert('Error', 'date cannot be null', ['Ok']);
      setLoading(false);
      return
    }

    const data = {
      title: title,
      date: date,
      category: category,
      status: "process",
      statusDate: "waiting"
    };
    props.onCreate(data).then(() => {
      setLoading(false);
      props.hideVisible(true);
    });
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleDatePicked = date => {
    setDate(moment(date).valueOf());
    setDateShow(moment(date).format("LL"));
    hideDateTimePicker();
  };

  const handleSearch = () => {
    props.onSearch(search);
    props.hideVisible(true);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.container}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <View style={styles.modalBox}>
          {titleShow === "SEARCH" || titleShow === "INFORMATION" ? (
            <View
              style={{
                flex: 1
              }}
            >
              <TouchableOpacity
                onPress={() => props.hideVisible(true)}
                style={{
                  zIndex: 10,
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginTop: -10,
                  alignSelf: "flex-end"
                }}
              >
                <Image
                  source={require("../assets/icons/close-rounded.png")}
                  style={{
                    width: 20,
                    height: 20
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <Text style={styles.title}>{titleShow}</Text>
          <DateTimePicker
            isVisible={dateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
          />
          {/* Show only in search */}
          {titleShow === "SEARCH" ? (
            <React.Fragment>
              <View style={styles.containerFilter}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={showDateTimePicker}
                    style={styles.containerDatePicker}
                  >
                    <TextInput
                      style={{ paddingLeft: 10, paddingVertical: 0 }}
                      placeholder="Search heree"
                      onChangeText={text => setSearch(text)}
                      onSubmitEditing={handleSearch}
                      returnKeyType="search"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSearch}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.secondary,
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        marginLeft: -11,
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30
                      }}
                    >
                      <Image
                        source={require("../assets/icons/search.png")}
                        style={{ height: 17, width: 17 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          ) : null}
          {/* Show only in filter */}
          {titleShow === "FILTER" ? (
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
                  <Item label="Select your todolist status" value="false" />
                  <Item label="Done" value="Done" />
                  <Item label="Process" value="Process" />
                </Picker>
              </View>
            </View>
          ) : null}
          {/* Show only in add */}
          {titleShow === "ADD TODO" ? (
            <React.Fragment>
              <View style={styles.containerFilter}>
                <Text style={styles.label}>Title</Text>
                <View style={styles.containerPicker}>
                  <TextInput
                    placeholder="Type here.."
                    style={{ paddingLeft: 10, paddingVertical: 0 }}
                    autoCapitalize="sentences"
                    onChangeText={text => setTitle(text)}
                  />
                </View>
              </View>
              <View style={styles.containerFilter}>
                <Text style={styles.label}>Date</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={showDateTimePicker}
                    style={styles.containerDatePicker}
                  >
                    <Text style={{ paddingLeft: 10 }}>{dateShow}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <Image
                      source={require("../assets/icons/calendar.png")}
                      style={{ height: 28, width: 28, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          ) : null}
          {/* Show only except filter */}
          {titleShow !== "INFORMATION" && titleShow !== "SEARCH" ? (
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
                    <Item label="Select your category" value="false" />
                    <Item label="Important" value="Important" />
                    <Item label="Event" value="Event" />
                  </Picker>
                </View>
                {category.length && category !== "false" ? (
                  <View style={{ marginHorizontal: 10 }}>
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
                  </View>
                ) : null}
              </View>
              <View style={styles.containerButton}>
                <View style={{ width: 100, overflow: "hidden" }}>
                  <Button
                    title="Cancel"
                    color={Colors.primary}
                    onPress={() => props.hideVisible(true)}
                  />
                </View>
                {loading ? (
                  <View style={{ width: 50 }}>
                    <ActivityIndicator size="small" color={Colors.secondary} />
                  </View>
                ) : null}
                <View style={{ width: 100, overflow: "hidden" }}>
                  <Button
                    title={titleShow === "FILTER" ? "FILTER" : "ADD TODO"}
                    color={Colors.secondary}
                    onPress={() => {
                      if (titleShow === "FILTER") {
                        props.onFilter({ category: category, status: status });
                        props.hideVisible(true);
                      } else {
                        createTodolist();
                      }
                    }}
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
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBox: {
    paddingVertical: 20,
    width: width / 1.2,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary,
  },
  containerFilter: {
    marginVertical: width / 30,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
  },
  containerPicker: {
    borderColor: Colors.border,
    borderWidth: 1,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  containerDatePicker: {
    flex: 1,
    borderColor: Colors.border,
    borderWidth: 1,
    marginHorizontal: 10,
    height: 30,
    justifyContent: 'center'
  },
  containerButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ModalComponent;
