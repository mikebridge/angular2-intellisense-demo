//# sourceMappingURL=app.js.map
/// <reference path="../../jspm_packages/npm/angular2@2.0.0-alpha.47/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var router_1 = require("angular2/router");
var test_1 = require("./test");
var home_1 = require("./home");
var App = (function () {
    function App() {
        this.title = "App title";
    }
    App = __decorate([
        angular2_1.Component({
            selector: "app"
        }),
        angular2_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: "/assets/js/components/app.html"
        }),
        router_1.RouteConfig([
            //{ path: "/",                  redirectTo: "/home" },
            { path: "/", as: "Home", component: home_1.Home },
            { path: "/test", as: "Test", component: test_1.Test }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map