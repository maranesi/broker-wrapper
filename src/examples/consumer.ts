import { broker, IService } from '../broker';

const Service = {
  printMessage(message: any): void {
    console.log(JSON.parse(message.value));
  }
};

const events: IService[] = [
  { eventName: "USER_CREATED", service: Service.printMessage },
  { eventName: "USER_UPDATED", service: Service.printMessage },
  { eventName: "NOTIFICATION_CREATED", service: Service.printMessage },
  { eventName: "USER_DELETED", service: Service.printMessage }
];

const run = async () => {
  broker.listen(events);
};

run().catch(console.error);