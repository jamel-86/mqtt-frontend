// services/mqttClient.ts
import mqtt, { MqttClient } from 'mqtt';
import config from '../config/mqttConfig.json';

let mqttClient: MqttClient | null = null;

const randomId = Math.random().toString(16).substr(2, 8);

if (!mqttClient) {
  mqttClient = mqtt.connect(config.host, {
    port: config.port,
    username: config.username,
    password: config.password,
    clientId: config.clientId + randomId,
    reconnectPeriod: 5000, // 5 seconds
    keepalive: 60,
    protocol: 'mqtt',
    protocolId: 'MQTT',
  });
}

export default mqttClient;
