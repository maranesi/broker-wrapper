import { broker } from '../broker';

const run = async () => {
  await broker.send("USER_DELETED", { id:12, name:"Bruno Maranesi" });
};

run().catch(console.error).finally(() => process.exit());