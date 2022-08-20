import { toast } from "react-toastify";
import { useEvents } from "../context/events";
import { EventProps } from "../types";
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

const EditForm = ({ defaultValue, onSubmit }: Props) => {
  const { onCloseModal } = useEvents();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement | any;
    try {
      if (form.elements[6].value.trim()) {
        const data = {
          title: form.elements[0].value,
          start: new Date(
            form.elements[1].value + " " + form.elements[2].value
          ),
          end: new Date(form.elements[3].value + " " + form.elements[4].value),
          allDay: form.elements[5].checked,
          location: form.elements[6].value,
          // id: defaultValue.id,
          isConfirmed: defaultValue.isConfirmed,
          isDeleted: false,
          _id: defaultValue._id,
          __v: defaultValue.__v,
        };

        onSubmit(data);
        toast("Editado com sucesso");
      } else {
        toast("Adicione uma localização");
      }
    } catch (error) {
      toast("Por favor verifica os seus dados se estão corretos");
    }
  };

  return (
    <form id="main-modal-create-event" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicionar título"
        defaultValue={defaultValue.title}
        required
      />
      <div id="container">
        <div>
          <div>
            <span>Data para começar</span>
            <input
              type="date"
              name="startTime"
              id="start_time-filed"
              defaultValue={
                new Date(defaultValue?.start)?.toISOString().split("T")[0]
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
              defaultValue={getTime(defaultValue.start, 1)}
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
                new Date(defaultValue.end).toISOString().split("T")[0]
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
              defaultValue={getTime(defaultValue.end, 1)}
              required
            />
          </div>
        </div>
        <label htmlFor="all_day-field">
          <input
            type="checkbox"
            name="allDay"
            id="all_day-field"
            defaultChecked={defaultValue.allDay}
          />
          All Day
        </label>

        <div id="container-location">
          <span>Location Event</span>
          <input
            placeholder="Location"
            type="text"
            defaultValue={defaultValue.location}
          />
        </div>
      </div>
      <div id="save-cancel-container">
        <button type="submit">SAVE</button>
        <button
          id="cancel-create"
          type="button"
          onClick={() => onCloseModal(false)}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};
export default EditForm;
