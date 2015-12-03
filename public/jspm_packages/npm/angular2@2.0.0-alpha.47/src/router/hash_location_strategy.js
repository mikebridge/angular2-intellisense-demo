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
var __param = (this && this.__param) || function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var core_1 = require('../../core');
var location_strategy_1 = require('./location_strategy');
var lang_1 = require('../facade/lang');
var platform_location_1 = require('./platform_location');
var HashLocationStrategy = (function(_super) {
  __extends(HashLocationStrategy, _super);
  function HashLocationStrategy(_platformLocation, _baseHref) {
    _super.call(this);
    this._platformLocation = _platformLocation;
    this._baseHref = '';
    if (lang_1.isPresent(_baseHref)) {
      this._baseHref = _baseHref;
    }
  }
  HashLocationStrategy.prototype.onPopState = function(fn) {
    this._platformLocation.onPopState(fn);
  };
  HashLocationStrategy.prototype.getBaseHref = function() {
    return this._baseHref;
  };
  HashLocationStrategy.prototype.path = function() {
    var path = this._platformLocation.hash;
    return (path.length > 0 ? path.substring(1) : path) + location_strategy_1.normalizeQueryParams(this._platformLocation.search);
  };
  HashLocationStrategy.prototype.prepareExternalUrl = function(internal) {
    var url = location_strategy_1.joinWithSlash(this._baseHref, internal);
    return url.length > 0 ? ('#' + url) : url;
  };
  HashLocationStrategy.prototype.pushState = function(state, title, path, queryParams) {
    var url = this.prepareExternalUrl(path + location_strategy_1.normalizeQueryParams(queryParams));
    if (url.length == 0) {
      url = this._platformLocation.pathname;
    }
    this._platformLocation.pushState(state, title, url);
  };
  HashLocationStrategy.prototype.forward = function() {
    this._platformLocation.forward();
  };
  HashLocationStrategy.prototype.back = function() {
    this._platformLocation.back();
  };
  HashLocationStrategy = __decorate([core_1.Injectable(), __param(1, core_1.Optional()), __param(1, core_1.Inject(location_strategy_1.APP_BASE_HREF)), __metadata('design:paramtypes', [platform_location_1.PlatformLocation, String])], HashLocationStrategy);
  return HashLocationStrategy;
})(location_strategy_1.LocationStrategy);
exports.HashLocationStrategy = HashLocationStrategy;
