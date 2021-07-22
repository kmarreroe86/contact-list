import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import RootReducer from "./reducers";

export const Store = createStore(    
    RootReducer,
    {},
    applyMiddleware(thunk)
)

export type RootStore = ReturnType<typeof RootReducer>

export default Store