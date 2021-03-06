/* */ 
'use strict';
var di_1 = require('../../core/di');
var animation_builder_1 = require('../../animate/animation_builder');
var browser_details_1 = require('../../animate/browser_details');
var reflection_1 = require('../../core/reflection/reflection');
var change_detection_1 = require('../../core/change_detection/change_detection');
var common_dom_1 = require('../../../platform/common_dom');
var proto_view_factory_1 = require('../../core/linker/proto_view_factory');
var browser_adapter_1 = require('../../platform/browser/browser_adapter');
var key_events_1 = require('../../platform/dom/events/key_events');
var hammer_gestures_1 = require('../../platform/dom/events/hammer_gestures');
var view_pool_1 = require('../../core/linker/view_pool');
var api_1 = require('../../core/render/api');
var app_root_url_1 = require('../../compiler/app_root_url');
var dom_tokens_1 = require('../../platform/dom/dom_tokens');
var dom_renderer_1 = require('../../platform/dom/dom_renderer');
var dom_events_1 = require('../../platform/dom/events/dom_events');
var application_tokens_1 = require('../../core/application_tokens');
var element_schema_registry_1 = require('../../compiler/schema/element_schema_registry');
var dom_element_schema_registry_1 = require('../../compiler/schema/dom_element_schema_registry');
var shared_styles_host_1 = require('../../platform/dom/shared_styles_host');
var dom_adapter_1 = require('../../platform/dom/dom_adapter');
var ng_zone_1 = require('../../core/zone/ng_zone');
var view_manager_1 = require('../../core/linker/view_manager');
var view_manager_utils_1 = require('../../core/linker/view_manager_utils');
var view_listener_1 = require('../../core/linker/view_listener');
var view_resolver_1 = require('../../core/linker/view_resolver');
var directive_resolver_1 = require('../../core/linker/directive_resolver');
var exceptions_1 = require('../../facade/exceptions');
var dynamic_component_loader_1 = require('../../core/linker/dynamic_component_loader');
var url_resolver_1 = require('../../compiler/url_resolver');
var testability_1 = require('../../core/testability/testability');
var xhr_1 = require('../../compiler/xhr');
var xhr_impl_1 = require('../../platform/browser/xhr_impl');
var serializer_1 = require('../shared/serializer');
var api_2 = require('../shared/api');
var render_proto_view_ref_store_1 = require('../shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('../shared/render_view_with_fragments_store');
var anchor_based_app_root_url_1 = require('../../compiler/anchor_based_app_root_url');
var impl_1 = require('./impl');
var message_bus_1 = require('../shared/message_bus');
var renderer_1 = require('./renderer');
var xhr_impl_2 = require('./xhr_impl');
var setup_1 = require('./setup');
var service_message_broker_1 = require('../shared/service_message_broker');
var client_message_broker_1 = require('../shared/client_message_broker');
var platform_directives_and_pipes_1 = require('../../core/platform_directives_and_pipes');
var common_1 = require('../../../common');
var _rootInjector;
var _rootProviders = [di_1.provide(reflection_1.Reflector, {useValue: reflection_1.reflector})];
function _injectorProviders() {
  return [di_1.provide(dom_tokens_1.DOCUMENT, {useValue: dom_adapter_1.DOM.defaultDoc()}), common_dom_1.EventManager, new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
    useClass: dom_events_1.DomEventsPlugin,
    multi: true
  }), new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
    useClass: key_events_1.KeyEventsPlugin,
    multi: true
  }), new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
    useClass: hammer_gestures_1.HammerGesturesPlugin,
    multi: true
  }), di_1.provide(dom_renderer_1.DomRenderer, {useClass: dom_renderer_1.DomRenderer_}), di_1.provide(api_1.Renderer, {useExisting: dom_renderer_1.DomRenderer}), application_tokens_1.APP_ID_RANDOM_PROVIDER, shared_styles_host_1.DomSharedStylesHost, di_1.provide(shared_styles_host_1.SharedStylesHost, {useExisting: shared_styles_host_1.DomSharedStylesHost}), serializer_1.Serializer, di_1.provide(api_2.ON_WEB_WORKER, {useValue: false}), di_1.provide(element_schema_registry_1.ElementSchemaRegistry, {useValue: new dom_element_schema_registry_1.DomElementSchemaRegistry()}), render_view_with_fragments_store_1.RenderViewWithFragmentsStore, render_proto_view_ref_store_1.RenderProtoViewRefStore, view_pool_1.AppViewPool, di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, {useValue: 10000}), di_1.provide(view_manager_1.AppViewManager, {useClass: view_manager_1.AppViewManager_}), view_manager_utils_1.AppViewManagerUtils, view_listener_1.AppViewListener, proto_view_factory_1.ProtoViewFactory, view_resolver_1.ViewResolver, di_1.provide(platform_directives_and_pipes_1.PLATFORM_PIPES, {
    useValue: common_1.COMMON_PIPES,
    multi: true
  }), di_1.provide(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES, {
    useValue: common_1.COMMON_DIRECTIVES,
    multi: true
  }), directive_resolver_1.DirectiveResolver, change_detection_1.Parser, change_detection_1.Lexer, di_1.provide(exceptions_1.ExceptionHandler, {
    useFactory: function() {
      return new exceptions_1.ExceptionHandler(dom_adapter_1.DOM);
    },
    deps: []
  }), di_1.provide(xhr_1.XHR, {useValue: new xhr_impl_1.XHRImpl()}), url_resolver_1.UrlResolver, di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, {useClass: dynamic_component_loader_1.DynamicComponentLoader_}), testability_1.Testability, anchor_based_app_root_url_1.AnchorBasedAppRootUrl, di_1.provide(app_root_url_1.AppRootUrl, {useExisting: anchor_based_app_root_url_1.AnchorBasedAppRootUrl}), impl_1.WebWorkerApplication, setup_1.WebWorkerSetup, xhr_impl_2.MessageBasedXHRImpl, renderer_1.MessageBasedRenderer, di_1.provide(service_message_broker_1.ServiceMessageBrokerFactory, {useClass: service_message_broker_1.ServiceMessageBrokerFactory_}), di_1.provide(client_message_broker_1.ClientMessageBrokerFactory, {useClass: client_message_broker_1.ClientMessageBrokerFactory_}), browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder];
}
function createInjector(zone, bus) {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  _rootProviders.push(di_1.provide(ng_zone_1.NgZone, {useValue: zone}));
  _rootProviders.push(di_1.provide(message_bus_1.MessageBus, {useValue: bus}));
  var injector = di_1.Injector.resolveAndCreate(_rootProviders);
  return injector.resolveAndCreateChild(_injectorProviders());
}
exports.createInjector = createInjector;
