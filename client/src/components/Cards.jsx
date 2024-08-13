import { Box, Flex, Heading, IconButton, Image } from "@chakra-ui/react";
import axios from "axios";
import  { useEffect, useState } from "react";
import FlipCard from "./Flipcard";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const user = JSON.parse(localStorage.getItem("user"))?.email;
const getCards = async () => {
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
      ) : user ? (
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4vh",
          }}
        >
          <Image src="/no_data.svg" height={240} />
          <Heading size="lg">No Cards Found, Please add one.</Heading>
        </Box>
      ) : (
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4vh",
          }}
        >
          <Image src="/login.svg" height={240} />
          <Heading size="lg">Please Login to view or add cards.</Heading>
        </Box>
      )}
    </Flex>
  );
};

export default Cards;
