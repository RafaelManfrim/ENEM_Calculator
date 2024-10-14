import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <Flex flex={1} flexDir="column" minH="100vh" w="full">
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  )
}
