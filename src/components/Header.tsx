import { Button, Flex, HStack } from '@chakra-ui/react'

import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { useAuth } from '@contexts/AuthContext'

export function Header() {
  const { signOut } = useAuth()

  return (
    <Flex justify="space-between" px="12" py="4" bgColor="orange.400">
      <Logo fontSize="4xl" color="white" />

      <HStack spacing="6">
        <NavLink title="Home" path="/" />
        <NavLink title="Metas" path="/metas" />
        <NavLink title="Simulações" path="/simulacoes" />
        <Button size="sm" colorScheme="red" onClick={signOut}>
          Sair
        </Button>
      </HStack>
    </Flex>
  )
}
