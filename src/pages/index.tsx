import React from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { useRouter } from "next/router";
import moment from "moment";
import { EventProps } from "../types";
import { useEvents } from "../context/events";
import ModalCreateEvent from "../components/ModalCreateEvent";
import styles from "../components/form.module.scss";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const getEventBackground = ({ isConfirmed, isDeleted }: EventProps) => {
  if (isDeleted) {
    return "red";
  }

  if (isConfirmed) {
    return "green";
  }

  return "rgba(2, 2, 2, 0.4)";
};

const ReactBigCalendar = () => {
  const ref = React.useRef(null);
  const router = useRouter();
  const { events, onAddEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = React.useState(undefined);
  const [modalState, setModalState] = React.useState(false);

  const [sendDataToModal, setSendDataToModal] = React.useState<EventProps[]>(
    []
  );
  const handleSelectedEvent = (eventId: string) => {
    router.push(`/schedule/${eventId}`);
  };

  const handleSelect = (e: any) => {
    setSendDataToModal(e);
    setModalState(true);
  };

  const Modals = () => {
    return (
      <div
        ref={ref}
        className={`${
          modalState == true ? styles["modal-show"] : styles["modal-hide"]
        } "modal"`}
      >
        <div className={styles["modal-content"]}>
          <ModalCreateEvent
            close={setModalState}
            sendDataToModal={sendDataToModal}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      {modalState && <Modals />}

      <Calendar
        views={["day", "week", "work_week", "month", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={events}
        style={{ height: "100vh" }}
        onSelectSlot={(e) => handleSelect(e)}
        onSelectEvent={({ id }: EventProps) => handleSelectedEvent(id)}
        eventPropGetter={(event: EventProps) => ({
          ...event,
          style: {
            backgroundColor: getEventBackground(event),
            textDecoration: event.isDeleted ? "line-through" : "none",
            fontStyle: event.isDeleted ? "italic" : "normal",
          },
        })}
      />
    </div>
  );
};

export default ReactBigCalendar;
