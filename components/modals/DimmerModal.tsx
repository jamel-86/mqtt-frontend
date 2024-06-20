import React, { ChangeEvent, FC, useState } from "react";
import Modal from "react-modal";
import mqttClient from "@/services/mqttClient";
import MqttConfig from "@/config/mqttConfig.json";

let timeout: NodeJS.Timeout;

interface DimmerModalProps {
  name: string;
  isOpen: boolean;
  onRequestClose: () => void;
  color: string;
  onChange: (value: number) => void;
  initialValue: number;
}

const DimmerModal = ({
  name,
  isOpen,
  onRequestClose,
  color,
  onChange,
  initialValue,
}: DimmerModalProps) => {
  const [value, setValue] = useState(initialValue);

  const publishPrefix = MqttConfig.publishPrefix;
  const publishSuffix = MqttConfig.publishSuffix;
  const formattedName = name.toLowerCase().replace(/\s/g, "-");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    setValue(value);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(value);
      const topic = `${publishPrefix}${formattedName}-value${publishSuffix}`;
      try {
        mqttClient?.publish(topic, value.toString());
      } catch (error) {
        console.error(error);
      }
    }, 200);
  }

  const subscribePrefix = MqttConfig.subscribePrefix;
  const subscribeSuffix = MqttConfig.subscribeSuffix;

  const subscribeToMQTT = () => {
    const topic = `${subscribePrefix}${formattedName}-value${subscribeSuffix}`;
    if (mqttClient) {
      mqttClient.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to ${topic}`);
        }
      });
      mqttClient.on("message", (receivedTopic, message) => {
        if (receivedTopic === topic) {
          const newState = parseInt(message.toString());
          setValue(newState);
        }
      });
    }
  };

  // useEffect to set new value when topic is updated
  React.useEffect(() => {
    setValue(value);
  }, [value]);

  React.useEffect(() => {
    subscribeToMQTT();
    // Cleanup subscription on unmount
    return () => {
      const topic = `${subscribePrefix}${formattedName}-value${subscribeSuffix}`;
      if (mqttClient) {
        mqttClient.unsubscribe(topic);
        console.log(`Unsubscribed from ${topic}`);
      }
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dimmer Modal"
      className="bg-white rounded-[25px] shadow-lg p-6 max-w-md w-full h-[50%] mx-auto my-20 flex flex-col items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-500 mb-2 text-center">
          {name}
        </h2>
        <div className="text-4xl font-bold text-gray-500 text-center mb-1">
          {value}%
        </div>
        <div className="text-sm text-center text-gray-500 mb-4">
          43 minutes ago
        </div>
        <div>
          <div className="h-[280px] flex items-center justify-center">
            <input
              type="range"
              min="0"
              max="100"
              step={1}
              value={value}
              onChange={handleChange}
              className="appearance-none h-[110px] w-[260px] mt-[80px] outline-none rounded-[20px] overflow-hidden transform rotate-[-90deg]"
              style={{
                background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, rgba(255, 193, 7, 0.3) ${value}%,rgba(255, 193, 7, 0.3) 100%)`,
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 40px;
                border-radius: 20px;
                border: 8px solid ${color};
                box-shadow: -100vw 0 0 100vw ${color};
              }
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 40px;
                border-radius: 20px;
                border: 8px solid ${color};
                box-shadow: -100vw 0 0 100vw ${color};
              }
              input[type="range"]::-ms-thumb {
                width: 20px;
                height: 40px;
                border-radius: 20px;
                border: 8px solid ${color};
                box-shadow: -100vw 0 0 100vw ${color};
              }
            `}</style>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DimmerModal;
