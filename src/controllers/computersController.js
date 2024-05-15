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
    const ret = pool.query("SELECT * FROM pc", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})

router.get("/:id", (req, res) => {
    const ret = pool.query("SELECT * FROM pc WHERE id = ?", req.params.id ,function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
});



router.put("/", (req, res) => { 

    const ret = pool.query("UPDATE pc SET status = ?, armadio=? WHERE id = ?", [req.body.new_status, req.body.armadio, req.body.id], function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        if (armadio) {
            
        }
        let r =  "success"
        if (results.affectedRows == 0) r = "failure"
        res.status(200).json({message: r});
    });
})



export default router;