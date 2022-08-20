import React from "react";
import { toast } from "react-toastify";
import { useEvents } from "../context/events";
import { EventProps } from "../types";
import { v4 as uuid } from "uuid";
import "./form.module.scss";

type Props = {
  defaultValue: EventProps;
  onSubmit: (event: EventProps) => void;
};
const getTime = (time: Date, position: number) => {
  const userTimezoneOffset = time.getTimezoneOffset() * 60000;
  return new Date(time.getTime() - userTimezoneOffset)
    .toISOString()
    .split("T")
    [position].slice(0, 5);
};

const ModalCreateEvent = ({ close, sendDataToModal }: any) => {
  const { createEvents, onAddEvent } = useEvents();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement | any;

    if (form.elements[6].value.trim()) {
      const data = {
        title: form.elements[0].value,
        start: new Date(form.elements[1].value + " " + form.elements[2].value),
        end: new Date(form.elements[3].value + " " + form.elements[4].value),
        allDay: form.elements[5].checked,
        location: form.elements[6].value,
        isConfirmed: false,
        isDeleted: false,
        _id: sendDataToModal._id,
        __v: sendDataToModal.__v,
        id: uuid(),
      };

      onAddEvent(data);

      close(false);
      window.history.go(0);
      toast(`O evento ${data.title} foi criado com sucesso`);
    } else {
      toast("Adicione uma localização");
    }
  };
  return (
    <form id="main-modal-create-event" onSubmit={handleSubmit}>
      <input type="text" placeholder="Adicionar título" required />
      <div id="container">
        <div>
          <div>
            <span>Data para começar</span>
            <input
              type="date"
              name="startTime"
              id="start_time-filed"
              defaultValue={
                new Date(sendDataToModal?.start)?.toISOString().split("T")[0]
              }
              required
            />
          </div>
          <div>
            <span>Hora para começar</span>
            <input
              type="time"
              name="startTime"
              id="start_time-filed"
              defaultValue={getTime(sendDataToModal.start, 1)}
              required
            />
          </div>
        </div>

        <div id="second-container">
          <div>
            <span>Data para terminar</span>
            <input
              type="date"
              name="startTime"
              id="start_time-filed"
              defaultValue={
                new Date(sendDataToModal.end).toISOString().split("T")[0]
              }
              required
            />
          </div>
          <div>
            <span>Hora para terminar</span>
            <input
              type="time"
              name="startTime"
              id="start_time-filed"
              defaultValue={getTime(sendDataToModal.end, 1)}
              required
            />
          </div>
        </div>
        <label htmlFor="all_day-field">
          <input
            type="checkbox"
            name="allDay"
            id="all_day-field"
            defaultChecked={sendDataToModal.allDay}
          />
          All Day
        </label>

        <div id="container-location">
          <span>Location Event</span>
          <input placeholder="Location" type="text" />
        </div>
      </div>
      <div id="save-cancel-container">
        <button type="submit">SAVE</button>
        <button id="cancel-create" type="button" onClick={() => close(false)}>
          CANCEL
        </button>
      </div>
    </form>
  );
};
export default ModalCreateEvent;
