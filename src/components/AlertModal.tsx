import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type AlertProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;

  handleYes: () => void;
};

const AlertModal = ({
  onClose,
  isOpen,
  cancelRef,

  handleYes,
}: AlertProps) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Message</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            아니오
          </Button>
          <Button onClick={handleYes} colorScheme="teal" ml={3}>
            예
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
