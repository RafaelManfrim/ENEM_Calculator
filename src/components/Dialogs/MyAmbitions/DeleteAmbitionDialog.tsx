import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { useRef } from 'react'

interface DeleteAmbitionDialogProps {
  disclosure: UseDisclosureReturn
  onDelete: () => void
}

export function DeleteAmbitionDialog({
  disclosure,
  onDelete,
}: DeleteAmbitionDialogProps) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Meta
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir esta meta? Você não poderá desfazer
            esta ação posteriormente.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} mr={3} onClick={disclosure.onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onDelete}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
