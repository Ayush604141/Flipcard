import { Box, Flex, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import FlipCard from "./Flipcard";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const getCards = async () => {
  const user = JSON.parse(localStorage.getItem("user"))?.email;

  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/cards`,
    { email: user }
  );
  return response.data;
};

const Cards = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getCards().then((res) => {
      setData(res.data);
      localStorage.setItem("cardData", JSON.stringify(res.data));
    });
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("cardData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <Flex>
      {data.length > 0 ? (
        <Box
          sx={{
            height: "72vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton size="lg" onClick={handlePrev}>
            <ArrowBackIcon />
          </IconButton>
          <FlipCard
            question={data[index].question}
            answer={data[index].answer}
            index={index + 1}
          />
          <IconButton size="lg" onClick={handleNext}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      ) : (
        <Box>No Cards Found</Box>
      )}
    </Flex>
  );
};

export default Cards;
