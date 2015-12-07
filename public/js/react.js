//Modified from Facebooks react tutorial

var Comment = React.createClass({

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

var CommentDeleteButton = React.createClass({

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

//spencer
var CommentEditButton = React.createClass({

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

var CommentEditForm = React.createClass({
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


//end

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data, url: this.props.url});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.timestamp = new Date().toString();
    comment.editing = false;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data, url: this.props.url});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList url={this.props.url} data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
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

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var timestamp = this.state.timestamp
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text, timestamp: timestamp});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
