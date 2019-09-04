const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/current', (req, res) => {
    const pcnId = req.query.pcn_id;
    const sqlText = `SELECT part.name, part.number, part.description FROM part
                        JOIN pcn_part ON part.id = pcn_part.part_id
                        WHERE pcn_part.pcn_id=$1;`;
    const values = [pcnId];
    pool.query(sqlText, values)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error getting current pcn parts', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/create', (req, res) => {
    console.log(req.body);
    const sqlText = `INSERT INTO part(name, number, description)
                        VALUES($1, $2, $3)
                        RETURNING id;`;
    const values = [req.body.name, req.body.number, req.body.description];
    pool.query(sqlText, values)
        .then(response => {
            const partId = response.rows[0].id;
            const pcnNumber = req.body.pcnNumber;
            pool.query(`INSERT INTO pcn_part(pcn_id, part_id)
                            VALUES($1, $2);`, [pcnNumber, partId])
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error inserting into pcn_part', error);
                })
        })
        .catch(error => {
            console.log('error inserting into parts', error);
            res.sendStatus(500);
        })
});

module.exports = router;