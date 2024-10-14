import {
  Box,
  Button,
  Container,
  HStack,
  Stack,
  Text,
  Center,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import * as yup from 'yup'

import { Logo } from '@components/Logo'
import { Input } from '@components/Input'
import { PasswordInput } from '@components/PasswordInput'

import bgImg from '@assets/mac.jpg'
import { useAuth } from '@contexts/AuthContext'

const loginSchema = yup.object({
  email: yup.string().required('Digite o seu e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Digite sua senha')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

const registerSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Digite o seu e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Digite sua senha')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
})

type LoginFormSchema = yup.InferType<typeof loginSchema>
type RegisterFormSchema = yup.InferType<typeof registerSchema>

export function LoginRegister() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()

  const loginForm = useForm<LoginFormSchema>({
    resolver: yupResolver(loginSchema),
  })

  const registerForm = useForm<RegisterFormSchema>({
    resolver: yupResolver(registerSchema),
  })

  async function handleLogin({ email, password }: LoginFormSchema) {
    await signIn({ email, password })
  }

  async function handleRegister({ name, email, password }: RegisterFormSchema) {
    await signUp({ name, email, password })
  }

  function handleAlreadyHaveAnAccount() {
    navigate('/login')
  }

  function handleDontHaveAnAccount() {
    navigate('/register')
  }

  useEffect(() => {
    if (registerForm.formState.errors) {
      console.log(registerForm.formState.errors)
    }
  }, [registerForm.formState])

  return (
    <Center
      minH="100vh"
      w="full"
      bgImg={bgImg}
      bgPosition="center"
      bgSize="cover"
    >
      <Container maxW="lg" py={['12', '24']} px={['2', '8']}>
        <Box
          py={['4', '8']}
          px={['4', '10']}
          bg="white"
          boxShadow="md"
          borderRadius="xl"
        >
          <Logo mb="6" />
          {pathname === '/login' && (
            <Stack
              as="form"
              spacing="6"
              onSubmit={loginForm.handleSubmit(handleLogin)}
            >
              <Stack spacing="5">
                <Input
                  id="email"
                  type="email"
                  label="E-mail"
                  {...loginForm.register('email')}
                  error={loginForm.formState.errors.email}
                />

                <PasswordInput
                  id="password"
                  label="Senha"
                  {...loginForm.register('password')}
                  error={loginForm.formState.errors.password}
                />
              </Stack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Não tem uma conta?</Text>
                <Button
                  variant="link"
                  colorScheme="orange"
                  onClick={handleDontHaveAnAccount}
                >
                  Registre-se
                </Button>
              </HStack>
              <Button colorScheme="orange" type="submit">
                Entrar
              </Button>
            </Stack>
          )}

          {pathname === '/register' && (
            <Stack
              as="form"
              spacing="6"
              onSubmit={registerForm.handleSubmit(handleRegister)}
            >
              <Stack spacing="5">
                <Input
                  id="name"
                  type="text"
                  label="Nome"
                  {...registerForm.register('name')}
                  error={registerForm.formState.errors.name}
                />

                <Input
                  id="email"
                  type="email"
                  label="E-mail"
                  {...registerForm.register('email')}
                  error={registerForm.formState.errors.email}
                />

                <PasswordInput
                  id="password"
                  label="Senha"
                  {...registerForm.register('password')}
                  error={registerForm.formState.errors.password}
                />

                <PasswordInput
                  id="password-confirmation"
                  label="Confirme a senha"
                  {...registerForm.register('passwordConfirmation')}
                  error={registerForm.formState.errors.passwordConfirmation}
                />
              </Stack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Já tem uma conta?</Text>
                <Button
                  variant="link"
                  colorScheme="orange"
                  onClick={handleAlreadyHaveAnAccount}
                >
                  Faça login
                </Button>
              </HStack>
              <Button colorScheme="orange" type="submit">
                Registrar
              </Button>
            </Stack>
          )}
        </Box>
      </Container>
    </Center>
  )
}
