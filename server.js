var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  next();
});
app.use(bodyParser.json())

const db = require('./api/config/db.config.js');

db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
});
global.__basedir = __dirname;

require('./api/routes/eventRoutes.js')(app);
require('./api/routes/causeRoutes.js')(app);
require('./api/routes/uploadRoutes.js')(app);
require('./api/routes/userRoutes.js')(app);
require('./api/routes/voteRoutes.js')(app);
require('./api/routes/postRoutes.js')(app);
require('./api/routes/prefRoutes.js')(app);
require('./api/routes/commentRoutes.js')(app);
require('./api/routes/collabRoutes.js')(app);
// Create a Server
http = require('http')
server = http.createServer(app)
var server = app.listen(3004, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
io = require('socket.io').listen(server)
io.on('connection', (socket) => {

  console.log('user connected')
  
  socket.on('join', function(userNickname) {
  
          console.log(userNickname +" : has joined the chat "  );
  
          socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
      })
  socket.on('messagedetection', (senderNickname,messageContent) => {
  
         console.log(senderNickname+" : " +messageContent)
        let  message = {"message":messageContent, "senderNickname":senderNickname}
        io.emit('message', message )
  
        })
  
  socket.on('disconnect', function() {
  
          
          socket.broadcast.emit( "userdisconnect" ,' user has left')

      })
  })
  


