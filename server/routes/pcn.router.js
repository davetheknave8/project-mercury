const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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
        sqlValues = [`%${req.query.search}%`]
            const queryText = `(SELECT pcn."type" as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description
            FROM pcn
            WHERE "type" LIKE $1)
            union
            (SELECT eol."type" as "type", eol.id as id, 
            eol.status as status, eol.date as date, eol.change_description as descripiton
            FROM eol
            WHERE "type" LIKE $1)
            union
            (SELECT npi."type" as "type", npi.id as id, 
            npi.status as status, npi.date as date, npi.description as descripiton
            FROM npi
            WHERE "type" LIKE $1);`;
    pool.query(queryText,sqlValues)
    .then((response) => {
        console.log('response.rows',response.rows);
        res.send(response.rows);
    })
    .catch((error)=> {
        console.log(`error in get route for main search window ${error}`)
        res.sendStatus(500);
    })
});

router.get('/getdashboard', rejectUnauthenticated, (req, res) => {
    console.log('get dashboard, req.query is', req.query);
    if( req.query.status != '' ){
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as date
                            FROM pcn
                            WHERE creator_id = $1 AND status = $2)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as date
                            FROM eol
                            WHERE creator_id = $1 AND status = $2)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as date
                            FROM npi
                            WHERE creator_id = $1 AND status = $2);`
        const sqlValues = [req.query.id, req.query.status]
        pool.query(sqlText, sqlValues)
        .then(response => {
            console.log(response.rows);
            res.send(response.rows)
        })
        .catch(error => {
            console.log('get dashboard error', error);
            res.sendStatus(500)
        })
    }
    else{
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as date
                            FROM pcn
                            WHERE creator_id = $1)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as date
                            FROM eol
                            WHERE creator_id = $1)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as date
                            FROM npi
                            WHERE creator_id = $1);`
        const sqlValues = [req.query.id]
        pool.query(sqlText, sqlValues)
            .then(response => {
                console.log(response.rows);
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get dashboard error', error);
                res.sendStatus(500)
            })
    }
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

router.get('/pcnparts', (req, res) => {
    console.log('getting parts for specific pcn, req.query is:', req.query)
    let sqlText = 'select name, number, description from part join pcn_part on part.id = pcn_part.part_id where pcn_part.pcn_id = $1;';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                console.log('sending response', response.rows);
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving pcn parts', error);
                res.sendStatus(500)
            })
});


module.exports = router;