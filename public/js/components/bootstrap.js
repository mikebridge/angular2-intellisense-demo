//# sourceMappingURL=bootstrap.js.map
/// <reference path="../../jspm_packages/npm/angular2@2.0.0-alpha.47/angular2.d.ts" />
require("zone.js");
require("reflect-metadata");
var angular2_1 = require("angular2/angular2");
var router_1 = require('angular2/router');
console.log("BOOTSTRAPPING...");
var app_1 = require("javascripts/components/app");
angular2_1.bootstrap(app_1.App, [router_1.ROUTER_PROVIDERS, angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
//# sourceMappingURL=bootstrap.js.map