import React from 'react';
import app from 'ampersand-app';
import CodeInput from '../components/code-input';
import CodeOutput from '../components/code-output';

const CHANGE_EVENT = 'change';

function getModelState() {
  return app.model.getAttributes({props: true});
}

export default React.createClass({
  getInitialState() {
    return getModelState();
  },

  componentDidMount() {
    app.model.on(CHANGE_EVENT, this._onModelChange);
  },

  componentWillUnmount() {
    app.model.off(CHANGE_EVENT);
  },

  handleFileChange(e) {
    app.model.loadXML(e.target.value);
  },

  render() {
    return (
      <div className='grid-flex-container'>
        <div className='grid-flex-cell'>
          <CodeInput {...this.state}/>
        </div>
        <div className='grid-flex-cell'>
          <select
            className="form-element"
            name="fileName"
            defaultValue="hello.xml"
            onChange={this.handleFileChange}>
            <option value="hello.xml">hello.xml</option>
            <option value="management-node.xml">management-node.xml</option>
            <option value="fake-policy.xml">active-policy.xml</option>
          </select>
          <CodeOutput {...this.state}/>
        </div>
      </div>
    );
  },

  _onModelChange() {
    this.setState(getModelState());
  }
});