/* */ 
"format cjs";
import { isPresent, isBlank, normalizeBool, CONST_EXPR } from 'angular2/src/facade/lang';
// see http://www.w3.org/TR/html51/syntax.html#named-character-references
// see https://html.spec.whatwg.org/multipage/entities.json
// This list is not exhaustive to keep the compiler footprint low.
// The `&#123;` / `&#x1ab;` syntax should be used when the named character reference does not exist.
export const NAMED_ENTITIES = CONST_EXPR({
    'lt': '<',
    'gt': '>',
    'nbsp': '\u00A0',
    'amp': '&',
    'Aacute': '\u00C1',
    'Acirc': '\u00C2',
    'Agrave': '\u00C0',
    'Atilde': '\u00C3',
    'Auml': '\u00C4',
    'Ccedil': '\u00C7',
    'Eacute': '\u00C9',
    'Ecirc': '\u00CA',
    'Egrave': '\u00C8',
    'Euml': '\u00CB',
    'Iacute': '\u00CD',
    'Icirc': '\u00CE',
    'Igrave': '\u00CC',
    'Iuml': '\u00CF',
    'Oacute': '\u00D3',
    'Ocirc': '\u00D4',
    'Ograve': '\u00D2',
    'Otilde': '\u00D5',
    'Ouml': '\u00D6',
    'Uacute': '\u00DA',
    'Ucirc': '\u00DB',
    'Ugrave': '\u00D9',
    'Uuml': '\u00DC',
    'aacute': '\u00E1',
    'acirc': '\u00E2',
    'agrave': '\u00E0',
    'atilde': '\u00E3',
    'auml': '\u00E4',
    'ccedil': '\u00E7',
    'eacute': '\u00E9',
    'ecirc': '\u00EA',
    'egrave': '\u00E8',
    'euml': '\u00EB',
    'iacute': '\u00ED',
    'icirc': '\u00EE',
    'igrave': '\u00EC',
    'iuml': '\u00EF',
    'oacute': '\u00F3',
    'ocirc': '\u00F4',
    'ograve': '\u00F2',
    'otilde': '\u00F5',
    'ouml': '\u00F6',
    'uacute': '\u00FA',
    'ucirc': '\u00FB',
    'ugrave': '\u00F9',
    'uuml': '\u00FC',
});
export var HtmlTagContentType;
(function (HtmlTagContentType) {
    HtmlTagContentType[HtmlTagContentType["RAW_TEXT"] = 0] = "RAW_TEXT";
    HtmlTagContentType[HtmlTagContentType["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
    HtmlTagContentType[HtmlTagContentType["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
})(HtmlTagContentType || (HtmlTagContentType = {}));
export class HtmlTagDefinition {
    constructor({ closedByChildren, requiredParent, implicitNamespacePrefix, contentType, closedByParent } = {}) {
        this.closedByChildren = {};
        this.closedByParent = false;
        if (isPresent(closedByChildren) && closedByChildren.length > 0) {
            closedByChildren.split(',').forEach(tagName => this.closedByChildren[tagName.trim()] = true);
        }
        this.closedByParent = normalizeBool(closedByParent);
        this.requiredParent = requiredParent;
        this.implicitNamespacePrefix = implicitNamespacePrefix;
        this.contentType = isPresent(contentType) ? contentType : HtmlTagContentType.PARSABLE_DATA;
    }
    requireExtraParent(currentParent) {
        return isPresent(this.requiredParent) &&
            (isBlank(currentParent) || this.requiredParent != currentParent.toLowerCase());
    }
    isClosedByChild(name) {
        return normalizeBool(this.closedByChildren['*']) ||
            normalizeBool(this.closedByChildren[name.toLowerCase()]);
    }
}
// see http://www.w3.org/TR/html51/syntax.html#optional-tags
// This implementation does not fully conform to the HTML5 spec.
var TAG_DEFINITIONS = {
    'link': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'ng-content': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'img': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'input': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'hr': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'br': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'wbr': new HtmlTagDefinition({ closedByChildren: '*', closedByParent: true }),
    'p': new HtmlTagDefinition({
        closedByChildren: 'address,article,aside,blockquote,div,dl,fieldset,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,main,nav,ol,p,pre,section,table,ul',
        closedByParent: true
    }),
    'thead': new HtmlTagDefinition({ closedByChildren: 'tbody,tfoot' }),
    'tbody': new HtmlTagDefinition({ closedByChildren: 'tbody,tfoot', closedByParent: true }),
    'tfoot': new HtmlTagDefinition({ closedByChildren: 'tbody', closedByParent: true }),
    'tr': new HtmlTagDefinition({ closedByChildren: 'tr', requiredParent: 'tbody', closedByParent: true }),
    'td': new HtmlTagDefinition({ closedByChildren: 'td,th', closedByParent: true }),
    'th': new HtmlTagDefinition({ closedByChildren: 'td,th', closedByParent: true }),
    'col': new HtmlTagDefinition({ closedByChildren: 'col', requiredParent: 'colgroup' }),
    'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
    'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
    'li': new HtmlTagDefinition({ closedByChildren: 'li', closedByParent: true }),
    'dt': new HtmlTagDefinition({ closedByChildren: 'dt,dd' }),
    'dd': new HtmlTagDefinition({ closedByChildren: 'dt,dd', closedByParent: true }),
    'rb': new HtmlTagDefinition({ closedByChildren: 'rb,rt,rtc,rp', closedByParent: true }),
    'rt': new HtmlTagDefinition({ closedByChildren: 'rb,rt,rtc,rp', closedByParent: true }),
    'rtc': new HtmlTagDefinition({ closedByChildren: 'rb,rtc,rp', closedByParent: true }),
    'rp': new HtmlTagDefinition({ closedByChildren: 'rb,rt,rtc,rp', closedByParent: true }),
    'optgroup': new HtmlTagDefinition({ closedByChildren: 'optgroup', closedByParent: true }),
    'option': new HtmlTagDefinition({ closedByChildren: 'option,optgroup', closedByParent: true }),
    'style': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
    'script': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
    'title': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT }),
    'textarea': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT }),
};
var DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
export function getHtmlTagDefinition(tagName) {
    var result = TAG_DEFINITIONS[tagName.toLowerCase()];
    return isPresent(result) ? result : DEFAULT_TAG_DEFINITION;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF90YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfdGFncy50cyJdLCJuYW1lcyI6WyJIdG1sVGFnQ29udGVudFR5cGUiLCJIdG1sVGFnRGVmaW5pdGlvbiIsIkh0bWxUYWdEZWZpbml0aW9uLmNvbnN0cnVjdG9yIiwiSHRtbFRhZ0RlZmluaXRpb24ucmVxdWlyZUV4dHJhUGFyZW50IiwiSHRtbFRhZ0RlZmluaXRpb24uaXNDbG9zZWRCeUNoaWxkIiwiZ2V0SHRtbFRhZ0RlZmluaXRpb24iXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO0FBRXRGLHlFQUF5RTtBQUN6RSwyREFBMkQ7QUFDM0Qsa0VBQWtFO0FBQ2xFLG9HQUFvRztBQUNwRyxhQUFhLGNBQWMsR0FBRyxVQUFVLENBQUM7SUFDdkMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxHQUFHO0lBQ1YsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsUUFBUSxFQUFFLFFBQVE7SUFD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Q0E7SUFDcERBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLE1BQU1BLEdBQUdBLHNCQUFzQkEsQ0FBQ0E7QUFDN0RBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIG5vcm1hbGl6ZUJvb2wsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNTEvc3ludGF4Lmh0bWwjbmFtZWQtY2hhcmFjdGVyLXJlZmVyZW5jZXNcbi8vIHNlZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9lbnRpdGllcy5qc29uXG4vLyBUaGlzIGxpc3QgaXMgbm90IGV4aGF1c3RpdmUgdG8ga2VlcCB0aGUgY29tcGlsZXIgZm9vdHByaW50IGxvdy5cbi8vIFRoZSBgJiMxMjM7YCAvIGAmI3gxYWI7YCBzeW50YXggc2hvdWxkIGJlIHVzZWQgd2hlbiB0aGUgbmFtZWQgY2hhcmFjdGVyIHJlZmVyZW5jZSBkb2VzIG5vdCBleGlzdC5cbmV4cG9ydCBjb25zdCBOQU1FRF9FTlRJVElFUyA9IENPTlNUX0VYUFIoe1xuICAnbHQnOiAnPCcsXG4gICdndCc6ICc+JyxcbiAgJ25ic3AnOiAnXFx1MDBBMCcsXG4gICdhbXAnOiAnJicsXG4gICdBYWN1dGUnOiAnXFx1MDBDMScsXG4gICdBY2lyYyc6ICdcXHUwMEMyJyxcbiAgJ0FncmF2ZSc6ICdcXHUwMEMwJyxcbiAgJ0F0aWxkZSc6ICdcXHUwMEMzJyxcbiAgJ0F1bWwnOiAnXFx1MDBDNCcsXG4gICdDY2VkaWwnOiAnXFx1MDBDNycsXG4gICdFYWN1dGUnOiAnXFx1MDBDOScsXG4gICdFY2lyYyc6ICdcXHUwMENBJyxcbiAgJ0VncmF2ZSc6ICdcXHUwMEM4JyxcbiAgJ0V1bWwnOiAnXFx1MDBDQicsXG4gICdJYWN1dGUnOiAnXFx1MDBDRCcsXG4gICdJY2lyYyc6ICdcXHUwMENFJyxcbiAgJ0lncmF2ZSc6ICdcXHUwMENDJyxcbiAgJ0l1bWwnOiAnXFx1MDBDRicsXG4gICdPYWN1dGUnOiAnXFx1MDBEMycsXG4gICdPY2lyYyc6ICdcXHUwMEQ0JyxcbiAgJ09ncmF2ZSc6ICdcXHUwMEQyJyxcbiAgJ090aWxkZSc6ICdcXHUwMEQ1JyxcbiAgJ091bWwnOiAnXFx1MDBENicsXG4gICdVYWN1dGUnOiAnXFx1MDBEQScsXG4gICdVY2lyYyc6ICdcXHUwMERCJyxcbiAgJ1VncmF2ZSc6ICdcXHUwMEQ5JyxcbiAgJ1V1bWwnOiAnXFx1MDBEQycsXG4gICdhYWN1dGUnOiAnXFx1MDBFMScsXG4gICdhY2lyYyc6ICdcXHUwMEUyJyxcbiAgJ2FncmF2ZSc6ICdcXHUwMEUwJyxcbiAgJ2F0aWxkZSc6ICdcXHUwMEUzJyxcbiAgJ2F1bWwnOiAnXFx1MDBFNCcsXG4gICdjY2VkaWwnOiAnXFx1MDBFNycsXG4gICdlYWN1dGUnOiAnXFx1MDBFOScsXG4gICdlY2lyYyc6ICdcXHUwMEVBJyxcbiAgJ2VncmF2ZSc6ICdcXHUwMEU4JyxcbiAgJ2V1bWwnOiAnXFx1MDBFQicsXG4gICdpYWN1dGUnOiAnXFx1MDBFRCcsXG4gICdpY2lyYyc6ICdcXHUwMEVFJyxcbiAgJ2lncmF2ZSc6ICdcXHUwMEVDJyxcbiAgJ2l1bWwnOiAnXFx1MDBFRicsXG4gICdvYWN1dGUnOiAnXFx1MDBGMycsXG4gICdvY2lyYyc6ICdcXHUwMEY0JyxcbiAgJ29ncmF2ZSc6ICdcXHUwMEYyJyxcbiAgJ290aWxkZSc6ICdcXHUwMEY1JyxcbiAgJ291bWwnOiAnXFx1MDBGNicsXG4gICd1YWN1dGUnOiAnXFx1MDBGQScsXG4gICd1Y2lyYyc6ICdcXHUwMEZCJyxcbiAgJ3VncmF2ZSc6ICdcXHUwMEY5JyxcbiAgJ3V1bWwnOiAnXFx1MDBGQycsXG59KTtcblxuZXhwb3J0IGVudW0gSHRtbFRhZ0NvbnRlbnRUeXBlIHtcbiAgUkFXX1RFWFQsXG4gIEVTQ0FQQUJMRV9SQVdfVEVYVCxcbiAgUEFSU0FCTEVfREFUQVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRhZ0RlZmluaXRpb24ge1xuICBwcml2YXRlIGNsb3NlZEJ5Q2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuICBwdWJsaWMgY2xvc2VkQnlQYXJlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHJlcXVpcmVkUGFyZW50OiBzdHJpbmc7XG4gIHB1YmxpYyBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogc3RyaW5nO1xuICBwdWJsaWMgY29udGVudFR5cGU6IEh0bWxUYWdDb250ZW50VHlwZTtcblxuICBjb25zdHJ1Y3Rvcih7Y2xvc2VkQnlDaGlsZHJlbiwgcmVxdWlyZWRQYXJlbnQsIGltcGxpY2l0TmFtZXNwYWNlUHJlZml4LCBjb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgIGNsb3NlZEJ5UGFyZW50fToge1xuICAgIGNsb3NlZEJ5Q2hpbGRyZW4/OiBzdHJpbmcsXG4gICAgY2xvc2VkQnlQYXJlbnQ/OiBib29sZWFuLFxuICAgIHJlcXVpcmVkUGFyZW50Pzogc3RyaW5nLFxuICAgIGltcGxpY2l0TmFtZXNwYWNlUHJlZml4Pzogc3RyaW5nLFxuICAgIGNvbnRlbnRUeXBlPzogSHRtbFRhZ0NvbnRlbnRUeXBlXG4gIH0gPSB7fSkge1xuICAgIGlmIChpc1ByZXNlbnQoY2xvc2VkQnlDaGlsZHJlbikgJiYgY2xvc2VkQnlDaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjbG9zZWRCeUNoaWxkcmVuLnNwbGl0KCcsJykuZm9yRWFjaCh0YWdOYW1lID0+IHRoaXMuY2xvc2VkQnlDaGlsZHJlblt0YWdOYW1lLnRyaW0oKV0gPSB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZWRCeVBhcmVudCA9IG5vcm1hbGl6ZUJvb2woY2xvc2VkQnlQYXJlbnQpO1xuICAgIHRoaXMucmVxdWlyZWRQYXJlbnQgPSByZXF1aXJlZFBhcmVudDtcbiAgICB0aGlzLmltcGxpY2l0TmFtZXNwYWNlUHJlZml4ID0gaW1wbGljaXROYW1lc3BhY2VQcmVmaXg7XG4gICAgdGhpcy5jb250ZW50VHlwZSA9IGlzUHJlc2VudChjb250ZW50VHlwZSkgPyBjb250ZW50VHlwZSA6IEh0bWxUYWdDb250ZW50VHlwZS5QQVJTQUJMRV9EQVRBO1xuICB9XG5cbiAgcmVxdWlyZUV4dHJhUGFyZW50KGN1cnJlbnRQYXJlbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5yZXF1aXJlZFBhcmVudCkgJiZcbiAgICAgICAgICAgKGlzQmxhbmsoY3VycmVudFBhcmVudCkgfHwgdGhpcy5yZXF1aXJlZFBhcmVudCAhPSBjdXJyZW50UGFyZW50LnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgaXNDbG9zZWRCeUNoaWxkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub3JtYWxpemVCb29sKHRoaXMuY2xvc2VkQnlDaGlsZHJlblsnKiddKSB8fFxuICAgICAgICAgICBub3JtYWxpemVCb29sKHRoaXMuY2xvc2VkQnlDaGlsZHJlbltuYW1lLnRvTG93ZXJDYXNlKCldKTtcbiAgfVxufVxuXG4vLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI29wdGlvbmFsLXRhZ3Ncbi8vIFRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgZnVsbHkgY29uZm9ybSB0byB0aGUgSFRNTDUgc3BlYy5cbnZhciBUQUdfREVGSU5JVElPTlM6IHtba2V5OiBzdHJpbmddOiBIdG1sVGFnRGVmaW5pdGlvbn0gPSB7XG4gICdsaW5rJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnKicsIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICduZy1jb250ZW50JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnKicsIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdpbWcnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICcqJywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ2lucHV0JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnKicsIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdocic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogJyonLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAnYnInOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICcqJywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3dicic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogJyonLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAncCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7XG4gICAgY2xvc2VkQnlDaGlsZHJlbjpcbiAgICAgICAgJ2FkZHJlc3MsYXJ0aWNsZSxhc2lkZSxibG9ja3F1b3RlLGRpdixkbCxmaWVsZHNldCxmb290ZXIsZm9ybSxoMSxoMixoMyxoNCxoNSxoNixoZWFkZXIsaGdyb3VwLGhyLG1haW4sbmF2LG9sLHAscHJlLHNlY3Rpb24sdGFibGUsdWwnLFxuICAgIGNsb3NlZEJ5UGFyZW50OiB0cnVlXG4gIH0pLFxuICAndGhlYWQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICd0Ym9keSx0Zm9vdCd9KSxcbiAgJ3Rib2R5JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAndGJvZHksdGZvb3QnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAndGZvb3QnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICd0Ym9keScsIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICd0cic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgIHtjbG9zZWRCeUNoaWxkcmVuOiAndHInLCByZXF1aXJlZFBhcmVudDogJ3Rib2R5JywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3RkJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAndGQsdGgnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAndGgnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICd0ZCx0aCcsIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdjb2wnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICdjb2wnLCByZXF1aXJlZFBhcmVudDogJ2NvbGdyb3VwJ30pLFxuICAnc3ZnJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogJ3N2Zyd9KSxcbiAgJ21hdGgnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2ltcGxpY2l0TmFtZXNwYWNlUHJlZml4OiAnbWF0aCd9KSxcbiAgJ2xpJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnbGknLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAnZHQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICdkdCxkZCd9KSxcbiAgJ2RkJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnZHQsZGQnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAncmInOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICdyYixydCxydGMscnAnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAncnQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46ICdyYixydCxydGMscnAnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAncnRjJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAncmIscnRjLHJwJywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3JwJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAncmIscnQscnRjLHJwJywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ29wdGdyb3VwJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnb3B0Z3JvdXAnLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAnb3B0aW9uJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiAnb3B0aW9uLG9wdGdyb3VwJywgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3N0eWxlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjb250ZW50VHlwZTogSHRtbFRhZ0NvbnRlbnRUeXBlLlJBV19URVhUfSksXG4gICdzY3JpcHQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2NvbnRlbnRUeXBlOiBIdG1sVGFnQ29udGVudFR5cGUuUkFXX1RFWFR9KSxcbiAgJ3RpdGxlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjb250ZW50VHlwZTogSHRtbFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVH0pLFxuICAndGV4dGFyZWEnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2NvbnRlbnRUeXBlOiBIdG1sVGFnQ29udGVudFR5cGUuRVNDQVBBQkxFX1JBV19URVhUfSksXG59O1xuXG52YXIgREVGQVVMVF9UQUdfREVGSU5JVElPTiA9IG5ldyBIdG1sVGFnRGVmaW5pdGlvbigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SHRtbFRhZ0RlZmluaXRpb24odGFnTmFtZTogc3RyaW5nKTogSHRtbFRhZ0RlZmluaXRpb24ge1xuICB2YXIgcmVzdWx0ID0gVEFHX0RFRklOSVRJT05TW3RhZ05hbWUudG9Mb3dlckNhc2UoKV07XG4gIHJldHVybiBpc1ByZXNlbnQocmVzdWx0KSA/IHJlc3VsdCA6IERFRkFVTFRfVEFHX0RFRklOSVRJT047XG59XG4iXX0=