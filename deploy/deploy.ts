import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  try {
    const deployedContract = await deploy("EncryptedOneTimeCode", {
      from: deployer,
      log: true,
    });

    console.log(`EncryptedOneTimeCode contract deployed at: `, deployedContract.address);
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
};
export default func;
func.id = "deploy_encryptedOneTimeCode"; // id required to prevent reexecution
func.tags = ["EncryptedOneTimeCode"];

