import { AppEvent } from "../data/event/AppEvent";

export type EventSubscriber = (event: AppEvent) => void