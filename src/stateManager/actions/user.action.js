export const userdata = data => {
    console.log('====================================');
    console.log("data",data);
    console.log('====================================');
  return {
    type: "USER_DATA",
    data
  };
};
