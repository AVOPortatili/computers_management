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

router.get("/", (req, res) => {
    const ret = pool.query("SELECT COUNT(id) AS 'count' FROM Computer", req.params.id ,function (error, results, fields) {
        if(error) throw error;
        console.log(results);
        res.status(200).json(results[0]);
    });
})


router.get("/:id", (req, res) => {
    const ret = pool.query("SELECT * FROM pc WHERE IDP = ?", req.params.id ,function (error, results, fields) {
        if(error) throw error;
        console.log(results);
        res.status(200).json(results);
    });
});



router.put("/", (req, res) => {  
    const ret = pool.query("UPDATE pc SET status = ? WHERE IDP = ?", [req.body.status, req.body.id], function (error, results, fields) {
        if(error) throw error;
        let r =  "update successful"
        if (results.affectedRows == 0) r = "no update"
        let response = {
            "response" : r
        }
        res.status(200).json(response);
    });
})



export default router;