//let handlers
let handlers = {};

handlers.sample = (data, next) => {
  //next http status code, payload
  next(406, { test: "test" });
};

handlers.notFound = (data, next) => {
  next(404);
};

let router = {
  foo: handlers.sample,
  notFound: handlers.notFound
};

module.exports = router;
