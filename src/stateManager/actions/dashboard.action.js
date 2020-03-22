export const increment = data => ({
  type: "INCREMENT",
  data
});

export const api = data => {
  return {
    type: "API_DATA",
    data
  };
};

export const getAllData = data => {
  return {
    type: "ALL_DATA",
    data
  };
};
export const updateData = data => {
  return {
    type: "UPDATE_DATA",
    data
  };
};

export const deleteData = data => {
  return {
    type: "DELETE_DATA",
    data
  };
};

export const addData = data => {
  return {
    type: "ADD_DATA",
    data
  };
};
