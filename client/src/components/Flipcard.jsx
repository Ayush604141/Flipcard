import { useState } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

const FlipCard = ({ question, answer, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <Text px={4} fontWeight={700}>
          Card {index}
        </Text>
        <div className="flip-card-front">
          <h1>{question}</h1>
        </div>
        <div className="flip-card-back">
          <h1>{answer}</h1>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FlipCard;
