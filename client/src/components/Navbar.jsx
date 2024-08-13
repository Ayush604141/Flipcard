/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  useColorModeValue,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import LoginModal from "./LoginModal";
import { useState } from "react";
import CardModel from "./CardModel";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseButton /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              onClick={() => {
                window.location.replace("/cards");
              }}
            >
              Cards
            </Button>
            <Button
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              onClick={() => setAddOpen(true)}
            >
              Add Cards
            </Button>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {!user ? (
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              as="h1"
              backgroundColor="lightgray"
              cursor="pointer"
              color="darkblue"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              {user?.email}
            </Button>
          )}
        </Flex>
      </Flex>
      <LoginModal isOpen={open} onClose={() => setOpen(false)} />
      <CardModel isOpen={addOpen} onClose={() => setAddOpen(false)} />
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Button
              px={2}
              py={1}
              rounded={"md"}
              onClick={() => {
                window.location.replace("/cards");
              }}
            >
              Cards
            </Button>
            <Button
              px={2}
              py={1}
              rounded={"md"}
              onClick={() => setAddOpen(true)}
            >
              Add Cards
            </Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
