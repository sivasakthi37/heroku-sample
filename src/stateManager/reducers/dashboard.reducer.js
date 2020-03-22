import type from "../types";

const initialState = {
  Product1: [],
  Product2: [],
  Product3: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    //store all running instance
    case type.INCREMENT:
      console.log("action", action);
      return {
        ...state,
        count: action.data
      };
    case type.ALL_DATA:
      console.log("action", action);
      let productName = Object.keys(action.data)[0];
      console.log("productName", productName);
      return {
        ...state,
        [productName]: action.data[productName]
      };
    case type.UPDATE_DATA:
      console.log("action data in update", action.data);
      let productName1 = action.data.product.replace(/\s/g, "");
      console.log("reducer");
      const index = state[productName1].findIndex(
        post => post.id === action.data.id
      );
      console.log("index", index);

      return {
        ...state,
        [productName1]: state[productName1].map((content, i) =>
          i === index ? { ...content, ...action.data } : content
        )
      };
    case type.DELETE_DATA:
      console.log("delete", action.data);
      let productNameDelete = action.data.product.replace(/\s/g, "");
      const newstate = state[productNameDelete].filter(
        a => a.id !== action.data.id
      );

      return {
        ...state,
        [productNameDelete]: newstate
      };
    case type.ADD_DATA:
      console.log("adddata", action.data);
      let productNameAdd = action.data.product.replace(/\s/g, "");
      return {
        ...state,
        [productNameAdd]: [action.data, ...state[productNameAdd]]
      };

    default:
      return state;
  }
};
