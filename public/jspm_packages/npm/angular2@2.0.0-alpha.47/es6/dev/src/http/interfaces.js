/* */ 
"format cjs";
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 */
export class ConnectionBackend {
}
/**
 * Abstract class from which real connections are derived.
 */
export class Connection {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9odHRwL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOlsiQ29ubmVjdGlvbkJhY2tlbmQiLCJDb25uZWN0aW9uIl0sIm1hcHBpbmdzIjoiQUFPQTs7Ozs7R0FLRztBQUNIO0FBQStGQSxDQUFDQTtBQUVoRzs7R0FFRztBQUNIO0FBSUFDLENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWR5U3RhdGVzLCBSZXF1ZXN0TWV0aG9kcywgUmVzcG9uc2VUeXBlc30gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXN9IGZyb20gJy4vdXJsX3NlYXJjaF9wYXJhbXMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZyb20gd2hpY2ggcmVhbCBiYWNrZW5kcyBhcmUgZGVyaXZlZC5cbiAqXG4gKiBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIGEgYENvbm5lY3Rpb25CYWNrZW5kYCBpcyB0byBjcmVhdGUgbmV3IGNvbm5lY3Rpb25zIHRvIGZ1bGZpbGwgYSBnaXZlblxuICoge0BsaW5rIFJlcXVlc3R9LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29ubmVjdGlvbkJhY2tlbmQgeyBhYnN0cmFjdCBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IGFueSk6IENvbm5lY3Rpb247IH1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmcm9tIHdoaWNoIHJlYWwgY29ubmVjdGlvbnMgYXJlIGRlcml2ZWQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcmVhZHlTdGF0ZTogUmVhZHlTdGF0ZXM7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHJlc3BvbnNlOiBhbnk7ICAvLyBUT0RPOiBnZW5lcmljIG9mIDxSZXNwb25zZT47XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBvcHRpb25zIHRvIGNvbnN0cnVjdCBhIFJlcXVlc3RPcHRpb25zLCBiYXNlZCBvblxuICogW1JlcXVlc3RJbml0XShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVxdWVzdGluaXQpIGZyb20gdGhlIEZldGNoIHNwZWMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgdXJsPzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmcgfCBSZXF1ZXN0TWV0aG9kcztcbiAgc2VhcmNoPzogc3RyaW5nIHwgVVJMU2VhcmNoUGFyYW1zO1xuICBoZWFkZXJzPzogSGVhZGVycztcbiAgLy8gVE9ETzogU3VwcG9ydCBCbG9iLCBBcnJheUJ1ZmZlciwgSlNPTiwgVVJMU2VhcmNoUGFyYW1zLCBGb3JtRGF0YVxuICBib2R5Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIHN0cnVjdHVyZSB3aGVuIGNvbnN0cnVjdGluZyBuZXcgUmVxdWVzdCgpO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBcmdzIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnNBcmdzIHsgdXJsOiBzdHJpbmc7IH1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIG9wdGlvbnMgdG8gY29uc3RydWN0IGEgUmVzcG9uc2UsIGJhc2VkIG9uXG4gKiBbUmVzcG9uc2VJbml0XShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2Vpbml0KSBmcm9tIHRoZSBGZXRjaCBzcGVjLlxuICovXG5leHBvcnQgdHlwZSBSZXNwb25zZU9wdGlvbnNBcmdzID0ge1xuICAvLyBUT0RPOiBTdXBwb3J0IEJsb2IsIEFycmF5QnVmZmVyLCBKU09OXG4gIGJvZHk/OiBzdHJpbmcgfCBPYmplY3QgfCBGb3JtRGF0YTtcbiAgc3RhdHVzPzogbnVtYmVyO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICBoZWFkZXJzPzogSGVhZGVycztcbiAgdHlwZT86IFJlc3BvbnNlVHlwZXM7XG4gIHVybD86IHN0cmluZztcbn1cbiJdfQ==