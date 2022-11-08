import { FormControl, FormLabel, InputProps as ChakraInputProps, Input as ChakraInput, FormErrorMessage } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction as ForwardRefFunc } from 'react'

interface InputProps extends ChakraInputProps {
  label: string;
  error?: FieldError
}
const InputBase: ForwardRefFunc<HTMLInputElement, InputProps> = ({ label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}:</FormLabel>
      <ChakraInput focusBorderColor="orange.500" _hover={{ bgColor: 'gray.50' }} ref={ref} {...rest} />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)