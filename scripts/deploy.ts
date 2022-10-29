import { ethers } from "hardhat";

async function main() {
  const fallback = await ethers.getContractFactory("Fallback");
  const contract = await fallback.deploy();

  console.log("Contract address: ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
