import { EventSubscriber } from "./EventSubscriber";
import { AppEvent } from "../data/event/AppEvent";

export default class EventService {
    subscribers: EventSubscriber[] = [];

    subscribe = (subs:EventSubscriber) => {
        this.subscribers.push(subs);
        return () => this.unsubscribe(subs);
    }

    unsubscribe = (subs:EventSubscriber) => {
        this.subscribers = this.subscribers.filter(currentSubs => subs !== currentSubs);
    }

    trigger = (event:AppEvent) => {
        this.subscribers.forEach(subs => subs(event));
    }

}