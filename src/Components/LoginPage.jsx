import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateContext } from "../App";
import supabase from "../config/supabaseClient";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Stack,
  StackDivider,
  Flex,
  Badge,
  useToast,
} from "@chakra-ui/react";

export default function LoginPage() {
  const [obj, setObj] = useState({ name: "", pass: "" });
  const [arr, setArr] = useState([]);
  const { check, setCheck } = useContext(ValidateContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  let flag = 0;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("userInfo").select();
      setArr(data);
    };
    fetchData();
    if (localStorage.getItem("key") == "token") {
      navigate("/home");
    }
  }, []);

  const handleClick = () => setShow(!show); // Toggling for show Button

  function onClickHandle() {
    arr.map((item) => {
      if (obj.name === item.userName && obj.pass === item.userPass) {
        flag = 1;
      }
    });
    const examplePromise = new Promise((resolve, reject) => {
      if (flag === 1) {
        setTimeout(() => resolve(200), 3000);
      } else {
        setTimeout(() => reject(404), 3000);
      }
    });
    examplePromise
      .then((mes) => {
        localStorage.setItem("name1", obj.name);
        localStorage.setItem("key", "token");
        flag = 0;
        setCheck("checked");
        navigate("/home");
      })
      .catch((mes) => {
        // alert("Incorrect Credentials");
      });

    toast.promise(examplePromise, {
      success: { title: "Successfully Logged In", description: "Looks great" },
      error: {
        title: "Incorrect Credentials",
        description: "Check Username or Password",
      },
      loading: { title: "Authenticating", description: "Please wait" },
    });
  }
  return (
    <>
      <Flex justify="center" align="center" height="100vh">
        <Card width="20em">
          <CardHeader>
            <Heading>
              <Badge variant="outline" colorScheme="linkedin" fontSize="1em">
                Login Page
              </Badge>
            </Heading>
          </CardHeader>
          <FormControl isRequired>
            <Stack divider={<StackDivider />} spacing="3">
              <Box p="1em 2em 1em 2em">
                <FormLabel>UserName</FormLabel>
                <Input
                  type="text"
                  placeholder="Andy Gogen"
                  value={obj.name}
                  variant="outline"
                  onChange={(e) => {
                    setObj({ ...obj, name: e.target.value });
                  }}
                  size="md"
                  width="14em"
                />
              </Box>
              <Box p="1em 2em">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md" width="14em">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={obj.pass}
                    variant="outline"
                    onChange={(e) => {
                      setObj({ ...obj, pass: e.target.value });
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
            <Flex justify="center" p="1em">
              <Button
                colorScheme="linkedin"
                variant="solid"
                onClick={onClickHandle}
              >
                Login
              </Button>
            </Flex>
          </FormControl>
        </Card>
      </Flex>
    </>
  );
}
