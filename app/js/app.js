var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require(__dirname + '/comment/comment_box.js');


ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
