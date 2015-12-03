/* */ 
"format cjs";
import { provide } from 'angular2/src/core/di';
import { FORM_PROVIDERS } from 'angular2/src/common/forms';
import { isPresent, print } from 'angular2/src/facade/lang';
import { ExceptionHandler } from 'angular2/src/facade/exceptions';
import { PromiseWrapper } from 'angular2/src/facade/async';
import { XHR } from 'angular2/src/compiler/xhr';
import { WebWorkerXHRImpl } from 'angular2/src/web_workers/worker/xhr_impl';
import { AppRootUrl } from 'angular2/src/compiler/app_root_url';
import { WebWorkerRenderer } from './renderer';
import { Renderer } from 'angular2/src/core/render/api';
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/client_message_broker';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/service_message_broker';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS } from 'angular2/core';
import * as core from 'angular2/core';
import { Serializer } from "angular2/src/web_workers/shared/serializer";
import { ON_WEB_WORKER } from "angular2/src/web_workers/shared/api";
import { RenderProtoViewRefStore } from 'angular2/src/web_workers/shared/render_proto_view_ref_store';
import { RenderViewWithFragmentsStore } from 'angular2/src/web_workers/shared/render_view_with_fragments_store';
import { ObservableWrapper } from 'angular2/src/facade/async';
import { SETUP_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { WebWorkerEventDispatcher } from 'angular2/src/web_workers/worker/event_dispatcher';
import { COMPILER_PROVIDERS } from 'angular2/src/compiler/compiler';
/**
 * Initialize the Angular 'platform' on the page in a manner suitable for applications
 * running in a web worker. Applications running on a web worker do not have direct
 * access to DOM APIs.
 *
 * See {@link PlatformRef} for details on the Angular platform.
 *
 * ### Without specified providers
 *
 * If no providers are specified, `platform`'s behavior depends on whether an existing
 * platform exists:
 *
 * If no platform exists, a new one will be created with the default {@link platformProviders}.
 *
 * If a platform already exists, it will be returned (regardless of what providers it
 * was created with). This is a convenience feature, allowing for multiple applications
 * to be loaded into the same platform without awareness of each other.
 *
 * ### With specified providers
 *
 * It is also possible to specify providers to be made in the new platform. These providers
 * will be shared between all applications on the page. For example, an abstraction for
 * the browser cookie jar should be bound at the platform level, because there is only one
 * cookie jar regardless of how many applications on the age will be accessing it.
 *
 * If providers are specified directly, `platform` will create the Angular platform with
 * them if a platform did not exist already. If it did exist, however, an error will be
 * thrown.
 *
 * ### For Web Worker Applications
 *
 * This version of `platform` initializes Angular for use with applications
 * that do not directly touch the DOM, such as applications which run in a
 * web worker context. Applications that need direct access to the DOM should
 * use `platform` from `core/application_common` instead.
 */
export function platform(providers) {
    let platformProviders = isPresent(providers) ? [PLATFORM_COMMON_PROVIDERS, providers] : PLATFORM_COMMON_PROVIDERS;
    return core.platform(platformProviders);
}
class PrintLogger {
    constructor() {
        this.log = print;
        this.logError = print;
        this.logGroup = print;
    }
    logGroupEnd() { }
}
function webWorkerProviders(appComponentType, bus, initData) {
    return [
        COMPILER_PROVIDERS,
        Serializer,
        provide(MessageBus, { useValue: bus }),
        provide(ClientMessageBrokerFactory, { useClass: ClientMessageBrokerFactory_ }),
        provide(ServiceMessageBrokerFactory, { useClass: ServiceMessageBrokerFactory_ }),
        WebWorkerRenderer,
        provide(Renderer, { useExisting: WebWorkerRenderer }),
        provide(ON_WEB_WORKER, { useValue: true }),
        RenderViewWithFragmentsStore,
        RenderProtoViewRefStore,
        provide(ExceptionHandler, { useFactory: () => new ExceptionHandler(new PrintLogger()), deps: [] }),
        WebWorkerXHRImpl,
        provide(XHR, { useExisting: WebWorkerXHRImpl }),
        provide(AppRootUrl, { useValue: new AppRootUrl(initData['rootUrl']) }),
        WebWorkerEventDispatcher,
        FORM_PROVIDERS
    ];
}
export function bootstrapWebWorkerCommon(appComponentType, bus, appProviders = null) {
    var bootstrapProcess = PromiseWrapper.completer();
    var appPromise = platform().asyncApplication((zone) => {
        // TODO(rado): prepopulate template cache, so applications with only
        // index.html and main.js are possible.
        //
        bus.attachToZone(zone);
        bus.initChannel(SETUP_CHANNEL, false);
        var subscription;
        var emitter = bus.from(SETUP_CHANNEL);
        subscription = ObservableWrapper.subscribe(emitter, (message) => {
            var bindings = [APPLICATION_COMMON_PROVIDERS, webWorkerProviders(appComponentType, bus, message)];
            if (isPresent(appProviders)) {
                bindings.push(appProviders);
            }
            bootstrapProcess.resolve(bindings);
            ObservableWrapper.dispose(subscription);
        });
        ObservableWrapper.callEmit(bus.to(SETUP_CHANNEL), "ready");
        return bootstrapProcess.promise;
    });
    return PromiseWrapper.then(appPromise, (app) => app.bootstrap(appComponentType));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9hcHBsaWNhdGlvbl9jb21tb24udHMiXSwibmFtZXMiOlsicGxhdGZvcm0iLCJQcmludExvZ2dlciIsIlByaW50TG9nZ2VyLmNvbnN0cnVjdG9yIiwiUHJpbnRMb2dnZXIubG9nR3JvdXBFbmQiLCJ3ZWJXb3JrZXJQcm92aWRlcnMiLCJib290c3RyYXBXZWJXb3JrZXJDb21tb24iXSwibWFwcGluZ3MiOiJPQUFPLEVBQVcsT0FBTyxFQUF3QixNQUFNLHNCQUFzQjtPQUN0RSxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQjtPQUNqRCxFQUlMLFNBQVMsRUFFVCxLQUFLLEVBRU4sTUFBTSwwQkFBMEI7T0FDMUIsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztPQUN4RCxFQUFVLGNBQWMsRUFBbUIsTUFBTSwyQkFBMkI7T0FDNUUsRUFBQyxHQUFHLEVBQUMsTUFBTSwyQkFBMkI7T0FDdEMsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBDQUEwQztPQUNsRSxFQUFDLFVBQVUsRUFBQyxNQUFNLG9DQUFvQztPQUN0RCxFQUFDLGlCQUFpQixFQUFDLE1BQU0sWUFBWTtPQUNyQyxFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QjtPQUM5QyxFQUNMLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDNUIsTUFBTSx1REFBdUQ7T0FDdkQsRUFDTCwyQkFBMkIsRUFDM0IsNEJBQTRCLEVBQzdCLE1BQU0sd0RBQXdEO09BQ3hELEVBQUMsVUFBVSxFQUFDLE1BQU0sNkNBQTZDO09BQy9ELEVBR0wsNEJBQTRCLEVBQzVCLHlCQUF5QixFQUMxQixNQUFNLGVBQWU7T0FDZixLQUFLLElBQUksTUFBTSxlQUFlO09BQzlCLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDO09BQzlELEVBQUMsYUFBYSxFQUFDLE1BQU0scUNBQXFDO09BQzFELEVBQUMs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LFlBQWlCQSxDQUFDQTtRQUN0QkEsSUFBSUEsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDdENBLFlBQVlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsT0FBNkJBO1lBQ2hGQSxJQUFJQSxRQUFRQSxHQUNSQSxDQUFDQSw0QkFBNEJBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxHQUFHQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUM5QkEsQ0FBQ0E7WUFDREEsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUNuQ0EsaUJBQWlCQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFSEEsaUJBQWlCQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUMzREEsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNsQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDSEEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNuRkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdG9yLCBwcm92aWRlLCBPcGFxdWVUb2tlbiwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Rk9STV9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMnO1xuaW1wb3J0IHtcbiAgTnVtYmVyV3JhcHBlcixcbiAgVHlwZSxcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBhc3NlcnRpb25zRW5hYmxlZCxcbiAgcHJpbnQsXG4gIHN0cmluZ2lmeVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtFeGNlcHRpb25IYW5kbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlLCBQcm9taXNlV3JhcHBlciwgUHJvbWlzZUNvbXBsZXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1dlYldvcmtlclhIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIveGhyX2ltcGwnO1xuaW1wb3J0IHtBcHBSb290VXJsfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvYXBwX3Jvb3RfdXJsJztcbmltcG9ydCB7V2ViV29ya2VyUmVuZGVyZXJ9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7XG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7XG4gIFBsYXRmb3JtUmVmLFxuICBBcHBsaWNhdGlvblJlZixcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSU1xufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXJcIjtcbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvYXBpXCI7XG5pbXBvcnQge1JlbmRlclByb3RvVmlld1JlZlN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9wcm90b192aWV3X3JlZl9zdG9yZSc7XG5pbXBvcnQge1xuICBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3ZpZXdfd2l0aF9mcmFnbWVudHNfc3RvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1NFVFVQX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1dlYldvcmtlckV2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9ldmVudF9kaXNwYXRjaGVyJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtDT01QSUxFUl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9jb21waWxlcic7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQW5ndWxhciAncGxhdGZvcm0nIG9uIHRoZSBwYWdlIGluIGEgbWFubmVyIHN1aXRhYmxlIGZvciBhcHBsaWNhdGlvbnNcbiAqIHJ1bm5pbmcgaW4gYSB3ZWIgd29ya2VyLiBBcHBsaWNhdGlvbnMgcnVubmluZyBvbiBhIHdlYiB3b3JrZXIgZG8gbm90IGhhdmUgZGlyZWN0XG4gKiBhY2Nlc3MgdG8gRE9NIEFQSXMuXG4gKlxuICogU2VlIHtAbGluayBQbGF0Zm9ybVJlZn0gZm9yIGRldGFpbHMgb24gdGhlIEFuZ3VsYXIgcGxhdGZvcm0uXG4gKlxuICogIyMjIFdpdGhvdXQgc3BlY2lmaWVkIHByb3ZpZGVyc1xuICpcbiAqIElmIG5vIHByb3ZpZGVycyBhcmUgc3BlY2lmaWVkLCBgcGxhdGZvcm1gJ3MgYmVoYXZpb3IgZGVwZW5kcyBvbiB3aGV0aGVyIGFuIGV4aXN0aW5nXG4gKiBwbGF0Zm9ybSBleGlzdHM6XG4gKlxuICogSWYgbm8gcGxhdGZvcm0gZXhpc3RzLCBhIG5ldyBvbmUgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlIGRlZmF1bHQge0BsaW5rIHBsYXRmb3JtUHJvdmlkZXJzfS5cbiAqXG4gKiBJZiBhIHBsYXRmb3JtIGFscmVhZHkgZXhpc3RzLCBpdCB3aWxsIGJlIHJldHVybmVkIChyZWdhcmRsZXNzIG9mIHdoYXQgcHJvdmlkZXJzIGl0XG4gKiB3YXMgY3JlYXRlZCB3aXRoKS4gVGhpcyBpcyBhIGNvbnZlbmllbmNlIGZlYXR1cmUsIGFsbG93aW5nIGZvciBtdWx0aXBsZSBhcHBsaWNhdGlvbnNcbiAqIHRvIGJlIGxvYWRlZCBpbnRvIHRoZSBzYW1lIHBsYXRmb3JtIHdpdGhvdXQgYXdhcmVuZXNzIG9mIGVhY2ggb3RoZXIuXG4gKlxuICogIyMjIFdpdGggc3BlY2lmaWVkIHByb3ZpZGVyc1xuICpcbiAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gc3BlY2lmeSBwcm92aWRlcnMgdG8gYmUgbWFkZSBpbiB0aGUgbmV3IHBsYXRmb3JtLiBUaGVzZSBwcm92aWRlcnNcbiAqIHdpbGwgYmUgc2hhcmVkIGJldHdlZW4gYWxsIGFwcGxpY2F0aW9ucyBvbiB0aGUgcGFnZS4gRm9yIGV4YW1wbGUsIGFuIGFic3RyYWN0aW9uIGZvclxuICogdGhlIGJyb3dzZXIgY29va2llIGphciBzaG91bGQgYmUgYm91bmQgYXQgdGhlIHBsYXRmb3JtIGxldmVsLCBiZWNhdXNlIHRoZXJlIGlzIG9ubHkgb25lXG4gKiBjb29raWUgamFyIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgYXBwbGljYXRpb25zIG9uIHRoZSBhZ2Ugd2lsbCBiZSBhY2Nlc3NpbmcgaXQuXG4gKlxuICogSWYgcHJvdmlkZXJzIGFyZSBzcGVjaWZpZWQgZGlyZWN0bHksIGBwbGF0Zm9ybWAgd2lsbCBjcmVhdGUgdGhlIEFuZ3VsYXIgcGxhdGZvcm0gd2l0aFxuICogdGhlbSBpZiBhIHBsYXRmb3JtIGRpZCBub3QgZXhpc3QgYWxyZWFkeS4gSWYgaXQgZGlkIGV4aXN0LCBob3dldmVyLCBhbiBlcnJvciB3aWxsIGJlXG4gKiB0aHJvd24uXG4gKlxuICogIyMjIEZvciBXZWIgV29ya2VyIEFwcGxpY2F0aW9uc1xuICpcbiAqIFRoaXMgdmVyc2lvbiBvZiBgcGxhdGZvcm1gIGluaXRpYWxpemVzIEFuZ3VsYXIgZm9yIHVzZSB3aXRoIGFwcGxpY2F0aW9uc1xuICogdGhhdCBkbyBub3QgZGlyZWN0bHkgdG91Y2ggdGhlIERPTSwgc3VjaCBhcyBhcHBsaWNhdGlvbnMgd2hpY2ggcnVuIGluIGFcbiAqIHdlYiB3b3JrZXIgY29udGV4dC4gQXBwbGljYXRpb25zIHRoYXQgbmVlZCBkaXJlY3QgYWNjZXNzIHRvIHRoZSBET00gc2hvdWxkXG4gKiB1c2UgYHBsYXRmb3JtYCBmcm9tIGBjb3JlL2FwcGxpY2F0aW9uX2NvbW1vbmAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXRmb3JtKHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFBsYXRmb3JtUmVmIHtcbiAgbGV0IHBsYXRmb3JtUHJvdmlkZXJzID1cbiAgICAgIGlzUHJlc2VudChwcm92aWRlcnMpID8gW1BMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsIHByb3ZpZGVyc10gOiBQTEFURk9STV9DT01NT05fUFJPVklERVJTO1xuICByZXR1cm4gY29yZS5wbGF0Zm9ybShwbGF0Zm9ybVByb3ZpZGVycyk7XG59XG5cbmNsYXNzIFByaW50TG9nZ2VyIHtcbiAgbG9nID0gcHJpbnQ7XG4gIGxvZ0Vycm9yID0gcHJpbnQ7XG4gIGxvZ0dyb3VwID0gcHJpbnQ7XG4gIGxvZ0dyb3VwRW5kKCkge31cbn1cblxuZnVuY3Rpb24gd2ViV29ya2VyUHJvdmlkZXJzKGFwcENvbXBvbmVudFR5cGUsIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0RGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4ge1xuICByZXR1cm4gW1xuICAgIENPTVBJTEVSX1BST1ZJREVSUyxcbiAgICBTZXJpYWxpemVyLFxuICAgIHByb3ZpZGUoTWVzc2FnZUJ1cywge3VzZVZhbHVlOiBidXN9KSxcbiAgICBwcm92aWRlKENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCB7dXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X30pLFxuICAgIHByb3ZpZGUoU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCB7dXNlQ2xhc3M6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgICBXZWJXb3JrZXJSZW5kZXJlcixcbiAgICBwcm92aWRlKFJlbmRlcmVyLCB7dXNlRXhpc3Rpbmc6IFdlYldvcmtlclJlbmRlcmVyfSksXG4gICAgcHJvdmlkZShPTl9XRUJfV09SS0VSLCB7dXNlVmFsdWU6IHRydWV9KSxcbiAgICBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLFxuICAgIFJlbmRlclByb3RvVmlld1JlZlN0b3JlLFxuICAgIHByb3ZpZGUoRXhjZXB0aW9uSGFuZGxlcixcbiAgICAgICAgICAgIHt1c2VGYWN0b3J5OiAoKSA9PiBuZXcgRXhjZXB0aW9uSGFuZGxlcihuZXcgUHJpbnRMb2dnZXIoKSksIGRlcHM6IFtdfSksXG4gICAgV2ViV29ya2VyWEhSSW1wbCxcbiAgICBwcm92aWRlKFhIUiwge3VzZUV4aXN0aW5nOiBXZWJXb3JrZXJYSFJJbXBsfSksXG4gICAgcHJvdmlkZShBcHBSb290VXJsLCB7dXNlVmFsdWU6IG5ldyBBcHBSb290VXJsKGluaXREYXRhWydyb290VXJsJ10pfSksXG4gICAgV2ViV29ya2VyRXZlbnREaXNwYXRjaGVyLFxuICAgIEZPUk1fUFJPVklERVJTXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBXZWJXb3JrZXJDb21tb24oXG4gICAgYXBwQ29tcG9uZW50VHlwZTogVHlwZSwgYnVzOiBNZXNzYWdlQnVzLFxuICAgIGFwcFByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gbnVsbCk6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gIHZhciBib290c3RyYXBQcm9jZXNzOiBQcm9taXNlQ29tcGxldGVyPGFueT4gPSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgdmFyIGFwcFByb21pc2UgPSBwbGF0Zm9ybSgpLmFzeW5jQXBwbGljYXRpb24oKHpvbmU6IE5nWm9uZSkgPT4ge1xuICAgIC8vIFRPRE8ocmFkbyk6IHByZXBvcHVsYXRlIHRlbXBsYXRlIGNhY2hlLCBzbyBhcHBsaWNhdGlvbnMgd2l0aCBvbmx5XG4gICAgLy8gaW5kZXguaHRtbCBhbmQgbWFpbi5qcyBhcmUgcG9zc2libGUuXG4gICAgLy9cbiAgICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICAgIGJ1cy5pbml0Q2hhbm5lbChTRVRVUF9DSEFOTkVMLCBmYWxzZSk7XG5cbiAgICB2YXIgc3Vic2NyaXB0aW9uOiBhbnk7XG4gICAgdmFyIGVtaXR0ZXIgPSBidXMuZnJvbShTRVRVUF9DSEFOTkVMKTtcbiAgICBzdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoZW1pdHRlciwgKG1lc3NhZ2U6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICB2YXIgYmluZGluZ3MgPVxuICAgICAgICAgIFtBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLCB3ZWJXb3JrZXJQcm92aWRlcnMoYXBwQ29tcG9uZW50VHlwZSwgYnVzLCBtZXNzYWdlKV07XG4gICAgICBpZiAoaXNQcmVzZW50KGFwcFByb3ZpZGVycykpIHtcbiAgICAgICAgYmluZGluZ3MucHVzaChhcHBQcm92aWRlcnMpO1xuICAgICAgfVxuICAgICAgYm9vdHN0cmFwUHJvY2Vzcy5yZXNvbHZlKGJpbmRpbmdzKTtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2Uoc3Vic2NyaXB0aW9uKTtcbiAgICB9KTtcblxuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KGJ1cy50byhTRVRVUF9DSEFOTkVMKSwgXCJyZWFkeVwiKTtcbiAgICByZXR1cm4gYm9vdHN0cmFwUHJvY2Vzcy5wcm9taXNlO1xuICB9KTtcbiAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnRoZW4oYXBwUHJvbWlzZSwgKGFwcCkgPT4gYXBwLmJvb3RzdHJhcChhcHBDb21wb25lbnRUeXBlKSk7XG59XG4iXX0=