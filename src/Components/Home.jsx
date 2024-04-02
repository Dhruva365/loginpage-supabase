import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { ValidateContext } from "../App";
import {
  Heading,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Flex,
  Divider,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

export default function Home() {
  const navigate = useNavigate();
  const { check, setCheck } = useContext(ValidateContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen1, onOpen1, onClose1 } = useDisclosure();
  function clickHandle() {
    localStorage.removeItem("key");
    localStorage.removeItem("name1");
    navigate("/");
  }
  useEffect(() => {
    if (check != "token" && localStorage.getItem("key") != "token") {
      navigate("/");
    }
  }, [check]);

  return (
    <>
      {localStorage.getItem("key") === "token" ? (
        <Box>
          <Flex justify="space-between" align="center" p="13px">
            <Button onClick={onOpen}>
              <HamburgerIcon boxSize={18} w={10} />
            </Button>

            {/* left option bar */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  {localStorage.getItem("name1")}
                </DrawerHeader>
                <DrawerBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Harum, culpa reprehenderit saepe, neque fugiat reiciendis ipsa
                  ex ab magnam, facilis sequi. Maiores et aperiam aut,
                  temporibus culpa voluptatem fugit labore.
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={clickHandle}>
                    Logout
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            {/* Have Doubt  */}
            {/* <Modal isCentered isOpen={isOpen1} onClose={onClose1}>
              <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px) hue-rotate(90deg)"
              />
              <ModalContent>
                <ModalHeader>Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Are you sure want to logout??</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={clickHandle}>Logout</Button>
                </ModalFooter>
              </ModalContent>
            </Modal> */}
            <Heading>Home Page</Heading>
            <Avatar
              name={localStorage.getItem("name1")}
              src="https://bit.ly/broken-link"
            />
          </Flex>
          <Divider orientation="horizontal" />
          <Text fontSize="2xl">Hello {localStorage.getItem("name1")}</Text>
        </Box>
      ) : null}
    </>
  );
}
