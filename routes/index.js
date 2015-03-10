var express = require('express');
var router = express.Router();
require("node-jsx").install(); 
var React = require('react/addons');
var CommentBox = React.createFactory(require('../jsx/CommentApp').CommentBox);
var data = require('../data.json');     
router.get('/', function(req, res, next) { 

        var reactHtml = React.renderToString(CommentBox({initialData:data}));
        res.render('index', {title: 'React Demo',reactOutput: reactHtml });

});
router.get('/comments', function(req, res, next) { 
        res.send(data);

});
router.post('/comments', urler, function(req, res, next) { 
    console.log(req.body);
   data.push({Author: req.body.Author, Text: req.body.Text});
   console.log(data);
   res.sendStatus(200);
});
module.exports = router;
