/* */ 
"format cjs";
import { isString, Json } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { isJsObject } from './http_utils';
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 */
export class Response {
    constructor(responseOptions) {
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    /**
     * Not yet implemented
     */
    // TODO: Blob return type
    blob() { throw new BaseException('"blob()" method not implemented on Response superclass'); }
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json() {
        var jsonResponse;
        if (isJsObject(this._body)) {
            jsonResponse = this._body;
        }
        else if (isString(this._body)) {
            jsonResponse = Json.parse(this._body);
        }
        return jsonResponse;
    }
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    text() { return this._body.toString(); }
    /**
     * Not yet implemented
     */
    // TODO: ArrayBuffer return type
    arrayBuffer() {
        throw new BaseException('"arrayBuffer()" method not implemented on Response superclass');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2h0dHAvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbIlJlc3BvbnNlIiwiUmVzcG9uc2UuY29uc3RydWN0b3IiLCJSZXNwb25zZS5ibG9iIiwiUmVzcG9uc2UuanNvbiIsIlJlc3BvbnNlLnRleHQiLCJSZXNwb25zZS5hcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ik9BQ08sRUFBYSxRQUFRLEVBQWEsSUFBSSxFQUFDLE1BQU0sMEJBQTBCO09BQ3ZFLEVBQUMsYUFBYSxFQUFtQixNQUFNLGdDQUFnQztPQUd2RSxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0g7SUFrREVBLFlBQVlBLGVBQWdDQTtRQUMxQ0MsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbENBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLGVBQWVBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxlQUFlQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUM3Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsZUFBZUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDdkNBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxlQUFlQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0hBLHlCQUF5QkE7SUFDekJBLElBQUlBLEtBQVVFLE1BQU1BLElBQUlBLGFBQWFBLENBQUNBLHdEQUF3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFbEdGOztPQUVHQTtJQUNIQSxJQUFJQTtRQUNGRyxJQUFJQSxZQUFZQSxDQUFDQTtRQUNqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQzVCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBU0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaERBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVESDs7T0FFR0E7SUFDSEEsSUFBSUEsS0FBYUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFaERKOztPQUVHQTtJQUNIQSxnQ0FBZ0NBO0lBQ2hDQSxXQUFXQTtRQUNUSyxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSwrREFBK0RBLENBQUNBLENBQUNBO0lBQzNGQSxDQUFDQTtBQUNITCxDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXNwb25zZVR5cGVzfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgaXNTdHJpbmcsIGlzUHJlc2VudCwgSnNvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zfSBmcm9tICcuL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge2lzSnNPYmplY3R9IGZyb20gJy4vaHR0cF91dGlscyc7XG5cbi8qKlxuICogQ3JlYXRlcyBgUmVzcG9uc2VgIGluc3RhbmNlcyBmcm9tIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBUaG91Z2ggdGhpcyBvYmplY3QgaXNuJ3RcbiAqIHVzdWFsbHkgaW5zdGFudGlhdGVkIGJ5IGVuZC11c2VycywgaXQgaXMgdGhlIHByaW1hcnkgb2JqZWN0IGludGVyYWN0ZWQgd2l0aCB3aGVuIGl0IGNvbWVzIHRpbWUgdG9cbiAqIGFkZCBkYXRhIHRvIGEgdmlldy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaHR0cC5yZXF1ZXN0KCdteS1mcmllbmRzLnR4dCcpLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLmZyaWVuZHMgPSByZXNwb25zZS50ZXh0KCkpO1xuICogYGBgXG4gKlxuICogVGhlIFJlc3BvbnNlJ3MgaW50ZXJmYWNlIGlzIGluc3BpcmVkIGJ5IHRoZSBSZXNwb25zZSBjb25zdHJ1Y3RvciBkZWZpbmVkIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZS1jbGFzcyksIGJ1dCBpcyBjb25zaWRlcmVkIGEgc3RhdGljIHZhbHVlIHdob3NlIGJvZHlcbiAqIGNhbiBiZSBhY2Nlc3NlZCBtYW55IHRpbWVzLiBUaGVyZSBhcmUgb3RoZXIgZGlmZmVyZW5jZXMgaW4gdGhlIGltcGxlbWVudGF0aW9uLCBidXQgdGhpcyBpcyB0aGVcbiAqIG1vc3Qgc2lnbmlmaWNhbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZSB7XG4gIC8qKlxuICAgKiBPbmUgb2YgXCJiYXNpY1wiLCBcImNvcnNcIiwgXCJkZWZhdWx0XCIsIFwiZXJyb3IsIG9yIFwib3BhcXVlXCIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIFwiZGVmYXVsdFwiLlxuICAgKi9cbiAgdHlwZTogUmVzcG9uc2VUeXBlcztcbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIHJlc3BvbnNlJ3Mgc3RhdHVzIGlzIHdpdGhpbiAyMDAtMjk5XG4gICAqL1xuICBvazogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVSTCBvZiByZXNwb25zZS5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZW1wdHkgc3RyaW5nLlxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdGF0dXMgY29kZSByZXR1cm5lZCBieSBzZXJ2ZXIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIDIwMC5cbiAgICovXG4gIHN0YXR1czogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCByZXByZXNlbnRpbmcgdGhlIGNvcnJlc3BvbmRpbmcgcmVhc29uIHBocmFzZSB0byB0aGUgYHN0YXR1c2AsIGFzIGRlZmluZWQgaW4gW2lldGYgcmZjIDI2MTZcbiAgICogc2VjdGlvbiA2LjEuMV0oaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI2MTYjc2VjdGlvbi02LjEuMSlcbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJPS1wiXG4gICAqL1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBOb24tc3RhbmRhcmQgcHJvcGVydHlcbiAgICpcbiAgICogRGVub3RlcyBob3cgbWFueSBvZiB0aGUgcmVzcG9uc2UgYm9keSdzIGJ5dGVzIGhhdmUgYmVlbiBsb2FkZWQsIGZvciBleGFtcGxlIGlmIHRoZSByZXNwb25zZSBpc1xuICAgKiB0aGUgcmVzdWx0IG9mIGEgcHJvZ3Jlc3MgZXZlbnQuXG4gICAqL1xuICBieXRlc0xvYWRlZDogbnVtYmVyO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgYnl0ZXMgYXJlIGV4cGVjdGVkIGluIHRoZSBmaW5hbCByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdG90YWxCeXRlczogbnVtYmVyO1xuICAvKipcbiAgICogSGVhZGVycyBvYmplY3QgYmFzZWQgb24gdGhlIGBIZWFkZXJzYCBjbGFzcyBpbiB0aGUgW0ZldGNoXG4gICAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIC8vIFRPRE86IFN1cHBvcnQgQXJyYXlCdWZmZXIsIEpTT04sIEZvcm1EYXRhLCBCbG9iXG4gIHByaXZhdGUgX2JvZHk6IHN0cmluZyB8IE9iamVjdDtcbiAgY29uc3RydWN0b3IocmVzcG9uc2VPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICB0aGlzLl9ib2R5ID0gcmVzcG9uc2VPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZU9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IHJlc3BvbnNlT3B0aW9ucy5zdGF0dXNUZXh0O1xuICAgIHRoaXMuaGVhZGVycyA9IHJlc3BvbnNlT3B0aW9ucy5oZWFkZXJzO1xuICAgIHRoaXMudHlwZSA9IHJlc3BvbnNlT3B0aW9ucy50eXBlO1xuICAgIHRoaXMudXJsID0gcmVzcG9uc2VPcHRpb25zLnVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3QgeWV0IGltcGxlbWVudGVkXG4gICAqL1xuICAvLyBUT0RPOiBCbG9iIHJldHVybiB0eXBlXG4gIGJsb2IoKTogYW55IHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1wiYmxvYigpXCIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCBvbiBSZXNwb25zZSBzdXBlcmNsYXNzJyk7IH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gcmV0dXJuIGJvZHkgYXMgcGFyc2VkIGBKU09OYCBvYmplY3QsIG9yIHJhaXNlcyBhbiBleGNlcHRpb24uXG4gICAqL1xuICBqc29uKCk6IE9iamVjdCB7XG4gICAgdmFyIGpzb25SZXNwb25zZTtcbiAgICBpZiAoaXNKc09iamVjdCh0aGlzLl9ib2R5KSkge1xuICAgICAganNvblJlc3BvbnNlID0gdGhpcy5fYm9keTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRoaXMuX2JvZHkpKSB7XG4gICAgICBqc29uUmVzcG9uc2UgPSBKc29uLnBhcnNlKDxzdHJpbmc+dGhpcy5fYm9keSk7XG4gICAgfVxuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm9keSBhcyBhIHN0cmluZywgcHJlc3VtaW5nIGB0b1N0cmluZygpYCBjYW4gYmUgY2FsbGVkIG9uIHRoZSByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdGV4dCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYm9keS50b1N0cmluZygpOyB9XG5cbiAgLyoqXG4gICAqIE5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICovXG4gIC8vIFRPRE86IEFycmF5QnVmZmVyIHJldHVybiB0eXBlXG4gIGFycmF5QnVmZmVyKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1wiYXJyYXlCdWZmZXIoKVwiIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQgb24gUmVzcG9uc2Ugc3VwZXJjbGFzcycpO1xuICB9XG59XG4iXX0=