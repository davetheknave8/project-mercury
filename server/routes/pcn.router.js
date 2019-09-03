const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `(SELECT pcn."type" as "type", pcn.number as number, pcn.status as status, pcn.date as date, pcn.change_description as description
    FROM pcn)
    union
    (SELECT eol."type" as "type", eol.number as number, 
    eol.status as status, eol.date as date, eol.change_description as descripiton
    FROM eol)
    union
    (SELECT npi."type" as "type", npi.number as number, 
    npi.status as status, npi.date as date, npi.description as descripiton
    FROM npi);`
    pool.query(queryText)
    .then((result) =>{
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log(`error in get route for main search window${error}`)
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;