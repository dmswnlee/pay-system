import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { authService, firestoreService } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { EventClickArg } from "@fullcalendar/core/index.js";
import EventRegistrationModal from "../components/EventRegistrationModal";
import EventDetailsModal from "../components/EventDetailsModal";
import { useLocalStorageState } from '../hook/useLocalStorageState';

const CalendarContainer = styled.div`
  padding: 20px;
`;

interface EventData {
  id: string;
  title: string;
  start: string;
  color: string;
  uid: string;
}

const WorkManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventContent, setEventContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [events, setEvents] = useLocalStorageState<EventData[]>("events", []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const user = authService.currentUser;
  const currentUserUID = user?.uid;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (user) {
          const eventsQuery = query(
            collection(firestoreService, "schedule"),
            where("uid", "==", currentUserUID),
          );
          const querySnapshot = await getDocs(eventsQuery);
          const updatedEvents: EventData[] = querySnapshot.docs.map((doc) => {
            const { title, start, color, uid } = doc.data();
            return {
              id: doc.id,
              title,
              start,
              color,
              uid,
            };
          });
          setEvents(updatedEvents);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchEventData();
  }, []);

  const handleSaveEvent = async () => {
    try {
      if (user && eventContent && selectedDate && selectedColor) {
        const docRef = await addDoc(collection(firestoreService, "schedule"), {
          title: eventContent,
          start: selectedDate,
          color: selectedColor,
          uid: currentUserUID,
        });

        const newEvent: EventData = {
          id: docRef.id,
          title: eventContent,
          start: selectedDate,
          color: selectedColor,
          uid: currentUserUID || "",
        };

        setEvents((prevEvents: EventData[]) => [newEvent, ...prevEvents]);
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (selectedEvent) {
        await deleteDoc(doc(firestoreService, "schedule", selectedEvent.id));

        setEvents((prevEvents: EventData[]) =>
          prevEvents.filter((event) => event.id !== selectedEvent.id),
        );

        onClose();
        setSelectedEvent(null);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEditEvent = async () => {
    try {
      if (selectedEvent && editedContent) {
        await updateDoc(doc(firestoreService, "schedule", selectedEvent.id), {
          title: editedContent,
        });

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id
              ? { ...event, title: editedContent }
              : event,
          ),
        );
        onClose();
        setSelectedEvent(null);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDateClick = (time: { dateStr: string }): void => {
    setSelectedDate(time.dateStr);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    onClose();
    setEventContent("");
    setSelectedColor("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEventContent(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedColor(selectedValue);
  };

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = events.find((event) => event.id === info.event.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      onOpen();
    }
  };

  const handleSelectEvent = () => {
    onClose();
    setSelectedEvent(null);
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        dateClick={handleDateClick}
        events={events}
        eventClick={handleEventClick}
      />
      <EventRegistrationModal
        isCreateModalOpen={isCreateModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveEvent={handleSaveEvent}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        eventContent={eventContent}
        handleChange={handleChange}
      />
      <EventDetailsModal
        isOpen={isOpen && selectedEvent !== null}
        onClose={handleSelectEvent}
        selectedEvent={selectedEvent}
        handleDeleteEvent={handleDeleteEvent}
        isEditModalOpen={isEditModalOpen}
        setEditedContent={setEditedContent}
        editedContent={editedContent}
        handleEditEvent={handleEditEvent}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </CalendarContainer>
  );
};

export default WorkManagement;
