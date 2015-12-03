/* */ 
"format cjs";
import { verifyNoBrowserErrors } from 'angular2/src/testing/e2e_util';
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('reuse example app', function () {
    afterEach(verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/can_activate/';
    it('should navigate to user 1', function () {
        browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-1-link')).click();
        waitForElement('control-panel-cmp');
        expect(browser.getCurrentUrl()).toMatch(/\/user-settings\/1$/);
        expect(element(by.css('control-panel-cmp')).getText()).toContain('Settings');
    });
    it('should not navigate to user 2', function () {
        browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-2-link')).click();
        waitForElement('home-cmp');
        expect(element(by.css('home-cmp')).getText()).toContain('Welcome Home!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuX2FjdGl2YXRlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2FjdGl2YXRlL2Nhbl9hY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbIndhaXRGb3JFbGVtZW50Il0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0JBQStCO0FBR25FLHdCQUF3QixRQUFRO0lBQzlCQSxJQUFJQSxFQUFFQSxHQUFTQSxVQUFXQSxDQUFDQSxrQkFBa0JBLENBQUNBO0lBQzlDQSxnRUFBZ0VBO0lBQ2hFQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtBQUNsREEsQ0FBQ0E7QUFFRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFFNUIsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFakMsSUFBSSxHQUFHLEdBQUcsMkNBQTJDLENBQUM7SUFFdEQsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge1Byb21pc2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcikge1xuICB2YXIgRUMgPSAoPGFueT5wcm90cmFjdG9yKS5FeHBlY3RlZENvbmRpdGlvbnM7XG4gIC8vIFdhaXRzIGZvciB0aGUgZWxlbWVudCB3aXRoIGlkICdhYmMnIHRvIGJlIHByZXNlbnQgb24gdGhlIGRvbS5cbiAgYnJvd3Nlci53YWl0KEVDLnByZXNlbmNlT2YoJChzZWxlY3RvcikpLCAyMDAwMCk7XG59XG5cbmRlc2NyaWJlKCdyZXVzZSBleGFtcGxlIGFwcCcsIGZ1bmN0aW9uKCkge1xuXG4gIGFmdGVyRWFjaCh2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMpO1xuXG4gIHZhciBVUkwgPSAnYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS8nO1xuXG4gIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gdXNlciAxJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjdXNlci0xLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnY29udHJvbC1wYW5lbC1jbXAnKTtcbiAgICBleHBlY3QoYnJvd3Nlci5nZXRDdXJyZW50VXJsKCkpLnRvTWF0Y2goL1xcL3VzZXItc2V0dGluZ3NcXC8xJC8pO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCdjb250cm9sLXBhbmVsLWNtcCcpKS5nZXRUZXh0KCkpLnRvQ29udGFpbignU2V0dGluZ3MnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBub3QgbmF2aWdhdGUgdG8gdXNlciAyJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjdXNlci0yLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnaG9tZS1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ1dlbGNvbWUgSG9tZSEnKTtcbiAgfSk7XG59KTtcbiJdfQ==