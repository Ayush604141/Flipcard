/* eslint-disable react/prop-types */
// src/components/LoginModal.js
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${serverBaseUrl}/users/auth/`, {
        email,
      });
      // Store more information if needed
      localStorage.setItem(
        "user",
        JSON.stringify({ email: response.data?.user?.email })
      );
      window.location.reload();
      onClose();
    } catch (error) {
      // Better error handling
      setEmailError("Failed to login. Please try again.");
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!emailError}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
