var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  handleDelete: function(e) {
    e.preventDefault();
    this.props.onCommentDelete();
  },

  render: function() {
    return (
      <form className="commentDeleteButton" onSubmit={this.handleDelete}>
        <input type="submit" value="DELETE" />
      </form>
    );
  }
});
