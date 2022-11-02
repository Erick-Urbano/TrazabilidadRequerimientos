//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{

    const id = req.body.id;
    const encargado = req.body.encargado;
    const requerimiento = req.body.requerimiento;
    const prioridad = req.body.prioridad;
    const desarrollador = req.body.desarrollador;
    const estado = req.body.estado;
    const fechaentrega = req.body.fechaentrega;

    conexion.query('INSERT INTO tareasrealizar SET ?',{encargado:encargado, requerimiento:requerimiento, prioridad:prioridad, desarrollador:desarrollador, estado:estado, fechaentrega:fechaentrega}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{

    const id = req.body.id;
    const encargado = req.body.encargado;
    const requerimiento = req.body.requerimiento;
    const prioridad = req.body.prioridad;
    const desarrollador = req.body.desarrollador;
    const estado = req.body.estado;
    const fechaentrega = req.body.fechaentrega;

    conexion.query('UPDATE tareasrealizar SET ? WHERE id = ?',[{encargado:encargado, requerimiento:requerimiento, prioridad:prioridad, desarrollador:desarrollador, estado:estado, fechaentrega:fechaentrega}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};