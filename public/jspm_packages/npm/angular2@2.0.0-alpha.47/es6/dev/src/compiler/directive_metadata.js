/* */ 
"format cjs";
import { isPresent, isBlank, normalizeBool, serializeEnum, RegExpWrapper } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { ChangeDetectionStrategy, CHANGE_DETECTION_STRATEGY_VALUES } from 'angular2/src/core/change_detection/change_detection';
import { ViewEncapsulation, VIEW_ENCAPSULATION_VALUES } from 'angular2/src/core/metadata/view';
import { CssSelector } from 'angular2/src/compiler/selector';
import { splitAtColon } from './util';
import { LIFECYCLE_HOOKS_VALUES } from 'angular2/src/core/linker/interfaces';
// group 1: "property" from "[property]"
// group 2: "event" from "(event)"
var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
export class CompileTypeMetadata {
    constructor({ runtime, name, moduleUrl, isHost } = {}) {
        this.runtime = runtime;
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.isHost = normalizeBool(isHost);
    }
    static fromJson(data) {
        return new CompileTypeMetadata({ name: data['name'], moduleUrl: data['moduleUrl'], isHost: data['isHost'] });
    }
    toJson() {
        return {
            // Note: Runtime type can't be serialized...
            'name': this.name,
            'moduleUrl': this.moduleUrl,
            'isHost': this.isHost
        };
    }
}
export class CompileTemplateMetadata {
    constructor({ encapsulation, template, templateUrl, styles, styleUrls, ngContentSelectors } = {}) {
        this.encapsulation = isPresent(encapsulation) ? encapsulation : ViewEncapsulation.Emulated;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = isPresent(styles) ? styles : [];
        this.styleUrls = isPresent(styleUrls) ? styleUrls : [];
        this.ngContentSelectors = isPresent(ngContentSelectors) ? ngContentSelectors : [];
    }
    static fromJson(data) {
        return new CompileTemplateMetadata({
            encapsulation: isPresent(data['encapsulation']) ?
                VIEW_ENCAPSULATION_VALUES[data['encapsulation']] :
                data['encapsulation'],
            template: data['template'],
            templateUrl: data['templateUrl'],
            styles: data['styles'],
            styleUrls: data['styleUrls'],
            ngContentSelectors: data['ngContentSelectors']
        });
    }
    toJson() {
        return {
            'encapsulation': isPresent(this.encapsulation) ? serializeEnum(this.encapsulation) : this.encapsulation,
            'template': this.template,
            'templateUrl': this.templateUrl,
            'styles': this.styles,
            'styleUrls': this.styleUrls,
            'ngContentSelectors': this.ngContentSelectors
        };
    }
}
export class CompileDirectiveMetadata {
    constructor({ type, isComponent, dynamicLoadable, selector, exportAs, changeDetection, inputs, outputs, hostListeners, hostProperties, hostAttributes, lifecycleHooks, template } = {}) {
        this.type = type;
        this.isComponent = isComponent;
        this.dynamicLoadable = dynamicLoadable;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.lifecycleHooks = lifecycleHooks;
        this.template = template;
    }
    static create({ type, isComponent, dynamicLoadable, selector, exportAs, changeDetection, inputs, outputs, host, lifecycleHooks, template } = {}) {
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (isPresent(host)) {
            StringMapWrapper.forEach(host, (value, key) => {
                var matches = RegExpWrapper.firstMatch(HOST_REG_EXP, key);
                if (isBlank(matches)) {
                    hostAttributes[key] = value;
                }
                else if (isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
            });
        }
        var inputsMap = {};
        if (isPresent(inputs)) {
            inputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var outputsMap = {};
        if (isPresent(outputs)) {
            outputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type: type,
            isComponent: normalizeBool(isComponent),
            dynamicLoadable: normalizeBool(dynamicLoadable),
            selector: selector,
            exportAs: exportAs,
            changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            hostAttributes: hostAttributes,
            lifecycleHooks: isPresent(lifecycleHooks) ? lifecycleHooks : [],
            template: template
        });
    }
    static fromJson(data) {
        return new CompileDirectiveMetadata({
            isComponent: data['isComponent'],
            dynamicLoadable: data['dynamicLoadable'],
            selector: data['selector'],
            exportAs: data['exportAs'],
            type: isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
            changeDetection: isPresent(data['changeDetection']) ?
                CHANGE_DETECTION_STRATEGY_VALUES[data['changeDetection']] :
                data['changeDetection'],
            inputs: data['inputs'],
            outputs: data['outputs'],
            hostListeners: data['hostListeners'],
            hostProperties: data['hostProperties'],
            hostAttributes: data['hostAttributes'],
            lifecycleHooks: data['lifecycleHooks'].map(hookValue => LIFECYCLE_HOOKS_VALUES[hookValue]),
            template: isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
                data['template']
        });
    }
    toJson() {
        return {
            'isComponent': this.isComponent,
            'dynamicLoadable': this.dynamicLoadable,
            'selector': this.selector,
            'exportAs': this.exportAs,
            'type': isPresent(this.type) ? this.type.toJson() : this.type,
            'changeDetection': isPresent(this.changeDetection) ? serializeEnum(this.changeDetection) :
                this.changeDetection,
            'inputs': this.inputs,
            'outputs': this.outputs,
            'hostListeners': this.hostListeners,
            'hostProperties': this.hostProperties,
            'hostAttributes': this.hostAttributes,
            'lifecycleHooks': this.lifecycleHooks.map(hook => serializeEnum(hook)),
            'template': isPresent(this.template) ? this.template.toJson() : this.template
        };
    }
}
export function createHostComponentMeta(componentType, componentSelector) {
    var template = CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: `Host${componentType.name}`,
            moduleUrl: componentType.moduleUrl,
            isHost: true
        }),
        template: new CompileTemplateMetadata({ template: template, templateUrl: '', styles: [], styleUrls: [], ngContentSelectors: [] }),
        changeDetection: ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        lifecycleHooks: [],
        isComponent: true,
        dynamicLoadable: false,
        selector: '*'
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX21ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9tZXRhZGF0YS50cyJdLCJuYW1lcyI6WyJDb21waWxlVHlwZU1ldGFkYXRhIiwiQ29tcGlsZVR5cGVNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVUeXBlTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlVHlwZU1ldGFkYXRhLnRvSnNvbiIsIkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIiwiQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEuY29uc3RydWN0b3IiLCJDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5mcm9tSnNvbiIsIkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLnRvSnNvbiIsIkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSIsIkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5jcmVhdGUiLCJDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEudG9Kc29uIiwiY3JlYXRlSG9zdENvbXBvbmVudE1ldGEiXSwibWFwcGluZ3MiOiJPQUFPLEVBQ0wsU0FBUyxFQUNULE9BQU8sRUFDUCxhQUFhLEVBQ2IsYUFBYSxFQUViLGFBQWEsRUFFZCxNQUFNLDBCQUEwQjtPQUMxQixFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO09BQ3hELEVBQ0wsdUJBQXVCLEVBQ3ZCLGdDQUFnQyxFQUNqQyxNQUFNLHFEQUFxRDtPQUNyRCxFQUFDLGlCQUFpQixFQUFFLHlCQUF5QixFQUFDLE1BQU0saUNBQWlDO09BQ3JGLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDO09BQ25ELEVBQUMsWUFBWSxFQUFDLE1BQU0sUUFBUTtPQUM1QixFQUFpQixzQkFBc0IsRUFBQyxNQUFNLHFDQUFxQztBQUUxRix3Q0FBd0M7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QUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUMxQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDMUJBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLG1CQUFtQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDekZBLGVBQWVBLEVBQUVBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxnQ0FBZ0NBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pEQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1lBQzVDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN0QkEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDeEJBLGFBQWFBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBO1lBQ3BDQSxjQUFjQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1lBQ3RDQSxjQUFjQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1lBQ3RDQSxjQUFjQSxFQUNGQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUVBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLElBQUlBLHNCQUFzQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDdkZBLFFBQVFBLEVBQUVBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLHVCQUF1QkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtTQUN6REEsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFREgsTUFBTUE7UUFDSkksTUFBTUEsQ0FBQ0E7WUFDTEEsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsV0FBV0E7WUFDL0JBLGlCQUFpQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsZUFBZUE7WUFDdkNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO1lBQ3pCQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTtZQUN6QkEsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUE7WUFDN0RBLGlCQUFpQkEsRUFBRUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsR0FBR0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7Z0JBQ25DQSxJQUFJQSxDQUFDQSxlQUFlQTtZQUN6RUEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUE7WUFDckJBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO1lBQ3ZCQSxlQUFlQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQTtZQUNuQ0EsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQTtZQUNyQ0EsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQTtZQUNyQ0EsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFJQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN0RUEsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUE7U0FDOUVBLENBQUNBO0lBQ0pBLENBQUNBO0FBQ0hKLENBQUNBO0FBRUQsd0NBQXdDLGFBQWtDLEVBQ2xDLGlCQUF5QjtJQUMvREssSUFBSUEsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSwwQkFBMEJBLEVBQUVBLENBQUNBO0lBQ3BGQSxNQUFNQSxDQUFDQSx3QkFBd0JBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3JDQSxJQUFJQSxFQUFFQSxJQUFJQSxtQkFBbUJBLENBQUNBO1lBQzVCQSxPQUFPQSxFQUFFQSxNQUFNQTtZQUNmQSxJQUFJQSxFQUFFQSxPQUFPQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQTtZQUNqQ0EsU0FBU0EsRUFBRUEsYUFBYUEsQ0FBQ0EsU0FBU0E7WUFDbENBLE1BQU1BLEVBQUVBLElBQUlBO1NBQ2JBLENBQUNBO1FBQ0ZBLFFBQVFBLEVBQUVBLElBQUlBLHVCQUF1QkEsQ0FDakNBLEVBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLFdBQVdBLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBLEVBQUVBLEVBQUVBLFNBQVNBLEVBQUVBLEVBQUVBLEVBQUVBLGtCQUFrQkEsRUFBRUEsRUFBRUEsRUFBQ0EsQ0FBQ0E7UUFDN0ZBLGVBQWVBLEVBQUVBLHVCQUF1QkEsQ0FBQ0EsT0FBT0E7UUFDaERBLE1BQU1BLEVBQUVBLEVBQUVBO1FBQ1ZBLE9BQU9BLEVBQUVBLEVBQUVBO1FBQ1hBLElBQUlBLEVBQUVBLEVBQUVBO1FBQ1JBLGNBQWNBLEVBQUVBLEVBQUVBO1FBQ2xCQSxXQUFXQSxFQUFFQSxJQUFJQTtRQUNqQkEsZUFBZUEsRUFBRUEsS0FBS0E7UUFDdEJBLFFBQVFBLEVBQUVBLEdBQUdBO0tBQ2RBLENBQUNBLENBQUNBO0FBQ0xBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBub3JtYWxpemVCb29sLFxuICBzZXJpYWxpemVFbnVtLFxuICBUeXBlLFxuICBSZWdFeHBXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ0hBTkdFX0RFVEVDVElPTl9TVFJBVEVHWV9WQUxVRVNcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb24sIFZJRVdfRU5DQVBTVUxBVElPTl9WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtDc3NTZWxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NlbGVjdG9yJztcbmltcG9ydCB7c3BsaXRBdENvbG9ufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rcywgTElGRUNZQ0xFX0hPT0tTX1ZBTFVFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2ludGVyZmFjZXMnO1xuXG4vLyBncm91cCAxOiBcInByb3BlcnR5XCIgZnJvbSBcIltwcm9wZXJ0eV1cIlxuLy8gZ3JvdXAgMjogXCJldmVudFwiIGZyb20gXCIoZXZlbnQpXCJcbnZhciBIT1NUX1JFR19FWFAgPSAvXig/Oig/OlxcWyhbXlxcXV0rKVxcXSl8KD86XFwoKFteXFwpXSspXFwpKSkkL2c7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlVHlwZU1ldGFkYXRhIHtcbiAgcnVudGltZTogVHlwZTtcbiAgbmFtZTogc3RyaW5nO1xuICBtb2R1bGVVcmw6IHN0cmluZztcbiAgaXNIb3N0OiBib29sZWFuO1xuICBjb25zdHJ1Y3Rvcih7cnVudGltZSwgbmFtZSwgbW9kdWxlVXJsLCBpc0hvc3R9OlxuICAgICAgICAgICAgICAgICAge3J1bnRpbWU/OiBUeXBlLCBuYW1lPzogc3RyaW5nLCBtb2R1bGVVcmw/OiBzdHJpbmcsIGlzSG9zdD86IGJvb2xlYW59ID0ge30pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5pc0hvc3QgPSBub3JtYWxpemVCb29sKGlzSG9zdCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlVHlwZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVUeXBlTWV0YWRhdGEoXG4gICAgICAgIHtuYW1lOiBkYXRhWyduYW1lJ10sIG1vZHVsZVVybDogZGF0YVsnbW9kdWxlVXJsJ10sIGlzSG9zdDogZGF0YVsnaXNIb3N0J119KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIE5vdGU6IFJ1bnRpbWUgdHlwZSBjYW4ndCBiZSBzZXJpYWxpemVkLi4uXG4gICAgICAnbmFtZSc6IHRoaXMubmFtZSxcbiAgICAgICdtb2R1bGVVcmwnOiB0aGlzLm1vZHVsZVVybCxcbiAgICAgICdpc0hvc3QnOiB0aGlzLmlzSG9zdFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHRlbXBsYXRlVXJsOiBzdHJpbmc7XG4gIHN0eWxlczogc3RyaW5nW107XG4gIHN0eWxlVXJsczogc3RyaW5nW107XG4gIG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKHtlbmNhcHN1bGF0aW9uLCB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmwsIHN0eWxlcywgc3R5bGVVcmxzLCBuZ0NvbnRlbnRTZWxlY3RvcnN9OiB7XG4gICAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIHRlbXBsYXRlPzogc3RyaW5nLFxuICAgIHRlbXBsYXRlVXJsPzogc3RyaW5nLFxuICAgIHN0eWxlcz86IHN0cmluZ1tdLFxuICAgIHN0eWxlVXJscz86IHN0cmluZ1tdLFxuICAgIG5nQ29udGVudFNlbGVjdG9ycz86IHN0cmluZ1tdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuZW5jYXBzdWxhdGlvbiA9IGlzUHJlc2VudChlbmNhcHN1bGF0aW9uKSA/IGVuY2Fwc3VsYXRpb24gOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsO1xuICAgIHRoaXMuc3R5bGVzID0gaXNQcmVzZW50KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcbiAgICB0aGlzLnN0eWxlVXJscyA9IGlzUHJlc2VudChzdHlsZVVybHMpID8gc3R5bGVVcmxzIDogW107XG4gICAgdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnMgPSBpc1ByZXNlbnQobmdDb250ZW50U2VsZWN0b3JzKSA/IG5nQ29udGVudFNlbGVjdG9ycyA6IFtdO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEoe1xuICAgICAgZW5jYXBzdWxhdGlvbjogaXNQcmVzZW50KGRhdGFbJ2VuY2Fwc3VsYXRpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIFZJRVdfRU5DQVBTVUxBVElPTl9WQUxVRVNbZGF0YVsnZW5jYXBzdWxhdGlvbiddXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnZW5jYXBzdWxhdGlvbiddLFxuICAgICAgdGVtcGxhdGU6IGRhdGFbJ3RlbXBsYXRlJ10sXG4gICAgICB0ZW1wbGF0ZVVybDogZGF0YVsndGVtcGxhdGVVcmwnXSxcbiAgICAgIHN0eWxlczogZGF0YVsnc3R5bGVzJ10sXG4gICAgICBzdHlsZVVybHM6IGRhdGFbJ3N0eWxlVXJscyddLFxuICAgICAgbmdDb250ZW50U2VsZWN0b3JzOiBkYXRhWyduZ0NvbnRlbnRTZWxlY3RvcnMnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VuY2Fwc3VsYXRpb24nOlxuICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmVuY2Fwc3VsYXRpb24pID8gc2VyaWFsaXplRW51bSh0aGlzLmVuY2Fwc3VsYXRpb24pIDogdGhpcy5lbmNhcHN1bGF0aW9uLFxuICAgICAgJ3RlbXBsYXRlJzogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IHRoaXMudGVtcGxhdGVVcmwsXG4gICAgICAnc3R5bGVzJzogdGhpcy5zdHlsZXMsXG4gICAgICAnc3R5bGVVcmxzJzogdGhpcy5zdHlsZVVybHMsXG4gICAgICAnbmdDb250ZW50U2VsZWN0b3JzJzogdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnNcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEge1xuICBzdGF0aWMgY3JlYXRlKHt0eXBlLCBpc0NvbXBvbmVudCwgZHluYW1pY0xvYWRhYmxlLCBzZWxlY3RvciwgZXhwb3J0QXMsIGNoYW5nZURldGVjdGlvbiwgaW5wdXRzLFxuICAgICAgICAgICAgICAgICBvdXRwdXRzLCBob3N0LCBsaWZlY3ljbGVIb29rcywgdGVtcGxhdGV9OiB7XG4gICAgdHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgaXNDb21wb25lbnQ/OiBib29sZWFuLFxuICAgIGR5bmFtaWNMb2FkYWJsZT86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzogc3RyaW5nW10sXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdLFxuICAgIGhvc3Q/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgdGVtcGxhdGU/OiBDb21waWxlVGVtcGxhdGVNZXRhZGF0YVxuICB9ID0ge30pOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciBob3N0TGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHZhciBob3N0UHJvcGVydGllczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgaG9zdEF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKGlzUHJlc2VudChob3N0KSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGhvc3QsICh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChIT1NUX1JFR19FWFAsIGtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKG1hdGNoZXMpKSB7XG4gICAgICAgICAgaG9zdEF0dHJpYnV0ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtYXRjaGVzWzFdKSkge1xuICAgICAgICAgIGhvc3RQcm9wZXJ0aWVzW21hdGNoZXNbMV1dID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG1hdGNoZXNbMl0pKSB7XG4gICAgICAgICAgaG9zdExpc3RlbmVyc1ttYXRjaGVzWzJdXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGlucHV0c01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAoaXNQcmVzZW50KGlucHV0cykpIHtcbiAgICAgIGlucHV0cy5mb3JFYWNoKChiaW5kQ29uZmlnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy8gY2Fub25pY2FsIHN5bnRheDogYGRpclByb3A6IGVsUHJvcGBcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYDpgLCB1c2UgZGlyUHJvcCA9IGVsUHJvcFxuICAgICAgICB2YXIgcGFydHMgPSBzcGxpdEF0Q29sb24oYmluZENvbmZpZywgW2JpbmRDb25maWcsIGJpbmRDb25maWddKTtcbiAgICAgICAgaW5wdXRzTWFwW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBvdXRwdXRzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmIChpc1ByZXNlbnQob3V0cHV0cykpIHtcbiAgICAgIG91dHB1dHMuZm9yRWFjaCgoYmluZENvbmZpZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGNhbm9uaWNhbCBzeW50YXg6IGBkaXJQcm9wOiBlbFByb3BgXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGA6YCwgdXNlIGRpclByb3AgPSBlbFByb3BcbiAgICAgICAgdmFyIHBhcnRzID0gc3BsaXRBdENvbG9uKGJpbmRDb25maWcsIFtiaW5kQ29uZmlnLCBiaW5kQ29uZmlnXSk7XG4gICAgICAgIG91dHB1dHNNYXBbcGFydHNbMF1dID0gcGFydHNbMV07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgaXNDb21wb25lbnQ6IG5vcm1hbGl6ZUJvb2woaXNDb21wb25lbnQpLFxuICAgICAgZHluYW1pY0xvYWRhYmxlOiBub3JtYWxpemVCb29sKGR5bmFtaWNMb2FkYWJsZSksXG4gICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICBleHBvcnRBczogZXhwb3J0QXMsXG4gICAgICBjaGFuZ2VEZXRlY3Rpb246IGNoYW5nZURldGVjdGlvbixcbiAgICAgIGlucHV0czogaW5wdXRzTWFwLFxuICAgICAgb3V0cHV0czogb3V0cHV0c01hcCxcbiAgICAgIGhvc3RMaXN0ZW5lcnM6IGhvc3RMaXN0ZW5lcnMsXG4gICAgICBob3N0UHJvcGVydGllczogaG9zdFByb3BlcnRpZXMsXG4gICAgICBob3N0QXR0cmlidXRlczogaG9zdEF0dHJpYnV0ZXMsXG4gICAgICBsaWZlY3ljbGVIb29rczogaXNQcmVzZW50KGxpZmVjeWNsZUhvb2tzKSA/IGxpZmVjeWNsZUhvb2tzIDogW10sXG4gICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgICB9KTtcbiAgfVxuXG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIGlzQ29tcG9uZW50OiBib29sZWFuO1xuICBkeW5hbWljTG9hZGFibGU6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGV4cG9ydEFzOiBzdHJpbmc7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIGlucHV0czoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIG91dHB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0TGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdFByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0QXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGxpZmVjeWNsZUhvb2tzOiBMaWZlY3ljbGVIb29rc1tdO1xuICB0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGE7XG4gIGNvbnN0cnVjdG9yKHt0eXBlLCBpc0NvbXBvbmVudCwgZHluYW1pY0xvYWRhYmxlLCBzZWxlY3RvciwgZXhwb3J0QXMsIGNoYW5nZURldGVjdGlvbiwgaW5wdXRzLFxuICAgICAgICAgICAgICAgb3V0cHV0cywgaG9zdExpc3RlbmVycywgaG9zdFByb3BlcnRpZXMsIGhvc3RBdHRyaWJ1dGVzLCBsaWZlY3ljbGVIb29rcywgdGVtcGxhdGV9OiB7XG4gICAgdHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgaXNDb21wb25lbnQ/OiBib29sZWFuLFxuICAgIGR5bmFtaWNMb2FkYWJsZT86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgb3V0cHV0cz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RMaXN0ZW5lcnM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBob3N0UHJvcGVydGllcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RBdHRyaWJ1dGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgbGlmZWN5Y2xlSG9va3M/OiBMaWZlY3ljbGVIb29rc1tdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzQ29tcG9uZW50ID0gaXNDb21wb25lbnQ7XG4gICAgdGhpcy5keW5hbWljTG9hZGFibGUgPSBkeW5hbWljTG9hZGFibGU7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuZXhwb3J0QXMgPSBleHBvcnRBcztcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbiA9IGNoYW5nZURldGVjdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcbiAgICB0aGlzLm91dHB1dHMgPSBvdXRwdXRzO1xuICAgIHRoaXMuaG9zdExpc3RlbmVycyA9IGhvc3RMaXN0ZW5lcnM7XG4gICAgdGhpcy5ob3N0UHJvcGVydGllcyA9IGhvc3RQcm9wZXJ0aWVzO1xuICAgIHRoaXMuaG9zdEF0dHJpYnV0ZXMgPSBob3N0QXR0cmlidXRlcztcbiAgICB0aGlzLmxpZmVjeWNsZUhvb2tzID0gbGlmZWN5Y2xlSG9va3M7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICBpc0NvbXBvbmVudDogZGF0YVsnaXNDb21wb25lbnQnXSxcbiAgICAgIGR5bmFtaWNMb2FkYWJsZTogZGF0YVsnZHluYW1pY0xvYWRhYmxlJ10sXG4gICAgICBzZWxlY3RvcjogZGF0YVsnc2VsZWN0b3InXSxcbiAgICAgIGV4cG9ydEFzOiBkYXRhWydleHBvcnRBcyddLFxuICAgICAgdHlwZTogaXNQcmVzZW50KGRhdGFbJ3R5cGUnXSkgPyBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKGRhdGFbJ3R5cGUnXSkgOiBkYXRhWyd0eXBlJ10sXG4gICAgICBjaGFuZ2VEZXRlY3Rpb246IGlzUHJlc2VudChkYXRhWydjaGFuZ2VEZXRlY3Rpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgQ0hBTkdFX0RFVEVDVElPTl9TVFJBVEVHWV9WQUxVRVNbZGF0YVsnY2hhbmdlRGV0ZWN0aW9uJ11dIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2NoYW5nZURldGVjdGlvbiddLFxuICAgICAgaW5wdXRzOiBkYXRhWydpbnB1dHMnXSxcbiAgICAgIG91dHB1dHM6IGRhdGFbJ291dHB1dHMnXSxcbiAgICAgIGhvc3RMaXN0ZW5lcnM6IGRhdGFbJ2hvc3RMaXN0ZW5lcnMnXSxcbiAgICAgIGhvc3RQcm9wZXJ0aWVzOiBkYXRhWydob3N0UHJvcGVydGllcyddLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGRhdGFbJ2hvc3RBdHRyaWJ1dGVzJ10sXG4gICAgICBsaWZlY3ljbGVIb29rczpcbiAgICAgICAgICAoPGFueVtdPmRhdGFbJ2xpZmVjeWNsZUhvb2tzJ10pLm1hcChob29rVmFsdWUgPT4gTElGRUNZQ0xFX0hPT0tTX1ZBTFVFU1tob29rVmFsdWVdKSxcbiAgICAgIHRlbXBsYXRlOiBpc1ByZXNlbnQoZGF0YVsndGVtcGxhdGUnXSkgPyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0ZW1wbGF0ZSddKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsndGVtcGxhdGUnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lzQ29tcG9uZW50JzogdGhpcy5pc0NvbXBvbmVudCxcbiAgICAgICdkeW5hbWljTG9hZGFibGUnOiB0aGlzLmR5bmFtaWNMb2FkYWJsZSxcbiAgICAgICdzZWxlY3Rvcic6IHRoaXMuc2VsZWN0b3IsXG4gICAgICAnZXhwb3J0QXMnOiB0aGlzLmV4cG9ydEFzLFxuICAgICAgJ3R5cGUnOiBpc1ByZXNlbnQodGhpcy50eXBlKSA/IHRoaXMudHlwZS50b0pzb24oKSA6IHRoaXMudHlwZSxcbiAgICAgICdjaGFuZ2VEZXRlY3Rpb24nOiBpc1ByZXNlbnQodGhpcy5jaGFuZ2VEZXRlY3Rpb24pID8gc2VyaWFsaXplRW51bSh0aGlzLmNoYW5nZURldGVjdGlvbikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvbixcbiAgICAgICdpbnB1dHMnOiB0aGlzLmlucHV0cyxcbiAgICAgICdvdXRwdXRzJzogdGhpcy5vdXRwdXRzLFxuICAgICAgJ2hvc3RMaXN0ZW5lcnMnOiB0aGlzLmhvc3RMaXN0ZW5lcnMsXG4gICAgICAnaG9zdFByb3BlcnRpZXMnOiB0aGlzLmhvc3RQcm9wZXJ0aWVzLFxuICAgICAgJ2hvc3RBdHRyaWJ1dGVzJzogdGhpcy5ob3N0QXR0cmlidXRlcyxcbiAgICAgICdsaWZlY3ljbGVIb29rcyc6IHRoaXMubGlmZWN5Y2xlSG9va3MubWFwKGhvb2sgPT4gc2VyaWFsaXplRW51bShob29rKSksXG4gICAgICAndGVtcGxhdGUnOiBpc1ByZXNlbnQodGhpcy50ZW1wbGF0ZSkgPyB0aGlzLnRlbXBsYXRlLnRvSnNvbigpIDogdGhpcy50ZW1wbGF0ZVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U2VsZWN0b3I6IHN0cmluZyk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gIHZhciB0ZW1wbGF0ZSA9IENzc1NlbGVjdG9yLnBhcnNlKGNvbXBvbmVudFNlbGVjdG9yKVswXS5nZXRNYXRjaGluZ0VsZW1lbnRUZW1wbGF0ZSgpO1xuICByZXR1cm4gQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNyZWF0ZSh7XG4gICAgdHlwZTogbmV3IENvbXBpbGVUeXBlTWV0YWRhdGEoe1xuICAgICAgcnVudGltZTogT2JqZWN0LFxuICAgICAgbmFtZTogYEhvc3Qke2NvbXBvbmVudFR5cGUubmFtZX1gLFxuICAgICAgbW9kdWxlVXJsOiBjb21wb25lbnRUeXBlLm1vZHVsZVVybCxcbiAgICAgIGlzSG9zdDogdHJ1ZVxuICAgIH0pLFxuICAgIHRlbXBsYXRlOiBuZXcgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEoXG4gICAgICAgIHt0ZW1wbGF0ZTogdGVtcGxhdGUsIHRlbXBsYXRlVXJsOiAnJywgc3R5bGVzOiBbXSwgc3R5bGVVcmxzOiBbXSwgbmdDb250ZW50U2VsZWN0b3JzOiBbXX0pLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBpbnB1dHM6IFtdLFxuICAgIG91dHB1dHM6IFtdLFxuICAgIGhvc3Q6IHt9LFxuICAgIGxpZmVjeWNsZUhvb2tzOiBbXSxcbiAgICBpc0NvbXBvbmVudDogdHJ1ZSxcbiAgICBkeW5hbWljTG9hZGFibGU6IGZhbHNlLFxuICAgIHNlbGVjdG9yOiAnKidcbiAgfSk7XG59XG4iXX0=