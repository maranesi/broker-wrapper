import { v4 as uuidv4 } from 'uuid';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { clientId, groupId, brokers } from './constants';

export interface IService {
    eventName: string,
    service: Function
}

class Broker {
    private kafka: Kafka;
    private producer: Producer;

    constructor() {
        this.kafka = new Kafka({ clientId, brokers });
        this.producer = this.kafka.producer();
    }
    
    async send(eventName: string, payload: unknown) {
            await this.producer.connect();
            await this.producer.send({
                topic: eventName,
                messages: [
                    { key: uuidv4(), value: JSON.stringify(payload) },
                ],
            });
            await this.producer.disconnect();
        }

    async listen<T extends IService>(events: T[]) {
        const consumer: Consumer = this.kafka.consumer({ groupId });
        await consumer.connect();

        events.forEach(el => consumer.subscribe({ topic: el.eventName, fromBeginning: true }));

        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const event = events.find(el => topic === el.eventName);
                if (!event) return;

                const item : T = event;
                item.service(message);
            },
        })
    }
}

export const broker = new Broker();