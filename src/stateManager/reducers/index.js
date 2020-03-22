import { combineReducers } from "redux";

import dashboard from "./dashboard.reducer";
import user from './user.reducer';

//comine all subreducers
const RootReducer = combineReducers({
  //user reducer contain all the

  dashboard,
  user
});

export default RootReducer;
