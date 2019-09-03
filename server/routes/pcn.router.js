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
    .then((response) => {
        res.send(response.rows);
    })
    .catch((error)=> {
        console.log(`error in get route for main search window${error}`)
        res.sendStatus(500);
    })
});

router.get('/', (req,res) =>{
    // for searching through the database.
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});






router.get('/info', (req, res) => {
    console.log('getting specific pcn info, req.query is:', req.query)
    if ( req.query.type === 'pcn' ){
        let sqlText = 'select * from pcn where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                console.log('sending response', response.rows);
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving pcn info', error);
                res.sendStatus(500)
            })
    }
    else if (req.query.type === 'eol') {
        let sqlText = 'select * from eol where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                console.log('sending response', response.rows);
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving eol info', error);
                res.sendStatus(500)
            })
    }
    else if (req.query.type === 'npi') {
        let sqlText = 'select * from npi where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                console.log('sending response', response.rows);
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving npi info', error);
                res.sendStatus(500)
            })
    }
    else {
        sendStatus(500);
    }

});



module.exports = router;