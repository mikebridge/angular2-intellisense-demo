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
import { RequestMethods, ResponseTypes } from '../enums';
import { Response } from '../static_response';
import { Headers } from '../headers';
import { ResponseOptions } from '../base_response_options';
import { Injectable } from 'angular2/core';
import { BrowserXhr } from './browser_xhr';
import { isPresent } from 'angular2/src/facade/lang';
import { Observable } from 'angular2/core';
import { isSuccess, getResponseURL } from '../http_utils';
/**
* Creates connections using `XMLHttpRequest`. Given a fully-qualified
* request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
* request.
*
* This class would typically not be created or interacted with directly inside applications, though
* the {@link MockConnection} may be interacted with in tests.
*/
export class XHRConnection {
    constructor(req, browserXHR, baseResponseOptions) {
        this.request = req;
        this.response = new Observable(responseObserver => {
            let _xhr = browserXHR.build();
            _xhr.open(RequestMethods[req.method].toUpperCase(), req.url);
            // load event handler
            let onLoad = () => {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in XHR Level2 spec (supported by
                // IE10)
                let body = isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                let headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                let url = getResponseURL(_xhr);
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                let status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var responseOptions = new ResponseOptions({ body, status, headers, url });
                if (isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                let response = new Response(responseOptions);
                if (isSuccess(status)) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            let onError = (err) => {
                var responseOptions = new ResponseOptions({ body: err, type: ResponseTypes.Error });
                if (isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            if (isPresent(req.headers)) {
                req.headers.forEach((values, name) => _xhr.setRequestHeader(name, values.join(',')));
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(this.request.text());
            return () => {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
}
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * ### Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from 'angular2/http';
 * @Component({
 *   viewProviders: [
 *     HTTP_PROVIDERS,
 *     provide(Http, {useFactory: (backend, options) => {
 *       return new Http(backend, options);
 *     }, deps: [MyNodeBackend, BaseRequestOptions]})]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http.request('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 *
 **/
export let XHRBackend = class {
    constructor(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
    }
    createConnection(request) {
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    }
};
XHRBackend = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [BrowserXhr, ResponseOptions])
], XHRBackend);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2JhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvaHR0cC9iYWNrZW5kcy94aHJfYmFja2VuZC50cyJdLCJuYW1lcyI6WyJYSFJDb25uZWN0aW9uIiwiWEhSQ29ubmVjdGlvbi5jb25zdHJ1Y3RvciIsIlhIUkJhY2tlbmQiLCJYSFJCYWNrZW5kLmNvbnN0cnVjdG9yIiwiWEhSQmFja2VuZC5jcmVhdGVDb25uZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztPQUNPLEVBQWMsY0FBYyxFQUFFLGFBQWEsRUFBQyxNQUFNLFVBQVU7T0FFNUQsRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0I7T0FDcEMsRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZO09BQzNCLEVBQUMsZUFBZSxFQUFzQixNQUFNLDBCQUEwQjtPQUN0RSxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWU7T0FDakMsRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlO09BQ2pDLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzNDLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZTtPQUNqQyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlO0FBQ3ZEOzs7Ozs7O0VBT0U7QUFDRjtJQVFFQSxZQUFZQSxHQUFZQSxFQUFFQSxVQUFzQkEsRUFBRUEsbUJBQXFDQTtRQUNyRkMsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLFVBQVVBLENBQUNBLGdCQUFnQkE7WUFDN0NBLElBQUlBLElBQUlBLEdBQW1CQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUM5Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FB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QU1aO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nvbm5lY3Rpb25CYWNrZW5kLCBDb25uZWN0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7UmVhZHlTdGF0ZXMsIFJlcXVlc3RNZXRob2RzLCBSZXNwb25zZVR5cGVzfSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4uL3N0YXRpY19yZXF1ZXN0JztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uL3N0YXRpY19yZXNwb25zZSc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4uL2hlYWRlcnMnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIEJhc2VSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4uL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyWGhyfSBmcm9tICcuL2Jyb3dzZXJfeGhyJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNTdWNjZXNzLCBnZXRSZXNwb25zZVVSTH0gZnJvbSAnLi4vaHR0cF91dGlscyc7XG4vKipcbiogQ3JlYXRlcyBjb25uZWN0aW9ucyB1c2luZyBgWE1MSHR0cFJlcXVlc3RgLiBHaXZlbiBhIGZ1bGx5LXF1YWxpZmllZFxuKiByZXF1ZXN0LCBhbiBgWEhSQ29ubmVjdGlvbmAgd2lsbCBpbW1lZGlhdGVseSBjcmVhdGUgYW4gYFhNTEh0dHBSZXF1ZXN0YCBvYmplY3QgYW5kIHNlbmQgdGhlXG4qIHJlcXVlc3QuXG4qXG4qIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSBjcmVhdGVkIG9yIGludGVyYWN0ZWQgd2l0aCBkaXJlY3RseSBpbnNpZGUgYXBwbGljYXRpb25zLCB0aG91Z2hcbiogdGhlIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gbWF5IGJlIGludGVyYWN0ZWQgd2l0aCBpbiB0ZXN0cy5cbiovXG5leHBvcnQgY2xhc3MgWEhSQ29ubmVjdGlvbiBpbXBsZW1lbnRzIENvbm5lY3Rpb24ge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICAvKipcbiAgICogUmVzcG9uc2Uge0BsaW5rIEV2ZW50RW1pdHRlcn0gd2hpY2ggZW1pdHMgYSBzaW5nbGUge0BsaW5rIFJlc3BvbnNlfSB2YWx1ZSBvbiBsb2FkIGV2ZW50IG9mXG4gICAqIGBYTUxIdHRwUmVxdWVzdGAuXG4gICAqL1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGVzO1xuICBjb25zdHJ1Y3RvcihyZXE6IFJlcXVlc3QsIGJyb3dzZXJYSFI6IEJyb3dzZXJYaHIsIGJhc2VSZXNwb25zZU9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gICAgdGhpcy5yZXNwb25zZSA9IG5ldyBPYnNlcnZhYmxlKHJlc3BvbnNlT2JzZXJ2ZXIgPT4ge1xuICAgICAgbGV0IF94aHI6IFhNTEh0dHBSZXF1ZXN0ID0gYnJvd3NlclhIUi5idWlsZCgpO1xuICAgICAgX3hoci5vcGVuKFJlcXVlc3RNZXRob2RzW3JlcS5tZXRob2RdLnRvVXBwZXJDYXNlKCksIHJlcS51cmwpO1xuICAgICAgLy8gbG9hZCBldmVudCBoYW5kbGVyXG4gICAgICBsZXQgb25Mb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyByZXNwb25zZVRleHQgaXMgdGhlIG9sZC1zY2hvb2wgd2F5IG9mIHJldHJpZXZpbmcgcmVzcG9uc2UgKHN1cHBvcnRlZCBieSBJRTggJiA5KVxuICAgICAgICAvLyByZXNwb25zZS9yZXNwb25zZVR5cGUgcHJvcGVydGllcyB3ZXJlIGludHJvZHVjZWQgaW4gWEhSIExldmVsMiBzcGVjIChzdXBwb3J0ZWQgYnlcbiAgICAgICAgLy8gSUUxMClcbiAgICAgICAgbGV0IGJvZHkgPSBpc1ByZXNlbnQoX3hoci5yZXNwb25zZSkgPyBfeGhyLnJlc3BvbnNlIDogX3hoci5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBIZWFkZXJzLmZyb21SZXNwb25zZUhlYWRlclN0cmluZyhfeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcblxuICAgICAgICBsZXQgdXJsID0gZ2V0UmVzcG9uc2VVUkwoX3hocik7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IF94aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogX3hoci5zdGF0dXM7XG5cbiAgICAgICAgLy8gZml4IHN0YXR1cyBjb2RlIHdoZW4gaXQgaXMgMCAoMCBzdGF0dXMgaXMgdW5kb2N1bWVudGVkKS5cbiAgICAgICAgLy8gT2NjdXJzIHdoZW4gYWNjZXNzaW5nIGZpbGUgcmVzb3VyY2VzIG9yIG9uIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcbiAgICAgICAgLy8gd2hpbGUgcmV0cmlldmluZyBmaWxlcyBmcm9tIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgICAgICBpZiAoc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgc3RhdHVzID0gYm9keSA/IDIwMCA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHksIHN0YXR1cywgaGVhZGVycywgdXJsfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIGlmIChpc1N1Y2Nlc3Moc3RhdHVzKSkge1xuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIubmV4dChyZXNwb25zZSk7XG4gICAgICAgICAgLy8gVE9ETyhnZGkyMjkwKTogZGVmZXIgY29tcGxldGUgaWYgYXJyYXkgYnVmZmVyIHVudGlsIGRvbmVcbiAgICAgICAgICByZXNwb25zZU9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgfTtcbiAgICAgIC8vIGVycm9yIGV2ZW50IGhhbmRsZXJcbiAgICAgIGxldCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICB2YXIgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogZXJyLCB0eXBlOiBSZXNwb25zZVR5cGVzLkVycm9yfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNQcmVzZW50KHJlcS5oZWFkZXJzKSkge1xuICAgICAgICByZXEuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZXMsIG5hbWUpID0+IF94aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZXMuam9pbignLCcpKSk7XG4gICAgICB9XG5cbiAgICAgIF94aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICBfeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgIF94aHIuc2VuZCh0aGlzLnJlcXVlc3QudGV4dCgpKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBfeGhyLmFib3J0KCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB7QGxpbmsgWEhSQ29ubmVjdGlvbn0gaW5zdGFuY2VzLlxuICpcbiAqIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSB1c2VkIGJ5IGVuZCB1c2VycywgYnV0IGNvdWxkIGJlXG4gKiBvdmVycmlkZGVuIGlmIGEgZGlmZmVyZW50IGJhY2tlbmQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGJlIHVzZWQsXG4gKiBzdWNoIGFzIGluIGEgbm9kZSBiYWNrZW5kLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0h0dHAsIE15Tm9kZUJhY2tlbmQsIEhUVFBfUFJPVklERVJTLCBCYXNlUmVxdWVzdE9wdGlvbnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICogQENvbXBvbmVudCh7XG4gKiAgIHZpZXdQcm92aWRlcnM6IFtcbiAqICAgICBIVFRQX1BST1ZJREVSUyxcbiAqICAgICBwcm92aWRlKEh0dHAsIHt1c2VGYWN0b3J5OiAoYmFja2VuZCwgb3B0aW9ucykgPT4ge1xuICogICAgICAgcmV0dXJuIG5ldyBIdHRwKGJhY2tlbmQsIG9wdGlvbnMpO1xuICogICAgIH0sIGRlcHM6IFtNeU5vZGVCYWNrZW5kLCBCYXNlUmVxdWVzdE9wdGlvbnNdfSldXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3RvcihodHRwOkh0dHApIHtcbiAqICAgICBodHRwLnJlcXVlc3QoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCkpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWEhSQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJvd3NlclhIUjogQnJvd3NlclhociwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7fVxuICBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IFJlcXVlc3QpOiBYSFJDb25uZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IFhIUkNvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5fYnJvd3NlclhIUiwgdGhpcy5fYmFzZVJlc3BvbnNlT3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==