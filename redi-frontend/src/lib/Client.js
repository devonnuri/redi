import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/redi-4d877/us-central1/api"
      : "https://us-central1-redi-4d877.cloudfunctions.net/api",
  withCredentials: true
});

export default client;
