// Project 4: Toggle Visibility
// Build a component that:

// Has a "Show/Hide" button
// Toggles whether a secret message is visible
// Button text changes: "Show Message" ↔ "Hide Message"
// BONUS: Add a smooth transition/animation when showing/hiding

// What you'll learn:

// Conditional rendering (showing/hiding elements)
// Toggle pattern (like your LikeButton but simpler)
// Boolean state usage

// Hints:

// You need 1 boolean state
// Use ternary for button text: {isVisible ? "Hide" : "Show"}
// Use && for conditional rendering: {isVisible && <p>Secret message!</p>}

"use client";

import { useState } from "react";

export default function ToggleMessage() {
  // Your state here
  const [isVisbible, setIsVisible] = useState(false);

  // Your handler here

  
  return (
    <div>
      {/* Toggle button */}
      {/* Secret message (conditionally rendered) */}
    </div>
  );
}

