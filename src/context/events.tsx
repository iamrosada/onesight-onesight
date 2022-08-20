import React from "react";
import { EventProps } from "../types";
type ContextProps = {
  events: EventProps[];

  open: boolean;
  createEvents: EventProps[];
  onAddEvent: (event: EventProps) => void;
  onEditEvent: (event: EventProps) => void;
  onCreateEvent: (event: EventProps) => void;
  onCloseModal: (toogle: boolean) => void;
};
const contentType = "application/json";
const EventsContext = React.createContext<ContextProps>({
  events: [],
  createEvents: [],
  onAddEvent: () => {},
  onEditEvent: () => {},
  onCreateEvent: () => {},
  onCloseModal: () => {},
  open: false,
});

export const useEvents = () => {
  const context = React.useContext(EventsContext);

  if (!context)
    throw new Error("useEvents must be used within a EventsProvider");
  return context;
};

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = React.useState<EventProps[]>([]);
  const [open, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const [createEvents, setCreateEvents] = React.useState<EventProps[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data_ = await fetch("/api");
      const { data } = await data_.json();

      setEvents(
        data.map((item: EventProps) => ({
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        }))
      );
    };

    fetchData().catch(console.error);
    setHydrated(true);
  }, []);

  const onAddEvent = React.useCallback(
    async (event: EventProps) => {
      setEvents([...events, event]);

      const res = await fetch("/api/", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        throw new Error("Error");
      }
    },
    [events.length]
  );

  const onEditEvent = React.useCallback(
    async (event: EventProps) => {
      setEvents(events.map((e) => (e._id === event._id ? event : e)));

      const res = await fetch(`/api/schedule/${event._id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        throw new Error("Error");
      }
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
export default EventsProvider;
