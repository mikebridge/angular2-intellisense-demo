/* */ 
"format cjs";
import { unimplemented } from 'angular2/src/facade/exceptions';
/**
 * Represents an Angular ProtoView in the Rendering Context.
 *
 * When you implement a custom {@link Renderer}, `RenderProtoViewRef` specifies what Render View
 * your renderer should create.
 *
 * `RenderProtoViewRef` is a counterpart to {@link ProtoViewRef} available in the Application
 * Context. But unlike `ProtoViewRef`, `RenderProtoViewRef` contains all static nested Proto Views
 * that are recursively merged into a single Render Proto View.

 *
 * <!-- TODO: this is created by Renderer#createProtoView in the new compiler -->
 */
export class RenderProtoViewRef {
}
/**
 * Represents a list of sibling Nodes that can be moved by the {@link Renderer} independently of
 * other Render Fragments.
 *
 * Any {@link RenderView} has one Render Fragment.
 *
 * Additionally any View with an Embedded View that contains a {@link NgContent View Projection}
 * results in additional Render Fragment.
 */
/*
  <div>foo</div>
  {{bar}}


  <div>foo</div> -> view 1 / fragment 1
  <ul>
    <template ng-for>
      <li>{{fg}}</li> -> view 2 / fragment 1
    </template>
  </ul>
  {{bar}}


  <div>foo</div> -> view 1 / fragment 1
  <ul>
    <template ng-if>
      <li><ng-content></></li> -> view 1 / fragment 2
    </template>
    <template ng-for>
      <li><ng-content></></li> ->
      <li></li>                -> view 1 / fragment 2 + view 2 / fragment 1..n-1
    </template>
  </ul>
  {{bar}}
 */
// TODO(i): refactor into an interface
export class RenderFragmentRef {
}
/**
 * Represents an Angular View in the Rendering Context.
 *
 * `RenderViewRef` specifies to the {@link Renderer} what View to update or destroy.
 *
 * Unlike a {@link ViewRef} available in the Application Context, Render View contains all the
 * static Component Views that have been recursively merged into a single Render View.
 *
 * Each `RenderViewRef` contains one or more {@link RenderFragmentRef Render Fragments}, these
 * Fragments are created, hydrated, dehydrated and destroyed as a single unit together with the
 * View.
 */
// TODO(i): refactor into an interface
export class RenderViewRef {
}
export class RenderTemplateCmd {
}
export class RenderBeginCmd extends RenderTemplateCmd {
    get ngContentIndex() { return unimplemented(); }
    ;
    get isBound() { return unimplemented(); }
    ;
}
export class RenderTextCmd extends RenderBeginCmd {
    get value() { return unimplemented(); }
    ;
}
export class RenderNgContentCmd extends RenderTemplateCmd {
    // The index of this NgContent element
    get index() { return unimplemented(); }
    ;
    // The index of the NgContent element into which this
    // NgContent element should be projected (if any)
    get ngContentIndex() { return unimplemented(); }
    ;
}
export class RenderBeginElementCmd extends RenderBeginCmd {
    get name() { return unimplemented(); }
    ;
    get attrNameAndValues() { return unimplemented(); }
    ;
    get eventTargetAndNames() { return unimplemented(); }
    ;
}
export class RenderBeginComponentCmd extends RenderBeginElementCmd {
    get templateId() { return unimplemented(); }
    ;
}
export class RenderEmbeddedTemplateCmd extends RenderBeginElementCmd {
    get isMerged() { return unimplemented(); }
    ;
    get children() { return unimplemented(); }
    ;
}
/**
 * Container class produced by a {@link Renderer} when creating a Render View.
 *
 * An instance of `RenderViewWithFragments` contains a {@link RenderViewRef} and an array of
 * {@link RenderFragmentRef}s belonging to this Render View.
 */
// TODO(i): refactor this by RenderViewWithFragments and adding fragments directly to RenderViewRef
export class RenderViewWithFragments {
    constructor(
        /**
         * Reference to the {@link RenderViewRef}.
         */
        viewRef, 
        /**
         * Array of {@link RenderFragmentRef}s ordered in the depth-first order.
         */
        fragmentRefs) {
        this.viewRef = viewRef;
        this.fragmentRefs = fragmentRefs;
    }
}
export class RenderComponentTemplate {
    constructor(id, shortId, encapsulation, commands, styles) {
        this.id = id;
        this.shortId = shortId;
        this.encapsulation = encapsulation;
        this.commands = commands;
        this.styles = styles;
    }
}
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is {@link DomRenderer}. Also see {@link WebWorkerRenderer}.
 */
export class Renderer {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaS50cyJdLCJuYW1lcyI6WyJSZW5kZXJQcm90b1ZpZXdSZWYiLCJSZW5kZXJGcmFnbWVudFJlZiIsIlJlbmRlclZpZXdSZWYiLCJSZW5kZXJUZW1wbGF0ZUNtZCIsIlJlbmRlckJlZ2luQ21kIiwiUmVuZGVyQmVnaW5DbWQubmdDb250ZW50SW5kZXgiLCJSZW5kZXJCZWdpbkNtZC5pc0JvdW5kIiwiUmVuZGVyVGV4dENtZCIsIlJlbmRlclRleHRDbWQudmFsdWUiLCJSZW5kZXJOZ0NvbnRlbnRDbWQiLCJSZW5kZXJOZ0NvbnRlbnRDbWQuaW5kZXgiLCJSZW5kZXJOZ0NvbnRlbnRDbWQubmdDb250ZW50SW5kZXgiLCJSZW5kZXJCZWdpbkVsZW1lbnRDbWQiLCJSZW5kZXJCZWdpbkVsZW1lbnRDbWQubmFtZSIsIlJlbmRlckJlZ2luRWxlbWVudENtZC5hdHRyTmFtZUFuZFZhbHVlcyIsIlJlbmRlckJlZ2luRWxlbWVudENtZC5ldmVudFRhcmdldEFuZE5hbWVzIiwiUmVuZGVyQmVnaW5Db21wb25lbnRDbWQiLCJSZW5kZXJCZWdpbkNvbXBvbmVudENtZC50ZW1wbGF0ZUlkIiwiUmVuZGVyRW1iZWRkZWRUZW1wbGF0ZUNtZCIsIlJlbmRlckVtYmVkZGVkVGVtcGxhdGVDbWQuaXNNZXJnZWQiLCJSZW5kZXJFbWJlZGRlZFRlbXBsYXRlQ21kLmNoaWxkcmVuIiwiUmVuZGVyVmlld1dpdGhGcmFnbWVudHMiLCJSZW5kZXJWaWV3V2l0aEZyYWdtZW50cy5jb25zdHJ1Y3RvciIsIlJlbmRlckNvbXBvbmVudFRlbXBsYXRlIiwiUmVuZGVyQ29tcG9uZW50VGVtcGxhdGUuY29uc3RydWN0b3IiLCJSZW5kZXJlciJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7QUFJNUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0g7QUFBaUNBLENBQUNBO0FBRWxDOzs7Ozs7OztHQVFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxzQ0FBc0M7QUFDdEM7QUFBZ0NDLENBQUNBO0FBR2pDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsc0NBQXNDO0FBQ3RDO0FBQTRCQyxDQUFDQTtBQUU3QjtBQUVBQyxDQUFDQTtBQUVELG9DQUE2QyxpQkFBaUI7SUFDNURDLElBQUlBLGNBQWNBLEtBQWFDLE1BQU1BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOztJQUN4REQsSUFBSUEsT0FBT0EsS0FBY0UsTUFBTUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O0FBQ3BERixDQUFDQTtBQUVELG1DQUE0QyxjQUFjO0lBQ3hERyxJQUFJQSxLQUFLQSxLQUFhQyxNQUFNQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7QUFDakRELENBQUNBO0FBRUQsd0NBQWlELGlCQUFpQjtJQUNoRUUsc0NBQXNDQTtJQUN0Q0EsSUFBSUEsS0FBS0EsS0FBYUMsTUFBTUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O0lBQy9DRCxxREFBcURBO0lBQ3JEQSxpREFBaURBO0lBQ2pEQSxJQUFJQSxjQUFjQSxLQUFhRSxNQUFNQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7QUFDMURGLENBQUNBO0FBRUQsMkNBQW9ELGNBQWM7SUFDaEVHLElBQUlBLElBQUlBLEtBQWFDLE1BQU1BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOztJQUM5Q0QsSUFBSUEsaUJBQWlCQSxLQUFlRSxNQUFNQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7SUFDN0RGLElBQUlBLG1CQUFtQkEsS0FBZUcsTUFBTUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O0FBQ2pFSCxDQUFDQTtBQUVELDZDQUFzRCxxQkFBcUI7SUFDekVJLElBQUlBLFVBQVVBLEtBQWFDLE1BQU1BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOztBQUN0REQsQ0FBQ0E7QUFFRCwrQ0FBd0QscUJBQXFCO0lBQzNFRSxJQUFJQSxRQUFRQSxLQUFjQyxNQUFNQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7SUFDbkRELElBQUlBLFFBQVFBLEtBQTBCRSxNQUFNQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7QUFDakVGLENBQUNBO0FBYUQ7Ozs7O0dBS0c7QUFDSCxtR0FBbUc7QUFDbkc7SUFDRUc7UUFDSUE7O1dBRUdBO1FBQ0lBLE9BQXNCQTtRQUM3QkE7O1dBRUdBO1FBQ0lBLFlBQWlDQTtRQUpqQ0MsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBZUE7UUFJdEJBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFxQkE7SUFBR0EsQ0FBQ0E7QUFDbERELENBQUNBO0FBMEJEO0lBQ0VFLFlBQW1CQSxFQUFVQSxFQUFTQSxPQUFlQSxFQUFTQSxhQUFnQ0EsRUFDM0VBLFFBQTZCQSxFQUFTQSxNQUFnQkE7UUFEdERDLE9BQUVBLEdBQUZBLEVBQUVBLENBQVFBO1FBQVNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFtQkE7UUFDM0VBLGFBQVFBLEdBQVJBLFFBQVFBLENBQXFCQTtRQUFTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFVQTtJQUFHQSxDQUFDQTtBQUMvRUQsQ0FBQ0E7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNIO0FBNEpBRSxDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBbmd1bGFyIFByb3RvVmlldyBpbiB0aGUgUmVuZGVyaW5nIENvbnRleHQuXG4gKlxuICogV2hlbiB5b3UgaW1wbGVtZW50IGEgY3VzdG9tIHtAbGluayBSZW5kZXJlcn0sIGBSZW5kZXJQcm90b1ZpZXdSZWZgIHNwZWNpZmllcyB3aGF0IFJlbmRlciBWaWV3XG4gKiB5b3VyIHJlbmRlcmVyIHNob3VsZCBjcmVhdGUuXG4gKlxuICogYFJlbmRlclByb3RvVmlld1JlZmAgaXMgYSBjb3VudGVycGFydCB0byB7QGxpbmsgUHJvdG9WaWV3UmVmfSBhdmFpbGFibGUgaW4gdGhlIEFwcGxpY2F0aW9uXG4gKiBDb250ZXh0LiBCdXQgdW5saWtlIGBQcm90b1ZpZXdSZWZgLCBgUmVuZGVyUHJvdG9WaWV3UmVmYCBjb250YWlucyBhbGwgc3RhdGljIG5lc3RlZCBQcm90byBWaWV3c1xuICogdGhhdCBhcmUgcmVjdXJzaXZlbHkgbWVyZ2VkIGludG8gYSBzaW5nbGUgUmVuZGVyIFByb3RvIFZpZXcuXG5cbiAqXG4gKiA8IS0tIFRPRE86IHRoaXMgaXMgY3JlYXRlZCBieSBSZW5kZXJlciNjcmVhdGVQcm90b1ZpZXcgaW4gdGhlIG5ldyBjb21waWxlciAtLT5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlclByb3RvVmlld1JlZiB7fVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IG9mIHNpYmxpbmcgTm9kZXMgdGhhdCBjYW4gYmUgbW92ZWQgYnkgdGhlIHtAbGluayBSZW5kZXJlcn0gaW5kZXBlbmRlbnRseSBvZlxuICogb3RoZXIgUmVuZGVyIEZyYWdtZW50cy5cbiAqXG4gKiBBbnkge0BsaW5rIFJlbmRlclZpZXd9IGhhcyBvbmUgUmVuZGVyIEZyYWdtZW50LlxuICpcbiAqIEFkZGl0aW9uYWxseSBhbnkgVmlldyB3aXRoIGFuIEVtYmVkZGVkIFZpZXcgdGhhdCBjb250YWlucyBhIHtAbGluayBOZ0NvbnRlbnQgVmlldyBQcm9qZWN0aW9ufVxuICogcmVzdWx0cyBpbiBhZGRpdGlvbmFsIFJlbmRlciBGcmFnbWVudC5cbiAqL1xuLypcbiAgPGRpdj5mb288L2Rpdj5cbiAge3tiYXJ9fVxuXG5cbiAgPGRpdj5mb288L2Rpdj4gLT4gdmlldyAxIC8gZnJhZ21lbnQgMVxuICA8dWw+XG4gICAgPHRlbXBsYXRlIG5nLWZvcj5cbiAgICAgIDxsaT57e2ZnfX08L2xpPiAtPiB2aWV3IDIgLyBmcmFnbWVudCAxXG4gICAgPC90ZW1wbGF0ZT5cbiAgPC91bD5cbiAge3tiYXJ9fVxuXG5cbiAgPGRpdj5mb288L2Rpdj4gLT4gdmlldyAxIC8gZnJhZ21lbnQgMVxuICA8dWw+XG4gICAgPHRlbXBsYXRlIG5nLWlmPlxuICAgICAgPGxpPjxuZy1jb250ZW50PjwvPjwvbGk+IC0+IHZpZXcgMSAvIGZyYWdtZW50IDJcbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSBuZy1mb3I+XG4gICAgICA8bGk+PG5nLWNvbnRlbnQ+PC8+PC9saT4gLT5cbiAgICAgIDxsaT48L2xpPiAgICAgICAgICAgICAgICAtPiB2aWV3IDEgLyBmcmFnbWVudCAyICsgdmlldyAyIC8gZnJhZ21lbnQgMS4ubi0xXG4gICAgPC90ZW1wbGF0ZT5cbiAgPC91bD5cbiAge3tiYXJ9fVxuICovXG4vLyBUT0RPKGkpOiByZWZhY3RvciBpbnRvIGFuIGludGVyZmFjZVxuZXhwb3J0IGNsYXNzIFJlbmRlckZyYWdtZW50UmVmIHt9XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEFuZ3VsYXIgVmlldyBpbiB0aGUgUmVuZGVyaW5nIENvbnRleHQuXG4gKlxuICogYFJlbmRlclZpZXdSZWZgIHNwZWNpZmllcyB0byB0aGUge0BsaW5rIFJlbmRlcmVyfSB3aGF0IFZpZXcgdG8gdXBkYXRlIG9yIGRlc3Ryb3kuXG4gKlxuICogVW5saWtlIGEge0BsaW5rIFZpZXdSZWZ9IGF2YWlsYWJsZSBpbiB0aGUgQXBwbGljYXRpb24gQ29udGV4dCwgUmVuZGVyIFZpZXcgY29udGFpbnMgYWxsIHRoZVxuICogc3RhdGljIENvbXBvbmVudCBWaWV3cyB0aGF0IGhhdmUgYmVlbiByZWN1cnNpdmVseSBtZXJnZWQgaW50byBhIHNpbmdsZSBSZW5kZXIgVmlldy5cbiAqXG4gKiBFYWNoIGBSZW5kZXJWaWV3UmVmYCBjb250YWlucyBvbmUgb3IgbW9yZSB7QGxpbmsgUmVuZGVyRnJhZ21lbnRSZWYgUmVuZGVyIEZyYWdtZW50c30sIHRoZXNlXG4gKiBGcmFnbWVudHMgYXJlIGNyZWF0ZWQsIGh5ZHJhdGVkLCBkZWh5ZHJhdGVkIGFuZCBkZXN0cm95ZWQgYXMgYSBzaW5nbGUgdW5pdCB0b2dldGhlciB3aXRoIHRoZVxuICogVmlldy5cbiAqL1xuLy8gVE9ETyhpKTogcmVmYWN0b3IgaW50byBhbiBpbnRlcmZhY2VcbmV4cG9ydCBjbGFzcyBSZW5kZXJWaWV3UmVmIHt9XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJUZW1wbGF0ZUNtZCB7XG4gIGFic3RyYWN0IHZpc2l0KHZpc2l0b3I6IFJlbmRlckNvbW1hbmRWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJCZWdpbkNtZCBleHRlbmRzIFJlbmRlclRlbXBsYXRlQ21kIHtcbiAgZ2V0IG5nQ29udGVudEluZGV4KCk6IG51bWJlciB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG4gIGdldCBpc0JvdW5kKCk6IGJvb2xlYW4geyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyVGV4dENtZCBleHRlbmRzIFJlbmRlckJlZ2luQ21kIHtcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJOZ0NvbnRlbnRDbWQgZXh0ZW5kcyBSZW5kZXJUZW1wbGF0ZUNtZCB7XG4gIC8vIFRoZSBpbmRleCBvZiB0aGlzIE5nQ29udGVudCBlbGVtZW50XG4gIGdldCBpbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuICAvLyBUaGUgaW5kZXggb2YgdGhlIE5nQ29udGVudCBlbGVtZW50IGludG8gd2hpY2ggdGhpc1xuICAvLyBOZ0NvbnRlbnQgZWxlbWVudCBzaG91bGQgYmUgcHJvamVjdGVkIChpZiBhbnkpXG4gIGdldCBuZ0NvbnRlbnRJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyQmVnaW5FbGVtZW50Q21kIGV4dGVuZHMgUmVuZGVyQmVnaW5DbWQge1xuICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuICBnZXQgYXR0ck5hbWVBbmRWYWx1ZXMoKTogc3RyaW5nW10geyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuICBnZXQgZXZlbnRUYXJnZXRBbmROYW1lcygpOiBzdHJpbmdbXSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJCZWdpbkNvbXBvbmVudENtZCBleHRlbmRzIFJlbmRlckJlZ2luRWxlbWVudENtZCB7XG4gIGdldCB0ZW1wbGF0ZUlkKCk6IHN0cmluZyB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJFbWJlZGRlZFRlbXBsYXRlQ21kIGV4dGVuZHMgUmVuZGVyQmVnaW5FbGVtZW50Q21kIHtcbiAgZ2V0IGlzTWVyZ2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuICBnZXQgY2hpbGRyZW4oKTogUmVuZGVyVGVtcGxhdGVDbWRbXSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyQ29tbWFuZFZpc2l0b3Ige1xuICB2aXNpdFRleHQoY21kOiBSZW5kZXJUZXh0Q21kLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TmdDb250ZW50KGNtZDogUmVuZGVyTmdDb250ZW50Q21kLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0QmVnaW5FbGVtZW50KGNtZDogUmVuZGVyQmVnaW5FbGVtZW50Q21kLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RW5kRWxlbWVudChjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0QmVnaW5Db21wb25lbnQoY21kOiBSZW5kZXJCZWdpbkNvbXBvbmVudENtZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVuZENvbXBvbmVudChjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShjbWQ6IFJlbmRlckVtYmVkZGVkVGVtcGxhdGVDbWQsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuXG4vKipcbiAqIENvbnRhaW5lciBjbGFzcyBwcm9kdWNlZCBieSBhIHtAbGluayBSZW5kZXJlcn0gd2hlbiBjcmVhdGluZyBhIFJlbmRlciBWaWV3LlxuICpcbiAqIEFuIGluc3RhbmNlIG9mIGBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c2AgY29udGFpbnMgYSB7QGxpbmsgUmVuZGVyVmlld1JlZn0gYW5kIGFuIGFycmF5IG9mXG4gKiB7QGxpbmsgUmVuZGVyRnJhZ21lbnRSZWZ9cyBiZWxvbmdpbmcgdG8gdGhpcyBSZW5kZXIgVmlldy5cbiAqL1xuLy8gVE9ETyhpKTogcmVmYWN0b3IgdGhpcyBieSBSZW5kZXJWaWV3V2l0aEZyYWdtZW50cyBhbmQgYWRkaW5nIGZyYWdtZW50cyBkaXJlY3RseSB0byBSZW5kZXJWaWV3UmVmXG5leHBvcnQgY2xhc3MgUmVuZGVyVmlld1dpdGhGcmFnbWVudHMge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSB7QGxpbmsgUmVuZGVyVmlld1JlZn0uXG4gICAgICAgKi9cbiAgICAgIHB1YmxpYyB2aWV3UmVmOiBSZW5kZXJWaWV3UmVmLFxuICAgICAgLyoqXG4gICAgICAgKiBBcnJheSBvZiB7QGxpbmsgUmVuZGVyRnJhZ21lbnRSZWZ9cyBvcmRlcmVkIGluIHRoZSBkZXB0aC1maXJzdCBvcmRlci5cbiAgICAgICAqL1xuICAgICAgcHVibGljIGZyYWdtZW50UmVmczogUmVuZGVyRnJhZ21lbnRSZWZbXSkge31cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEVsZW1lbnQgdGhhdCBpcyBwYXJ0IG9mIGEge0BsaW5rIFJlbmRlclZpZXdSZWYgUmVuZGVyIFZpZXd9LlxuICpcbiAqIGBSZW5kZXJFbGVtZW50UmVmYCBpcyBhIGNvdW50ZXJwYXJ0IHRvIHtAbGluayBFbGVtZW50UmVmfSBhdmFpbGFibGUgaW4gdGhlIEFwcGxpY2F0aW9uIENvbnRleHQuXG4gKlxuICogV2hlbiB1c2luZyBgUmVuZGVyZXJgIGZyb20gdGhlIEFwcGxpY2F0aW9uIENvbnRleHQsIGBFbGVtZW50UmVmYCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mXG4gKiBgUmVuZGVyRWxlbWVudFJlZmAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyRWxlbWVudFJlZiB7XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFJlbmRlciBWaWV3IHRoYXQgY29udGFpbnMgdGhpcyBFbGVtZW50LlxuICAgKi9cbiAgcmVuZGVyVmlldzogUmVuZGVyVmlld1JlZjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqXG4gICAqIEluZGV4IG9mIHRoZSBFbGVtZW50IChpbiB0aGUgZGVwdGgtZmlyc3Qgb3JkZXIpIGluc2lkZSB0aGUgUmVuZGVyIFZpZXcuXG4gICAqXG4gICAqIFRoaXMgaW5kZXggaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXIgdG8gbG9jYXRlIGVsZW1lbnRzLlxuICAgKi9cbiAgYm91bmRFbGVtZW50SW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbmRlckNvbXBvbmVudFRlbXBsYXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyBzaG9ydElkOiBzdHJpbmcsIHB1YmxpYyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICAgICAgICAgICAgcHVibGljIGNvbW1hbmRzOiBSZW5kZXJUZW1wbGF0ZUNtZFtdLCBwdWJsaWMgc3R5bGVzOiBzdHJpbmdbXSkge31cbn1cblxuLyoqXG4gKiBJbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBhIGxvdy1sZXZlbCBpbnRlcmZhY2UgZm9yIG1vZGlmeWluZyB0aGUgVUkuXG4gKlxuICogVXNlIHRoaXMgc2VydmljZSB0byBieXBhc3MgQW5ndWxhcidzIHRlbXBsYXRpbmcgYW5kIG1ha2UgY3VzdG9tIFVJIGNoYW5nZXMgdGhhdCBjYW4ndCBiZVxuICogZXhwcmVzc2VkIGRlY2xhcmF0aXZlbHkuIEZvciBleGFtcGxlIGlmIHlvdSBuZWVkIHRvIHNldCBhIHByb3BlcnR5IG9yIGFuIGF0dHJpYnV0ZSB3aG9zZSBuYW1lIGlzXG4gKiBub3Qgc3RhdGljYWxseSBrbm93biwgdXNlIHtAbGluayAjc2V0RWxlbWVudFByb3BlcnR5fSBvciB7QGxpbmsgI3NldEVsZW1lbnRBdHRyaWJ1dGV9XG4gKiByZXNwZWN0aXZlbHkuXG4gKlxuICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYSBjdXN0b20gcmVuZGVyZXIsIHlvdSBtdXN0IGltcGxlbWVudCB0aGlzIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgZGVmYXVsdCBSZW5kZXJlciBpbXBsZW1lbnRhdGlvbiBpcyB7QGxpbmsgRG9tUmVuZGVyZXJ9LiBBbHNvIHNlZSB7QGxpbmsgV2ViV29ya2VyUmVuZGVyZXJ9LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyZXIge1xuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY29tcG9uZW50IHRlbXBsYXRlIHJlcHJlc2VudGVkIGFzIGFycmF5cyBvZiB7QGxpbmsgUmVuZGVyVGVtcGxhdGVDbWR9cyBhbmQgc3R5bGVzXG4gICAqIHdpdGggdGhlIFJlbmRlcmVyLlxuICAgKlxuICAgKiBPbmNlIGEgdGVtcGxhdGUgaXMgcmVnaXN0ZXJlZCBpdCBjYW4gYmUgcmVmZXJlbmNlZCB2aWEge0BsaW5rIFJlbmRlckJlZ2luQ29tcG9uZW50Q21kfSB3aGVuXG4gICAqIHtAbGluayAjY3JlYXRlUHJvdG9WaWV3IGNyZWF0aW5nIFJlbmRlciBQcm90b1ZpZXd9LlxuICAgKi9cbiAgYWJzdHJhY3QgcmVnaXN0ZXJDb21wb25lbnRUZW1wbGF0ZSh0ZW1wbGF0ZTogUmVuZGVyQ29tcG9uZW50VGVtcGxhdGUpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEge0BsaW5rIFJlbmRlclByb3RvVmlld1JlZn0gZnJvbSBhbiBhcnJheSBvZiB7QGxpbmsgUmVuZGVyVGVtcGxhdGVDbWR9YHMuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVQcm90b1ZpZXcoY29tcG9uZW50VGVtcGxhdGVJZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY21kczogUmVuZGVyVGVtcGxhdGVDbWRbXSk6IFJlbmRlclByb3RvVmlld1JlZjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJvb3QgSG9zdCBWaWV3IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBgaG9zdFByb3RvVmlld1JlZmAuXG4gICAqXG4gICAqIGBmcmFnbWVudENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIG5lc3RlZCB7QGxpbmsgUmVuZGVyRnJhZ21lbnRSZWZ9cyBpbiB0aGlzIFZpZXcuIFRoaXMgcGFyYW1ldGVyXG4gICAqIGlzIG5vbi1vcHRpb25hbCBzbyB0aGF0IHRoZSByZW5kZXJlciBjYW4gY3JlYXRlIGEgcmVzdWx0IHN5bmNocm9ub3VzbHkgZXZlbiB3aGVuIGFwcGxpY2F0aW9uXG4gICAqIHJ1bnMgaW4gYSBkaWZmZXJlbnQgY29udGV4dCAoZS5nLiBpbiBhIFdlYiBXb3JrZXIpLlxuICAgKlxuICAgKiBgaG9zdEVsZW1lbnRTZWxlY3RvcmAgaXMgYSAoQ1NTKSBzZWxlY3RvciBmb3IgcXVlcnlpbmcgdGhlIG1haW4gZG9jdW1lbnQgdG8gZmluZCB0aGUgSG9zdFxuICAgKiBFbGVtZW50LiBUaGUgbmV3bHkgY3JlYXRlZCBSb290IEhvc3QgVmlldyBzaG91bGQgYmUgYXR0YWNoZWQgdG8gdGhpcyBlbGVtZW50LlxuICAgKlxuICAgKiBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHtAbGluayBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c30sIHJlcHJlc2VudGluZyB0aGUgUmVuZGVyIFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVSb290SG9zdFZpZXcoaG9zdFByb3RvVmlld1JlZjogUmVuZGVyUHJvdG9WaWV3UmVmLCBmcmFnbWVudENvdW50OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0RWxlbWVudFNlbGVjdG9yOiBzdHJpbmcpOiBSZW5kZXJWaWV3V2l0aEZyYWdtZW50cztcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJlbmRlciBWaWV3IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBgcHJvdG9WaWV3UmVmYC5cbiAgICpcbiAgICogYGZyYWdtZW50Q291bnRgIGlzIHRoZSBudW1iZXIgb2YgbmVzdGVkIHtAbGluayBSZW5kZXJGcmFnbWVudFJlZn1zIGluIHRoaXMgVmlldy4gVGhpcyBwYXJhbWV0ZXJcbiAgICogaXMgbm9uLW9wdGlvbmFsIHNvIHRoYXQgdGhlIHJlbmRlcmVyIGNhbiBjcmVhdGUgYSByZXN1bHQgc3luY2hyb25vdXNseSBldmVuIHdoZW4gYXBwbGljYXRpb25cbiAgICogcnVucyBpbiBhIGRpZmZlcmVudCBjb250ZXh0IChlLmcuIGluIGEgV2ViIFdvcmtlcikuXG4gICAqXG4gICAqIFJldHVybnMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFJlbmRlclZpZXdXaXRoRnJhZ21lbnRzfSwgcmVwcmVzZW50aW5nIHRoZSBSZW5kZXIgVmlldy5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZVZpZXcocHJvdG9WaWV3UmVmOiBSZW5kZXJQcm90b1ZpZXdSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRDb3VudDogbnVtYmVyKTogUmVuZGVyVmlld1dpdGhGcmFnbWVudHM7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGEgUmVuZGVyIFZpZXcgc3BlY2lmaWVkIHZpYSBgdmlld1JlZmAuXG4gICAqXG4gICAqIFRoaXMgb3BlcmF0aW9uIHNob3VsZCBiZSBwZXJmb3JtZWQgb25seSBvbiBhIFZpZXcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGRlaHlkcmF0ZWQgYW5kXG4gICAqIGFsbCBvZiBpdHMgUmVuZGVyIEZyYWdtZW50cyBoYXZlIGJlZW4gZGV0YWNoZWQuXG4gICAqXG4gICAqIERlc3Ryb3lpbmcgYSBWaWV3IGluZGljYXRlcyB0byB0aGUgUmVuZGVyZXIgdGhhdCB0aGlzIFZpZXcgaXMgbm90IGdvaW5nIHRvIGJlIHJlZmVyZW5jZWQgaW4gYW55XG4gICAqIGZ1dHVyZSBvcGVyYXRpb25zLiBJZiB0aGUgUmVuZGVyZXIgY3JlYXRlZCBhbnkgcmVuZGVyZXItc3BlY2lmaWMgb2JqZWN0cyBmb3IgdGhpcyBWaWV3LCB0aGVzZVxuICAgKiBvYmplY3RzIHNob3VsZCBub3cgYmUgZGVzdHJveWVkIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlxuICAgKi9cbiAgYWJzdHJhY3QgZGVzdHJveVZpZXcodmlld1JlZjogUmVuZGVyVmlld1JlZik7XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHRoZSBOb2RlcyBvZiBhIFJlbmRlciBGcmFnbWVudCBhZnRlciB0aGUgbGFzdCBOb2RlIG9mIGBwcmV2aW91c0ZyYWdtZW50UmVmYC5cbiAgICovXG4gIGFic3RyYWN0IGF0dGFjaEZyYWdtZW50QWZ0ZXJGcmFnbWVudChwcmV2aW91c0ZyYWdtZW50UmVmOiBSZW5kZXJGcmFnbWVudFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50UmVmOiBSZW5kZXJGcmFnbWVudFJlZik7XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHRoZSBOb2RlcyBvZiB0aGUgUmVuZGVyIEZyYWdtZW50IGFmdGVyIGFuIEVsZW1lbnQuXG4gICAqL1xuICBhYnN0cmFjdCBhdHRhY2hGcmFnbWVudEFmdGVyRWxlbWVudChlbGVtZW50UmVmOiBSZW5kZXJFbGVtZW50UmVmLCBmcmFnbWVudFJlZjogUmVuZGVyRnJhZ21lbnRSZWYpO1xuXG4gIC8qKlxuICAgKiBEZXRhY2hlcyB0aGUgTm9kZXMgb2YgYSBSZW5kZXIgRnJhZ21lbnQgZnJvbSB0aGVpciBwYXJlbnQuXG4gICAqXG4gICAqIFRoaXMgb3BlcmF0aW9ucyBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb24gYSBWaWV3IHRoYXQgaGFzIGJlZW4gYWxyZWFkeVxuICAgKiB7QGxpbmsgI2RlaHlkcmF0ZVZpZXcgZGVoeWRyYXRlZH0uXG4gICAqL1xuICBhYnN0cmFjdCBkZXRhY2hGcmFnbWVudChmcmFnbWVudFJlZjogUmVuZGVyRnJhZ21lbnRSZWYpO1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyBhIGN1c3RvbSBSZW5kZXJlciB0byBpbml0aWFsaXplIGEgUmVuZGVyIFZpZXcuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSBBbmd1bGFyIGFmdGVyIGEgUmVuZGVyIFZpZXcgaGFzIGJlZW4gY3JlYXRlZCwgb3Igd2hlbiBhIHByZXZpb3VzbHlcbiAgICogZGVoeWRyYXRlZCBSZW5kZXIgVmlldyBpcyBhYm91dCB0byBiZSByZXVzZWQuXG4gICAqL1xuICBhYnN0cmFjdCBoeWRyYXRlVmlldyh2aWV3UmVmOiBSZW5kZXJWaWV3UmVmKTtcblxuICAvKipcbiAgICogTm90aWZpZXMgYSBjdXN0b20gUmVuZGVyZXIgdGhhdCBhIFJlbmRlciBWaWV3IGlzIG5vIGxvbmdlciBhY3RpdmUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSBBbmd1bGFyIGJlZm9yZSBhIFJlbmRlciBWaWV3IHdpbGwgYmUgZGVzdHJveWVkLCBvciB3aGVuIGEgaHlkcmF0ZWRcbiAgICogUmVuZGVyIFZpZXcgaXMgYWJvdXQgdG8gYmUgcHV0IGludG8gYSBwb29sIGZvciBmdXR1cmUgcmV1c2UuXG4gICAqL1xuICBhYnN0cmFjdCBkZWh5ZHJhdGVWaWV3KHZpZXdSZWY6IFJlbmRlclZpZXdSZWYpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgYGxvY2F0aW9uYCwgb3IgYG51bGxgIGlmIGRpcmVjdCBhY2Nlc3NcbiAgICogdG8gbmF0aXZlIGVsZW1lbnRzIGlzIG5vdCBzdXBwb3J0ZWQgKGUuZy4gd2hlbiB0aGUgYXBwbGljYXRpb24gcnVucyBpbiBhIHdlYiB3b3JrZXIpLlxuICAgKlxuICAgKiA8ZGl2IGNsYXNzPVwiY2FsbG91dCBpcy1jcml0aWNhbFwiPlxuICAgKiAgIDxoZWFkZXI+VXNlIHdpdGggY2F1dGlvbjwvaGVhZGVyPlxuICAgKiAgIDxwPlxuICAgKiAgICBVc2UgdGhpcyBhcGkgYXMgdGhlIGxhc3QgcmVzb3J0IHdoZW4gZGlyZWN0IGFjY2VzcyB0byBET00gaXMgbmVlZGVkLiBVc2UgdGVtcGxhdGluZyBhbmRcbiAgICogICAgZGF0YS1iaW5kaW5nLCBvciBvdGhlciB7QGxpbmsgUmVuZGVyZXJ9IG1ldGhvZHMgaW5zdGVhZC5cbiAgICogICA8L3A+XG4gICAqICAgPHA+XG4gICAqICAgIFJlbHlpbmcgb24gZGlyZWN0IERPTSBhY2Nlc3MgY3JlYXRlcyB0aWdodCBjb3VwbGluZyBiZXR3ZWVuIHlvdXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcmluZ1xuICAgKiAgICBsYXllcnMgd2hpY2ggd2lsbCBtYWtlIGl0IGltcG9zc2libGUgdG8gc2VwYXJhdGUgdGhlIHR3byBhbmQgZGVwbG95IHlvdXIgYXBwbGljYXRpb24gaW50byBhXG4gICAqICAgIHdlYiB3b3JrZXIuXG4gICAqICAgPC9wPlxuICAgKiA8L2Rpdj5cbiAgICovXG4gIGFic3RyYWN0IGdldE5hdGl2ZUVsZW1lbnRTeW5jKGxvY2F0aW9uOiBSZW5kZXJFbGVtZW50UmVmKTogYW55O1xuXG4gIC8qKlxuICAgKiBTZXRzIGEgcHJvcGVydHkgb24gdGhlIEVsZW1lbnQgc3BlY2lmaWVkIHZpYSBgbG9jYXRpb25gLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0RWxlbWVudFByb3BlcnR5KGxvY2F0aW9uOiBSZW5kZXJFbGVtZW50UmVmLCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTtcblxuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIEVsZW1lbnQgc3BlY2lmaWVkIHZpYSBgbG9jYXRpb25gLlxuICAgKlxuICAgKiBJZiBgYXR0cmlidXRlVmFsdWVgIGlzIGBudWxsYCwgdGhlIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0RWxlbWVudEF0dHJpYnV0ZShsb2NhdGlvbjogUmVuZGVyRWxlbWVudFJlZiwgYXR0cmlidXRlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpO1xuXG4gIC8qKlxuICAgKiBTZXRzIGEgKENTUykgY2xhc3Mgb24gdGhlIEVsZW1lbnQgc3BlY2lmaWVkIHZpYSBgbG9jYXRpb25gLlxuICAgKlxuICAgKiBgaXNBZGRgIHNwZWNpZmllcyBpZiB0aGUgY2xhc3Mgc2hvdWxkIGJlIGFkZGVkIG9yIHJlbW92ZWQuXG4gICAqL1xuICBhYnN0cmFjdCBzZXRFbGVtZW50Q2xhc3MobG9jYXRpb246IFJlbmRlckVsZW1lbnRSZWYsIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbik7XG5cbiAgLyoqXG4gICAqIFNldHMgYSAoQ1NTKSBpbmxpbmUgc3R5bGUgb24gdGhlIEVsZW1lbnQgc3BlY2lmaWVkIHZpYSBgbG9jYXRpb25gLlxuICAgKlxuICAgKiBJZiBgc3R5bGVWYWx1ZWAgaXMgYG51bGxgLCB0aGUgc3R5bGUgaXMgcmVtb3ZlZC5cbiAgICovXG4gIGFic3RyYWN0IHNldEVsZW1lbnRTdHlsZShsb2NhdGlvbjogUmVuZGVyRWxlbWVudFJlZiwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyk7XG5cbiAgLyoqXG4gICAqIENhbGxzIGEgbWV0aG9kIG9uIHRoZSBFbGVtZW50IHNwZWNpZmllZCB2aWEgYGxvY2F0aW9uYC5cbiAgICovXG4gIGFic3RyYWN0IGludm9rZUVsZW1lbnRNZXRob2QobG9jYXRpb246IFJlbmRlckVsZW1lbnRSZWYsIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBpbnRlcnBvbGF0ZWQgVGV4dE5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCB0byB0aGUgYHRleHRgIHZhbHVlLlxuICAgKlxuICAgKiBgdGV4dE5vZGVJbmRleGAgaXMgdGhlIGRlcHRoLWZpcnN0IGluZGV4IG9mIHRoZSBOb2RlIGFtb25nIGludGVycG9sYXRlZCBOb2RlcyBpbiB0aGUgUmVuZGVyXG4gICAqIFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBzZXRUZXh0KHZpZXdSZWY6IFJlbmRlclZpZXdSZWYsIHRleHROb2RlSW5kZXg6IG51bWJlciwgdGV4dDogc3RyaW5nKTtcblxuICAvKipcbiAgICogU2V0cyBhIGRpc3BhdGNoZXIgdG8gcmVsYXkgYWxsIGV2ZW50cyB0cmlnZ2VyZWQgaW4gdGhlIGdpdmVuIFJlbmRlciBWaWV3LlxuICAgKlxuICAgKiBFYWNoIFJlbmRlciBWaWV3IGNhbiBoYXZlIG9ubHkgb25lIEV2ZW50IERpc3BhdGNoZXIsIGlmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyxcbiAgICogdGhlIGxhc3QgcHJvdmlkZWQgZGlzcGF0Y2hlciB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICBhYnN0cmFjdCBzZXRFdmVudERpc3BhdGNoZXIodmlld1JlZjogUmVuZGVyVmlld1JlZiwgZGlzcGF0Y2hlcjogUmVuZGVyRXZlbnREaXNwYXRjaGVyKTtcbn1cblxuLyoqXG4gKiBBIGRpc3BhdGNoZXIgdGhhdCByZWxheXMgYWxsIGV2ZW50cyB0aGF0IG9jY3VyIGluIGEgUmVuZGVyIFZpZXcuXG4gKlxuICogVXNlIHtAbGluayBSZW5kZXJlciNzZXRFdmVudERpc3BhdGNoZXJ9IHRvIHJlZ2lzdGVyIGEgZGlzcGF0Y2hlciBmb3IgYSBwYXJ0aWN1bGFyIFJlbmRlciBWaWV3LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckV2ZW50RGlzcGF0Y2hlciB7XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBFdmVudCBjYWxsZWQgYGV2ZW50TmFtZWAgd2FzIHRyaWdnZXJlZCBvbiBhbiBFbGVtZW50IHdpdGggYW4gRXZlbnQgQmluZGluZyBmb3IgdGhpc1xuICAgKiBFdmVudC5cbiAgICpcbiAgICogYGVsZW1lbnRJbmRleGAgc3BlY2lmaWVzIHRoZSBkZXB0aC1maXJzdCBpbmRleCBvZiB0aGUgRWxlbWVudCBpbiB0aGUgUmVuZGVyIFZpZXcuXG4gICAqXG4gICAqIGBsb2NhbHNgIGlzIGEgbWFwIGZvciBsb2NhbCB2YXJpYWJsZSB0byB2YWx1ZSBtYXBwaW5nIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiBldmFsdWF0aW5nIHRoZVxuICAgKiBFdmVudCBCaW5kaW5nIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIFJldHVybnMgYGZhbHNlYCBpZiBgcHJldmVudERlZmF1bHRgIHNob3VsZCBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgRXZlbnRcbiAgICogaW4gdGhlIFJlbmRlcmluZyBDb250ZXh0LlxuICAgKi9cbiAgZGlzcGF0Y2hSZW5kZXJFdmVudChlbGVtZW50SW5kZXg6IG51bWJlciwgZXZlbnROYW1lOiBzdHJpbmcsIGxvY2FsczogTWFwPHN0cmluZywgYW55Pik6IGJvb2xlYW47XG59XG4iXX0=