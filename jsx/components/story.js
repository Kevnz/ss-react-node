/** @jsx React.DOM */
var React = require('react');
var Router =require('react-router');

var Story = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {story: [ ]};
    },
    componentWillMount: function () {
        this.loadStoryFromServer();
    },
    render: function() {
        console.log(this.getParams());
        console.log('need data damn it')
        return (
            <div>
                <h2>{this.props.title}</h2>
            </div>
        );
    }
});

module.exports = Story;