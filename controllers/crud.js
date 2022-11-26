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
            res.redirect('/tabla');         
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
            res.redirect('/tabla');         
        }
});
};


exports.guardar = (req, res)=>{

    const id2 = req.body.id2;
    const texto = req.body.texto;
    const descripcion = req.body.descripcion;
  
  
    conexion.query('INSERT INTO tareas SET ?',{texto:texto, descripcion:descripcion}, (error, results)=>{
        if(error){0
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/tarea');         
        }
  });
  };
  //ACTUALIZAR un REGISTRO
  exports.actualizar = (req, res)=>{
  
    const id2 = req.body.id2;
    const texto = req.body.texto;
    const descripcion = req.body.descripcion;
  
    conexion.query('UPDATE tareas SET ? WHERE id2 = ?',[{texto:texto, descripcion:descripcion}, id2], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tarea');         
        }
  });
  };

