import Observable from '../Observable';
import Scheduler from '../Scheduler';
import TestMessage from './TestMessage';
import SubscriptionLog from './SubscriptionLog';
import SubscriptionLoggable from './SubscriptionLoggable';
export default class ColdObservable<T> extends Observable<T> implements SubscriptionLoggable {
    messages: TestMessage[];
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame: () => number;
    logUnsubscribedFrame: (index: number) => void;
    constructor(messages: TestMessage[], scheduler: Scheduler);
    scheduleMessages(subscriber: any): void;
}
