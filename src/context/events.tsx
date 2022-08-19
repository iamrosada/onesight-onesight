import React from "react";
import Amplify, { API } from "aws-amplify";
import { EventProps } from "../types";

type ContextProps = {
  events: EventProps[];
  // toogle: boolean
  open: boolean;
  createEvents: EventProps[];
  onAddEvent: (event: EventProps) => void;
  onEditEvent: (event: EventProps) => void;
  onCreateEvent: (event: EventProps) => void;
  onCloseModal: (toogle: boolean) => void;
};

const EventsContext = React.createContext<ContextProps>({
  events: [],
  createEvents: [],
  onAddEvent: () => {},
  onEditEvent: () => {},
  onCreateEvent: () => {},
  onCloseModal: () => {},
  // toogle: false,
  open: false,
});

export const useEvents = () => {
  const context = React.useContext(EventsContext);

  if (!context)
    throw new Error("useEvents must be used within a EventsProvider");
  return context;
};

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = React.useState<EventProps[]>([]);
  const [open, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const [createEvents, setCreateEvents] = React.useState<EventProps[]>([]);

  React.useEffect(() => {
    API.get("projettest", "/schedules", {}).then((onesightRes) =>
      console.log("testando", onesightRes)
    );
    setHydrated(true);
  }, []);

  const onAddEvent = React.useCallback(
    (event: EventProps) => {
      setEvents([...events, event]);
      API.post("projettest", "/schedules", {
        body: {
          title: event.title,
          // end: event.end,
          // id: event.id,
          // start: event.start,
          // location: event.location,
          // isDeleted: event.isDeleted,
          // isConfirmed: event.isConfirmed,
          // allDay: event.allDay,
        },
      });
    },
    [events]
  );

  const onEditEvent = React.useCallback(
    (event: EventProps) => {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    },
    [events]
  );
  const onCloseModal = React.useCallback((toggle: boolean) => {
    setOpen(toggle);
  }, []);

  const onCreateEvent = React.useCallback(
    (event: EventProps) => {
      setCreateEvents([...events, event]);
    },
    [events]
  );

  if (!hydrated) {
    return null;
  }
  return (
    <EventsContext.Provider
      value={{
        events,
        onAddEvent,
        onEditEvent,
        onCreateEvent,
        createEvents,
        onCloseModal,
        open,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
