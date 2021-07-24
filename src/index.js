var express = require('express');
const Player = require('./player');

class Engine {
    constructor() {
    }
  init() {
    this.initHttpServer()
    this.setupLog()
    if (process.env.NODE_ENV === "development") {
      this.startWeb()
    }
    this.SetupSocketIO()
    this.setupPlayer()
    this.OpenPort()
  }

  initHttpServer() {
    this.app = express()
  }

  setupLog() {
    if (process.env.NODE_ENV === "production") {
        //this.app.use(express.errorHandler())
    };
    if (process.env.NODE_ENV === "development") {
        //this.app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
    };
  }

  startWeb() {
    this.app.set('views', './pages')
    this.app.set('view engine', 'pug')

    this.app.get('/', function(req, res) {
      res.render('test');
    });
  };

  SetupSocketIO() {
    this.server = require('http').Server(this.app);
    this.io = require('socket.io')(this.server, {
      cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
    });
  }

  setupPlayer() {
    this.io.on('connection', function (socket) {
      console.log('Connected', socket.id);
      socket.emit("data", socket.id);
      new Player(socket).init()
    });
  }

  OpenPort() {
    this.server.listen(3000);
  }
}

module.exports = Engine;