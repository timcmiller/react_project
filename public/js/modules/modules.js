var comment = require(__dirname + 'comment/comment.js');
var commentBox = require(__dirname + '/comment/comment_box.js');
var commentDeleteButton = require(___dirname + '/comment/comment_delete_button');
var commentForm = require(__dirname + '/comment/comment_form.js');
var commentList = require(__dirname + '/comment/comment_list.js');

module.exports = function() {
  ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
  );
}
