/* */ 
'use strict';
var di_1 = require('../../core/di');
var forms_1 = require('../../common/forms');
var lang_1 = require('../../facade/lang');
var exceptions_1 = require('../../facade/exceptions');
var async_1 = require('../../facade/async');
var xhr_1 = require('../../compiler/xhr');
var xhr_impl_1 = require('./xhr_impl');
var app_root_url_1 = require('../../compiler/app_root_url');
var renderer_1 = require('./renderer');
var api_1 = require('../../core/render/api');
var client_message_broker_1 = require('../shared/client_message_broker');
var service_message_broker_1 = require('../shared/service_message_broker');
var message_bus_1 = require('../shared/message_bus');
var core_1 = require('../../../core');
var core = require('../../../core');
var serializer_1 = require('../shared/serializer');
var api_2 = require('../shared/api');
var render_proto_view_ref_store_1 = require('../shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('../shared/render_view_with_fragments_store');
var async_2 = require('../../facade/async');
var messaging_api_1 = require('../shared/messaging_api');
var event_dispatcher_1 = require('./event_dispatcher');
var compiler_1 = require('../../compiler/compiler');
function platform(providers) {
  var platformProviders = lang_1.isPresent(providers) ? [core_1.PLATFORM_COMMON_PROVIDERS, providers] : core_1.PLATFORM_COMMON_PROVIDERS;
  return core.platform(platformProviders);
}
exports.platform = platform;
var PrintLogger = (function() {
  function PrintLogger() {
    this.log = lang_1.print;
    this.logError = lang_1.print;
    this.logGroup = lang_1.print;
  }
  PrintLogger.prototype.logGroupEnd = function() {};
  return PrintLogger;
})();
function webWorkerProviders(appComponentType, bus, initData) {
  return [compiler_1.COMPILER_PROVIDERS, serializer_1.Serializer, di_1.provide(message_bus_1.MessageBus, {useValue: bus}), di_1.provide(client_message_broker_1.ClientMessageBrokerFactory, {useClass: client_message_broker_1.ClientMessageBrokerFactory_}), di_1.provide(service_message_broker_1.ServiceMessageBrokerFactory, {useClass: service_message_broker_1.ServiceMessageBrokerFactory_}), renderer_1.WebWorkerRenderer, di_1.provide(api_1.Renderer, {useExisting: renderer_1.WebWorkerRenderer}), di_1.provide(api_2.ON_WEB_WORKER, {useValue: true}), render_view_with_fragments_store_1.RenderViewWithFragmentsStore, render_proto_view_ref_store_1.RenderProtoViewRefStore, di_1.provide(exceptions_1.ExceptionHandler, {
    useFactory: function() {
      return new exceptions_1.ExceptionHandler(new PrintLogger());
    },
    deps: []
  }), xhr_impl_1.WebWorkerXHRImpl, di_1.provide(xhr_1.XHR, {useExisting: xhr_impl_1.WebWorkerXHRImpl}), di_1.provide(app_root_url_1.AppRootUrl, {useValue: new app_root_url_1.AppRootUrl(initData['rootUrl'])}), event_dispatcher_1.WebWorkerEventDispatcher, forms_1.FORM_PROVIDERS];
}
function bootstrapWebWorkerCommon(appComponentType, bus, appProviders) {
  if (appProviders === void 0) {
    appProviders = null;
  }
  var bootstrapProcess = async_1.PromiseWrapper.completer();
  var appPromise = platform().asyncApplication(function(zone) {
    bus.attachToZone(zone);
    bus.initChannel(messaging_api_1.SETUP_CHANNEL, false);
    var subscription;
    var emitter = bus.from(messaging_api_1.SETUP_CHANNEL);
    subscription = async_2.ObservableWrapper.subscribe(emitter, function(message) {
      var bindings = [core_1.APPLICATION_COMMON_PROVIDERS, webWorkerProviders(appComponentType, bus, message)];
      if (lang_1.isPresent(appProviders)) {
        bindings.push(appProviders);
      }
      bootstrapProcess.resolve(bindings);
      async_2.ObservableWrapper.dispose(subscription);
    });
    async_2.ObservableWrapper.callEmit(bus.to(messaging_api_1.SETUP_CHANNEL), "ready");
    return bootstrapProcess.promise;
  });
  return async_1.PromiseWrapper.then(appPromise, function(app) {
    return app.bootstrap(appComponentType);
  });
}
exports.bootstrapWebWorkerCommon = bootstrapWebWorkerCommon;
