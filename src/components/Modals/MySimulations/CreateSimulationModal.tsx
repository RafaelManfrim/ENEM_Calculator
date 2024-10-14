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

const schema = yup.object({})

export type CreateSimulationFormType = yup.InferType<typeof schema>

interface CreateSimulationModalProps {
  disclosure: UseDisclosureReturn
  onCreate: (data: CreateSimulationFormType) => Promise<void>
}

export function CreateSimulationModal({
  disclosure,
  onCreate,
}: CreateSimulationModalProps) {
  const { register, formState, handleSubmit } =
    useForm<CreateSimulationFormType>({
      resolver: yupResolver(schema),
    })

  return (
    <Modal size="3xl" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Simulação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            as="form"
            spacing="5"
            onSubmit={handleSubmit(onCreate)}
          ></Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={disclosure.onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleSubmit(onCreate)}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
