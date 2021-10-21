export default class Funk {
    _options = {};
    _ws;
    _subscriptions = { fullData: [], stationChanged: [] };

    constructor(options) {
        if (options) this._options = options;
        this._ws = new WebSocket(this._options.urlOverride || "wss://funk.statio.cc");
        this._ws.onopen = () => {
            if (!this._options.disableAutoPing)
                setInterval(() => {
                    this.emitPing();
                }, 10000);
            if (!this._options.dontGetFullDataAutomatically) this.emitGetFullData();
        };
        this._ws.onmessage = (data) => {
            const message = JSON.parse(data.data);
            if (this._options.debugLogging) console.log(`RECEIVED | ${JSON.stringify(message)}`);
            if (message.type === "fullData") {
                this._subscriptions.fullData.forEach((sub) => sub(message.data));
            } else if (message.type === "stationChanged") {
                this._subscriptions.stationChanged.forEach((sub) => sub(message.data));
            }
        };
    }

    on(event, callback) {
        if (!typeof callback === "function") throw new Error("Callback must be a function");
        if (event === "fullData") {
            this._subscriptions.fullData.push(callback);
        } else if (event === "stationChanged") {
            this._subscriptions.stationChanged.push(callback);
        }
    }

    emitPing() {
        this.send({ type: "ping" });
    }

    emitGetFullData() {
        this.send({ type: "getFullData" });
    }

    send(message) {
        this._ws.send(JSON.stringify(message));
        if (this._options.debugLogging) console.log(`SENT     | ${JSON.stringify(message)}`);
    }
}
