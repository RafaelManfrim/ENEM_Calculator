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

export type CreateAmbitionFormType = yup.InferType<typeof schema>

interface CreateAmbitionModalProps {
  disclosure: UseDisclosureReturn
  onCreate: (data: CreateAmbitionFormType) => Promise<void>
}

export function CreateAmbitionModal({
  disclosure,
  onCreate,
}: CreateAmbitionModalProps) {
  const { register, formState, handleSubmit } = useForm<CreateAmbitionFormType>(
    {
      resolver: yupResolver(schema),
    },
  )

  return (
    <Modal size="3xl" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Meta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as="form" spacing="5" onSubmit={handleSubmit(onCreate)}>
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
          <Button colorScheme="green" onClick={handleSubmit(onCreate)}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
