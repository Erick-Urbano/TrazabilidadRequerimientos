const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/tabla', (req, res)=>{     
    conexion.query('SELECT * FROM tareasrealizar',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('tabla', {results:results});            
        }   
    })
})

router.get('/create', (req,res)=>{
    res.render('create');
})


router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM tareasrealizar WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit', {encargado:results[0]});            
        }        
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM tareasrealizar WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tabla');         
        }
    })
});

const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);



router.get('/tarea', (req, res)=>{     
    conexion.query('SELECT * FROM tareas',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('tarea', {results:results});            
        }   
    })
})

router.get('/crear', (req,res)=>{
    res.render('crear');
})


router.get('/editar/:id2', (req,res)=>{    
    const id2 = req.params.id2;
    conexion.query('SELECT * FROM tareas WHERE id2=?',[id2] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('editar', {texto:results[0]});            
        }        
    });
});

router.get('/borrar/:id2', (req, res) => {
    const id2 = req.params.id2;
    conexion.query('DELETE FROM tareas WHERE id2 = ?',[id2], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tarea');         
        }
    })
});

/*const crud2 = require('./controllers/crud2');*/

router.post('/guardar', crud.guardar);
router.post('/actualizar', crud.actualizar);

module.exports = router;