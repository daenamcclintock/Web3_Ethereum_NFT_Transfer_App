const main = async ()=> {
  const NFTTransfer = await hre.ethers.getContractFactory("NFTTransfer");
  const nftTransfer = await NFTTransfer.deploy();

  await nftTransfer.deployed();

  console.log("Transactions deployed to:", nftTransfer.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();