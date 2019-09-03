const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

router.get('/getdashboard', rejectUnauthenticated, (req, res) => {
    console.log('get dashboard', req.user);
    const sqlText = `(SELECT "user".id as id, pcn."type" as "type", pcn.number as number, 
                        pcn.status as status, pcn.date as date
                        FROM pcn
                        JOIN "user" on "user".id = pcn.creator_id
                        WHERE "user".id = $1)
                        union
                        (SELECT "user".id as id, eol."type" as "type", eol.number as number, 
                        eol.status as status, eol.date as date
                        FROM eol
                        JOIN "user" on "user".id = eol.creator_id
                        WHERE "user".id = $1)
                        union
                        (SELECT "user".id as id, npi."type" as "type", npi.number as number, 
                        npi.status as status, npi.date as date
                        FROM npi
                        JOIN "user" on "user".id = npi.creator_id
                        WHERE "user".id = $1);`
    const sqlValues = [req.user.id]
    pool.query(sqlText, sqlValues)
    .then(response => {
        console.log(response.rows)
        res.send(response.rows)
    })
    .catch(error => {
        console.log('get dashboard error', error);
        res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;