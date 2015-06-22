import styles from './styles/main.styl';
import Router from './router';
import xml2JSONModel from './models/xml2JSONModel';
import app from 'ampersand-app';

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

window.app = app