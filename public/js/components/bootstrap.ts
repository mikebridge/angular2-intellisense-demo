//# sourceMappingURL=bootstrap.js.map
/// <reference path="../../jspm_packages/npm/angular2@2.0.0-alpha.47/angular2.d.ts" />

import "zone.js";
import "reflect-metadata";

import { bootstrap, provide } from "angular2/angular2";

import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

console.log("BOOTSTRAPPING...");


import { App } from "javascripts/components/app";

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);

