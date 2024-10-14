import {
  Heading,
  Button,
  Box,
  Flex,
  Skeleton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { DeleteSimulationDialog } from '@components/Dialogs/MySimulations/DeleteSimulationDialog'
import {
  CreateSimulationFormType,
  CreateSimulationModal,
} from '@components/Modals/MySimulations/CreateSimulationModal'
import {
  EditSimulationFormType,
  EditSimulationModal,
} from '@components/Modals/MySimulations/EditSimulationModal'

import { api } from '@lib/axios'

export interface Simulation {
  id: number
  name: string
  math: number
  languages: number
  human_science: number
  science: number
  essay: number
  is_official: boolean
  final_score: number
}

export function MySimulations() {
  const [isLoadingSimulations, setIsLoadingSimulations] = useState(true)
  const [simulations, setSimulations] = useState<Simulation[]>([
    {
      id: 1,
      name: 'Simulação 1',
      math: 650,
      languages: 650,
      human_science: 650,
      science: 650,
      essay: 650,
      is_official: false,
      final_score: 600,
    },
    {
      id: 2,
      name: 'Simulação 2',
      math: 450,
      languages: 550,
      human_science: 850,
      science: 720,
      essay: 980,
      is_official: false,
      final_score: 700,
    },
    {
      id: 3,
      name: 'Simulação 3',
      math: 520,
      languages: 510,
      human_science: 650,
      science: 520,
      essay: 880,
      is_official: true,
      final_score: 650,
    },
  ])

  const [selectedSimulation, setSelectedSimulation] =
    useState<Simulation | null>(null)

  const toast = useToast()

  const createSimulationModalDisclosure = useDisclosure()
  const editSimulationModalDisclosure = useDisclosure()
  const deleteSimulationModalDisclosure = useDisclosure()

  async function handleCreateSimulation(data: CreateSimulationFormType) {
    try {
      const { data: simulation } = await api.post<Simulation>(
        '/simulations/',
        data,
      )

      toast({
        title: 'Simulação cadastrada com sucesso',
        description: 'Sua simulação foi cadastrada com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })

      createSimulationModalDisclosure.onClose()
      setSimulations((data) => {
        return [...data, simulation]
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao cadastrar simulação',
        description:
          'Ocorreu um erro ao cadastrar sua simulação. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  async function handleEditSimulation(data: EditSimulationFormType) {
    if (!selectedSimulation) {
      return
    }

    try {
      const { data: editedSimulation } = await api.put<Simulation>(
        `/simulations/${selectedSimulation.id}/`,
        data,
      )

      toast({
        title: 'Simulação editada com sucesso',
        description: 'Sua simulação foi editada com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })

      editSimulationModalDisclosure.onClose()

      setSimulations((oldSimulations) => {
        return oldSimulations.map((simulation) => {
          if (simulation.id === selectedSimulation.id) {
            return editedSimulation
          }

          return simulation
        })
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao editar simulação',
        description:
          'Ocorreu um erro ao editar sua simulação. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setSelectedSimulation(null)
    }
  }

  async function handleDeleteSimulation(id: number) {
    try {
      await api.delete(`/simulations/${id}`)
      setSimulations(simulations.filter((simulation) => simulation.id !== id))

      toast({
        title: 'Simulação excluída com sucesso',
        description: 'Sua simulação foi excluída com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Erro ao excluir simulação',
        description:
          'Ocorreu um erro ao excluir sua simulação. Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setSelectedSimulation(null)
      deleteSimulationModalDisclosure.onClose()
    }
  }

  useEffect(() => {
    async function loadSimulations() {
      try {
        const response = await api.get('/simulations')
        setSimulations(response.data)
      } catch (error) {
        console.log(error)

        toast({
          title: 'Erro ao carregar simulações',
          description:
            'Ocorreu um erro ao carregar suas simulações. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      } finally {
        setIsLoadingSimulations(false)
      }
    }

    loadSimulations()
  }, [])

  return (
    <Flex justify="center" flex={1}>
      <Box maxW="1280" mt="4" px="12">
        <Flex>
          <Heading fontSize="3xl">Minhas Simulações</Heading>
          <Button
            colorScheme="orange"
            size="sm"
            ml="auto"
            onClick={createSimulationModalDisclosure.onOpen}
          >
            Nova Simulação
          </Button>
        </Flex>
        {isLoadingSimulations ? (
          Array(12)
            .fill(0)
            .map((_, index) => <Skeleton key={index} h="8" w="full" mb="2" />)
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Nota Matemática</Th>
                <Th>Nota Linguagens</Th>
                <Th>Nota Humanas</Th>
                <Th>Nota Ciências da Natureza</Th>
                <Th>Nota Redação</Th>
                <Th>Nota Final</Th>
                <Th>Oficial</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {simulations.map((simulation) => (
                <Tr key={simulation.id}>
                  <Td>{simulation.name}</Td>
                  <Td>{simulation.math}</Td>
                  <Td>{simulation.languages}</Td>
                  <Td>{simulation.human_science}</Td>
                  <Td>{simulation.science}</Td>
                  <Td>{simulation.essay}</Td>
                  <Td>{simulation.final_score}</Td>
                  <Td>{simulation.is_official ? 'Sim' : 'Não'}</Td>
                  <Td>
                    <HStack>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => {
                          setSelectedSimulation(simulation)
                          editSimulationModalDisclosure.onOpen()
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => {
                          setSelectedSimulation(simulation)
                          deleteSimulationModalDisclosure.onOpen()
                        }}
                      >
                        Excluir
                      </Button>
                    </HStack>
                  </Td>
                  {editSimulationModalDisclosure.isOpen &&
                    selectedSimulation?.id === simulation.id && (
                      <EditSimulationModal
                        disclosure={editSimulationModalDisclosure}
                        simulation={selectedSimulation}
                        onEdit={handleEditSimulation}
                      />
                    )}
                  {deleteSimulationModalDisclosure.isOpen &&
                    selectedSimulation?.id === simulation.id && (
                      <DeleteSimulationDialog
                        disclosure={deleteSimulationModalDisclosure}
                        onDelete={() => handleDeleteSimulation(simulation.id)}
                      />
                    )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      {createSimulationModalDisclosure.isOpen && (
        <CreateSimulationModal
          disclosure={createSimulationModalDisclosure}
          onCreate={handleCreateSimulation}
        />
      )}
    </Flex>
  )
}
