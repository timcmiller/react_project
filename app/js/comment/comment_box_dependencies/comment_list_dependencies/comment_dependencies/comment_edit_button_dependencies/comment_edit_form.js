var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },

  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleEdit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text && !author) {
      return;
    }
    this.props.onCommentEdit({author: author, text: text});
    this.setState({author: '', text: ''});
  },

  render: function() {
    return(
      <form className="commentForm" onSubmit={this.handleEdit}>
        <input
          type="text"
          placeholder={this.props.author}
          value={this.state.author}
          onChange={this.handleAuthorChange}/>
        <input
          type="text"
          placeholder={this.props.text}
          value={this.state.text}
          onChange={this.handleTextChange}/>
        <input type="submit" value="EDIT" />
      </form>
      );
  }
});
