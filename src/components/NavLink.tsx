import { Button } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"

interface NavLinkProps {
  title: string
  path: string
}

export function NavLink({ title, path }: NavLinkProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = pathname === path

  console.log('pathname', pathname)
  console.log('path', path)

  function handleClick() {
    navigate(path)
  }

  return (
    <Button
      variant="unstyled"
      color="white"
      fontSize="lg"
      borderBottomWidth={3}
      borderTopWidth={3}
      onClick={handleClick}
      borderColor="transparent"
      borderBottomColor={isActive ? "white" : "transparent"}
      borderRadius="0"
    >
      {title}
    </Button>
  )
}
