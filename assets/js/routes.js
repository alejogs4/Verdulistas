let routes = require("./routes").default;
var config = {
  roles: {
    admin: "super-admin",
    client: "user-client",
  },
  router: routes,
  api: {
    url: process.env.API_HOST || "http://localhost:3100/api/v1/"
  },
  cookie: {
    userid: "userid",
    username: "username",
    roles: "rol",
  },
  store: {
  },
  routerFile: {
  },
  expressions: {
    email: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
    cellphone:/^[0-9]{3}[0-9]{7}$/
  },
};

export default config;
