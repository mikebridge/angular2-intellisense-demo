//# sourceMappingURL=home.js.map

import {Component, View} from "angular2/angular2";

@Component({
    selector: "test"
})

@View({
    templateUrl: "assets/js/components/test.html"
})

export class Test {
    public title: string;
    constructor() {
        this.title = "Test Page";
    }
}
