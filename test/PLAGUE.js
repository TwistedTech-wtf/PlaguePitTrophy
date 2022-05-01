/*****************************************************************************************************

████████╗██╗    ██╗██╗███████╗████████╗███████╗██████╗ ████████╗███████╗ ██████╗██╗  ██╗   ██╗    ██╗████████╗███████╗
╚══██╔══╝██║    ██║██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║  ██║   ██║    ██║╚══██╔══╝██╔════╝
   ██║   ██║ █╗ ██║██║███████╗   ██║   █████╗  ██║  ██║   ██║   █████╗  ██║     ███████║   ██║ █╗ ██║   ██║   █████╗  
   ██║   ██║███╗██║██║╚════██║   ██║   ██╔══╝  ██║  ██║   ██║   ██╔══╝  ██║     ██╔══██║   ██║███╗██║   ██║   ██╔══╝  
   ██║   ╚███╔███╔╝██║███████║   ██║   ███████╗██████╔╝   ██║   ███████╗╚██████╗██║  ██║██╗╚███╔███╔╝   ██║   ██║     
   ╚═╝    ╚══╝╚══╝ ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═════╝    ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝ ╚══╝╚══╝    ╚═╝   ╚═╝     
  Contract Developer: Stinky (@nomamesgwei)
  Description: (DDCAC Fork) Plague Pits Trophy for winners of the Plague Pit
******************************************************************************************************/

const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Plague Pit Trophy (PLAGUE)", function () {
  let NFT;
  let PLAGUE;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let provider;

  beforeEach(async function () {
    provider = waffle.provider;

    NFT = await ethers.getContractFactory("PlaguePitTrophy");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    PLAGUE = await NFT.deploy("https://assets.degendwarfs.io/artcollection/json/");
    await PLAGUE.deployed();
  });

  describe("Deployment", function () {
    it("Verify Address Owner", async function () {
      expect(await PLAGUE.owner()).to.equal(owner.address);
    });

    it("Verify $PLAGUE supply is 0", async function () {
      expect(await PLAGUE.totalSupply()).to.equal(0);
    });

  });

  describe("Mint", function () {

    it("Verify Supply equals 0", async function () {
      let supply = await PLAGUE.totalSupply();
      expect(supply).to.be.equal(0);

    });

    it("Mint NFT", async function () {
      await PLAGUE.reward(addr1.address, addr2.address);
    });

    it("Verify Supply equals 1", async function () {
      await PLAGUE.reward(addr1.address, addr2.address);
      supply = await PLAGUE.totalSupply();
      expect(supply).to.be.equal(1);
      let nftOwner = await PLAGUE.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
    });

    it("Verify addr1 owns NFT #0", async function () {
      await PLAGUE.reward(addr1.address, addr2.address);
      supply = await PLAGUE.totalSupply();
      expect(supply).to.be.equal(1);
      let nftOwner = await PLAGUE.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
      nftOwner = await PLAGUE.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
    });
  });
});