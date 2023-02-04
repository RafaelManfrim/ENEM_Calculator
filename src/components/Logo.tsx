import { Heading, HeadingProps } from "@chakra-ui/react";

interface LogoProps extends HeadingProps { }

export function Logo({ ...rest }: LogoProps) {
  return (
    <Heading color="orange.500" fontSize="5xl" fontFamily="cursive" textAlign="center" {...rest}>
      ENEM Calculator
    </Heading>
  )
}
