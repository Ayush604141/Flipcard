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
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CardModel = ({ isOpen, onClose, setCards }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cards/new/",
        { question, answer }
      );
    } catch (error) {
      console.error("API call error:", error);
    }
    // Reset fields and errors after saving
    setQuestion("");
    setAnswer("");
    setQuestionError("");
    setAnswerError("");
    onClose();
  };

  const validateFields = () => {
    let isValid = true;

    if (question.trim().length === 0) {
      setQuestionError("Question is required.");
      isValid = false;
    } else {
      const questionWords = question.trim().split(/\s+/).length;
      if (questionWords > 16) {
        setQuestionError("Question cannot exceed 16 words.");
        isValid = false;
      } else {
        setQuestionError("");
      }
    }

    if (answer.trim().length === 0) {
      setAnswerError("Answer is required.");
      isValid = false;
    } else {
      const answerWords = answer.trim().split(/\s+/).length;
      if (answerWords > 200) {
        setAnswerError("Answer cannot exceed 200 words.");
        isValid = false;
      } else {
        setAnswerError("");
      }
    }

    return isValid;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={Boolean(questionError)}>
            <FormLabel>Question</FormLabel>
            <Input
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setQuestionError(""); // Clear error when input changes
              }}
              placeholder="Enter your question"
            />
            {questionError && (
              <FormErrorMessage>{questionError}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={Boolean(answerError)} mt={4}>
            <FormLabel>Answer</FormLabel>
            <Textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setAnswerError(""); // Clear error when input changes
              }}
              placeholder="Enter the answer"
            />
            {answerError && <FormErrorMessage>{answerError}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CardModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CardModel;
