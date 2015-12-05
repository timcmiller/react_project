module.exports = React.createClass({

  handleDelete: function(e) {
    e.preventDefault();
    this.handleCommentDelete(this.props.comment);
  },
  handleCommentDelete: function(comment) {
    $.ajax({
      url: this.props.url + this.state.data.id,
      dataType: 'json',
      type: 'DELETE',
      data: comment,
      success: function(data) {
        this.setState({author: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <form className="commentDeleteButton" onSubmit={this.handleDelete}>
        <input type="submit" value="DELETE" />
      </form>
    );
  }
});
