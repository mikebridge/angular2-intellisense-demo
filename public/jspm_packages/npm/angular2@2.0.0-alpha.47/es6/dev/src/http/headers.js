/* */ 
"format cjs";
import { isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { isListLikeIterable, Map, MapWrapper, StringMapWrapper, ListWrapper } from 'angular2/src/facade/collection';
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
 *
 * ```
 * import {Headers} from 'angular2/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 */
export class Headers {
    constructor(headers) {
        if (headers instanceof Headers) {
            this._headersMap = headers._headersMap;
            return;
        }
        this._headersMap = new Map();
        if (isBlank(headers)) {
            return;
        }
        // headers instanceof StringMap
        StringMapWrapper.forEach(headers, (v, k) => { this._headersMap.set(k, isListLikeIterable(v) ? v : [v]); });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    static fromResponseHeaderString(headersString) {
        return headersString.trim()
            .split('\n')
            .map(val => val.split(':'))
            .map(([key, ...parts]) => ([key.trim(), parts.join(':').trim()]))
            .reduce((headers, [key, value]) => !headers.set(key, value) && headers, new Headers());
    }
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    append(name, value) {
        var mapName = this._headersMap.get(name);
        var list = isListLikeIterable(mapName) ? mapName : [];
        list.push(value);
        this._headersMap.set(name, list);
    }
    /**
     * Deletes all header values for the given name.
     */
    delete(name) { this._headersMap.delete(name); }
    forEach(fn) {
        this._headersMap.forEach(fn);
    }
    /**
     * Returns first header that matches given name.
     */
    get(header) { return ListWrapper.first(this._headersMap.get(header)); }
    /**
     * Check for existence of header by given name.
     */
    has(header) { return this._headersMap.has(header); }
    /**
     * Provides names of set headers
     */
    keys() { return MapWrapper.keys(this._headersMap); }
    /**
     * Sets or overrides header value for given name.
     */
    set(header, value) {
        var list = [];
        if (isListLikeIterable(value)) {
            var pushValue = value.join(',');
            list.push(pushValue);
        }
        else {
            list.push(value);
        }
        this._headersMap.set(header, list);
    }
    /**
     * Returns values of all headers.
     */
    values() { return MapWrapper.values(this._headersMap); }
    /**
     * Returns list of header values for a given name.
     */
    getAll(header) {
        var headers = this._headersMap.get(header);
        return isListLikeIterable(headers) ? headers : [];
    }
    /**
     * This method is not implemented.
     */
    entries() { throw new BaseException('"entries" method is not implemented on Headers class'); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9odHRwL2hlYWRlcnMudHMiXSwibmFtZXMiOlsiSGVhZGVycyIsIkhlYWRlcnMuY29uc3RydWN0b3IiLCJIZWFkZXJzLmZyb21SZXNwb25zZUhlYWRlclN0cmluZyIsIkhlYWRlcnMuYXBwZW5kIiwiSGVhZGVycy5kZWxldGUiLCJIZWFkZXJzLmZvckVhY2giLCJIZWFkZXJzLmdldCIsIkhlYWRlcnMuaGFzIiwiSGVhZGVycy5rZXlzIiwiSGVhZGVycy5zZXQiLCJIZWFkZXJzLnZhbHVlcyIsIkhlYWRlcnMuZ2V0QWxsIiwiSGVhZGVycy5lbnRyaWVzIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFZLE9BQU8sRUFBb0MsTUFBTSwwQkFBMEI7T0FDdkYsRUFBQyxhQUFhLEVBQW1CLE1BQU0sZ0NBQWdDO09BQ3ZFLEVBQ0wsa0JBQWtCLEVBQ2xCLEdBQUcsRUFDSCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWixNQUFNLGdDQUFnQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBR0VBLFlBQVlBLE9BQXdDQTtRQUNsREMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsWUFBWUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLElBQUlBLENBQUNBLFdBQVdBLEdBQWFBLE9BQVFBLENBQUNBLFdBQVdBLENBQUNBO1lBQ2xEQSxNQUFNQSxDQUFDQTtRQUNUQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxHQUFHQSxFQUFvQkEsQ0FBQ0E7UUFFL0NBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxNQUFNQSxDQUFDQTtRQUNUQSxDQUFDQTtRQUVEQSwrQkFBK0JBO1FBQy9CQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQ3BCQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxrQkFBa0JBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3hGQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSEEsT0FBT0Esd0JBQXdCQSxDQUFDQSxhQUFxQkE7UUFDbkRFLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBO2FBQ3RCQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTthQUNYQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTthQUMxQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsRUFBRUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDaEVBLE1BQU1BLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLENBQUNBLElBQUlBLE9BQU9BLEVBQUVBLElBQUlBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBO0lBQzdGQSxDQUFDQTtJQUVERjs7T0FFR0E7SUFDSEEsTUFBTUEsQ0FBQ0EsSUFBWUEsRUFBRUEsS0FBYUE7UUFDaENHLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3pDQSxJQUFJQSxJQUFJQSxHQUFHQSxrQkFBa0JBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBO1FBQ3REQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRURIOztPQUVHQTtJQUNIQSxNQUFNQSxDQUFFQSxJQUFZQSxJQUFVSSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUU5REosT0FBT0EsQ0FBQ0EsRUFBNEVBO1FBQ2xGSyxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFFREw7O09BRUdBO0lBQ0hBLEdBQUdBLENBQUNBLE1BQWNBLElBQVlNLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXZGTjs7T0FFR0E7SUFDSEEsR0FBR0EsQ0FBQ0EsTUFBY0EsSUFBYU8sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFckVQOztPQUVHQTtJQUNIQSxJQUFJQSxLQUFlUSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUU5RFI7O09BRUdBO0lBQ0hBLEdBQUdBLENBQUNBLE1BQWNBLEVBQUVBLEtBQXdCQTtRQUMxQ1MsSUFBSUEsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFZEEsRUFBRUEsQ0FBQ0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsSUFBSUEsU0FBU0EsR0FBY0EsS0FBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBRURUOztPQUVHQTtJQUNIQSxNQUFNQSxLQUFpQlUsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFcEVWOztPQUVHQTtJQUNIQSxNQUFNQSxDQUFDQSxNQUFjQTtRQUNuQlcsSUFBSUEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDcERBLENBQUNBO0lBRURYOztPQUVHQTtJQUNIQSxPQUFPQSxLQUFLWSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSxzREFBc0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQ2hHWixDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIGlzSnNPYmplY3QsIGlzVHlwZSwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIGlzTGlzdExpa2VJdGVyYWJsZSxcbiAgTWFwLFxuICBNYXBXcmFwcGVyLFxuICBTdHJpbmdNYXBXcmFwcGVyLFxuICBMaXN0V3JhcHBlcixcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgW0hlYWRlcnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IZWFkZXJzL0hlYWRlcnMpLCBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBbRmV0Y2ggU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2hlYWRlcnMtY2xhc3MpLlxuICpcbiAqIFRoZSBvbmx5IGtub3duIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGBIZWFkZXJzYCBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHNwZWMgaXMgdGhlXG4gKiBsYWNrIG9mIGFuIGBlbnRyaWVzYCBtZXRob2QuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L01UZHdUNj9wPXByZXZpZXcpKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtIZWFkZXJzfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbiAqXG4gKiB2YXIgZmlyc3RIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAqIGZpcnN0SGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdpbWFnZS9qcGVnJyk7XG4gKiBjb25zb2xlLmxvZyhmaXJzdEhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkgLy8naW1hZ2UvanBlZydcbiAqXG4gKiAvLyBDcmVhdGUgaGVhZGVycyBmcm9tIFBsYWluIE9sZCBKYXZhU2NyaXB0IE9iamVjdFxuICogdmFyIHNlY29uZEhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XG4gKiAgICdYLU15LUN1c3RvbS1IZWFkZXInOiAnQW5ndWxhcidcbiAqIH0pO1xuICogY29uc29sZS5sb2coc2Vjb25kSGVhZGVycy5nZXQoJ1gtTXktQ3VzdG9tLUhlYWRlcicpKTsgLy8nQW5ndWxhcidcbiAqXG4gKiB2YXIgdGhpcmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoc2Vjb25kSGVhZGVycyk7XG4gKiBjb25zb2xlLmxvZyh0aGlyZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEhlYWRlcnMge1xuICAvKiogQGludGVybmFsICovXG4gIF9oZWFkZXJzTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnM/OiBIZWFkZXJzIHwge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIHRoaXMuX2hlYWRlcnNNYXAgPSAoPEhlYWRlcnM+aGVhZGVycykuX2hlYWRlcnNNYXA7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faGVhZGVyc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuICAgIGlmIChpc0JsYW5rKGhlYWRlcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaGVhZGVycyBpbnN0YW5jZW9mIFN0cmluZ01hcFxuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgICAgaGVhZGVycywgKHYsIGspID0+IHsgdGhpcy5faGVhZGVyc01hcC5zZXQoaywgaXNMaXN0TGlrZUl0ZXJhYmxlKHYpID8gdiA6IFt2XSk7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgSGVhZGVycyBpbnN0YW5jZSBmcm9tIHRoZSBnaXZlbiBET01TdHJpbmcgb2YgUmVzcG9uc2UgSGVhZGVyc1xuICAgKi9cbiAgc3RhdGljIGZyb21SZXNwb25zZUhlYWRlclN0cmluZyhoZWFkZXJzU3RyaW5nOiBzdHJpbmcpOiBIZWFkZXJzIHtcbiAgICByZXR1cm4gaGVhZGVyc1N0cmluZy50cmltKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKHZhbCA9PiB2YWwuc3BsaXQoJzonKSlcbiAgICAgICAgLm1hcCgoW2tleSwgLi4ucGFydHNdKSA9PiAoW2tleS50cmltKCksIHBhcnRzLmpvaW4oJzonKS50cmltKCldKSlcbiAgICAgICAgLnJlZHVjZSgoaGVhZGVycywgW2tleSwgdmFsdWVdKSA9PiAhaGVhZGVycy5zZXQoa2V5LCB2YWx1ZSkgJiYgaGVhZGVycywgbmV3IEhlYWRlcnMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIGhlYWRlciB0byBleGlzdGluZyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gaGVhZGVyIG5hbWUuXG4gICAqL1xuICBhcHBlbmQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIG1hcE5hbWUgPSB0aGlzLl9oZWFkZXJzTWFwLmdldChuYW1lKTtcbiAgICB2YXIgbGlzdCA9IGlzTGlzdExpa2VJdGVyYWJsZShtYXBOYW1lKSA/IG1hcE5hbWUgOiBbXTtcbiAgICBsaXN0LnB1c2godmFsdWUpO1xuICAgIHRoaXMuX2hlYWRlcnNNYXAuc2V0KG5hbWUsIGxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGhlYWRlciB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZGVsZXRlIChuYW1lOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5faGVhZGVyc01hcC5kZWxldGUobmFtZSk7IH1cblxuICBmb3JFYWNoKGZuOiAodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nLCBoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWFkZXJzTWFwLmZvckVhY2goZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZmlyc3QgaGVhZGVyIHRoYXQgbWF0Y2hlcyBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0KGhlYWRlcjogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIExpc3RXcmFwcGVyLmZpcnN0KHRoaXMuX2hlYWRlcnNNYXAuZ2V0KGhlYWRlcikpOyB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBleGlzdGVuY2Ugb2YgaGVhZGVyIGJ5IGdpdmVuIG5hbWUuXG4gICAqL1xuICBoYXMoaGVhZGVyOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hlYWRlcnNNYXAuaGFzKGhlYWRlcik7IH1cblxuICAvKipcbiAgICogUHJvdmlkZXMgbmFtZXMgb2Ygc2V0IGhlYWRlcnNcbiAgICovXG4gIGtleXMoKTogc3RyaW5nW10geyByZXR1cm4gTWFwV3JhcHBlci5rZXlzKHRoaXMuX2hlYWRlcnNNYXApOyB9XG5cbiAgLyoqXG4gICAqIFNldHMgb3Igb3ZlcnJpZGVzIGhlYWRlciB2YWx1ZSBmb3IgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIHNldChoZWFkZXI6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdmFyIGxpc3QgPSBbXTtcblxuICAgIGlmIChpc0xpc3RMaWtlSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICB2YXIgcHVzaFZhbHVlID0gKDxzdHJpbmdbXT52YWx1ZSkuam9pbignLCcpO1xuICAgICAgbGlzdC5wdXNoKHB1c2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QucHVzaCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5faGVhZGVyc01hcC5zZXQoaGVhZGVyLCBsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHZhbHVlcyBvZiBhbGwgaGVhZGVycy5cbiAgICovXG4gIHZhbHVlcygpOiBzdHJpbmdbXVtdIHsgcmV0dXJuIE1hcFdyYXBwZXIudmFsdWVzKHRoaXMuX2hlYWRlcnNNYXApOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbGlzdCBvZiBoZWFkZXIgdmFsdWVzIGZvciBhIGdpdmVuIG5hbWUuXG4gICAqL1xuICBnZXRBbGwoaGVhZGVyOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgdmFyIGhlYWRlcnMgPSB0aGlzLl9oZWFkZXJzTWFwLmdldChoZWFkZXIpO1xuICAgIHJldHVybiBpc0xpc3RMaWtlSXRlcmFibGUoaGVhZGVycykgPyBoZWFkZXJzIDogW107XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlxuICAgKi9cbiAgZW50cmllcygpIHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1wiZW50cmllc1wiIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQgb24gSGVhZGVycyBjbGFzcycpOyB9XG59XG4iXX0=