const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
//main route for getting all the documents.
router.get('/', (req, res) => {
    const queryText = `(SELECT pcn."type" as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description
    FROM pcn)
    union
    (SELECT eol."type" as "type", eol.id as id, 
    eol.status as status, eol.date as date, eol.change_description as descripiton
    FROM eol)
    union
    (SELECT npi."type" as "type", npi.id as id, 
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
// search route for main search page.
router.get(`/search`, (req, res) => {
    console.log('req.query', req.query);
    sqlValues = [req.query.type]
        const queryText = `(SELECT pcn."type" as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description
        FROM pcn
        WHERE "type" LIKE '$1%')
        union
        (SELECT eol."type" as "type", eol.id as id, 
        eol.status as status, eol.date as date, eol.change_description as descripiton
        FROM eol
        WHERE "type" LIKE '$1%')
        union
        (SELECT npi."type" as "type", npi.id as id, 
        npi.status as status, npi.date as date, npi.description as descripiton
        FROM npi
        WHERE "type" LIKE '$1%');`;
    pool.query(queryText,sqlValues)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((error)=> {
        console.log(`error in get route for main search window${error}`)
        res.sendStatus(500);
    })
    })

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