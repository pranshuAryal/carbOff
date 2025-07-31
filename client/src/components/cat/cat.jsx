import React from "react";
import "./cat.css";

// Import your cat images (or animations) here
import walkingCat from "../../assets/walkingCat.gif";
import noCat from "../../assets/catNo.png";
// import layingCat from "../assets/layingCat.png";

export default function RoamingCat({ emissionLevel }) {
  let catClass = "cat-roam";
  let catImage = walkingCat;

  if (emissionLevel > 70) {
    catClass = "cat-still";
    catImage = noCat;
  } else if (emissionLevel > 30 && emissionLevel <= 70) {
    catClass = "cat-slowRoam";
    catImage = walkingCat;
  }

  return (
    <div className={catClass}>
      <img
        src={catImage}
        alt="Roaming Cat"
        className="h-8"
      />
    </div>
  );
}
