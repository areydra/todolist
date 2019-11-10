import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";

import todolistReducer from "./store/reducers/todolist";
import './helper/FixTimeout'

const reducers = combineReducers({
  todolist : todolistReducer
});
const store = createStore(reducers, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store} >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;