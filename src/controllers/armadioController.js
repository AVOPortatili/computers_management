import { Router } from 'express';
import { pool } from '../mysqlConnector.js'

const router = Router();

router.get("/", (req, res) => {
    const ret = pool.query("select * from Armadi;", req.params.id ,function (error, results, fields) {
        if(error) throw error;
        console.log(results);
        res.status(200).json(results);
    });
})


router.get("/:id", (req, res) => {
    const ret = pool.query("SELECT COUNT(Computers.id) FROM Armadi INNER JOIN Computers ON Computers.id = Armadi.id WHERE Computers.id IS NOT NULL;", req.params.id ,function (error, results, fields) {
        if(error) throw error;
        console.log(results);
        res.status(200).json(results[0]);
    });
});

export default router;