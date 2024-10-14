import {
  Heading,
  Center,
  Skeleton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  HStack,
  Box,
  Flex,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { DeleteAmbitionDialog } from '@components/Dialogs/MyAmbitions/DeleteAmbitionDialog'
import {
  CreateAmbitionFormType,
  CreateAmbitionModal,
} from '@components/Modals/MyAmbitions/CreateAmbitionModal'

import { api } from '@lib/axios'
import {
  EditAmbitionFormType,
  EditAmbitionModal,
} from '@components/Modals/MyAmbitions/EditAmbitionModal'

export interface Ambition {
  id: number
  city: string
  course: string
  college: string
  math_weight: number
  languages_weight: number
  human_science_weight: number
  science_weight: number
  essay_weight: number
  created_at: string
  user: number
}

export function MyAmbitions() {
  const [isLoadingAmbitions, setIsLoadingAmbitions] = useState(true)
  const [ambitions, setAmbitions] = useState<Ambition[]>([])

  const [selectedAmbition, setSelectedAmbition] = useState<Ambition | null>(
    null,
  )

  const toast = useToast()

  const createAmbitionModalDisclosure = useDisclosure()
  const editAmbitionModalDisclosure = useDisclosure()
  const deleteAmbitionModalDisclosure = useDisclosure()

  async function handleCreateAmbition(data: CreateAmbitionFormType) {
    try {
      const { data: ambition } = await api.post<Ambition>('/ambitions/', data)

      toast({
        title: 'Meta cadastrada com sucesso',
        description: 'Sua meta foi cadastrada com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
      createAmbitionModalDisclosure.onClose()
      setAmbitions((data) => {
        return [...data, ambition]
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao cadastrar meta',
        description:
          'Ocorreu um erro ao cadastrar sua meta. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  async function handleEditAmbition(data: EditAmbitionFormType) {
    if (!selectedAmbition) {
      return
    }

    try {
      const { data: editedAmbition } = await api.put<Ambition>(
        `/ambitions/${selectedAmbition.id}/`,
        data,
      )

      toast({
        title: 'Meta editada com sucesso',
        description: 'Sua meta foi editada com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })

      editAmbitionModalDisclosure.onClose()

      setAmbitions((oldAmbitions) => {
        return oldAmbitions.map((ambition) => {
          if (ambition.id === selectedAmbition.id) {
            return editedAmbition
          }

          return ambition
        })
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao editar meta',
        description:
          'Ocorreu um erro ao editar sua meta. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setSelectedAmbition(null)
    }
  }

  async function handleDeleteAmbition(id: number) {
    try {
      await api.delete(`/ambitions/${id}`)
      setAmbitions(ambitions.filter((ambition) => ambition.id !== id))

      toast({
        title: 'Meta excluída com sucesso',
        description: 'Sua meta foi excluída com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao excluir meta',
        description:
          'Ocorreu um erro ao excluir sua meta. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setSelectedAmbition(null)
      deleteAmbitionModalDisclosure.onClose()
    }
  }

  useEffect(() => {
    async function loadAmbitions() {
      try {
        const response = await api.get('/ambitions')
        setAmbitions(response.data)
      } catch (error) {
        console.log(error)

        toast({
          title: 'Erro ao carregar metas',
          description:
            'Ocorreu um erro ao carregar suas metas. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      } finally {
        setIsLoadingAmbitions(false)
      }
    }

    loadAmbitions()
  }, [])

  return (
    <Flex justify="center" flex={1}>
      <Box maxW="1280" mt="4" px="12">
        <Flex mb="4">
          <Heading fontSize="3xl">Minhas Metas</Heading>
          <Button
            colorScheme="orange"
            size="sm"
            ml="auto"
            onClick={createAmbitionModalDisclosure.onOpen}
          >
            Nova Meta
          </Button>
        </Flex>
        {isLoadingAmbitions ? (
          Array(12)
            .fill(0)
            .map((_, index) => <Skeleton key={index} h="8" w="full" mb="2" />)
        ) : (
          <Box overflowX="auto">
            <Table size="sm" variant="striped">
              <Thead>
                <Tr>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                    borderTopLeftRadius={4}
                    rowSpan={2}
                  >
                    Curso
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                    rowSpan={2}
                  >
                    Faculdade
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                    rowSpan={2}
                  >
                    Cidade
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                    colSpan={5}
                  >
                    Pesos
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                    borderTopRightRadius={4}
                    rowSpan={2}
                  >
                    Ações
                  </Th>
                </Tr>
                <Tr>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                  >
                    Matemática
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                  >
                    Linguagens
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                  >
                    Humanas
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                  >
                    Ciências da Natureza
                  </Th>
                  <Th
                    bgColor="orange.300"
                    color="black"
                    textAlign="center"
                    border={0}
                  >
                    Redação
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {ambitions.map((ambition) => (
                  <Tr key={ambition.id}>
                    <Td textAlign="center">{ambition.course}</Td>
                    <Td textAlign="center">{ambition.college}</Td>
                    <Td textAlign="center">{ambition.city}</Td>
                    <Td textAlign="center">{ambition.math_weight}</Td>
                    <Td textAlign="center">{ambition.languages_weight}</Td>
                    <Td textAlign="center">{ambition.human_science_weight}</Td>
                    <Td textAlign="center">{ambition.science_weight}</Td>
                    <Td textAlign="center">{ambition.essay_weight}</Td>
                    <Td textAlign="center">
                      <HStack>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            setSelectedAmbition(ambition)
                            editAmbitionModalDisclosure.onOpen()
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => {
                            setSelectedAmbition(ambition)
                            deleteAmbitionModalDisclosure.onOpen()
                          }}
                        >
                          Excluir
                        </Button>
                      </HStack>
                    </Td>
                    {editAmbitionModalDisclosure.isOpen &&
                      selectedAmbition?.id === ambition.id && (
                        <EditAmbitionModal
                          disclosure={editAmbitionModalDisclosure}
                          ambition={selectedAmbition}
                          onEdit={handleEditAmbition}
                        />
                      )}
                    {deleteAmbitionModalDisclosure.isOpen &&
                      selectedAmbition?.id === ambition.id && (
                        <DeleteAmbitionDialog
                          disclosure={deleteAmbitionModalDisclosure}
                          onDelete={() => handleDeleteAmbition(ambition.id)}
                        />
                      )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
      {createAmbitionModalDisclosure.isOpen && (
        <CreateAmbitionModal
          disclosure={createAmbitionModalDisclosure}
          onCreate={handleCreateAmbition}
        />
      )}
    </Flex>
  )
}
