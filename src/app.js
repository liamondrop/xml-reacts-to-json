import styles from './styles/main.styl';
import Router from './router';
import app from 'ampersand-app';
import xml2JSONModel from './models/xml2JSONModel';

const INITIAL_XML = 'hello.xml';

app.extend({
  init() {
    this.model = new xml2JSONModel();
    this.model.loadXML(INITIAL_XML);
    this.router = new Router();
    this.router.history.start();
  }
});

app.init();