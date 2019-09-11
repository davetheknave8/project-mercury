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

router.get('/upload-endpoint', (req, res) => {
    var s3 = new aws.S3();
    console.log(credentials);
    var params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.query.filename,
        Expires: 60,
        ContentType: req.query.filetype
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

module.exports = router;