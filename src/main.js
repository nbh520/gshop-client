/*
    入口JS
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import Button from 'mint-ui/lib/button';

//加载mockserver
import './mock/mockServer'
Vue.component(Button.name, Button);
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router

})
