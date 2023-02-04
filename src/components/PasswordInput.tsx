import { FormControl, FormLabel, InputProps as ChakraInputProps, Input as ChakraInput, FormErrorMessage, useDisclosure, useMergeRefs, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction as ForwardRefFunc, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface InputProps extends ChakraInputProps {
  label: string;
  error?: FieldError
}

const InputBase: ForwardRefFunc<HTMLInputElement, InputProps> = ({ label, error, ...rest }, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={rest.id}>{label}:</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Esconder a senha' : 'Revelar a senha'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <ChakraInput
          type={isOpen ? 'text' : 'password'}
          focusBorderColor="orange.500"
          _hover={{ bgColor: 'gray.50' }}
          ref={mergeRef}
          name="password"
          autoComplete="current-password"
          required
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const PasswordInput = forwardRef(InputBase)

PasswordInput.displayName = 'PasswordField'
