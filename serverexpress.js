const express = require('express');
const cors = require('cors');
const { link } = require('fs');
const app = express();
const path =require('path');


//Settings
app.set('appName', 'SAEriego');
app.set('port',8080);

//headers
app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    });

//middlewares json
app.use(express.json());

//cors
app.use(cors());

//interpreta los valores
app.use(express.urlencoded({extended: false}));


app.use(require('./assets/routes/mailSend'));
app.use(express.static(path.join(__dirname + '/' )));

//Routes
app.get('/', (req,res )=>{
    console.log("Estoy en el inicio");
    res.sendFile('index.html');
    });





const server = app.listen (app.get('port'), () =>{
    console.log('Sever escuchando en el Puerto', app.get('port'));
});

server.on('error',(error)=>{console.log('Error en el Servidor' + error)});
