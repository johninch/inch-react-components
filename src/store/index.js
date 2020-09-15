// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "../InchRedux";
// import logger from "redux-logger";
import logger from "../InchRedux/logger";
// import thunk from "redux-thunk";
import thunk from "../InchRedux/thunk";
// import promise from "redux-promise";
import promise from "../InchRedux/promise";

function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            console.log(state, action.payload)
            return state - action.payload || 1;
        default:
            return state;
    }
}

const store = createStore(countReducer, applyMiddleware(thunk, promise, logger)); // 注意将logger放到最后

export default store;
