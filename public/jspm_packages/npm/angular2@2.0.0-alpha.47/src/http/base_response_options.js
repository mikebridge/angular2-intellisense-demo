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
var core_1 = require('../../core');
var lang_1 = require('../facade/lang');
var headers_1 = require('./headers');
var enums_1 = require('./enums');
var ResponseOptions = (function() {
  function ResponseOptions(_a) {
    var _b = _a === void 0 ? {} : _a,
        body = _b.body,
        status = _b.status,
        headers = _b.headers,
        statusText = _b.statusText,
        type = _b.type,
        url = _b.url;
    this.body = lang_1.isPresent(body) ? body : null;
    this.status = lang_1.isPresent(status) ? status : null;
    this.headers = lang_1.isPresent(headers) ? headers : null;
    this.statusText = lang_1.isPresent(statusText) ? statusText : null;
    this.type = lang_1.isPresent(type) ? type : null;
    this.url = lang_1.isPresent(url) ? url : null;
  }
  ResponseOptions.prototype.merge = function(options) {
    return new ResponseOptions({
      body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
      status: lang_1.isPresent(options) && lang_1.isPresent(options.status) ? options.status : this.status,
      headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
      statusText: lang_1.isPresent(options) && lang_1.isPresent(options.statusText) ? options.statusText : this.statusText,
      type: lang_1.isPresent(options) && lang_1.isPresent(options.type) ? options.type : this.type,
      url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url
    });
  };
  return ResponseOptions;
})();
exports.ResponseOptions = ResponseOptions;
var BaseResponseOptions = (function(_super) {
  __extends(BaseResponseOptions, _super);
  function BaseResponseOptions() {
    _super.call(this, {
      status: 200,
      statusText: 'Ok',
      type: enums_1.ResponseTypes.Default,
      headers: new headers_1.Headers()
    });
  }
  BaseResponseOptions = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], BaseResponseOptions);
  return BaseResponseOptions;
})(ResponseOptions);
exports.BaseResponseOptions = BaseResponseOptions;
