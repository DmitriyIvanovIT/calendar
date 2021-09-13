import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "components/EventCalendar";
import EventForm from "components/EventForm";
import {useActions} from "../hooks/useActions";
import { useTypedSelector } from 'hooks/useTypedSelector';
import {IEvent} from "../types/IEvent";

const Event: FC = (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { events, guests } = useTypedSelector(state => state.event);
  const { user } = useTypedSelector(state => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setVisible(false);
    createEvent(event);
  }

  return (
    <Layout>
      <EventCalendar events={events}/>
      <Row justify='center'>
        <Button onClick={() => setVisible(true)}>
          Добавить событие
        </Button>
      </Row>

      <Modal
        title='Добавить событие'
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <EventForm
          guests={guests}
          submit={addNewEvent}
        />
      </Modal>
    </Layout>
  );
};

export default Event;