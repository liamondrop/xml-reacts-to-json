import Model from 'ampersand-model';
import beautify from 'js-beautify';
import xpath from 'xpath';
import {DOMParser} from 'xmldom';
import {Parser} from 'xml2js';
import {pd} from 'pretty-data';

const dom = new DOMParser();

const parseOptions = {
  attrkey: '@',
  charkey: 'text',
  explicitArray: false,
  mergeAttrs: true
};

export default Model.extend({
  parser: new Parser(parseOptions),

  props: {
    output: ['string', false, 'json'],
    rawXML: 'string',
    prettyData: 'string',
    error: 'string'
  },

  loadXML(fileName) {
    console.log(fileName)
    let xmlString = require(`../xml/${fileName}`);
    this.set('rawXML', xmlString);
    this.processXML(xmlString);
  },

  processXML(xmlString) {
    try {
      console.log(xmlString)
      this.doc = dom.parseFromString(xmlString);
      if (this.output === 'json') {
        this.parser.parseString(xmlString, this._handleParsedString.bind(this));
      } else {
        this._setPropsXML(xmlString);
      }
    } catch (err) {
      this._setErrorMessage(err.message);
    }
  },

  searchXML(query) {
    try {
      let result = xpath.select(query, this.doc);
      this.set({
        'prettyData': pd.xml(result.toString()),
        'error': null
      });
    } catch (err) {
      this._setErrorMessage(err.message);
    }
  },

  updateOutputType(type) {
    this.set('output', type);
  },

  updateParseOption(option) {
    parseOptions[option.name] = option.value;
    this.parser = new Parser(parseOptions);
  },

  _setErrorMessage(message) {
    this.set('error', message);
  },

  _setPropsJSON(data) {
    let json = JSON.stringify(data);
    this.set({
      'prettyData': beautify(json),
      'error': null
    });
  },

  _setPropsXML(data) {
    this.set({
      'prettyData': pd.xml(data),
      'error': null
    });
  },  

  _handleParsedString(err, result) {
    console.log('_handleParsedString', result)
    if (err) {
      this._setErrorMessage(err.message);
    } else {
      this._setPropsJSON(result);
    }
  }
});