const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
//require is node.js import syntax
const normalizePort = val => {
  var port = parseInt(val, 10);
//error handling to ensure port given is valid number
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
//if error will log and exit
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//method to output listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};
//access environment variable or port 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
//http.createServer() turns computer into http server with app as a parameter for requestListner
const server = http.createServer(app);
server.on("error", onError);//if something went wrong
server.on("listening", onListening);//if everything went right
server.listen(port);//starts the server
