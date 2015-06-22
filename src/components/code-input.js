import React from 'react'
import app from 'ampersand-app'

export default React.createClass({
  componentDidUpdate() {
    this._updateXMLInput();
  },

  handleXMLChange(e) {
    e.preventDefault();
    var xmlInput = React.findDOMNode(this.refs.xml);
    app.model.processXML(xmlInput.value);
  },

  handleOptionChange(e) {
    var {name, value} = e.target;
    value = (value === 'true'); // coerce to boolean
    app.model.updateParseOption({name, value});
    app.model.processXML(app.model.rawXML);
  },

  handleOutputChange(e) {
    var output = e.target.value;
    app.model.updateOutputType(output);
    app.model.processXML(app.model.rawXML);
    this.setState({output});
  },

  handleXMLSearch(e) {
    e.preventDefault();
    var searchInput = React.findDOMNode(this.refs.search);
    app.model.searchXML(searchInput.value);
  },

  render() {
    var {output, rawXML} = this.props
    var outputType = `is-${output}`

    return (
      <form>
        <fieldset className={outputType}>
          <div className="grid-flex-container">
            <div className="form-element grid-flex-cell show-json">
              <label>Explicit Array</label>
              <select
                className="form-element"
                name="explicitArray"
                defaultValue="false"
                onChange={this.handleOptionChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-element grid-flex-cell show-json">
              <label>Merge Attrs</label>
              <select
                className="form-element"
                name="mergeAttrs"
                defaultValue="true"
                onChange={this.handleOptionChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-element grid-flex-cell output-type">
              <label>Output</label>
              <select
                className="form-element"
                name="output"
                defaultValue="json"
                onChange={this.handleOutputChange}>
                <option value="json">JSON</option>
                <option value="xml">XML</option>
              </select>
            </div>
          </div>
          <div className="form-element show-xml">
            <label>Search</label>
            <input
              className="form-input"
              name="search"
              ref="search"
              placeholder="Enter search query [xpath]" />
            <button onClick={this.handleXMLSearch} className="button">></button>
          </div>
        </fieldset>
        <div className="form-element">
          <textarea
            className="form-input"
            type="text"
            name="xml"
            ref="xml"
            defaultValue={rawXML} />
          <button onClick={this.handleXMLChange} className="button">Submit</button>
        </div>
      </form>
    );
  },

  _updateXMLInput() {
    const xmlInput = React.findDOMNode(this.refs.xml);
    xmlInput.value = app.model.rawXML;
  }
})