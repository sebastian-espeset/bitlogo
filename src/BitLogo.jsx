import { useEffect, useRef } from "react";

const BitLogo = ({
  penSize = 10,
  canvasSize = 64,
  colorList = ["#f5ffc6ff", "#b4e1ffff", "#ab87ffff", "#fface4ff", "#c1ff9bff"],
  animationSpeed = 1000,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const baseFadeDuration = animationSpeed;

    const getRandomColor = (colors) => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const drawPixel = (x, y, color, alpha) => {
      if (color) {
        ctx.fillStyle = hexToRgba(color, alpha);
        ctx.fillRect(x * penSize, y * penSize, penSize, penSize);
      } else {
        ctx.clearRect(x * penSize, y * penSize, penSize, penSize);
      }
    };

    const animatePixel = (x, y, color, fadeDuration) => {
      let alpha = 0;
      const fadeStep = 0.05; // Adjust this for smoother/faster transitions

      const fadeIn = () => {
        alpha += fadeStep;
        if (alpha > 1) alpha = 1;
        drawPixel(x, y, color, alpha);
        if (alpha < 1) {
          setTimeout(() => requestAnimationFrame(fadeIn), fadeDuration / 20); // Control speed of fade-in
        } else {
          setTimeout(() => fadeOut(), Math.random() * 1000); // Random delay before fading out
        }
      };

      const fadeOut = () => {
        alpha -= fadeStep;
        if (alpha < 0) alpha = 0;
        drawPixel(x, y, color, alpha);
        if (alpha > 0) {
          setTimeout(() => requestAnimationFrame(fadeOut), fadeDuration / 20); // Control speed of fade-out
        } else {
          const newColor =
            Math.random() >= 0.5 ? getRandomColor(colorList) : null; // 50% probability of being transparent
          setTimeout(() => fadeIn(newColor), Math.random() * 1000); // Random delay before fading in again
        }
      };

      fadeIn();
    };

    const drawBitLogo = () => {
      const fadeDuration = baseFadeDuration;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      for (let x = 0; x < canvasSize / penSize; x++) {
        for (let y = 0; y < canvasSize / penSize; y++) {
          const color = Math.random() >= 0.5 ? getRandomColor(colorList) : null; // 50% probability of being transparent
          animatePixel(x, y, color, fadeDuration);
        }
      }
    };

    drawBitLogo();
  }, [penSize, canvasSize, colorList, animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="random-logo"
    ></canvas>
  );
};

export default BitLogo;
