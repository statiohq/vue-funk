import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueFunk from "../../lib/lib";
Vue.use(VueFunk);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
