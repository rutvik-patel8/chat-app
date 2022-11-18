
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false
// import wrap from "@vue/web-component-wrapper";

// const wrappedElement = wrap(Vue, App);

// window.customElements.define("chat-app", wrappedElement);

new Vue({
  render: h => h(App)
}).$mount('#app')



