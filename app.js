
//1 - Invocacion a express
const express = require('express');
const app = express();

//2 - setear urlencoded para capturar datos
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 - invocacion a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// establece el motor de plantilla ejs
app.set('view engine', 'ejs');

//  invocar bcryptjs
const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

const connection = require('./database/db');

//registro de vistas
app.get('/', (req, res) => {

    res.render('index')
});

app.get('/login', (req, res) => {

    res.render('login')
});

app.get('/register', (req, res) => {

    res.render('register')
});

//registro

app.post('/register', async (req, res)=>{

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cargo = req.body.cargo;
    const nombreuser = req.body.nombreuser;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO usuarios SET ?', {nombre:nombre, apellido:apellido, cargo:cargo, usuario:nombreuser, contrasena:passwordHaash}, async(error, results)=>{

        if(error){
            console.log(error);
        }else{
            res.render('register',{

                alert: true,
                alertTitle: "Registration",
                alertMessage: "Usuario registrado con éxito",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta:''
            })
        }
    })

})

//autenticacion

app.post('/auth', async (req, res)=>{ 

    const usuario = req.body.usuario;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password,8);
    if(usuario && password){

        connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async(error, results)=>{

            if(results.lenght == 0 || !(await bcryptjs.compare(password, results[0].contrasena))){

                res.send('USUARIO INCORRECTO PA, QUE TE PASA');

            }else{
                res.send('Bienvenido ' + usuario);
            }
        })
    }


})

app.use('/', require('./router'));

app.listen(3000, (req, res) => {

    console.log('SERVER RUNNIN IN http://localhost:3000/login');

})