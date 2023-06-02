
const server = require('./src/app.js');
const PORT = 3001;
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(()=> {
    server.listen(PORT, ()=> console.log('Server raised in port: ' + PORT))
})
