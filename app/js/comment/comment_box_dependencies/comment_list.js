var React = require('react');
var ReactDOM = require('react-dom');
var Comment = require(__dirname + '/comment_list_dependencies/comment.js');

module.exports = React.createClass({
  render: function() {
    var url = this.props.url
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment url={url} editing={comment.editing} text={comment.text} id={comment._id} author={comment.author} key={comment.timestamp} timestamp={comment.timestamp}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div url={this.props.url} className="commentList">
        {commentNodes}
      </div>
    );
  }
});
