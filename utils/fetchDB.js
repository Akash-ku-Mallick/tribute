import axios from "axios"

const BASE_URL = 'https://api.jsonbin.io/v3'
const Access_Key = '$2a$10$LhzaY.bKCtgyPrBYvtSIYewRrAkmyYWuikc1dOcZNqB/2Og7rajIC'
const root = "65eb38d8266cfc3fde9545ba"

const getFile = async (id) => {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${id}/latest`, {
      headers: {
        'X-Access-Key': Access_Key
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}

const FindID = async (name) => {
  // check for file from cache

  const regex = new RegExp(name, "i"); // "i" flag for case-insensitive comparison

  var result = null;
  var res = false;
  res = list.every((item) => {
    if (regex.test(item.name)) {
      result = item.id;
      return true;
    }
    else{
      return true;
    }
  })

  if(res){
    return getFile(result);
  }
  else{
  return Promise.reject("Couldn't find file " + name);
  }
}

const getList = async () => {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${root}/latest`, {
      headers: {
        'X-Access-Key': Access_Key
      }
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export { getFile, getList, FindID }

const list = [
  {
    "name": "Gopabandhu Das",
    "id": "65e88c7bdc74654018aeca0c"
  },
  {
    "name": "Madhusudan Das",
    "id": "65e85de2dc74654018aeb777"
  }
]
