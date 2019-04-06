var React = require('react');
var Showdown = require('showdown');
var data  = require('../data.json');

class Comment extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var converter = new Showdown.Converter()
    var rawMarkup = converter.makeHtml(this.props.children.toString())
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{ __html: rawMarkup }} />
      </div>
    )
  }
}

class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var commentNodes = this.props.data.map(function(comment) {
      return <Comment author={comment.Author}>{comment.Text}</Comment>
    })
    return <div className="commentList">{commentNodes}</div>
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

class CommentBox extends React.Component {
  loadCommentsFromServer() {
    var xhr = new XMLHttpRequest()
    xhr.open('get', this.props.url, true)
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText)
      this.setState({ data: data })
    }.bind(this)
    xhr.send()
  }
  handleCommentSubmit(comment) {
    var comments = this.state.data
    var newComments = comments.concat([comment])
    this.setState({ data: newComments })

    var data = new FormData()
    data.append('Author', comment.Author)
    data.append('Text', comment.Text)

    var xhr = new XMLHttpRequest()
    xhr.open('post', this.props.submitUrl, true)
    xhr.onload = function() {
      this.loadCommentsFromServer()
    }.bind(this)
    xhr.send(data)
  }
  getInitialState() {
    return { data: this.props.initialData }
  }
  componentDidMount() {
    window.setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}
module.exports.CommentBox = CommentBox
