var React = require('react');
var ReactDOM = require('react-dom');
var CommentEditForm = require(__dirname + '/comment_edit_button_dependencies/comment_edit_form.js');

module.exports = React.createClass({

  handleFormEdit: function(comment) {
    this.props.onCommentEdit(comment);
    this.setState({showResults: !this.state.showResults});
  },

  getInitialState: function() {
    return { showResults: false };
  },

  onClick: function() {
    this.setState({showResults: !this.state.showResults});
  },

  render: function() {
    return (
      <div>
        <input type="submit" value={this.state.showResults ? "CANCEL" : "EDIT"} onClick={this.onClick} />
        { this.state.showResults ? <CommentEditForm onCommentEdit={this.handleFormEdit} author={this.props.author} text={this.props.text} /> : null }
      </div>
    );
  }

});
