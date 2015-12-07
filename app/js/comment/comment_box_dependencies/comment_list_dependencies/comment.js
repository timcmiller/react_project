var React = require('react');
var ReactDOM = require('react-dom');
var CommentEditButton = require(__dirname + '/comment_dependencies/comment_edit_button.js');
var CommentDeleteButton = require(__dirname + '/comment_dependencies/comment_delete_button.js');

module.exports = React.createClass({

  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  handleCommentDelete: function() {
    $.ajax({
      url: this.props.url + '/' + this.props.id,
      type: 'DELETE',
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('this is an error', this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentEdit: function(data) {
    data.text = data.text || this.props.text;
    data.author = data.author || this.props.author;
    data.timestamp = new Date().toString();
    data.editing = true;

    $.ajax({
      url: this.props.url + '/' +this.props.id,
      dataType: 'json',
      type: 'PUT',
      data: data,
      success: function(data) {
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.log('this is an error on the put method', this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {

    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <p className="commentTimestamp">{ this.props.editing ? 'Last Edited: ' : null }{this.props.timestamp}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <CommentDeleteButton onCommentDelete={this.handleCommentDelete}/>
        <CommentEditButton onCommentEdit={this.handleCommentEdit} author={this.props.author} text={this.props.text} />
      </div>
    );
  }
});


