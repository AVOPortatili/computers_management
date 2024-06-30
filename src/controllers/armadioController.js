import { Router } from 'express';
import { pool } from '../mysqlConnector.js'

const router = Router();


router.get("/", (req, res) => {
    const ret = pool.query("SELECT armadi.id,armadi.nome,armadi.capienza, aule.nome as aula FROM armadi INNER JOIN aule ON armadi.aula = aule.id", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})


router.get("/count", (req, res) => {
    const ret = pool.query("SELECT armadi.id, armadi.nome, aule.nome as aula, COUNT(pc.id) as count FROM armadi INNER JOIN pc ON pc.armadio = armadi.id INNER JOIN aule ON aule.id=armadi.aula WHERE pc.status=\"disponibile\"", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})


router.get("/:id", (req, res) => {
    const ret = pool.query("SELECT armadi.id, armadi.aula, COUNT(computers.id) FROM armadi INNER JOIN computers ON computers.id = armadi.id WHERE armadi.id = ?;", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results[0]);
    });
});


router.put("/", (req, res) => {
    console.log(req.body) 
    const ret = pool.query("UPDATE armadi SET nome = ?, aula =?, capienza = ? WHERE id = ?", [req.body.nome, req.body.aula, req.body.capienza, req.body.id], (error, results, fields) => {
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
    const ret = pool.query("INSERT INTO armadi (capienza, aula, nome) VALUES (?, ?, ?) ", 
    [req.body.nome, req.body.aula, req.body.nome], 
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
    const ret = pool.query("DELETE FROM armadi where id=?", req.body.id ,function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        let r =  "success"
        if (results.affectedRows == 0) r = "failure"
        res.status(200).json({message: r});
    });
})
export default router;