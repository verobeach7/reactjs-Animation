import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
  entry: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [[page, direction], setPage] = useState([1, 1]);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  /* const [showing, setShowing] = useState(1);
  const [back, setBack] = useState(false);
  const nextShowing = () => {
    setBack(false);
    setShowing((prev) => (prev === 5 ? 5 : prev + 1));
  };
  const prevShowing = () => {
    setBack(true);
    setShowing((prev) => (prev === 1 ? 1 : prev - 1));
  }; */
  return (
    <Wrapper>
      <AnimatePresence custom={direction}>
        <Box
          custom={direction}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={page}
        >
          {page}
        </Box>
      </AnimatePresence>
      <button onClick={() => paginate(-1)}>previous</button>
      <button onClick={() => paginate(1)}>next</button>
    </Wrapper>
  );
}

export default App;
