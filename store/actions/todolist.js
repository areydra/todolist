import firebase from "firebase";

import Todolist from '../../models/todolist'
import FirebaseConfig from "../../key";

firebase.initializeApp(FirebaseConfig);

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const FETCH_TODO = 'FETCH_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const FILTER_TODO = 'FILTER_TODO'
export const CLEAR_FILTER = "CLEAR_FILTER"
export const SEARCH_TODO = "SEARCH_TODO"
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const DONE_DATE = "DONE_DATE";

export const addTodo = data => {
    return async dispatch => {
        try{
            await firebase.database().ref('todolist').push(data).then(res => {
                const id = res.key
                dispatch({
                    type: ADD_TODO,
                    todolist: new Todolist(
                    id,
                    data.title,
                    data.category,
                    data.date,
                    data.status,
                    data.statusDate
                    )
                });
            }).catch(err => {
                console.log(err)
                throw new Error(err)
            })
        }catch(err){
                console.log(err);
            throw Error(err)
        }
    }
}

export const fetchTodolist = () => {
    return async dispatch => {
        try{
            const todolist = []
            await firebase.database().ref('todolist').once('value', snapshot => {
                for(key in snapshot.val()){
                    todolist.push(
                      new Todolist(
                        key,
                        snapshot.val()[key].title,
                        snapshot.val()[key].category,
                        snapshot.val()[key].date,
                        snapshot.val()[key].status,
                        snapshot.val()[key].statusDate
                      )
                    );
                }
            })
            dispatch({type: FETCH_TODO, todolist: todolist})
        }catch(err){
            throw Error(err)
        }
    }
}

export const deleteTodo = (id, newTodolist) => {
    return async dispatch => {
        try{
            await firebase.database().ref(`todolist/${id}`).remove().then(() => {
                dispatch({type: DELETE_TODO, todolist: newTodolist})
            }).catch(err => {
                throw new Error(err)
            })
        }catch(err){
            throw Error(err)
        }
    }
}

export const updateTodo = (id, index) => {
    return async dispatch => {
        try{
            await firebase.database().ref(`todolist/${id}`).update({status : 'done'}).then(() => {
                dispatch({ type: UPDATE_TODO, index: index });
            }).catch(err => {
                throw new Error(err)
            })
        }catch(err){
            throw Error(err)
        }
    }
}

export const filterTodo = data => {
    return async dispatch => {
        try{
            dispatch({ type: FILTER_TODO, data: data });
        }catch(err){
            throw Error(err)
        }
    }
}

export const clearFilterTodo = search => {
    return async dispatch => {
        try{
            dispatch({type: CLEAR_FILTER, search: search})
        }catch(err){
            throw Error(err)
        }
    }
}

export const searchTodo = search => {
    return async dispatch => {
        try {
          dispatch({ type: SEARCH_TODO, search: search });
        } catch (err) {
          throw Error(err);
        }
    }
}

export const clearSearchTodo = search => {
    return async dispatch => {
        try{
            dispatch({type: CLEAR_SEARCH, search: search})
        }catch(err){
            throw Error(err)
        }
    }
}

export const doneDate = id => {
    return async dispatch => {
        try {
            await firebase.database().ref(`todolist/${id}`).update({statusDate : 'done'}).then(() => {
              dispatch({ type: DONE_DATE, id: id });
            }).catch(err => {
                throw new Error(err)
            })
        } catch (err) {
          throw Error(err);
        }
    }
}