import { Heading, Button, Center, Box, Flex, Skeleton, Table, Thead, Tr, Th, Tbody, Td, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface Simulation {
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

  useEffect(() => {
    async function loadSimulations() {
      try {
        // const response = await api.get('/simulations')
        // setSimulations(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingSimulations(false)
      }
    }

    loadSimulations()
  }, [])

  return (
    <Center flex={1}>
      <Box maxW="1280">
        <Flex>
          <Heading fontSize="3xl">Minhas Simulações</Heading>
          <Button colorScheme="orange" size="sm" ml="auto">Nova Simulação</Button>
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
              {simulations.map(simulation => (
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
                      <Button colorScheme="blue" size="sm">Editar</Button>
                      <Button colorScheme="red" size="sm">Excluir</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Center>
  )
}