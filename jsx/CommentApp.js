var data = require('../data.json');
var React = require('react/addons');
var Showdown = require('showdown');
var Comment = React.createClass({
	render: function() {
		var converter = new Showdown.converter();
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
	    var commentNodes = this.props.data.map(function (comment) {
			return (
				<Comment author={comment.Author}>
					{comment.Text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({Author: author, Text: text});
		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
		return;
	},
	render: function() {
  		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" ref="author" />
				<input type="text" placeholder="Say something..." ref="text" />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		var xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = function() {
			var data = JSON.parse(xhr.responseText);
			this.setState({ data: data });
		}.bind(this);
		xhr.send();	
	},
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});

		var data = new FormData();
		data.append('Author', comment.Author);
		data.append('Text', comment.Text);

		var xhr = new XMLHttpRequest();
		xhr.open('post', this.props.submitUrl, true);
		xhr.onload = function() {
			this.loadCommentsFromServer();
		}.bind(this);
		xhr.send(data);
	},
  	getInitialState: function() {
		return { data: this.props.initialData };
	},
	componentDidMount: function() {
		window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});
module.exports.CommentBox = CommentBox;