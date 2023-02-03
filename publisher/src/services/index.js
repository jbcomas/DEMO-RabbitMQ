
const axios = require("axios");

const callServices = async (url) => {
  try {
    const response = await axios.get(url).then((result) => result.data);

    return response;
  } catch (error) {
    console.error("ERR in callServices:", error.message);
  }
};
module.exports = {
  callServices,
};
