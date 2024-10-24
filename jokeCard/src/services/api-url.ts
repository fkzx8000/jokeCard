import axios from "axios";

export default axios.create({
  baseURL: "https://official-joke-api.appspot.com/random_joke",
});
