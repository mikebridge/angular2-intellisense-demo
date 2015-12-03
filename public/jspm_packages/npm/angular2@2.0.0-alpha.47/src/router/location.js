/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var location_strategy_1 = require('./location_strategy');
var async_1 = require('../facade/async');
var core_1 = require('../../core');
var Location = (function() {
  function Location(platformStrategy) {
    var _this = this;
    this.platformStrategy = platformStrategy;
    this._subject = new async_1.EventEmitter();
    var browserBaseHref = this.platformStrategy.getBaseHref();
    this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
    this.platformStrategy.onPopState(function(_) {
      async_1.ObservableWrapper.callEmit(_this._subject, {
        'url': _this.path(),
        'pop': true
      });
    });
  }
  Location.prototype.path = function() {
    return this.normalize(this.platformStrategy.path());
  };
  Location.prototype.normalize = function(url) {
    return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
  };
  Location.prototype.prepareExternalUrl = function(url) {
    if (url.length > 0 && !url.startsWith('/')) {
      url = '/' + url;
    }
    return this.platformStrategy.prepareExternalUrl(url);
  };
  Location.prototype.go = function(path, query) {
    if (query === void 0) {
      query = '';
    }
    this.platformStrategy.pushState(null, '', path, query);
  };
  Location.prototype.forward = function() {
    this.platformStrategy.forward();
  };
  Location.prototype.back = function() {
    this.platformStrategy.back();
  };
  Location.prototype.subscribe = function(onNext, onThrow, onReturn) {
    if (onThrow === void 0) {
      onThrow = null;
    }
    if (onReturn === void 0) {
      onReturn = null;
    }
    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
  };
  Location = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [location_strategy_1.LocationStrategy])], Location);
  return Location;
})();
exports.Location = Location;
function _stripBaseHref(baseHref, url) {
  if (baseHref.length > 0 && url.startsWith(baseHref)) {
    return url.substring(baseHref.length);
  }
  return url;
}
function stripIndexHtml(url) {
  if (/\/index.html$/g.test(url)) {
    return url.substring(0, url.length - 11);
  }
  return url;
}
function stripTrailingSlash(url) {
  if (/\/$/g.test(url)) {
    url = url.substring(0, url.length - 1);
  }
  return url;
}
