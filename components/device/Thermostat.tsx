import React, { useState } from "react";
import "./thermostat.css"; // Ensure you have a corresponding CSS file

const Thermostat = () => {
  const [gradi, setGradi] = useState(19);
  const max = 34;
  const min = 2;

  const updateGr = (newGradi: any) => {
    setGradi(newGradi);
  };

  const handleMinus = () => {
    if (gradi > min) {
      const newGradi = gradi - 1;
      updateGr(newGradi);
    }
  };

  const handlePlus = () => {
    if (gradi < max) {
      const newGradi = gradi + 1;
      updateGr(newGradi);
    }
  };

  const fillTransform1 = gradi > 18 ? (gradi - 18) * 10 : 0;
  const fillTransform2 = gradi <= 18 ? gradi * 10 : 0;

  return (
    <div className="thermostat">
      <div className="bar">
        <div className="inner_bar"></div>
        <div className="hold left">
          <div
            className="fill fill1"
            style={{ transform: `rotate(${fillTransform1}deg)` }}
          ></div>
        </div>
        <div className="hold right">
          <div
            className="fill fill2"
            style={{ transform: `rotate(${fillTransform2}deg)` }}
          ></div>
        </div>
        <span>Heating</span>
      </div>
      <div
        className="shadow"
        style={{
          transform: `translate(-50%, -50%) rotate(${-180 + gradi * 10}deg)`,
        }}
      >
        <div className="shadow-cube"></div>
      </div>
      <div
        className="number"
        style={{
          transform: `translate(-50%, -50%) rotate(${-180 + gradi * 10}deg)`,
        }}
      >
        <span className="ext">{gradi}</span>
      </div>
      <div className="center">
        <span className="arrow minus" onClick={handleMinus}>
          <i className="material-icons">keyboard_arrow_left</i>
        </span>
        <span className="arrow plus" onClick={handlePlus}>
          <i className="material-icons">keyboard_arrow_right</i>
        </span>
        <div className="small">
          <span className="heat">{gradi}</span>
        </div>
      </div>
    </div>
  );
};

export default Thermostat;
