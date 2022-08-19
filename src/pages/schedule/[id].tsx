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

function getTime(time: Date, position: number) {
  console.log(time);
  const userTimezoneOffset = time.getTimezoneOffset() * 60000;
  return new Date(time.getTime() - userTimezoneOffset)
    .toISOString()
    .split("T")
    [position].slice(0, 5);
}
export default function Schedule() {
  const { query } = useRouter();
  const { events, onEditEvent, onCloseModal, open } = useEvents();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const event = events.find(({ id }) => id === query.id)!;

  const openModal = React.useCallback(() => {
    // setIsOpen(true);
    onCloseModal(true);
  }, []);

  const closeModal = React.useCallback(() => {
    // setIsOpen(false);
    onCloseModal(false);
  }, []);

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
              disabled={event.isDeleted}
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
              disabled={event.isDeleted}
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
              disabled={event.isDeleted}
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
              <span> Sext-feira, 26 de agosto</span>
              <span>{getTime(event.start, 1)}</span>
              <span>{getTime(event.end, 1)}</span>
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
          // close={setIsOpen}
          defaultValue={event}
        />
      </Modal>
    </>
  );
}
