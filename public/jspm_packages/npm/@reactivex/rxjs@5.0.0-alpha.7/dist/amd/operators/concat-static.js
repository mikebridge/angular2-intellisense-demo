/* */ 
"format cjs";
define(["require", "exports", '../Observable', '../schedulers/immediate'], function (require, exports, Observable_1, immediate_1) {
    /**
     * Joins multiple observables together by subscribing to them one at a time and merging their results
     * into the returned observable. Will wait for each observable to complete before moving on to the next.
     * @params {...Observable} the observables to concatenate
     * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
     * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
     */
    function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        var scheduler = immediate_1.default;
        var args = observables;
        if (typeof (args[observables.length - 1]).schedule === 'function') {
            scheduler = args.pop();
            args.push(1, scheduler);
        }
        return Observable_1.default.fromArray(observables).mergeAll(1);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = concat;
});
//# sourceMappingURL=concat-static.js.map