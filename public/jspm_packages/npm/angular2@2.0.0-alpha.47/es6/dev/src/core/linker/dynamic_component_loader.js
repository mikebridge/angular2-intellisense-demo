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
import { Injectable } from 'angular2/src/core/di';
import { Compiler } from './compiler';
import { isPresent } from 'angular2/src/facade/lang';
import { AppViewManager } from 'angular2/src/core/linker/view_manager';
/**
 * Represents an instance of a Component created via {@link DynamicComponentLoader}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
 * method.
 */
export class ComponentRef {
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    get hostView() { return this.location.parentView; }
    /**
     * @internal
     *
     * The instance of the component.
     *
     * TODO(i): this api should be removed
     */
    get hostComponent() { return this.instance; }
}
export class ComponentRef_ extends ComponentRef {
    /**
     * TODO(i): refactor into public/private fields
     */
    constructor(location, instance, componentType, injector, _dispose) {
        super();
        this._dispose = _dispose;
        this.location = location;
        this.instance = instance;
        this.componentType = componentType;
        this.injector = injector;
    }
    /**
     * @internal
     *
     * Returns the type of this Component instance.
     *
     * TODO(i): this api should be removed
     */
    get hostComponentType() { return this.componentType; }
    dispose() { this._dispose(); }
}
/**
 * Service for instantiating a Component and attaching it to a View at a specified location.
 */
export class DynamicComponentLoader {
}
export let DynamicComponentLoader_ = class extends DynamicComponentLoader {
    constructor(_compiler, _viewManager) {
        super();
        this._compiler = _compiler;
        this._viewManager = _viewManager;
    }
    loadAsRoot(type, overrideSelector, injector, onDispose) {
        return this._compiler.compileInHost(type).then(hostProtoViewRef => {
            var hostViewRef = this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector);
            var newLocation = this._viewManager.getHostElement(hostViewRef);
            var component = this._viewManager.getComponent(newLocation);
            var dispose = () => {
                if (isPresent(onDispose)) {
                    onDispose();
                }
                this._viewManager.destroyRootHostView(hostViewRef);
            };
            return new ComponentRef_(newLocation, component, type, injector, dispose);
        });
    }
    loadIntoLocation(type, hostLocation, anchorName, providers = null) {
        return this.loadNextToLocation(type, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), providers);
    }
    loadNextToLocation(type, location, providers = null) {
        return this._compiler.compileInHost(type).then(hostProtoViewRef => {
            var viewContainer = this._viewManager.getViewContainer(location);
            var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers);
            var newLocation = this._viewManager.getHostElement(hostViewRef);
            var component = this._viewManager.getComponent(newLocation);
            var dispose = () => {
                var index = viewContainer.indexOf(hostViewRef);
                if (index !== -1) {
                    viewContainer.remove(index);
                }
            };
            return new ComponentRef_(newLocation, component, type, null, dispose);
        });
    }
};
DynamicComponentLoader_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Compiler, AppViewManager])
], DynamicComponentLoader_);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY19jb21wb25lbnRfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlci50cyJdLCJuYW1lcyI6WyJDb21wb25lbnRSZWYiLCJDb21wb25lbnRSZWYuaG9zdFZpZXciLCJDb21wb25lbnRSZWYuaG9zdENvbXBvbmVudCIsIkNvbXBvbmVudFJlZl8iLCJDb21wb25lbnRSZWZfLmNvbnN0cnVjdG9yIiwiQ29tcG9uZW50UmVmXy5ob3N0Q29tcG9uZW50VHlwZSIsIkNvbXBvbmVudFJlZl8uZGlzcG9zZSIsIkR5bmFtaWNDb21wb25lbnRMb2FkZXIiLCJEeW5hbWljQ29tcG9uZW50TG9hZGVyXyIsIkR5bmFtaWNDb21wb25lbnRMb2FkZXJfLmNvbnN0cnVjdG9yIiwiRHluYW1pY0NvbXBvbmVudExvYWRlcl8ubG9hZEFzUm9vdCIsIkR5bmFtaWNDb21wb25lbnRMb2FkZXJfLmxvYWRJbnRvTG9jYXRpb24iLCJEeW5hbWljQ29tcG9uZW50TG9hZGVyXy5sb2FkTmV4dFRvTG9jYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O09BQU8sRUFBcUQsVUFBVSxFQUFDLE1BQU0sc0JBQXNCO09BQzVGLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWTtPQUM1QixFQUEwQixTQUFTLEVBQUMsTUFBTSwwQkFBMEI7T0FFcEUsRUFBQyxjQUFjLEVBQUMsTUFBTSx1Q0FBdUM7QUFJcEU7Ozs7OztHQU1HO0FBQ0g7SUEwQkVBOztPQUVHQTtJQUNIQSxJQUFJQSxRQUFRQSxLQUFrQkMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFaEVEOzs7Ozs7T0FNR0E7SUFDSEEsSUFBSUEsYUFBYUEsS0FBVUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFRcERGLENB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QSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBO1lBQzdEQSxJQUFJQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ2pFQSxJQUFJQSxXQUFXQSxHQUNYQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGFBQWFBLENBQUNBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1lBQ3BGQSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxjQUFjQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNoRUEsSUFBSUEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFFNURBLElBQUlBLE9BQU9BLEdBQUdBO2dCQUNaQSxJQUFJQSxLQUFLQSxHQUFHQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFVQSxXQUFXQSxDQUFDQSxDQUFDQTtnQkFDeERBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQkEsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxDQUFDQTtZQUNIQSxDQUFDQSxDQUFDQTtZQUNGQSxNQUFNQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUN4RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7QUFDSEosQ0FBQ0E7QUEvQ0Q7SUFBQyxVQUFVLEVBQUU7OzRCQStDWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtLZXksIEluamVjdG9yLCBSZXNvbHZlZFByb3ZpZGVyLCBQcm92aWRlciwgcHJvdmlkZSwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtDb21waWxlcn0gZnJvbSAnLi9jb21waWxlcic7XG5pbXBvcnQge2lzVHlwZSwgVHlwZSwgc3RyaW5naWZ5LCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb21pc2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtBcHBWaWV3TWFuYWdlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfbWFuYWdlcic7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtWaWV3UmVmLCBIb3N0Vmlld1JlZn0gZnJvbSAnLi92aWV3X3JlZic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBjcmVhdGVkIHZpYSB7QGxpbmsgRHluYW1pY0NvbXBvbmVudExvYWRlcn0uXG4gKlxuICogYENvbXBvbmVudFJlZmAgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBDb21wb25lbnQgSW5zdGFuY2UgYXMgd2VsbCBvdGhlciBvYmplY3RzIHJlbGF0ZWQgdG8gdGhpc1xuICogQ29tcG9uZW50IEluc3RhbmNlIGFuZCBhbGxvd3MgeW91IHRvIGRlc3Ryb3kgdGhlIENvbXBvbmVudCBJbnN0YW5jZSB2aWEgdGhlIHtAbGluayAjZGlzcG9zZX1cbiAqIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudFJlZiB7XG4gIC8qKlxuICAgKiBUaGUgaW5qZWN0b3IgcHJvdmlkZWQge0BsaW5rIER5bmFtaWNDb21wb25lbnRMb2FkZXIjbG9hZEFzUm9vdH0uXG4gICAqXG4gICAqIFRPRE8oaSk6IHRoaXMgYXBpIGlzIHVzZWxlc3MgYW5kIHNob3VsZCBiZSByZXBsYWNlZCBieSBhbiBpbmplY3RvciByZXRyaWV2ZWQgZnJvbVxuICAgKiAgICAgdGhlIEhvc3RFbGVtZW50UmVmLCB3aGljaCBpcyBjdXJyZW50bHkgbm90IHBvc3NpYmxlLlxuICAgKi9cbiAgaW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBMb2NhdGlvbiBvZiB0aGUgSG9zdCBFbGVtZW50IG9mIHRoaXMgQ29tcG9uZW50IEluc3RhbmNlLlxuICAgKi9cbiAgbG9jYXRpb246IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgQ29tcG9uZW50LlxuICAgKi9cbiAgaW5zdGFuY2U6IGFueTtcblxuICAvKipcbiAgICogVGhlIHVzZXIgZGVmaW5lZCBjb21wb25lbnQgdHlwZSwgcmVwcmVzZW50ZWQgdmlhIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBjdXN0b21pemUgd29yZGluZyBmb3IgRGFydCBkb2NzIC0tPlxuICAgKi9cbiAgY29tcG9uZW50VHlwZTogVHlwZTtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWaWV3UmVmfSBvZiB0aGUgSG9zdCBWaWV3IG9mIHRoaXMgQ29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgZ2V0IGhvc3RWaWV3KCk6IEhvc3RWaWV3UmVmIHsgcmV0dXJuIHRoaXMubG9jYXRpb24ucGFyZW50VmlldzsgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIFRPRE8oaSk6IHRoaXMgYXBpIHNob3VsZCBiZSByZW1vdmVkXG4gICAqL1xuICBnZXQgaG9zdENvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFuZCBhbGwgb2YgdGhlIGRhdGEgc3RydWN0dXJlcyBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAqXG4gICAqIFRPRE8oaSk6IHJlbmFtZSB0byBkZXN0cm95IHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBBcHBWaWV3TWFuYWdlciBhbmQgVmlld0NvbnRhaW5lclJlZlxuICAgKi9cbiAgYWJzdHJhY3QgZGlzcG9zZSgpO1xufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50UmVmXyBleHRlbmRzIENvbXBvbmVudFJlZiB7XG4gIC8qKlxuICAgKiBUT0RPKGkpOiByZWZhY3RvciBpbnRvIHB1YmxpYy9wcml2YXRlIGZpZWxkc1xuICAgKi9cbiAgY29uc3RydWN0b3IobG9jYXRpb246IEVsZW1lbnRSZWYsIGluc3RhbmNlOiBhbnksIGNvbXBvbmVudFR5cGU6IFR5cGUsIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlzcG9zZTogKCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGlzIENvbXBvbmVudCBpbnN0YW5jZS5cbiAgICpcbiAgICogVE9ETyhpKTogdGhpcyBhcGkgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICovXG4gIGdldCBob3N0Q29tcG9uZW50VHlwZSgpOiBUeXBlIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50VHlwZTsgfVxuXG4gIGRpc3Bvc2UoKSB7IHRoaXMuX2Rpc3Bvc2UoKTsgfVxufVxuXG4vKipcbiAqIFNlcnZpY2UgZm9yIGluc3RhbnRpYXRpbmcgYSBDb21wb25lbnQgYW5kIGF0dGFjaGluZyBpdCB0byBhIFZpZXcgYXQgYSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEeW5hbWljQ29tcG9uZW50TG9hZGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBDb21wb25lbnQgYHR5cGVgIGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGVcbiAgICogcGxhdGZvcm0tc3BlY2lmaWMgZ2xvYmFsIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBjb21wb25lbnQncyBzZWxlY3Rvci5cbiAgICpcbiAgICogSW4gYSBicm93c2VyIHRoZSBwbGF0Zm9ybS1zcGVjaWZpYyBnbG9iYWwgdmlldyBpcyB0aGUgbWFpbiBET00gRG9jdW1lbnQuXG4gICAqXG4gICAqIElmIG5lZWRlZCwgdGhlIGNvbXBvbmVudCdzIHNlbGVjdG9yIGNhbiBiZSBvdmVycmlkZGVuIHZpYSBgb3ZlcnJpZGVTZWxlY3RvcmAuXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBwcm92aWRlIGBpbmplY3RvcmAgYW5kIHRoaXMge0BsaW5rIEluamVjdG9yfSB3aWxsIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlXG4gICAqIENvbXBvbmVudC5cbiAgICpcbiAgICogVG8gYmUgbm90aWZpZWQgd2hlbiB0aGlzIENvbXBvbmVudCBpbnN0YW5jZSBpcyBkZXN0cm95ZWQsIHlvdSBjYW4gYWxzbyBvcHRpb25hbGx5IHByb3ZpZGVcbiAgICogYG9uRGlzcG9zZWAgY2FsbGJhY2suXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUge0BsaW5rIENvbXBvbmVudFJlZn0gcmVwcmVzZW50aW5nIHRoZSBuZXdseSBjcmVhdGVkIENvbXBvbmVudC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnY2hpbGQtY29tcG9uZW50JyxcbiAgICogICB0ZW1wbGF0ZTogJ0NoaWxkJ1xuICAgKiB9KVxuICAgKiBjbGFzcyBDaGlsZENvbXBvbmVudCB7XG4gICAqIH1cbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgKiAgIHRlbXBsYXRlOiAnUGFyZW50ICg8Y2hpbGQgaWQ9XCJjaGlsZFwiPjwvY2hpbGQ+KSdcbiAgICogfSlcbiAgICogY2xhc3MgTXlBcHAge1xuICAgKiAgIGNvbnN0cnVjdG9yKGRjbDogRHluYW1pY0NvbXBvbmVudExvYWRlciwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAqICAgICBkY2wubG9hZEFzUm9vdChDaGlsZENvbXBvbmVudCwgJyNjaGlsZCcsIGluamVjdG9yKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogYm9vdHN0cmFwKE15QXBwKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFJlc3VsdGluZyBET006XG4gICAqXG4gICAqIGBgYFxuICAgKiA8bXktYXBwPlxuICAgKiAgIFBhcmVudCAoXG4gICAqICAgICA8Y2hpbGQgaWQ9XCJjaGlsZFwiPkNoaWxkPC9jaGlsZD5cbiAgICogICApXG4gICAqIDwvbXktYXBwPlxuICAgKiBgYGBcbiAgICovXG4gIGFic3RyYWN0IGxvYWRBc1Jvb3QodHlwZTogVHlwZSwgb3ZlcnJpZGVTZWxlY3Rvcjogc3RyaW5nLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgb25EaXNwb3NlPzogKCkgPT4gdm9pZCk6IFByb21pc2U8Q29tcG9uZW50UmVmPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBhbmQgYXR0YWNoZXMgaXQgdG8gYSBWaWV3IENvbnRhaW5lciBsb2NhdGVkIGluc2lkZSBvZiB0aGVcbiAgICogQ29tcG9uZW50IFZpZXcgb2YgYW5vdGhlciBDb21wb25lbnQgaW5zdGFuY2UuXG4gICAqXG4gICAqIFRoZSB0YXJnZXRlZCBDb21wb25lbnQgSW5zdGFuY2UgaXMgc3BlY2lmaWVkIHZpYSBpdHMgYGhvc3RMb2NhdGlvbmAge0BsaW5rIEVsZW1lbnRSZWZ9LiBUaGVcbiAgICogbG9jYXRpb24gd2l0aGluIHRoZSBDb21wb25lbnQgVmlldyBvZiB0aGlzIENvbXBvbmVudCBJbnN0YW5jZSBpcyBzcGVjaWZpZWQgdmlhIGBhbmNob3JOYW1lYFxuICAgKiBUZW1wbGF0ZSBWYXJpYWJsZSBOYW1lLlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdGlvbmFsbHkgcHJvdmlkZSBgcHJvdmlkZXJzYCB0byBjb25maWd1cmUgdGhlIHtAbGluayBJbmplY3Rvcn0gcHJvdmlzaW9uZWQgZm9yIHRoaXNcbiAgICogQ29tcG9uZW50IEluc3RhbmNlLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHtAbGluayBDb21wb25lbnRSZWZ9IHJlcHJlc2VudGluZyB0aGUgbmV3bHkgY3JlYXRlZCBDb21wb25lbnQuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ2NoaWxkLWNvbXBvbmVudCcsXG4gICAqICAgdGVtcGxhdGU6ICdDaGlsZCdcbiAgICogfSlcbiAgICogY2xhc3MgQ2hpbGRDb21wb25lbnQge1xuICAgKiB9XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICogICB0ZW1wbGF0ZTogJ1BhcmVudCAoPGRpdiAjY2hpbGQ+PC9kaXY+KSdcbiAgICogfSlcbiAgICogY2xhc3MgTXlBcHAge1xuICAgKiAgIGNvbnN0cnVjdG9yKGRjbDogRHluYW1pY0NvbXBvbmVudExvYWRlciwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgKiAgICAgZGNsLmxvYWRJbnRvTG9jYXRpb24oQ2hpbGRDb21wb25lbnQsIGVsZW1lbnRSZWYsICdjaGlsZCcpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBib290c3RyYXAoTXlBcHApO1xuICAgKiBgYGBcbiAgICpcbiAgICogUmVzdWx0aW5nIERPTTpcbiAgICpcbiAgICogYGBgXG4gICAqIDxteS1hcHA+XG4gICAqICAgIFBhcmVudCAoXG4gICAqICAgICAgPGRpdiAjY2hpbGQ9XCJcIiBjbGFzcz1cIm5nLWJpbmRpbmdcIj48L2Rpdj5cbiAgICogICAgICA8Y2hpbGQtY29tcG9uZW50IGNsYXNzPVwibmctYmluZGluZ1wiPkNoaWxkPC9jaGlsZC1jb21wb25lbnQ+XG4gICAqICAgIClcbiAgICogPC9teS1hcHA+XG4gICAqIGBgYFxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZEludG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBob3N0TG9jYXRpb246IEVsZW1lbnRSZWYsIGFuY2hvck5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM/OiBSZXNvbHZlZFByb3ZpZGVyW10pOiBQcm9taXNlPENvbXBvbmVudFJlZj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBDb21wb25lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBWaWV3IENvbnRhaW5lciBmb3VuZCBhdCB0aGVcbiAgICogYGxvY2F0aW9uYCBzcGVjaWZpZWQgYXMge0BsaW5rIEVsZW1lbnRSZWZ9LlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdGlvbmFsbHkgcHJvdmlkZSBgcHJvdmlkZXJzYCB0byBjb25maWd1cmUgdGhlIHtAbGluayBJbmplY3Rvcn0gcHJvdmlzaW9uZWQgZm9yIHRoaXNcbiAgICogQ29tcG9uZW50IEluc3RhbmNlLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHtAbGluayBDb21wb25lbnRSZWZ9IHJlcHJlc2VudGluZyB0aGUgbmV3bHkgY3JlYXRlZCBDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ2NoaWxkLWNvbXBvbmVudCcsXG4gICAqICAgdGVtcGxhdGU6ICdDaGlsZCdcbiAgICogfSlcbiAgICogY2xhc3MgQ2hpbGRDb21wb25lbnQge1xuICAgKiB9XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICogICB0ZW1wbGF0ZTogJ1BhcmVudCdcbiAgICogfSlcbiAgICogY2xhc3MgTXlBcHAge1xuICAgKiAgIGNvbnN0cnVjdG9yKGRjbDogRHluYW1pY0NvbXBvbmVudExvYWRlciwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgKiAgICAgZGNsLmxvYWROZXh0VG9Mb2NhdGlvbihDaGlsZENvbXBvbmVudCwgZWxlbWVudFJlZik7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIGJvb3RzdHJhcChNeUFwcCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBSZXN1bHRpbmcgRE9NOlxuICAgKlxuICAgKiBgYGBcbiAgICogPG15LWFwcD5QYXJlbnQ8L215LWFwcD5cbiAgICogPGNoaWxkLWNvbXBvbmVudD5DaGlsZDwvY2hpbGQtY29tcG9uZW50PlxuICAgKiBgYGBcbiAgICovXG4gIGFic3RyYWN0IGxvYWROZXh0VG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBsb2NhdGlvbjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycz86IFJlc29sdmVkUHJvdmlkZXJbXSk6IFByb21pc2U8Q29tcG9uZW50UmVmPjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRMb2FkZXJfIGV4dGVuZHMgRHluYW1pY0NvbXBvbmVudExvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbXBpbGVyOiBDb21waWxlciwgcHJpdmF0ZSBfdmlld01hbmFnZXI6IEFwcFZpZXdNYW5hZ2VyKSB7IHN1cGVyKCk7IH1cblxuICBsb2FkQXNSb290KHR5cGU6IFR5cGUsIG92ZXJyaWRlU2VsZWN0b3I6IHN0cmluZywgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgIG9uRGlzcG9zZT86ICgpID0+IHZvaWQpOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlci5jb21waWxlSW5Ib3N0KHR5cGUpLnRoZW4oaG9zdFByb3RvVmlld1JlZiA9PiB7XG4gICAgICB2YXIgaG9zdFZpZXdSZWYgPVxuICAgICAgICAgIHRoaXMuX3ZpZXdNYW5hZ2VyLmNyZWF0ZVJvb3RIb3N0Vmlldyhob3N0UHJvdG9WaWV3UmVmLCBvdmVycmlkZVNlbGVjdG9yLCBpbmplY3Rvcik7XG4gICAgICB2YXIgbmV3TG9jYXRpb24gPSB0aGlzLl92aWV3TWFuYWdlci5nZXRIb3N0RWxlbWVudChob3N0Vmlld1JlZik7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5fdmlld01hbmFnZXIuZ2V0Q29tcG9uZW50KG5ld0xvY2F0aW9uKTtcblxuICAgICAgdmFyIGRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQob25EaXNwb3NlKSkge1xuICAgICAgICAgIG9uRGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZpZXdNYW5hZ2VyLmRlc3Ryb3lSb290SG9zdFZpZXcoaG9zdFZpZXdSZWYpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50UmVmXyhuZXdMb2NhdGlvbiwgY29tcG9uZW50LCB0eXBlLCBpbmplY3RvciwgZGlzcG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkSW50b0xvY2F0aW9uKHR5cGU6IFR5cGUsIGhvc3RMb2NhdGlvbjogRWxlbWVudFJlZiwgYW5jaG9yTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdID0gbnVsbCk6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMubG9hZE5leHRUb0xvY2F0aW9uKFxuICAgICAgICB0eXBlLCB0aGlzLl92aWV3TWFuYWdlci5nZXROYW1lZEVsZW1lbnRJbkNvbXBvbmVudFZpZXcoaG9zdExvY2F0aW9uLCBhbmNob3JOYW1lKSxcbiAgICAgICAgcHJvdmlkZXJzKTtcbiAgfVxuXG4gIGxvYWROZXh0VG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBsb2NhdGlvbjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdID0gbnVsbCk6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyLmNvbXBpbGVJbkhvc3QodHlwZSkudGhlbihob3N0UHJvdG9WaWV3UmVmID0+IHtcbiAgICAgIHZhciB2aWV3Q29udGFpbmVyID0gdGhpcy5fdmlld01hbmFnZXIuZ2V0Vmlld0NvbnRhaW5lcihsb2NhdGlvbik7XG4gICAgICB2YXIgaG9zdFZpZXdSZWYgPVxuICAgICAgICAgIHZpZXdDb250YWluZXIuY3JlYXRlSG9zdFZpZXcoaG9zdFByb3RvVmlld1JlZiwgdmlld0NvbnRhaW5lci5sZW5ndGgsIHByb3ZpZGVycyk7XG4gICAgICB2YXIgbmV3TG9jYXRpb24gPSB0aGlzLl92aWV3TWFuYWdlci5nZXRIb3N0RWxlbWVudChob3N0Vmlld1JlZik7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5fdmlld01hbmFnZXIuZ2V0Q29tcG9uZW50KG5ld0xvY2F0aW9uKTtcblxuICAgICAgdmFyIGRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICAgIHZhciBpbmRleCA9IHZpZXdDb250YWluZXIuaW5kZXhPZig8Vmlld1JlZj5ob3N0Vmlld1JlZik7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB2aWV3Q29udGFpbmVyLnJlbW92ZShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV3IENvbXBvbmVudFJlZl8obmV3TG9jYXRpb24sIGNvbXBvbmVudCwgdHlwZSwgbnVsbCwgZGlzcG9zZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==