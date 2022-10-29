import { ethers } from "hardhat";
import path from "path";

const go = async () => {
  const contracts: string[] = [];

  const testFolder = "./contracts/";
  const fs = require("fs");

  fs.readdirSync(testFolder).forEach((file: string) => {
    contracts.push(path.parse(file).name);
  });

  for (const contractName in contracts) {
    console.log("Contract Name: ", contractName);
    const name = await ethers.getContractFactory(contracts[contractName]);
    const contract = await name.deploy();
    console.log(`Contract ${contracts[contractName]}: ${contract.address}`);
  }
};

async function main() {
  console.log("yo!");

  await go();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
