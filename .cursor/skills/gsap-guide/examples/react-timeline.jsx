/**
 * GSAP Timeline in React
 * Using the useGSAP hook for proper cleanup and context management
 *
 * 📖 Documentation:
 * - Core Methods: reference/core-methods.md (Timeline section)
 * - React Guide: frameworks/react.md
 * - Easing: reference/easing.md
 *
 * 💡 Key concepts:
 * - Timeline sequencing with position parameters
 * - useGSAP for automatic cleanup
 * - Refs for element targeting
 */

import React, {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export function TimelineExample() {
  const container = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);

  useGSAP(
    () => {
      // Create a timeline
      const tl = gsap.timeline({repeat: -1, yoyo: true});

      // Sequence animations
      tl.to(box1.current, {duration: 0.8, x: 200, opacity: 1})
        .to(box2.current, {duration: 0.8, y: 100, opacity: 1}, 0) // Start at 0 (same time as box1)
        .to(box3.current, {duration: 0.8, rotation: 360}, "-=0.4"); // Start 400ms before box2 ends

      // Add a label for easy seeking
      tl.addLabel("midpoint");

      // Add another sequence after a delay
      tl.to(
        [box1.current, box2.current, box3.current],
        {duration: 0.5, scale: 0.8, stagger: 0.1},
        "midpoint+=0.5"
      );
    },
    {scope: container}
  );

  return (
    <div ref={container} style={{padding: "40px", textAlign: "center"}}>
      <div
        ref={box1}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          margin: "10px auto",
          opacity: 0,
        }}
      />
      <div
        ref={box2}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          margin: "10px auto",
          opacity: 0,
        }}
      />
      <div
        ref={box3}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "green",
          margin: "10px auto",
          opacity: 0,
        }}
      />
    </div>
  );
}

// Advanced: Timeline with play/pause controls
export function ControlledTimeline() {
  const container = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      timelineRef.current = gsap.timeline({paused: true});

      timelineRef.current
        .to(".slide", {duration: 0.5, x: 300, opacity: 1}, 0)
        .to(".slide", {duration: 0.5, x: -300, opacity: 0});
    },
    {scope: container}
  );

  const handlePlay = () => timelineRef.current?.play();
  const handlePause = () => timelineRef.current?.pause();
  const handleReverse = () => timelineRef.current?.reverse();

  return (
    <div ref={container}>
      <div
        className="slide"
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "purple",
          opacity: 0,
        }}
      />
      <div style={{marginTop: "20px"}}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReverse}>Reverse</button>
      </div>
    </div>
  );
}
