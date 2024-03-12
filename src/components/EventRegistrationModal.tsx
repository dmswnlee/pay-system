import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface EventRegistrationModalProps {
  isCreateModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveEvent: () => void;
  selectedColor: string;
  handleColorChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  eventContent: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const EventRegistrationModal = ({
  isCreateModalOpen,
  handleCloseModal,
  handleSaveEvent,
  selectedColor,
  handleColorChange,
  eventContent,
  handleChange,
}: EventRegistrationModalProps) => {
  return (
    <Modal isOpen={isCreateModalOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>일정 등록하기</ModalHeader>
        <ModalBody>
          <SimpleGrid mb={5} column={2}>
            <Select
              placeholder="Color selection"
              value={selectedColor}
              onChange={handleColorChange}
            >
              <option value="#E53E3E">Red</option>
              <option value="#ECC94B">Yellow</option>
              <option value="#3182CE">Blue</option>
              <option value="#319795">Teal</option>
            </Select>
          </SimpleGrid>
          <Textarea
            value={eventContent}
            onChange={handleChange}
            placeholder="일정 내용을 입력하세요."
            size="sm"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            size="md"
            onClick={handleCloseModal}
          >
            취소
          </Button>
          <Button colorScheme="teal" size="md" onClick={handleSaveEvent}>
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventRegistrationModal;
