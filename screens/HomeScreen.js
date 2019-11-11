import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Notifications } from "expo";
import moment from "moment";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import CircleTop from "../components/CircleTop";
import CircleBottom from "../components/CircleBottom";
import Card from "../components/Card";
import ModalComponent from "../components/ModalComponent";
import * as Todolist from "../store/actions/todolist";

const { width } = Dimensions.get("window");

const taskName = "test-background-fetch";
TaskManager.defineTask(taskName, () => {
  try {
    const receivedNewData = Notifications.presentLocalNotificationAsync({
      title: "Your todo list, less than 12 hours",
      body: "Check on app"
    });
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const dispatch = useDispatch();
  const todolist = useSelector(state => state.todolist.todolist, []);
  const todolistDate = useSelector(state => state.todolist.todolistDate, []);
  const clearSearch = "";

  useEffect(() => {
    fetchTodolist();
    registerTaskAsync();
    alertIfRemoteNotificationsDisabledAsync();
  }, [fetchTodolist]);

  registerTaskAsync = () => {
    setInterval(async() => {
      if(todolistDate[0]){
        if(todolistDate[0].date < Date.now()){
          await BackgroundFetch.registerTaskAsync(taskName, {
            minimumInterval: 60,
            stopOnTerminate: false,
            startOnBoot: true
          }).then(() => BackgroundFetch.setMinimumIntervalAsync(60));
          await dispatch(Todolist.doneDate(todolistDate[0].id));
        }
      }
    }, 1000)
  };
  const alertIfRemoteNotificationsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      );
    }
  };

  const fetchTodolist = async () => {
    await dispatch(Todolist.fetchTodolist()).then(() => {
      setLoading(false);
    });
  };

  const handleHideVisible = bool => {
    bool ? setVisible(!bool) : null;
  };

  const handleShowVisible = (bool, title) => {
    if (bool) {
      setTitle(title);
      setVisible(bool);
    }
  };

  const handleCreateTodo = async data => {
    await dispatch(Todolist.addTodo(data));
    if (dataFilter.status) {
      handleFilter(dataFilter);
    }
  };

  const handleDeleteTodo = async id => {
    const newTodo = todolist.filter(todo => todo.id !== id);
    await dispatch(Todolist.deleteTodo(id, newTodo));
  };

  const handleUpdateTodo = async id => {
    let index = todolist.findIndex(todo => todo.id === id);
    await dispatch(Todolist.updateTodo(id, index));
    handleFilter(dataFilter);
  };

  const handleFilter = async data => {
    setDataFilter(data);
    await dispatch(Todolist.filterTodo(data));
  };

  const handleClearFilter = async () => {
    setDataFilter([]);
    await dispatch(Todolist.clearFilterTodo(search));
  };

  const handleSearch = async search => {
    setSearch(search);
    await dispatch(Todolist.searchTodo(search));
  };

  const handleClearSearch = async () => {
    setSearch("");
    await dispatch(Todolist.clearSearchTodo(clearSearch));
  };

  return (
    <View style={styles.container}>
      <ModalComponent
        title={title}
        visible={visible}
        hideVisible={handleHideVisible}
        onFilter={handleFilter}
        onCreate={handleCreateTodo}
        onSearch={handleSearch}
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
      {dataFilter.status &&
      (dataFilter.status !== "false" || dataFilter.category !== "false") ? (
        <View
          style={{
            marginHorizontal: width / 25,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text>
            Filtered :
            {dataFilter.status !== "false"
              ? ` status ${dataFilter.status.toLowerCase()} `
              : null}
            {dataFilter.category !== "false" && dataFilter.status !== "false"
              ? "and"
              : null}
            {dataFilter.category !== "false"
              ? ` category ${dataFilter.category.toLowerCase()}`
              : null}
          </Text>
          <TouchableOpacity onPress={handleClearFilter}>
            <Text style={{ color: Colors.primary }}>clear</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {search.length ? (
        <View
          style={{
            marginHorizontal: width / 25,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text>Search for : {search}</Text>
          <TouchableOpacity onPress={handleClearSearch}>
            <Text style={{ color: Colors.primary }}>clear</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      ) : todolist.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingBottom: width / 8 }}>
            {todolist.map(todo => (
              <React.Fragment key={todo.id}>
                <Card
                  id={todo.id}
                  title={todo.title}
                  date={moment(todo.date).format("LL")}
                  category={todo.category.toLowerCase()}
                  status={todo.status}
                  onDeleteTodo={handleDeleteTodo}
                  onUpdateTodo={handleUpdateTodo}
                />
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <Text>Todolist is empty</Text>
        </View>
      )}
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
