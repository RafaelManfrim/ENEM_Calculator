import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from '@components/Input'
import { Simulation } from '@pages/MySimulations'

const schema = yup.object({})

export type EditSimulationFormType = yup.InferType<typeof schema>

interface EditSimulationModalProps {
  disclosure: UseDisclosureReturn
  simulation: Simulation
  onEdit: (data: EditSimulationFormType) => Promise<void>
}

export function EditSimulationModal({
  simulation,
  disclosure,
  onEdit,
}: EditSimulationModalProps) {
  const { register, formState, handleSubmit } = useForm<EditSimulationFormType>(
    {
      resolver: yupResolver(schema),
      defaultValues: {},
    },
  )

  return (
    <Modal size="3xl" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Simulação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as="form" spacing="5" onSubmit={handleSubmit(onEdit)}></Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={disclosure.onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onEdit)}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
