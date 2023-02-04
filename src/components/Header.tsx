import { Flex, HStack } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <Flex justify="space-between" px="12" py="4" bgColor="orange.400">
      <Logo fontSize="4xl" color="white" />

      <HStack spacing="6">
        <NavLink title="Home" path="/" />
        <NavLink title="Metas" path="/metas" />
        <NavLink title="Simulações" path="/simulacoes" />
      </HStack>
    </Flex>
  )
}