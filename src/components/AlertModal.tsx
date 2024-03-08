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
  handleNo: () => void;
  handleYes: () => void;
};

const AlertModal = ({
  onClose,
  isOpen,
  cancelRef,
  handleNo,
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
        <AlertDialogBody>
          Are you sure you want to discard all of your notes? 44 words will be
          deleted.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleNo}>
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
