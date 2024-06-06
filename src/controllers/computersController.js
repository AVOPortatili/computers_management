import { Router } from 'express';
import { pool } from '../mysqlConnector.js'


const router = Router();

// router.get('/', (req, res) => {
//     const ret = pool.query("SELECT * FROM pc", function (error,results, fields) {
//         if(error) throw error;
//         console.log(results);
//         res.status(200).json(results);
//     });
// });
// 

router.get("/count", (req, res) => {
    const ret = pool.query("SELECT COUNT(id) AS 'count' FROM pc", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results[0]);
    });
})

router.get("/", (req, res) => {
    const ret = pool.query("SELECT pc.*, a.nome AS 'armadio' FROM pc LEFT JOIN armadi a on pc.armadio=a.id", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})

router.get("/:id", (req, res) => {
    const ret = pool.query("SELECT pc.*, a.nome AS 'armadio' FROM pc INNER JOIN armadi a ON pc.armadio=a.id WHERE pc.id = ?", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
});



router.put("/", (req, res) => {
    console.log(req.body) 
    const ret = pool.query("UPDATE pc SET status = ?, armadio=? WHERE id = ?", [req.body.new_status, req.body.armadio, req.body.id], (error, results, fields) => {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        } else {
            let r =  "success"
            if (results.affectedRows == 0) r = "failure"
            res.status(200).json({message: r});
        }
    }) 
})

router.post("/", (req, res) => {
    console.log(req.body) 
    const ret = pool.query("INSERT INTO pc (nome, numero_inventario, mac_address_wifi, note, data_ultimo_aggiornamento, osservazioni, status, armadio) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ", 
    [req.body.nome, req.body.numero_inventario, req.body.mac_address_wifi, req.body.note, new Date(req.body.data_ultimo_aggiornamento), req.body.osservazioni, req.body.status, req.body.armadio], 
    (error, results, fields) => {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        } else {
            let r =  "success"
            res.status(200).json({message: r});
        }
    }) 
})

router.delete("/", (req, res) => {
    const ret = pool.query("DELETE FROM pc where id=?", req.body.id ,function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        let r =  "success"
        if (results.affectedRows == 0) r = "failure"
        res.status(200).json({message: r});
    });
})
//serve per ottenere i PC in base all'armadio
router.get("/armadionum/:armadioId", (req, res) => {
    pool.query("SELECT * FROM pc WHERE armadio = ?", [req.params.armadioId], function (error, results, fields) {
        if(error) {
            res.status(500).json({ message: "Internal server error" });
            console.log(error);
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});

export default router;