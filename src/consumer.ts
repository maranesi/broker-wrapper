import { getBroker } from './broker';

const Service = {
  printMessage( message ) {
      console.log({ value: message.value.toString() })
  }
}

const events = [
    {name: "USER_CREATED", service:  Service.printMessage},
    {name: "USER_UPDATED", service:  Service.printMessage},
    {name: "NOTIFICATION_CREATED", service:  Service.printMessage}
]

const run = async () => {
  const broker = await getBroker(events);
}

run().catch(console.error);