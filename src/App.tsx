import { Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import { Input } from "./components/Input";

const schema = yup.object().shape({
  redacao: yup.number().required('Informe a nota da redação').min(0, "A nota mínima da redação é 0").max(1000, "A nota máxima da redação é 1000"),
  linguagens: yup.number().required('Informe a nota de linguagens').min(0, "A nota mínima de linguagens é 0").max(1200, "A nota máxima de linguagens é 1200"),
  cienciasHumanas: yup.number().required('Informe a nota de ciências humanas').min(0, "A nota mínima de ciências humanas é 0").max(1200, "A nota máxima de ciências humanas é 1200"),
  cienciasNatureza: yup.number().required('Informe a nota de ciências da natureza').min(0, "A nota mínima de ciências da natureza é 0").max(1200, "A nota máxima de ciências da natureza é 1200"),
  matematica: yup.number().required('Informe a nota de matemática').min(0, "A nota mínima de matemática é 0").max(1200, "A nota máxima de matemática é 1200"),
})

type GradesFormSchema = {
  redacao: number;
  linguagens: number;
  cienciasHumanas: number;
  cienciasNatureza: number;
  matematica: number;
}

export function App() {
  const { register, handleSubmit, formState } = useForm<GradesFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      redacao: 0,
      linguagens: 0,
      cienciasHumanas: 0,
      cienciasNatureza: 0,
      matematica: 0
    }
  })

  const toast = useToast()

  function handleCalculateGrades(data: GradesFormSchema) {
    const { redacao, linguagens, cienciasHumanas, matematica, cienciasNatureza } = data

    const gradesIF = (redacao + linguagens + cienciasHumanas + matematica + cienciasNatureza) / 5
    const gradesCP = (redacao + linguagens + cienciasHumanas + matematica * 4 + cienciasNatureza * 2) / 9

    toast({
      position: 'bottom-left',
      render: () => (
        <Box color='white' p={4} bg='green.500'>
          <Text>Sua nota no IF de Catanduva para cursar ADS seria {gradesIF.toFixed(2)}</Text>
          <Text>Sua nota no UTFPR para cursar Eng. Software seria {gradesCP.toFixed(2)}</Text>
        </Box>
      ),
    })
  }

  return (
    <Flex w="full" h="100vh">
      <Image src="https://picsum.photos/2000/3000" h="100%" w="50%" bgColor="orange.500" />
      <Flex justify="center" align="center" flexDir="column" h="100%" w="50%">
        <Heading color="orange.500" fontSize="5xl" fontFamily="cursive">
          ENEM Calculator
        </Heading>
        <Text color="gray.700">Digite suas 5 notas e deixe o resto com a gente.</Text>
        <Flex
          as="form"
          flexDir="column"
          w="100%"
          maxW={512}
          px="8"
          gap="4"
          mt="8"
          onSubmit={handleSubmit(handleCalculateGrades)}
        >
          <Input
            label="Linguagens"
            type="number"
            {...register('linguagens')}
            error={formState.errors.linguagens}
          />

          <Input
            label="Humanas"
            type="number"
            {...register('cienciasHumanas')}
            error={formState.errors.cienciasHumanas}
          />

          <Input
            label="Redação"
            type="number"
            {...register("redacao")}
            error={formState.errors.redacao}
          />

          <Input
            label="Matemática"
            type="number"
            {...register("matematica")}
            error={formState.errors.matematica}
          />

          <Input
            label="Natureza"
            type="number"
            {...register("cienciasNatureza")}
            error={formState.errors.cienciasNatureza}
          />

          <Button colorScheme="orange" type="submit">Calcular</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}