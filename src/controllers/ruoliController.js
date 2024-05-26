import { Router } from 'express';
import { pool } from '../mysqlConnector.js'

const router = Router();

router.get("/", (req, res) => {
    const ret = pool.query("SELECT * FROM ruoli", function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})
//aggiungere poi il post per la creazione di un nuovo ruolo eventualmente
export default router;