import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiTrash, FiCheck } from "react-icons/fi";

import EditForm from "../../components/EditForm";
import { useEvents } from "../../context/events";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import styles from "../../styles/details.module.scss";
import { toast } from "react-toastify";
import moment from "moment";

const getTime = (time: Date, position: number) => {
  console.log(time);
  const userTimezoneOffset = time.getTimezoneOffset() * 60000;
  return new Date(time.getTime() - userTimezoneOffset)
    .toISOString()
    .split("T")
    [position].slice(0, 5);
};

const getDayEvent = (time: Date) => {
  return moment(new Date(time?.getTime())).format("dddd DD MMMM");
};
const Schedule = () => {
  const { query } = useRouter();
  const { events, onEditEvent, onCloseModal, open } = useEvents();
  console.log("query", query.id);

  const event = events.find(({ _id }) => _id === query.id)!;
  console.log(event, events);
  const openModal = React.useCallback(() => {
    onCloseModal(true);
  }, []);

  const closeModal = React.useCallback(() => {
    onCloseModal(false);
  }, []);
  console.log(event, "event?.start");
  return (
    <>
      <section className={styles["container-section"]}>
        <Link id={styles["back-calendar"]} href="/">
          Voltar
        </Link>
        <div id={styles["wrapper"]}>
          <header id={styles["container"]}>
            <Button
              title="Edit"
              className={styles["edit-button"]}
              disabled={event?.isDeleted}
              onClick={openModal}
            >
              <FiEdit />
            </Button>

            <Button
              title="Remove"
              onClick={() => {
                onEditEvent({ ...event, isDeleted: true, isConfirmed: false });
                toast("O evento acabou por ser Removido!");
              }}
              disabled={event?.isDeleted}
              className={styles["remove-button"]}
            >
              <FiTrash />
            </Button>

            <Button
              title="Confirm"
              onClick={() => {
                onEditEvent({ ...event, isConfirmed: true, isDeleted: false });
                toast("Parabéns,o evento acabou por ser confirmado");
              }}
              disabled={event?.isDeleted}
              className={styles["confirm-button"]}
            >
              <FiCheck />
            </Button>
          </header>

          <div id={styles["title-event"]}>
            <span className={styles["name-event"]}>Nome do Evento</span>
            <h1 className="">{event?.title}</h1>
            <span>Evento</span>
            <div className={styles["day-date"]}>
              <div>
                <span> {getDayEvent(event?.start)}</span>
                {"-"}
                <span>{getTime(event?.start, 1)}</span>
              </div>
              <div>
                <span> {getDayEvent(event.end)}</span>
                {"-"}
                <span>{getTime(event.end, 1)}</span>
              </div>
            </div>
            <span>Local</span>
            <div className={styles["local-event"]}>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={open} onClose={closeModal} contentLabel="Edit Modal">
        <EditForm
          onSubmit={(ev) => {
            onEditEvent(ev);
            closeModal();
          }}
          defaultValue={event}
        />
      </Modal>
    </>
  );
};
export default Schedule;
