let routers = require("./routes").default;

let config = {
  // Metodos genericos
  api: {
    url: "http://173.255.216.213:8000/graphql",
  },
  store: {
    user: "user"
  },
  cookie: {
    userid: "9e414551-9700-4db5-81e9-3df4998bb-0000",
    username: "9e414551-9700-4db5-81e9-3df4998bb-0001",
    token: "9e414551-9700-4db5-81e9-3df4998bb-0002",
    rol: "9e414551-9700-4db5-81e9-3df4998bb-0003",
    user: "9e414551-9700-4db5-81e9-3df4998bb-0004",
  },
  expressions: {
    email: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
  },
  router: routers,
};

export default config;
