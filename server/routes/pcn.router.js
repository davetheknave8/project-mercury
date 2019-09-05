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
        value = req.query.search.toUpperCase();
        sqlValues = [`%${value}%`]
            const queryText = `(SELECT pcn."type" as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description
            FROM pcn
            WHERE "id" LIKE $1)
            union
            (SELECT eol."type" as "type", eol.id as id, 
            eol.status as status, eol.date as date, eol.change_description as descripiton
            FROM eol
            WHERE "id" LIKE $1)
            union
            (SELECT npi."type" as "type", npi.id as id, 
            npi.status as status, npi.date as date, npi.description as descripiton
            FROM npi
            WHERE "id" LIKE $1);`;
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

router.get('/getadmindashboard', rejectUnauthenticated, (req, res) => {
    console.log('get admin dashboard, req.query is', req.query);
    if (req.query.status != '') {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as date
                            FROM pcn
                            WHERE status = $1)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as date
                            FROM eol
                            WHERE status = $1)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as date
                            FROM npi
                            WHERE status = $1);`
        pool.query(sqlText, [req.query.status])
            .then(response => {
                console.log(response.rows);
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get admin dashboard error', error);
                res.sendStatus(500)
            })
    }
    else {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as date
                            FROM pcn)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as date
                            FROM eol)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as date
                            FROM npi);`
        pool.query(sqlText)
            .then(response => {
                console.log(response.rows);
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get admin dashboard error', error);
                res.sendStatus(500)
            })
    }
});

router.get('/current', (req, res) => {
    const idToGet = req.query.id;
    const sqlText = `SELECT * FROM pcn WHERE id=$1;`;
    pool.query(sqlText, [idToGet])
        .then(response => {
            console.log(response.rows[0])
            res.send(response.rows[0])
        })
        .catch(error => {
            console.log('error getting current pcn', error);
            res.sendStatus(500);
        })
})


router.get('/info', (req, res) => {
    console.log('getting specific pcn info, req.query is:', req.query)
    if ( req.query.type === 'PCN' ){
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
    else if (req.query.type === 'EOL') {
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
    else if (req.query.type === 'NPI') {
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
        res.sendStatus(500);
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

//POST Routes

router.post('/create', (req, res) => {
    console.log(req.body.type);
    const userId = req.user.id
    if(req.body.type === 'pcn'){
        const sqlText = `INSERT INTO pcn(creator_id, contact_id, type)
                            VALUES($1, $2, $3)
                            RETURNING id;`;
        pool.query(sqlText, [userId, userId, 'PCN'])
            .then(response => {
                console.log(response.rows);
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error creating new pcn');
                res.sendStatus(500);
            })
    }
})

// PUT Routes

router.put('/edit', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE pcn SET type=$1, date=$2, audience=$3, change_description=$4, notes=$5, status='PENDING' WHERE id=$6;`;
    const values=[objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.change_description, objectToEdit.notes, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing pcn', error);
            res.sendStatus(500);
        })
})


module.exports = router;