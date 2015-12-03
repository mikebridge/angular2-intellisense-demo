//# sourceMappingURL=app.js.map
/// <reference path="../../jspm_packages/npm/angular2@2.0.0-alpha.47/angular2.d.ts" />

import { Component, View } from "angular2/angular2";

import { ROUTER_DIRECTIVES, RouteConfig } from "angular2/router";

import { Test } from "./test";
import { Home } from "./home";

@Component({
    selector: "app"
})

@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "/assets/js/components/app.html"
})

@RouteConfig([
    //{ path: "/",                  redirectTo: "/home" },
    { path: "/",                  as: "Home",     component: Home },
    { path: "/test",              as: "Test",     component: Test }
])

export class App {
    public title: string;
    constructor() {
        this.title = "App title";
    }
}
