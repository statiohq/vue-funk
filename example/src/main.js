import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Import the plugin
import VueFunk from "../../lib/lib";
Vue.use(VueFunk);

new Vue({
    render: function (h) {
        return h(App);
    },
}).$mount("#app");
