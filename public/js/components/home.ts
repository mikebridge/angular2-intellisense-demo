//# sourceMappingURL=home.js.map

import {Component, View} from "angular2/angular2";

@Component({
    selector: "home"
})

@View({
    templateUrl: "assets/javascripts/components/home.html"
})

export class Home {
    public title: string;
    constructor() {
        this.title = "Home Page";
    }
}
