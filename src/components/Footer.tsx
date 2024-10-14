import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

import { Logo } from './Logo'

export function Footer() {
  return (
    <Container
      as="footer"
      role="contentinfo"
      px="12"
      py="4"
      minW="100%"
      bgColor="gray.100"
    >
      <Stack>
        <Stack justify="space-between" direction="row" align="center">
          <Logo fontSize="3xl" />
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/rafael-manfrim/"
              aria-label="LinkedIn"
              target="_blank"
              color="orange.500"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />

            <IconButton
              as="a"
              href="https://github.com/RafaelManfrim"
              aria-label="GitHub"
              color="orange.500"
              target="_blank"
              icon={<FaGithub fontSize="1.25rem" />}
            />

            <IconButton
              as="a"
              href="https://www.instagram.com/rafamanfrim/"
              aria-label="Instagram"
              color="orange.500"
              target="_blank"
              icon={<FaInstagram fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          Por Rafael Manfrim.
        </Text>
      </Stack>
    </Container>
  )
}
