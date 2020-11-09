import { getBroker } from './broker';

const run = async () => {
  const broker = await getBroker();
  await broker.send("USER_DELETED", {id:100, name:"Bruno Maranesi"});
}

run().catch(console.error);