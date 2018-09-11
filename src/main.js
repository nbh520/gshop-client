/*
    入口JS
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'

FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
