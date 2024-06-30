import { Router } from 'express';
import { pool } from '../mysqlConnector.js'

const router = Router();


router.get("/", (req, res) => {
    const ret = pool.query("SELECT u.*, l.username FROM utenti u INNER JOIN login l on l.utente=u.id", function (error, results, fields) {
        if(error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        console.log(results);
        res.status(200).json(results);
    });
})

router.delete("/", (req, res) => {
    const ret = pool.query("DELETE FROM utenti where id=?", req.body.id ,function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        //forse potresti guardare anche le affectedRows
    });
    const r = pool.query("DELETE FROM login where utente=?", req.body.id ,function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        let r =  "success"
        if (results.affectedRows == 0) r = "failure"
        res.status(200).json({message: r});
    });
})

router.post("/", async (req, res) => { //questo tanto e' solo un placeholder
    console.log(req.body)
    const ret = await pool.query("INSERT INTO utenti (nome, cognome, email, ruolo) VALUES(?, ?, ?, ?)", [req.body.nome, req.body.cognome, req.body.email, req.body.ruolo],function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        }
        const r = pool.query("SELECT id FROM utenti WHERE email=? AND nome=? ORDER BY id DESC", [req.body.email, req.body.nome], async function (error, results, fields) {
            if (error) {
                res.status(500).json({message: "Internal server error"});
                console.log(error)
            }
            console.log(results)
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: req.body.username,
                    password: req.body.password,
                    utente: results[0].id
                })
            });
            const result = await response.json();
            res.status(200).json({message: result});
            //qui forse dovresti controllare anche le affected rows
    });
    });
})

router.put("/", async (req, res) => { //questo tanto e' solo un placeholder
    console.log(req.body)
    const ret = pool.query("UPDATE utenti SET ruolo = ? WHERE id=?", [req.body.ruolo, req.body.id],function (error, results, fields) {
        if (error) {
            res.status(500).json({message: "Internal server error"});
            console.log(error)
        } else {
            let r =  "success"
            if (results.affectedRows == 0) r = "failure"
            res.status(200).json({message: r});
        }
        //qui forse dovresti controllare anche le affected rows
    });
})

export default router;