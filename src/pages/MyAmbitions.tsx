import { Heading, Center, Skeleton, Table, Thead, Tr, Th, Tbody, Td, Button, HStack, Box, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Ambition {
  id: number;
  city: string;
  course: string;
  college: string;
  math_weight: number;
  languages_weight: number;
  human_science_weight: number;
  science_weight: number;
  essay_weight: number;
}

export function MyAmbitions() {
  const [isLoadingAmbitions, setIsLoadingAmbitions] = useState(true)
  const [ambitions, setAmbitions] = useState<Ambition[]>([
    {
      id: 1,
      city: 'São Paulo',
      course: 'Engenharia de Software',
      college: 'USP',
      math_weight: 1,
      languages_weight: 1,
      human_science_weight: 1,
      science_weight: 1,
      essay_weight: 1,
    },
    {
      id: 2,
      city: 'São Carlos',
      course: 'Engenharia de Software',
      college: 'IFSP',
      math_weight: 1,
      languages_weight: 1,
      human_science_weight: 1,
      science_weight: 1,
      essay_weight: 1,
    }
  ])

  const toast = useToast()

  const createAmbitionModalDisclosure = useDisclosure()
  const editAmbitionModalDisclosure = useDisclosure()
  const deleteAmbitionModalDisclosure = useDisclosure()

  useEffect(() => {
    async function loadAmbitions() {
      try {
        // const response = await api.get('/ambitions')
        // setAmbitions(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingAmbitions(false)
      }
    }

    loadAmbitions()
  }, [])

  return (
    <Center flex={1}>
      <Box maxW="1280">
        <Flex>
          <Heading fontSize="3xl">Minhas Metas</Heading>
          <Button colorScheme="orange" size="sm" ml="auto">Nova Meta</Button>
        </Flex>
        {isLoadingAmbitions ? (
          Array(12)
            .fill(0)
            .map((_, index) => <Skeleton key={index} h="8" w="full" mb="2" />)
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Curso</Th>
                <Th>Faculdade</Th>
                <Th>Cidade</Th>
                <Th>Peso Matemática</Th>
                <Th>Peso Linguagens</Th>
                <Th>Peso Humanas</Th>
                <Th>Peso Ciências da Natureza</Th>
                <Th>Peso Redação</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ambitions.map(ambition => (
                <Tr key={ambition.id}>
                  <Td>{ambition.course}</Td>
                  <Td>{ambition.college}</Td>
                  <Td>{ambition.city}</Td>
                  <Td>{ambition.math_weight}</Td>
                  <Td>{ambition.languages_weight}</Td>
                  <Td>{ambition.human_science_weight}</Td>
                  <Td>{ambition.science_weight}</Td>
                  <Td>{ambition.essay_weight}</Td>
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