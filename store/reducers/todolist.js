import { ADD_TODO, FETCH_TODO, DELETE_TODO, UPDATE_TODO, FILTER_TODO, CLEAR_FILTER, SEARCH_TODO, CLEAR_SEARCH, searchTodo } from "../actions/todolist";
import _ from 'lodash'
import moment from "moment";

const initialState = {
    todolist: [],
    resetFilter: [],
    filterCondition: [],
    searchList: [],
    filterList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
              ...state,
              todolist: [action.todolist, ...state.todolist],
              resetFilter: [action.todolist, ...state.resetFilter]
            };
        case DELETE_TODO:
            return {
              ...state,
              todolist: action.todolist,
              resetFilter: action.todolist
            };
        case FETCH_TODO:
            let todo = action.todolist.reverse()
            return {
              ...state,
              todolist: todo,
              resetFilter: todo
            };
        case UPDATE_TODO:
            state.todolist[action.index].status = "done";
            return {
              ...state,
              todolist: state.todolist,
              resetFilter: state.todolist
            };
        case FILTER_TODO: 
            let filtered = []
            let filteredList = []
            if(action.data.status){
                if(action.data.status !== "false" && action.data.category !== "false"){
                    if(state.searchList.length){
                        filtered = state.todolist.filter(todo => todo.status === action.data.status.toLowerCase() && todo.category === action.data.category)
                    }
                    filteredList = state.resetFilter.filter(todo => todo.status === action.data.status.toLowerCase() && todo.category === action.data.category)
                }else if(action.data.status !== "false" || action.data.category !== "false"){
                    if(state.searchList.length){
                        filtered = state.todolist.filter(todo => todo.status === action.data.status.toLowerCase() || todo.category === action.data.category)
                    }
                    filteredList = state.resetFilter.filter(todo => todo.status === action.data.status.toLowerCase() || todo.category === action.data.category)
                }else{
                    filtered = (state.searchList.length) ? searchList : state.resetFilter
                }
            }
            return {
                ...state,
                filterCondition: action.data,
                todolist: (state.searchList.length) ? filtered : filteredList,
                filterList: filteredList
            }
        
        case CLEAR_FILTER:
            return {
                ...state,
                filterCondition: [],
                todolist: (action.search.length) ? state.searchList : state.resetFilter
            }

        case SEARCH_TODO:
            const filterTitle = data => {
                return _.filter(data, obj => _.startsWith(obj.title.toLowerCase(), action.search.toLowerCase()));
            }
            const filterDate = data => {
                return _.filter(data, obj => _.startsWith(moment(obj.date).format("LL").toLowerCase(), action.search.toLowerCase()))
            }

            let searchList = []
            if(state.filterCondition.status){
             let searchedTodoTitleList = filterTitle(state.resetFilter)
             let searchedTodoDateList = filterDate(state.resetFilter)
             searchList = _.uniqBy([...searchedTodoDateList, ...searchedTodoTitleList], 'id')
            }
            
            let searchedTodoTitle = filterTitle(state.todolist)
            let searchedTodoDate = filterDate(state.todolist);
            const searchTodolist = _.uniqBy([...searchedTodoDate, ...searchedTodoTitle], 'id')


            return {
              ...state,
              todolist: action.search === "" ? (state.filterCondition.status ? state.filterList : state.resetFilter) : searchTodolist,
              searchList: state.filterCondition.status ? searchList : searchTodolist
            };

        case CLEAR_SEARCH:
            let filteredListSearch = []
            if(state.filterCondition.status){
                if(state.filterCondition.status !== "false" && state.filterCondition.category !== "false"){
                    filteredListSearch = state.searchList.filter(todo => todo.status === state.filterCondition.status.toLowerCase() && todo.category === state.filterCondition.category)
                }else if(state.filterCondition.status !== "false" || state.filterCondition.category !== "false"){
                    filteredListSearch = state.searchList.filter(todo => todo.status === state.filterCondition.status.toLowerCase() || todo.category === state.filterCondition.category)
                }
            }

            return {
                ...state,
                todolist: state.filterCondition.status ? (action.search.length ? filteredListSearch : state.filterList) : state.resetFilter
            }

        default:
            return state;
    }
}