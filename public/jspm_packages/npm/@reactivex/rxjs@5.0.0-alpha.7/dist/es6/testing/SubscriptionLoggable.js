/* */ 
"format cjs";
import SubscriptionLog from './SubscriptionLog';
export default class SubscriptionLoggable {
    constructor() {
        this.subscriptions = [];
    }
    logSubscribedFrame() {
        this.subscriptions.push(new SubscriptionLog(this.scheduler.now()));
        return this.subscriptions.length - 1;
    }
    logUnsubscribedFrame(index) {
        const subscriptionLogs = this.subscriptions;
        const oldSubscriptionLog = subscriptionLogs[index];
        subscriptionLogs[index] = new SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    }
}
//# sourceMappingURL=SubscriptionLoggable.js.map