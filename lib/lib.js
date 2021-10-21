import FunkHandler from "./FunkHandler";

export default {
    install(Vue) {
        Vue.funk = FunkHandler;
        Vue.prototype.$funk = FunkHandler;
    },
};
