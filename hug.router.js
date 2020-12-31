const router = require('express').Router();
const axios = require('axios').default;
const xmlParser = require('xml2json');

function getRandomArbitrary(max) {
    return Math.round(Math.random() * max);
  }
  
router.route('/').get((req, res) => {

    var options = {method: 'GET', url: 'http://hugcdn.nyc3.digitaloceanspaces.com/'};

    axios.request(options).then(function (response) {
        const fullParsed = JSON.parse(xmlParser.toJson(response.data))

        const hug = fullParsed.ListBucketResult.Contents[getRandomArbitrary(fullParsed.ListBucketResult.Contents.length)]
        const stagedResponse = {
        url: `https://hug.cdn.bigbrother.group/${hug.Key}`,
        filename: hug.Key,
        size: hug.Size
        }
        console.log(`A hug has been sent out to ${res.req.ip}`);
        res.status(200).json(stagedResponse);

    }).catch(function (error) {
        console.error(error);
        res.sendStatus(500);
    });

});

module.exports = router;
