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

import { Ambition } from '@pages/MyAmbitions'

const schema = yup.object({
  city: yup.string().required('Cidade obrigatória'),
  college: yup.string().required('Faculdade obrigatória'),
  course: yup.string().required('Curso obrigatório'),
  math_weight: yup.number().required('Peso obrigatório'),
  languages_weight: yup.number().required('Peso obrigatório'),
  human_science_weight: yup.number().required('Peso obrigatório'),
  science_weight: yup.number().required('Peso obrigatório'),
  essay_weight: yup.number().required('Peso obrigatório'),
})

export type EditAmbitionFormType = yup.InferType<typeof schema>

interface EditAmbitionModalProps {
  disclosure: UseDisclosureReturn
  ambition: Ambition
  onEdit: (data: EditAmbitionFormType) => Promise<void>
}

export function EditAmbitionModal({
  ambition,
  disclosure,
  onEdit,
}: EditAmbitionModalProps) {
  const { register, formState, handleSubmit } = useForm<EditAmbitionFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      city: ambition.city,
      college: ambition.college,
      course: ambition.course,
      math_weight: ambition.math_weight,
      languages_weight: ambition.languages_weight,
      human_science_weight: ambition.human_science_weight,
      science_weight: ambition.science_weight,
      essay_weight: ambition.essay_weight,
    },
  })

  return (
    <Modal size="3xl" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Meta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as="form" spacing="5" onSubmit={handleSubmit(onEdit)}>
            <Input
              id="city"
              type="text"
              label="Cidade"
              {...register('city')}
              error={formState.errors.city}
            />

            <HStack>
              <Input
                id="college"
                label="Faculdade"
                {...register('college')}
                error={formState.errors.college}
              />

              <Input
                id="course"
                label="Curso"
                {...register('course')}
                error={formState.errors.course}
              />
            </HStack>

            <HStack>
              <Input
                id="math_weight"
                label="Peso de Matemática"
                {...register('math_weight', {
                  valueAsNumber: true,
                })}
                error={formState.errors.math_weight}
              />

              <Input
                id="languages_weight"
                label="Peso de Linguagens"
                {...register('languages_weight', {
                  valueAsNumber: true,
                })}
                error={formState.errors.languages_weight}
              />

              <Input
                id="human_science_weight"
                label="Peso de Ciências Humanas"
                {...register('human_science_weight', {
                  valueAsNumber: true,
                })}
                error={formState.errors.human_science_weight}
              />

              <Input
                id="science_weight"
                label="Peso de Ciências da Natureza"
                {...register('science_weight', {
                  valueAsNumber: true,
                })}
                error={formState.errors.science_weight}
              />

              <Input
                id="essay_weight"
                label="Peso da Redação"
                {...register('essay_weight', {
                  valueAsNumber: true,
                })}
                error={formState.errors.essay_weight}
              />
            </HStack>
          </Stack>
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
