import { deployProxy } from "./lib/deployProxy";

const main = async () => await deployProxy("GlobalPause", true);

export default main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
