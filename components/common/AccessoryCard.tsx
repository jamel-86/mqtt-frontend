import React, { useState, useRef, useEffect } from "react";

import mqttClient from "@/services/mqttClient"; // Adjust the path as necessary
import MqttConfig from "@/config/mqttConfig.json"; // Adjust the path as necessary

export const AccessoryCard = ({
  override,
  initialState,
  name,
  icon,
  activeTitle,
  inactiveTitle,
  value,
  controllable = true, // Default value is true, meaning the card is controllable by default
  type = "light",
  onClick,
  onLongPress,
}: {
  override?: React.CSSProperties;
  initialState: number;
  name: string;
  icon: React.ReactNode;
  activeTitle: string;
  inactiveTitle: string;
  value?: number;
  controllable?: boolean;
  type?: string;
  onClick?: () => void;
  onLongPress?: (name: string) => void;
}) => {
  const [state, setState] = useState(initialState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const publishPrefix = MqttConfig.publishPrefix;
  const publishSuffix = MqttConfig.publishSuffix;
  const subscribePrefix = MqttConfig.subscribePrefix;
  const subscribeSuffix = MqttConfig.subscribeSuffix;
  const formattedName = name.toLowerCase().replace(/\s/g, "-");

  const publishStateToMQTT = (newState: number) => {
    const topic = `${publishPrefix}${formattedName}${publishSuffix}`;
    const message = newState === 1 ? "1" : "0";

    if (mqttClient) {
      mqttClient.publish(topic, message);
      console.log(`Published to ${topic}: ${message}`);
    }
  };

  const subscribeToMQTT = () => {
    const topic = `${subscribePrefix}${formattedName}${subscribeSuffix}`;

    if (mqttClient) {
      mqttClient.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to ${topic}`);
        }
      });
      mqttClient.on("message", (receivedTopic, message) => {
        if (receivedTopic === topic) {
          const newState = message.toString() === "1" ? 1 : 0;
          setState(newState);
        }
      });
    }
  };

  useEffect(() => {
    subscribeToMQTT();

    // Cleanup subscription on unmount
    return () => {
      const topic = `${subscribePrefix}${formattedName}${subscribeSuffix}`;

      if (mqttClient) {
        mqttClient.unsubscribe(topic);
        console.log(`Unsubscribed from ${topic}`);
      }
    };
  }, []);

  const toggleState = () => {
    if (controllable) {
      setState((prevState) => {
        const newState = prevState === 1 ? 0 : 1;

        publishStateToMQTT(newState);

        return newState;
      });
    }
  };

  const handleMouseDown = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(() => {
      setIsLongPress(true);
      if ((type === "thermostat" || type === "light") && onLongPress)
        onLongPress(name);
    }, 500);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!isLongPress) {
      toggleState();
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={`flex items-center rounded-[15px] transition-all duration-300 ${
        controllable ? "cursor-pointer" : ""
      } ${
        state === 1
          ? "bg-white animate-bounceOut"
          : "bg-[rgba(255,_255,_255,_0.1)] animate-bounceIn"
      }`}
      style={override}
    >
      <div className="flex flex-col justify-center items-start gap-3 px-3 relative w-[129px] h-[131px]">
        {icon}
        <p
          className={`w-[110px] text-sm font-bold ${
            state === 1 ? "text-black" : "text-white"
          }`}
        >
          {name}
        </p>
        {value ? (
          <p
            className={`text-xs ${
              state === 1 ? "font-bold text-[rgb(108,192,133)]" : "text-white"
            }`}
          >
            {value} %
          </p>
        ) : (
          <p
            className={`text-sm font-bold ${
              state === 1 ? "text-[rgb(108,192,133)]" : "text-white"
            }`}
          >
            {state === 1 ? activeTitle : inactiveTitle}
          </p>
        )}
      </div>
    </div>
  );
};
