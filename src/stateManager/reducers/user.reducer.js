import type from "../types";

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
    console.log("====================================");
    console.log(action);
    console.log("====================================");
  switch (action.type) {
    //store all running instance
    case type.USER_DATA:
      console.log("action", action.data);

      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
};
