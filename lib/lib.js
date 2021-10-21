import funkHandler from "./funkHandler";

export default {
    install(Vue) {
        Vue.funk = funkHandler;
        Vue.prototype.$funk = funkHandler;
    },
};
