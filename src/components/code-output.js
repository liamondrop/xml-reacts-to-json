import React from 'react'

export default React.createClass({
  componentDidMount() {
    this._updateCodeNode();
  },

  componentDidUpdate() {
    this._updateCodeNode();
  },

  _updateCodeNode() {
    const codeNode = React.findDOMNode(this.refs.code);
    let {prettyData, error} = this.props;
    let message = '';
    if (error) {
      message += `ERROR: ${error}`;
    } else {
      message += prettyData;
    }
    codeNode.textContent = message;
  },

  render() {
    let className = 'message';
    if (this.props.error) {
      className += ' message-error';
    }

    return (
      <pre className={className}>
        <code ref='code' />
      </pre>
    );
  }
});