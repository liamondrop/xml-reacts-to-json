import React from 'react'

export default React.createClass({
  render() {
    return (
      <div id="shell" className="container">{this.props.children}</div>
      )
  }
})