import { MutableRefObject, useEffect, useRef } from "react";
import "./awards-and-honors.scss";

interface AwardsAndHonorsRefProps {
  awhoPageRef: MutableRefObject<HTMLElement | null>;
  awhoCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  awhoMagnifierRef: MutableRefObject<HTMLCanvasElement | null>;
}

export default function AwardsAndHonors() {
  const refs = {
    awhoPageRef: useRef<HTMLElement | null>(null),
    awhoCanvasRef: useRef<HTMLCanvasElement | null>(null),
    awhoMagnifierRef: useRef<HTMLCanvasElement | null>(null),
  };

  const drawText = (
    ctx: CanvasRenderingContext2D,
    pageFontSize: number,
    dpr: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = `${(pageFontSize * dpr) / 2}px Montserrat`;
    const numRows = 1;
    const awhos = [
      "Aerospace Engineering Honor Society",
      "Faculty Honors All Semesters",
      "National Merit Scholar",
    ];
    const vertSpacing = ctx.canvas.height / (numRows + 1);
    let vertPosition = vertSpacing;
    let horizSpacing = 0;
    let horizPosition = 0;
    let wordsPerLine = Math.floor(awhos.length / numRows);
    for (let row = 0; row < numRows; row += 1) {
      if (wordsPerLine > awhos.length) {
        wordsPerLine = awhos.length;
      }
      horizSpacing = ctx.canvas.width / (wordsPerLine + 1);
      horizPosition = horizSpacing;
      for (let word = 0; word < wordsPerLine; word += 1) {
        const wordHorizPosition =
          horizPosition - ctx.measureText(awhos[word]).width / 2;
        const wordVertPosition =
          vertPosition -
          (ctx.measureText(awhos[word]).actualBoundingBoxAscent -
            ctx.measureText(awhos[word]).actualBoundingBoxDescent) /
            2;
        ctx.fillText(awhos[word], wordHorizPosition, wordVertPosition);
        horizPosition += horizSpacing;
      }
      vertPosition += vertSpacing;
      awhos.splice(0, wordsPerLine);
    }
  };

  const setupCanvas = (
    boundary: DOMRect,
    canvas: HTMLCanvasElement,
    canvasFontSize: number,
    dpr: number
  ) => {
    const newCanvas = canvas;
    newCanvas.width = boundary.width * dpr;
    newCanvas.height = boundary.height * dpr;
    newCanvas.style.height = `${boundary.height}px`;
    newCanvas.style.width = `${boundary.width}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      drawText(ctx, canvasFontSize, dpr);
    }
    return newCanvas;
  };

  const startEvents = (
    awhoRefs: AwardsAndHonorsRefProps,
    canvas: HTMLCanvasElement,
    boundary: DOMRect,
    remPx: number,
    dpr: number,
    magPower: number
  ) => {
    const magnifier = awhoRefs.awhoMagnifierRef.current;
    const newCanvas = canvas;
    if (magnifier) {
      newCanvas.onmousemove = e => {
        const x = e.clientX;
        const y = e.clientY;
        const magRadius = 8 * remPx;
        const newposX = x - magRadius - 0.5 * (boundary.right + boundary.left);
        const newposY = y - magRadius - 0.5 * (boundary.bottom + boundary.top);
        magnifier.style.transform = `translate3d(${newposX}px, ${newposY}px, 0px)`;
        const magCtx = magnifier.getContext("2d");
        if (magCtx) {
          magCtx.canvas.height = magRadius * 2;
          magCtx.canvas.width = magRadius * 2;
          magCtx.drawImage(
            newCanvas,
            (x - boundary.left) * dpr - (magRadius * dpr) / magPower,
            (y - boundary.top) * dpr - (magRadius * dpr) / magPower,
            (magRadius * 2 * dpr) / magPower,
            (magRadius * 2 * dpr) / magPower,
            0,
            0,
            magRadius * 2,
            magRadius * 2
          );
        }
      };
    }
  };

  useEffect(() => {
    const awhoPage = refs.awhoPageRef.current;
    let awhoCanvas = refs.awhoCanvasRef.current;
    const magnify = 2;
    if (awhoPage && awhoCanvas) {
      const awhoBoundary = awhoPage.getBoundingClientRect();
      const fontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const screenDpr = 2 * (window.devicePixelRatio || 1);
      awhoCanvas = setupCanvas(awhoBoundary, awhoCanvas, fontSize, screenDpr);
      startEvents(refs, awhoCanvas, awhoBoundary, fontSize, screenDpr, magnify);
    }
  }, [refs]);

  return (
    <section id="awards-honors">
      <h1 id="awho-header">Awards and Honors</h1>
      <section ref={refs.awhoPageRef} id="awho-section">
        <canvas ref={refs.awhoCanvasRef} id="awho-canvas" />
        <canvas ref={refs.awhoMagnifierRef} id="magnifier" />
      </section>
    </section>
  );
}
