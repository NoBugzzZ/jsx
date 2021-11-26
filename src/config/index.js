export const API_URL = {
  DATA_MODEL: process.env.REACT_APP_API_URL_DATA_MODEL || "http://192.168.28.164:8090/graphql",
  BUSINESS: process.env.REACT_APP_API_URL_BUSINESS || "http://localhost:3000/",
  GRAPHQL : process.env.REACT_APP_API_URL_GRAPHQL|| "http://192.168.28.164:8090/graphql",
  CREATE:process.env.REACT_APP_API_URL_CREATE|| "http://192.168.28.220:8090/api/v1",
}