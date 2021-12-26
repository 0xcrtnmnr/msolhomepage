const hre = require("hardhat");
const ethers = hre.ethers;

const deployed = {
  'rinkeby': {
    ownerAddress: "0xbCb061d2feE38DCB6DE7e5D269852B4BDb986Ed6",
    msolHomepageAddress: "0xb88404dd8fe4969ef67841250baef7f04f6b1a5e",
    msolNFTOwnerAddress: "0xbCb061d2feE38DCB6DE7e5D269852B4BDb986Ed6",
    msolNFTRendererAddress: "0xf611Ee721450Aa52bB16283D32784469eBF106E7", // V2
    msolNFTAddress: "0xB7fCb57a5ce2F50C3203ccda27c05AEAdAF2C221",
    msolViewAddress: "0xd58D4ff574140472F9Ae2a90B6028Df822c10109",
    msolSortitionAddress: "0xA194a30C201523631E29EFf80718D72994eFa1d6",
  },
  'mainnet': {
    ownerAddress: "0xd534d9f6e61780b824afaa68032a7ec11720ca12",
    msolNFTOwnerAddress: "0x714439382A47A23f7cdF56C9764ec22943f79361",
    msolHomepageAddress: "0xb5fe93ccfec708145d6278b0c71ce60aa75ef925",
    msolNFTRendererAdMsolRendress: "0xdAdf78F35dED924823dd80A2312F1b97549C4f7b", // V2
    msolNFTAddress: "0x7bb952AB78b28a62b1525acA54A71E7Aa6177645",
    msolViewAddress: "0xaC292791A8b398698363F820dd6FbEE6EDF71442",
    msolSortitionAddress: "0xa9a57f7d2A54C1E172a7dC546fEE6e03afdD28E2",
  },
};
deployed['homestead'] = deployed['mainnet']; // Alias for ethers

const rendererConfig = {
  'rinkeby': {
    'baseURI': "ipfs://QmYhpcC8esDv2uL9cJUdY5FSUdDHAZQDsk7pwBb7BJgeXo/",
  },
  'mainnet': {
    'baseURI': "ipfs://QmXZtDgNBy4kL6meGcvNHqgrGFCV7uer6h3ixFy1BjCMr7/",
  },
};
rendererConfig['homestead'] = rendererConfig['mainnet']; // Alias for ethers

// Via https://docs.chain.link/docs/vrf-contracts/#config
const sortitionConfig = {
  'rinkeby': {
    'vrfCoordinator': '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
    'link': '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    'keyHash': '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
    'fee': ethers.BigNumber.from('100000000000000000'), // 0.1 LINK (18 decimals)
    'termDuration': ethers.BigNumber.from(60 * 60), // 1 hour
    'minElectionDuration': ethers.BigNumber.from(60 * 10), // 10 minutes
  },
  'mainnet': {
    'vrfCoordinator': '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952',
    'link': '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    'keyHash': '0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445',
    'fee': ethers.BigNumber.from('2000000000000000000'), // 2 LINK (18 decimals)
    'termDuration': ethers.BigNumber.from(60 * 60 * 24 * 7 * 6), // 6 weeks
    'minElectionDuration': ethers.BigNumber.from(60 * 60 * 24 * 3), // 3 days
  },
};
sortitionConfig['homestead'] = sortitionConfig['mainnet']; // Alias for ethers

async function main() {
  const network = await ethers.provider.getNetwork();
  const cfg = deployed[network.name];

  if (cfg === undefined) {
    throw "Unsupported network: "+ network.name;
  }

  let feeData, targetGasFee;

  if (network.name !== 'rinkeby') {
    throw "Only rinkeby allowed by default";
    targetGasFee = ethers.utils.parseUnits("121" , "gwei");
  } else {
    targetGasFee = ethers.utils.parseUnits("3" , "gwei");
  }

  console.log("Waiting until target gas fee:", ethers.utils.formatUnits(targetGasFee, "gwei"));
  while (true) {
    feeData = await ethers.provider.getFeeData();
    gasPrice = feeData.gasPrice;

    console.log(+new Date(), "Current fee data: ", "priority=", ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei"), "maxFeePerGas=", ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei"), "gasPrice=", ethers.utils.formatUnits(feeData.gasPrice, "gwei"));

    if (targetGasFee.gte(feeData.gasPrice)) {
      console.log("TARGET GAS REACHED, DEPLOYING!");
      break;
    }

    await new Promise(r => setTimeout(r, 30 * 1000)); // 30 seconds
  }

  const maxFeePerGas = feeData.gasPrice; // gasPrice is baseFee + priorityFee
  const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas; // This will put it a bit above what we need
  //const maxFeePerGas = ethers.utils.parseUnits("106" , "gwei");
  //const maxPriorityFeePerGas = ethers.utils.parseUnits("1", "gwei");

  // Confirm the contract is actually there
  const KH = await ethers.getContractAt("MsolHomepage", cfg.msolHomepageAddress);

  const [account] = await ethers.getSigners();
  if (account === undefined) {
    throw "Signer account not provided, specify ACCOUNT_PRIVATE_KEY";
  } else if (account.address !== cfg.msolNFTOwnerAddress) {
   // throw "Did not acquire signer for owner address: " + cfg.msolNFTOwnerAddress + "; got: " + account.address;
  }
  console.log("Starting deploys from address:", account.address);

  const MsolNFT = await ethers.getContractFactory("MsolNFT");
  const MsolNFTRenderV2 = await ethers.getContractFactory("MsolNFTRenderV2");
  const MsolView = await ethers.getContractFactory("MsolView");
  const MsolSortition = await ethers.getContractFactory("MsolSortition");

  const rendererCfg = rendererConfig[network.name];
  let msolNFTRendererAddress = cfg["msolNFTRendererAddress"];
  if (msolNFTRendererAddress === undefined) {
    const KNFTrender = await MsolNFTRenderV2.deploy(rendererCfg.baseURI, { maxFeePerGas, maxPriorityFeePerGas });
    console.log("Deploying MsolNFTRender to:", KNFTrender.address);
    msolNFTRendererAddress = KNFTrender.address;

    const tx = await KNFTrender.deployTransaction.wait();
    console.log(" -> Mined with", tx.gasUsed.toString(), "gas");
  } else {
    console.log("MsolNFTRender already deployed");
  }

  console.log(`Verify on Etherscan: npx hardhat verify --network ${network.name} ${msolNFTRendererAddress} "${rendererCfg.baseURI}"`);

  let msolNFTAddress = cfg["msolNFTAddress"];
  if (msolNFTAddress === undefined) {
    const KNFT = await MsolNFT.deploy(KH.address, msolNFTRendererAddress, { maxFeePerGas, maxPriorityFeePerGas });
    console.log("Deploying MsolNFT to:", KNFT.address);
    msolNFTAddress = KNFT.address;

    const tx = await KNFT.deployTransaction.wait();
    console.log(" -> Mined with", tx.gasUsed.toString(), "gas");
  } else {
    console.log("MsolNFT already deployed");
  }

  console.log(`Verify on Etherscan: npx hardhat verify --network ${network.name} ${msolNFTAddress} "${KH.address}" "${msolNFTRendererAddress}"`);

  let msolViewAddress = cfg["msolViewAddress"];
  if (msolViewAddress === undefined) {
    const KView = await MsolView.deploy({ maxFeePerGas, maxPriorityFeePerGas });
    console.log("Deploying MsolView to:", KView.address);
    msolViewAddress = KView.address;

    const tx = await KView.deployTransaction.wait();
    console.log(" -> Mined with", tx.gasUsed.toString(), "gas");
  } else {
    console.log("MsolView already deployed");
  }

  console.log(`Verify on Etherscan: npx hardhat verify --network ${network.name} ${msolViewAddress}`);


  const sortition = sortitionConfig[network.name];
  let msolSortitionAddress = cfg["msolSortitionAddress"];
  if (msolSortitionAddress === undefined) {
    const KS = await MsolSortition.deploy(
      msolNFTAddress, KH.address,
      sortition.vrfCoordinator, sortition.link, sortition.keyHash, sortition.fee,
      sortition.termDuration, sortition.minElectionDuration,
      { maxFeePerGas, maxPriorityFeePerGas });
    console.log("Deploying MsolSortition to:", KS.address);
    msolSortitionAddress = KS.address;

    const tx = await KS.deployTransaction.wait();
    console.log(" -> Mined with", tx.gasUsed.toString(), "gas");
  } else {
    console.log("MsolSortition already deployed");
  }

  console.log(`Verify on Etherscan: npx hardhat verify --network ${network.name} ${msolSortitionAddress} ${msolNFTAddress} ${KH.address} ${sortition.vrfCoordinator} ${sortition.link} ${sortition.keyHash} ${sortition.fee} ${sortition.termDuration} ${sortition.minElectionDuration}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });