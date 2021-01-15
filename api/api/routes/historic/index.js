const router = require('express').Router();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var HistoricTable  = require('./DBHistoric');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/', router);

router.route('/historic').get((request, response)=>{
    HistoricTable.getHistoric().then(result => {
       response.json(result[0]);
    }).catch(error => {
        console.log('Error:' + error);
    });

})

router.route('/historic').post((request,response)=>{

    let operation = {...request.body}
    console.log(operation.expression);
    
    HistoricTable.addOperation(operation).then(result => {
       response.status(201).json(result);
    }).catch(error => {
        console.log('Error:' + error);
    });

})

router.route('/historic').delete((request, response)=>{    
    HistoricTable.deleteHistoric().then(result => {
       response.status(201).json(result);
    }).catch(error => {
        console.log('Error:' + error);
    });

})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);