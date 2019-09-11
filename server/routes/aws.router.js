const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const aws = require('aws-sdk');
require('dotenv').config();

let credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID1,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY1
};

aws.config.update({ credentials: credentials, region: 'us-east-2' });

router.get('/upload', (req, res) => {
    console.log(req.query);
    const s3 = new aws.S3();
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.query.name,
        Expires: 100000,
    };

    s3.getSignedUrl('putObject', params, function (err, data) {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(data);
            res.send(data);
        }
    });
})

router.get('/retrieve', (req, res) => {
    let newResponse = [];
    function setImageUrl(image){
        
    }
    pool.query(`SELECT * FROM image WHERE pcn_id=$1`, [req.query.id])
        .then( response => {
            for(let image of response.rows){
                const s3 = new aws.S3();
                const params = {
                    Bucket: process.env.S3_BUCKET,
                    Key: image.file_name,
                    Expires: 10000,
                };
                s3.getSignedUrl('getObject', params, function (err, data) {
                    if (err) {
                        console.log(err);
                        return err;
                    } else {
                        image.image_url = data;
                        console.log(image);
                        newResponse.push(image);
                        console.log(newResponse);
                    }
                });
            }
            console.log(newResponse);
            res.send(newResponse);
        })
} )

//POST
router.post('/upload', (req, res) => {
    console.log(req.body)
    const sqlText = `INSERT INTO image(file_name, pcn_id) VALUES($1, $2);`;
    pool.query(sqlText, [req.body.image, req.body.id])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error adding image', error);
            res.sendStatus(500);
        })
})

module.exports = router;