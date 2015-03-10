var React = window.React = require('react/addons');

var CommentBox = require('./CommentApp').CommentBox;
var data = [
  { "Author": "Kevin Isom", "Text": "Hello React.js on Node" },
  { "Author": "A Person", "Text": "This is one comment" },
  { "Author": "Someone Else", "Text": "This is *another* comment" }
];

React.renderComponent(
  <CommentBox initialData={data} url='/comments' submitUrl='/comments' pollInterval='20000' />,
  document.getElementById('container')
);