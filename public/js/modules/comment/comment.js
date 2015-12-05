module.exports = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <p className="commentTimestamp">{this.props.timestamp}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <CommentDeleteButton />
      </div>
    );
  }
});
