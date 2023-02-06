import { Heading, Text, Container, Button, Center, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate()

  return (
    <Center flex={1}>
      <VStack maxW="1280" spacing={4}>
        <Heading fontSize="3xl">Bem vindo USERNAME</Heading>
        <Text>Aqui você pode:</Text>
        <Container bgColor="gray.100" p="4" borderRadius="8" boxShadow='md'>
          <Text>Criar metas de faculdades com os pesos relativos ao curso desejado.</Text>
          <Button variant="link" color="orange.400" onClick={() => navigate('/metas')}>
            Ver mais...
          </Button>
        </Container>
        <Container bgColor="gray.100" p="4" borderRadius="8" boxShadow='md'>
          <Text>Realizar simulações com suas notas oficiais e saber sua nota final.</Text>
          <Button variant="link" color="orange.400" onClick={() => navigate('/simulacoes')}>
            Ver mais...
          </Button>
        </Container>
      </VStack>
    </Center>
  )
}
