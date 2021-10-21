import Funk from "./Funk";

export default class FunkHandler {
    static create(options) {
        return new Funk(typeof options === "object" ? options : {});
    }
}
