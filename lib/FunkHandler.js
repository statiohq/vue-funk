import Funk from "./Funk";

export default function funkHandler(options) {
    return new Funk(typeof options === "object" ? options : {});
}
