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
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addEvent, deleteEvent, editEvent } from '../redux/store';

const CalendarContainer = styled.div`
  padding: 20px;
`;

export interface EventData {
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
  //const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

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
          dispatch(addEvent(updatedEvents))
        }
      } catch (err) {
        console.error("에러:", err);
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

        dispatch(addEvent(newEvent));
        handleCloseModal();
      } else {
        console.error("일정 내용, 날짜, 색상을 모두 입력하세요.");
      }
    } catch (err) {
      console.error("에러:", err);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (selectedEvent) {
        await deleteDoc(doc(firestoreService, "schedule", selectedEvent.id));

        dispatch(deleteEvent(selectedEvent.id));
        onClose();
        setSelectedEvent(null);
      }
    } catch (err) {
      console.error("에러:", err);
    }
  };

  const handleEditEvent = async () => {
    try {
      if (selectedEvent && editedContent) {
        await updateDoc(doc(firestoreService, "schedule", selectedEvent.id), {
          title: editedContent,
        });

        dispatch(editEvent({
          id: selectedEvent.id,
          title: editedContent,
          start: selectedEvent.start,
          color: selectedEvent.color,
          uid: selectedEvent.uid,
        }));
        onClose();
        setSelectedEvent(null);
        setIsEditModalOpen(false);
      } else {
        console.error("수정할 내용을 입력하세요.");
      }
    } catch (err) {
      console.error("에러:", err);
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
      {/* 일정등록 모달 */}
      <EventRegistrationModal
        isCreateModalOpen={isCreateModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveEvent={handleSaveEvent}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        eventContent={eventContent}
        handleChange={handleChange}
      />
      {/* 등록일정확인 모달 */}
      <EventDetailsModal
        isOpen={isOpen && selectedEvent !== null}
        onClose={() => {
          onClose();
          setSelectedEvent(null);
        }}
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
