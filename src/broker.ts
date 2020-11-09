import { v4 as uuidv4 } from 'uuid';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { clientId, groupId, brokers } from './constants';

interface IService {
    name: string,
    service: Function
}

export async function getBroker(events?: Array<IService> ){
    const kafka = new Kafka({clientId, brokers});
    const producer : Producer = kafka.producer();
    await producer.connect();

    if(events && events.length){
        const consumer : Consumer =  kafka.consumer({ groupId })
        await consumer.connect();

        events.forEach(element => {
            consumer.subscribe({topic: element.name, fromBeginning: true})
        });

        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const item : IService = events.find(e => topic === e.name) ;
                item.service(message)
            },
        })
    }

    const Broker = {
        send: async (eventName : string, payload: Object) => {
            await producer.send({
                topic: eventName,
                messages: [
                    { key: uuidv4(), value: JSON.stringify(payload) },
                ],
            })
        }
    }
    
    return Broker
}