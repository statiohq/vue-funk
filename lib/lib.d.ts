import { FunkMessage, FunkOptions, FunkStation } from "@statio/funk.js";
import Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $funk: (options?: FunkOptions) => Funk;
    }
}

declare module "@nuxt/types" {
    interface Context {
        $funk: (options?: FunkOptions) => Funk;
    }
}

declare class VueFunk {
    static install: PluginFunction;
}

declare class Funk {
    private _options;
    private _ws;
    private _subscriptions;
    constructor(options?: FunkOptions);
    on(event: "fullData", callback: (fullData: FunkStation[]) => void): void;
    on(event: "stationChanged", callback: (fullData: FunkStation) => void): void;
    emitPing(): void;
    emitGetFullData(): void;
    send(message: FunkMessage): void;
}

export default VueFunk;
