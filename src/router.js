import Router from 'ampersand-router'
import React from 'react'
import Layout from './layout'
import Index from './pages/index'
import app from 'ampersand-app'

export default Router.extend({
  routes: {
    '': 'index'
  },

  renderPage(Page, opts={}) {
    const Main = (
      <Layout>
        <Page {...opts}/>
      </Layout>
      )
    React.render(Main, document.body)
  },

  index() {
    this.renderPage(Index)
  }
})
