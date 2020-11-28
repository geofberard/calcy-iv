import * as React from "react";
import EventService from "../../service/EventService";

const EventServiceContext = React.createContext<EventService>(null);

export const EventServiceProvider: React.FC = ({ children }) => {
  const eventService = React.useMemo<EventService>(() => new EventService(), []);

  return (
    <EventServiceContext.Provider value={eventService}>
      {children}
    </EventServiceContext.Provider>
  );
};

export const useEventService = () => React.useContext(EventServiceContext);
