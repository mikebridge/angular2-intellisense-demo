/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('./lang');
var promise_1 = require('./promise');
exports.PromiseWrapper = promise_1.PromiseWrapper;
exports.Promise = promise_1.Promise;
var Rx_1 = require('@reactivex/rxjs/dist/cjs/Rx');
var Rx_2 = require('@reactivex/rxjs/dist/cjs/Rx');
exports.Subject = Rx_2.Subject;
var TimerWrapper = (function() {
  function TimerWrapper() {}
  TimerWrapper.setTimeout = function(fn, millis) {
    return lang_1.global.setTimeout(fn, millis);
  };
  TimerWrapper.clearTimeout = function(id) {
    lang_1.global.clearTimeout(id);
  };
  TimerWrapper.setInterval = function(fn, millis) {
    return lang_1.global.setInterval(fn, millis);
  };
  TimerWrapper.clearInterval = function(id) {
    lang_1.global.clearInterval(id);
  };
  return TimerWrapper;
})();
exports.TimerWrapper = TimerWrapper;
var ObservableWrapper = (function() {
  function ObservableWrapper() {}
  ObservableWrapper.subscribe = function(emitter, onNext, onError, onComplete) {
    if (onComplete === void 0) {
      onComplete = function() {};
    }
    onError = (typeof onError === "function") && onError || lang_1.noop;
    onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
    return emitter.subscribe({
      next: onNext,
      error: onError,
      complete: onComplete
    });
  };
  ObservableWrapper.isObservable = function(obs) {
    return obs instanceof Rx_1.Observable;
  };
  ObservableWrapper.hasSubscribers = function(obs) {
    return obs.observers.length > 0;
  };
  ObservableWrapper.dispose = function(subscription) {
    subscription.unsubscribe();
  };
  ObservableWrapper.callNext = function(emitter, value) {
    emitter.next(value);
  };
  ObservableWrapper.callEmit = function(emitter, value) {
    emitter.emit(value);
  };
  ObservableWrapper.callError = function(emitter, error) {
    emitter.error(error);
  };
  ObservableWrapper.callComplete = function(emitter) {
    emitter.complete();
  };
  ObservableWrapper.fromPromise = function(promise) {
    return Rx_1.Observable.fromPromise(promise);
  };
  ObservableWrapper.toPromise = function(obj) {
    return obj.toPromise();
  };
  return ObservableWrapper;
})();
exports.ObservableWrapper = ObservableWrapper;
var EventEmitter = (function(_super) {
  __extends(EventEmitter, _super);
  function EventEmitter(isAsync) {
    if (isAsync === void 0) {
      isAsync = true;
    }
    _super.call(this);
    this._isAsync = isAsync;
  }
  EventEmitter.prototype.emit = function(value) {
    _super.prototype.next.call(this, value);
  };
  EventEmitter.prototype.next = function(value) {
    _super.prototype.next.call(this, value);
  };
  EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
    var schedulerFn;
    var errorFn = function(err) {
      return null;
    };
    var completeFn = function() {
      return null;
    };
    if (generatorOrNext && typeof generatorOrNext === 'object') {
      schedulerFn = this._isAsync ? function(value) {
        setTimeout(function() {
          return generatorOrNext.next(value);
        });
      } : function(value) {
        generatorOrNext.next(value);
      };
      if (generatorOrNext.error) {
        errorFn = this._isAsync ? function(err) {
          setTimeout(function() {
            return generatorOrNext.error(err);
          });
        } : function(err) {
          generatorOrNext.error(err);
        };
      }
      if (generatorOrNext.complete) {
        completeFn = this._isAsync ? function() {
          setTimeout(function() {
            return generatorOrNext.complete();
          });
        } : function() {
          generatorOrNext.complete();
        };
      }
    } else {
      schedulerFn = this._isAsync ? function(value) {
        setTimeout(function() {
          return generatorOrNext(value);
        });
      } : function(value) {
        generatorOrNext(value);
      };
      if (error) {
        errorFn = this._isAsync ? function(err) {
          setTimeout(function() {
            return error(err);
          });
        } : function(err) {
          error(err);
        };
      }
      if (complete) {
        completeFn = this._isAsync ? function() {
          setTimeout(function() {
            return complete();
          });
        } : function() {
          complete();
        };
      }
    }
    return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
  };
  return EventEmitter;
})(Rx_1.Subject);
exports.EventEmitter = EventEmitter;
var Observable = (function(_super) {
  __extends(Observable, _super);
  function Observable() {
    _super.apply(this, arguments);
  }
  Observable.prototype.lift = function(operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };
  return Observable;
})(Rx_1.Observable);
exports.Observable = Observable;
