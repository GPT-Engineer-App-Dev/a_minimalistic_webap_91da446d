import React, { useRef, useEffect } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);

  const drawMandelbrot = (ctx, width, height) => {
    const maxIteration = 1000;
    const panX = 1.5;
    const panY = 1.0;
    let real, imag, x, y, iteration, realPartOfResult, imagPartOfResult;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        real = (1.5 * (i - width / 2)) / (0.5 * width) - panX;
        imag = (j - height / 2) / (0.5 * height) - panY;

        iteration = 0;
        x = real;
        y = imag;

        while (x * x + y * y < 4 && iteration < maxIteration) {
          realPartOfResult = x * x - y * y + real;
          imagPartOfResult = 2 * x * y + imag;
          x = realPartOfResult;
          y = imagPartOfResult;
          iteration++;
        }

        const color = iteration === maxIteration ? "black" : `hsl(0, 100%, ${iteration % 256}%)`;
        ctx.fillStyle = color;
        ctx.fillRect(i, j, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    drawMandelbrot(ctx, width, height);
  }, []);

  return (
    <VStack spacing={8} p={5} align="center" justify="center" h="100vh">
      <Heading as="h1" size="2xl" textAlign="center">
        Mandelbrot Set Renderer
      </Heading>
      <Box border="1px" borderColor="gray.200" overflow="hidden">
        <canvas ref={canvasRef} width="800" height="600"></canvas>
      </Box>
    </VStack>
  );
};

export default Index;
