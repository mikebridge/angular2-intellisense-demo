/* */ 
"format cjs";
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from "angular2/src/core/di";
import { RenderViewRef, RenderFragmentRef, RenderViewWithFragments } from "angular2/src/core/render/api";
import { ON_WEB_WORKER } from "angular2/src/web_workers/shared/api";
import { ListWrapper } from "angular2/src/facade/collection";
export let RenderViewWithFragmentsStore = class {
    constructor(onWebWorker) {
        this._nextIndex = 0;
        this._onWebWorker = onWebWorker;
        this._lookupByIndex = new Map();
        this._lookupByView = new Map();
        this._viewFragments = new Map();
    }
    allocate(fragmentCount) {
        var initialIndex = this._nextIndex;
        var viewRef = new WebWorkerRenderViewRef(this._nextIndex++);
        var fragmentRefs = ListWrapper.createGrowableSize(fragmentCount);
        for (var i = 0; i < fragmentCount; i++) {
            fragmentRefs[i] = new WebWorkerRenderFragmentRef(this._nextIndex++);
        }
        var renderViewWithFragments = new RenderViewWithFragments(viewRef, fragmentRefs);
        this.store(renderViewWithFragments, initialIndex);
        return renderViewWithFragments;
    }
    store(view, startIndex) {
        this._lookupByIndex.set(startIndex, view.viewRef);
        this._lookupByView.set(view.viewRef, startIndex);
        startIndex++;
        view.fragmentRefs.forEach(ref => {
            this._lookupByIndex.set(startIndex, ref);
            this._lookupByView.set(ref, startIndex);
            startIndex++;
        });
        this._viewFragments.set(view.viewRef, view.fragmentRefs);
    }
    remove(view) {
        this._removeRef(view);
        var fragments = this._viewFragments.get(view);
        fragments.forEach((fragment) => { this._removeRef(fragment); });
        this._viewFragments.delete(view);
    }
    _removeRef(ref) {
        var index = this._lookupByView.get(ref);
        this._lookupByView.delete(ref);
        this._lookupByIndex.delete(index);
    }
    serializeRenderViewRef(viewRef) {
        return this._serializeRenderFragmentOrViewRef(viewRef);
    }
    serializeRenderFragmentRef(fragmentRef) {
        return this._serializeRenderFragmentOrViewRef(fragmentRef);
    }
    deserializeRenderViewRef(ref) {
        if (ref == null) {
            return null;
        }
        return this._retrieve(ref);
    }
    deserializeRenderFragmentRef(ref) {
        if (ref == null) {
            return null;
        }
        return this._retrieve(ref);
    }
    _retrieve(ref) {
        if (ref == null) {
            return null;
        }
        if (!this._lookupByIndex.has(ref)) {
            return null;
        }
        return this._lookupByIndex.get(ref);
    }
    _serializeRenderFragmentOrViewRef(ref) {
        if (ref == null) {
            return null;
        }
        if (this._onWebWorker) {
            return ref.serialize();
        }
        else {
            return this._lookupByView.get(ref);
        }
    }
    serializeViewWithFragments(view) {
        if (view == null) {
            return null;
        }
        if (this._onWebWorker) {
            return {
                'viewRef': view.viewRef.serialize(),
                'fragmentRefs': view.fragmentRefs.map(val => val.serialize())
            };
        }
        else {
            return {
                'viewRef': this._lookupByView.get(view.viewRef),
                'fragmentRefs': view.fragmentRefs.map(val => this._lookupByView.get(val))
            };
        }
    }
    deserializeViewWithFragments(obj) {
        if (obj == null) {
            return null;
        }
        var viewRef = this.deserializeRenderViewRef(obj['viewRef']);
        var fragments = obj['fragmentRefs'].map(val => this.deserializeRenderFragmentRef(val));
        return new RenderViewWithFragments(viewRef, fragments);
    }
};
RenderViewWithFragmentsStore = __decorate([
    Injectable(),
    __param(0, Inject(ON_WEB_WORKER)), 
    __metadata('design:paramtypes', [Object])
], RenderViewWithFragmentsStore);
export class WebWorkerRenderViewRef extends RenderViewRef {
    constructor(refNumber) {
        super();
        this.refNumber = refNumber;
    }
    serialize() { return this.refNumber; }
    static deserialize(ref) {
        return new WebWorkerRenderViewRef(ref);
    }
}
export class WebWorkerRenderFragmentRef extends RenderFragmentRef {
    constructor(refNumber) {
        super();
        this.refNumber = refNumber;
    }
    serialize() { return this.refNumber; }
    static deserialize(ref) {
        return new WebWorkerRenderFragmentRef(ref);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3ZpZXdfd2l0aF9mcmFnbWVudHNfc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl92aWV3X3dpdGhfZnJhZ21lbnRzX3N0b3JlLnRzIl0sIm5hbWVzIjpbIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUiLCJSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLmNvbnN0cnVjdG9yIiwiUmVuZGVyVmlld1dpdGhGcmFnbWVudHNTdG9yZS5hbGxvY2F0ZSIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuc3RvcmUiLCJSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLnJlbW92ZSIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuX3JlbW92ZVJlZiIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuc2VyaWFsaXplUmVuZGVyVmlld1JlZiIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRSZWYiLCJSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLmRlc2VyaWFsaXplUmVuZGVyVmlld1JlZiIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuZGVzZXJpYWxpemVSZW5kZXJGcmFnbWVudFJlZiIsIlJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmUuX3JldHJpZXZlIiwiUmVuZGVyVmlld1dpdGhGcmFnbWVudHNTdG9yZS5fc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRPclZpZXdSZWYiLCJSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLnNlcmlhbGl6ZVZpZXdXaXRoRnJhZ21lbnRzIiwiUmVuZGVyVmlld1dpdGhGcmFnbWVudHNTdG9yZS5kZXNlcmlhbGl6ZVZpZXdXaXRoRnJhZ21lbnRzIiwiV2ViV29ya2VyUmVuZGVyVmlld1JlZiIsIldlYldvcmtlclJlbmRlclZpZXdSZWYuY29uc3RydWN0b3IiLCJXZWJXb3JrZXJSZW5kZXJWaWV3UmVmLnNlcmlhbGl6ZSIsIldlYldvcmtlclJlbmRlclZpZXdSZWYuZGVzZXJpYWxpemUiLCJXZWJXb3JrZXJSZW5kZXJGcmFnbWVudFJlZiIsIldlYldvcmtlclJlbmRlckZyYWdtZW50UmVmLmNvbnN0cnVjdG9yIiwiV2ViV29ya2VyUmVuZGVyRnJhZ21lbnRSZWYuc2VyaWFsaXplIiwiV2ViV29ya2VyUmVuZGVyRnJhZ21lbnRSZWYuZGVzZXJpYWxpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O09BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sc0JBQXNCO09BQ2hELEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDeEIsTUFBTSw4QkFBOEI7T0FDOUIsRUFBQyxhQUFhLEVBQUMsTUFBTSxxQ0FBcUM7T0FDMUQsRUFBYSxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0M7QUFFdEU7SUFRRUEsWUFBbUNBLFdBQVdBO1FBTnRDQyxlQUFVQSxHQUFXQSxDQUFDQSxDQUFDQTtRQU83QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLEdBQUdBLEVBQTZDQSxDQUFDQTtRQUMzRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsR0FBR0EsRUFBNkNBLENBQUNBO1FBQzFFQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxHQUFHQSxFQUFzQ0EsQ0FBQ0E7SUFDdEVBLENBQUNBO0lBRURELFFBQVFBLENBQUNBLGFBQXFCQTtRQUM1QkUsSUFBSUEsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFFbkNBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLHNCQUFzQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDNURBLElBQUlBLFlBQVlBLEdBQUdBLFdBQVdBLENBQUNBLGtC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QSxLQUFhRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUU5Q0YsT0FBT0EsV0FBV0EsQ0FBQ0EsR0FBV0E7UUFDNUJHLE1BQU1BLENBQUNBLElBQUlBLDBCQUEwQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDN0NBLENBQUNBO0FBQ0hILENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpXCI7XG5pbXBvcnQge1xuICBSZW5kZXJWaWV3UmVmLFxuICBSZW5kZXJGcmFnbWVudFJlZixcbiAgUmVuZGVyVmlld1dpdGhGcmFnbWVudHNcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGlcIjtcbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvYXBpXCI7XG5pbXBvcnQge01hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlIHtcbiAgcHJpdmF0ZSBfbmV4dEluZGV4OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9vbldlYldvcmtlcjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfbG9va3VwQnlJbmRleDogTWFwPG51bWJlciwgUmVuZGVyVmlld1JlZiB8IFJlbmRlckZyYWdtZW50UmVmPjtcbiAgcHJpdmF0ZSBfbG9va3VwQnlWaWV3OiBNYXA8UmVuZGVyVmlld1JlZiB8IFJlbmRlckZyYWdtZW50UmVmLCBudW1iZXI+O1xuICBwcml2YXRlIF92aWV3RnJhZ21lbnRzOiBNYXA8UmVuZGVyVmlld1JlZiwgUmVuZGVyRnJhZ21lbnRSZWZbXT47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChPTl9XRUJfV09SS0VSKSBvbldlYldvcmtlcikge1xuICAgIHRoaXMuX29uV2ViV29ya2VyID0gb25XZWJXb3JrZXI7XG4gICAgdGhpcy5fbG9va3VwQnlJbmRleCA9IG5ldyBNYXA8bnVtYmVyLCBSZW5kZXJWaWV3UmVmIHwgUmVuZGVyRnJhZ21lbnRSZWY+KCk7XG4gICAgdGhpcy5fbG9va3VwQnlWaWV3ID0gbmV3IE1hcDxSZW5kZXJWaWV3UmVmIHwgUmVuZGVyRnJhZ21lbnRSZWYsIG51bWJlcj4oKTtcbiAgICB0aGlzLl92aWV3RnJhZ21lbnRzID0gbmV3IE1hcDxSZW5kZXJWaWV3UmVmLCBSZW5kZXJGcmFnbWVudFJlZltdPigpO1xuICB9XG5cbiAgYWxsb2NhdGUoZnJhZ21lbnRDb3VudDogbnVtYmVyKTogUmVuZGVyVmlld1dpdGhGcmFnbWVudHMge1xuICAgIHZhciBpbml0aWFsSW5kZXggPSB0aGlzLl9uZXh0SW5kZXg7XG5cbiAgICB2YXIgdmlld1JlZiA9IG5ldyBXZWJXb3JrZXJSZW5kZXJWaWV3UmVmKHRoaXMuX25leHRJbmRleCsrKTtcbiAgICB2YXIgZnJhZ21lbnRSZWZzID0gTGlzdFdyYXBwZXIuY3JlYXRlR3Jvd2FibGVTaXplKGZyYWdtZW50Q291bnQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmcmFnbWVudENvdW50OyBpKyspIHtcbiAgICAgIGZyYWdtZW50UmVmc1tpXSA9IG5ldyBXZWJXb3JrZXJSZW5kZXJGcmFnbWVudFJlZih0aGlzLl9uZXh0SW5kZXgrKyk7XG4gICAgfVxuICAgIHZhciByZW5kZXJWaWV3V2l0aEZyYWdtZW50cyA9IG5ldyBSZW5kZXJWaWV3V2l0aEZyYWdtZW50cyh2aWV3UmVmLCBmcmFnbWVudFJlZnMpO1xuICAgIHRoaXMuc3RvcmUocmVuZGVyVmlld1dpdGhGcmFnbWVudHMsIGluaXRpYWxJbmRleCk7XG4gICAgcmV0dXJuIHJlbmRlclZpZXdXaXRoRnJhZ21lbnRzO1xuICB9XG5cbiAgc3RvcmUodmlldzogUmVuZGVyVmlld1dpdGhGcmFnbWVudHMsIHN0YXJ0SW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2xvb2t1cEJ5SW5kZXguc2V0KHN0YXJ0SW5kZXgsIHZpZXcudmlld1JlZik7XG4gICAgdGhpcy5fbG9va3VwQnlWaWV3LnNldCh2aWV3LnZpZXdSZWYsIHN0YXJ0SW5kZXgpO1xuICAgIHN0YXJ0SW5kZXgrKztcblxuICAgIHZpZXcuZnJhZ21lbnRSZWZzLmZvckVhY2gocmVmID0+IHtcbiAgICAgIHRoaXMuX2xvb2t1cEJ5SW5kZXguc2V0KHN0YXJ0SW5kZXgsIHJlZik7XG4gICAgICB0aGlzLl9sb29rdXBCeVZpZXcuc2V0KHJlZiwgc3RhcnRJbmRleCk7XG4gICAgICBzdGFydEluZGV4Kys7XG4gICAgfSk7XG5cbiAgICB0aGlzLl92aWV3RnJhZ21lbnRzLnNldCh2aWV3LnZpZXdSZWYsIHZpZXcuZnJhZ21lbnRSZWZzKTtcbiAgfVxuXG4gIHJlbW92ZSh2aWV3OiBSZW5kZXJWaWV3UmVmKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUmVmKHZpZXcpO1xuICAgIHZhciBmcmFnbWVudHMgPSB0aGlzLl92aWV3RnJhZ21lbnRzLmdldCh2aWV3KTtcbiAgICBmcmFnbWVudHMuZm9yRWFjaCgoZnJhZ21lbnQpID0+IHsgdGhpcy5fcmVtb3ZlUmVmKGZyYWdtZW50KTsgfSk7XG4gICAgdGhpcy5fdmlld0ZyYWdtZW50cy5kZWxldGUodmlldyk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVSZWYocmVmOiBSZW5kZXJWaWV3UmVmIHwgUmVuZGVyRnJhZ21lbnRSZWYpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9sb29rdXBCeVZpZXcuZ2V0KHJlZik7XG4gICAgdGhpcy5fbG9va3VwQnlWaWV3LmRlbGV0ZShyZWYpO1xuICAgIHRoaXMuX2xvb2t1cEJ5SW5kZXguZGVsZXRlKGluZGV4KTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVJlbmRlclZpZXdSZWYodmlld1JlZjogUmVuZGVyVmlld1JlZik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlckZyYWdtZW50T3JWaWV3UmVmKHZpZXdSZWYpO1xuICB9XG5cbiAgc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRSZWYoZnJhZ21lbnRSZWY6IFJlbmRlckZyYWdtZW50UmVmKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRPclZpZXdSZWYoZnJhZ21lbnRSZWYpO1xuICB9XG5cbiAgZGVzZXJpYWxpemVSZW5kZXJWaWV3UmVmKHJlZjogbnVtYmVyKTogUmVuZGVyVmlld1JlZiB7XG4gICAgaWYgKHJlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmV0cmlldmUocmVmKTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRSZWYocmVmOiBudW1iZXIpOiBSZW5kZXJGcmFnbWVudFJlZiB7XG4gICAgaWYgKHJlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmV0cmlldmUocmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldHJpZXZlKHJlZjogbnVtYmVyKTogUmVuZGVyVmlld1JlZiB8IFJlbmRlckZyYWdtZW50UmVmIHtcbiAgICBpZiAocmVmID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbG9va3VwQnlJbmRleC5oYXMocmVmKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cEJ5SW5kZXguZ2V0KHJlZik7XG4gIH1cblxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlckZyYWdtZW50T3JWaWV3UmVmKHJlZjogUmVuZGVyVmlld1JlZiB8IFJlbmRlckZyYWdtZW50UmVmKTogbnVtYmVyIHtcbiAgICBpZiAocmVmID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vbldlYldvcmtlcikge1xuICAgICAgcmV0dXJuICg8V2ViV29ya2VyUmVuZGVyRnJhZ21lbnRSZWYgfCBXZWJXb3JrZXJSZW5kZXJWaWV3UmVmPnJlZikuc2VyaWFsaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb29rdXBCeVZpZXcuZ2V0KHJlZik7XG4gICAgfVxuICB9XG5cbiAgc2VyaWFsaXplVmlld1dpdGhGcmFnbWVudHModmlldzogUmVuZGVyVmlld1dpdGhGcmFnbWVudHMpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgaWYgKHZpZXcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29uV2ViV29ya2VyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndmlld1JlZic6ICg8V2ViV29ya2VyUmVuZGVyVmlld1JlZj52aWV3LnZpZXdSZWYpLnNlcmlhbGl6ZSgpLFxuICAgICAgICAnZnJhZ21lbnRSZWZzJzogdmlldy5mcmFnbWVudFJlZnMubWFwKHZhbCA9PiAoPGFueT52YWwpLnNlcmlhbGl6ZSgpKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3ZpZXdSZWYnOiB0aGlzLl9sb29rdXBCeVZpZXcuZ2V0KHZpZXcudmlld1JlZiksXG4gICAgICAgICdmcmFnbWVudFJlZnMnOiB2aWV3LmZyYWdtZW50UmVmcy5tYXAodmFsID0+IHRoaXMuX2xvb2t1cEJ5Vmlldy5nZXQodmFsKSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZGVzZXJpYWxpemVWaWV3V2l0aEZyYWdtZW50cyhvYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyVmlld1dpdGhGcmFnbWVudHMge1xuICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHZpZXdSZWYgPSB0aGlzLmRlc2VyaWFsaXplUmVuZGVyVmlld1JlZihvYmpbJ3ZpZXdSZWYnXSk7XG4gICAgdmFyIGZyYWdtZW50cyA9ICg8YW55W10+b2JqWydmcmFnbWVudFJlZnMnXSkubWFwKHZhbCA9PiB0aGlzLmRlc2VyaWFsaXplUmVuZGVyRnJhZ21lbnRSZWYodmFsKSk7XG5cbiAgICByZXR1cm4gbmV3IFJlbmRlclZpZXdXaXRoRnJhZ21lbnRzKHZpZXdSZWYsIGZyYWdtZW50cyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlclZpZXdSZWYgZXh0ZW5kcyBSZW5kZXJWaWV3UmVmIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlZk51bWJlcjogbnVtYmVyKSB7IHN1cGVyKCk7IH1cbiAgc2VyaWFsaXplKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnJlZk51bWJlcjsgfVxuXG4gIHN0YXRpYyBkZXNlcmlhbGl6ZShyZWY6IG51bWJlcik6IFdlYldvcmtlclJlbmRlclZpZXdSZWYge1xuICAgIHJldHVybiBuZXcgV2ViV29ya2VyUmVuZGVyVmlld1JlZihyZWYpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJGcmFnbWVudFJlZiBleHRlbmRzIFJlbmRlckZyYWdtZW50UmVmIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlZk51bWJlcjogbnVtYmVyKSB7IHN1cGVyKCk7IH1cblxuICBzZXJpYWxpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMucmVmTnVtYmVyOyB9XG5cbiAgc3RhdGljIGRlc2VyaWFsaXplKHJlZjogbnVtYmVyKTogV2ViV29ya2VyUmVuZGVyRnJhZ21lbnRSZWYge1xuICAgIHJldHVybiBuZXcgV2ViV29ya2VyUmVuZGVyRnJhZ21lbnRSZWYocmVmKTtcbiAgfVxufVxuIl19