import { Router } from 'express';
import { pool } from '../mysqlConnector.js'

const router = Router();

router.get("/", (req, res) => {
    const ret = pool.query("SELECT armadi.id, armadi.nome, aule.nome as aula, COUNT(pc.id) as count FROM armadi INNER JOIN pc ON pc.armadio = armadi.id INNER JOIN aule ON aule.id=armadi.aula", req.params.id ,function (error, results, fields) {
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

export default router;