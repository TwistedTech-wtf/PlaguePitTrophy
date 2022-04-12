/*****************************************************************************************************
 ██████╗░███████╗░██████╗░███████╗███╗░░██╗  ██████╗░░██╗░░░░░░░██╗░█████╗░██████╗░███████╗░██████╗
 ██╔══██╗██╔════╝██╔════╝░██╔════╝████╗░██║  ██╔══██╗░██║░░██╗░░██║██╔══██╗██╔══██╗██╔════╝██╔════╝
 ██║░░██║█████╗░░██║░░██╗░█████╗░░██╔██╗██║  ██║░░██║░╚██╗████╗██╔╝███████║██████╔╝█████╗░░╚█████╗░
 ██║░░██║██╔══╝░░██║░░╚██╗██╔══╝░░██║╚████║  ██║░░██║░░████╔═████║░██╔══██║██╔══██╗██╔══╝░░░╚═══██╗
 ██████╔╝███████╗╚██████╔╝███████╗██║░╚███║  ██████╔╝░░╚██╔╝░╚██╔╝░██║░░██║██║░░██║██║░░░░░██████╔╝
 ╚═════╝░╚══════╝░╚═════╝░╚══════╝╚═╝░░╚══╝  ╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═════╝░
  Contract Developer: Stinky (@nomamesgwei)
  Description: Degen Dwarfs Community Art Collection includes exclusive 1/1's donated by 
               community members.
******************************************************************************************************/

const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Degen Dwarfs Community Art Collection (DDCAC)", function () {
  let NFT;
  let DDCAC;
  let ERC20;
  let Token;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let provider;

  beforeEach(async function () {
    provider = waffle.provider;

    NFT = await ethers.getContractFactory("CommunityArtCollection");
    ERC20 = await ethers.getContractFactory("TEST");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    DDCAC = await NFT.deploy("https://assets.degendwarfs.io/artcollection/json/");
    await DDCAC.deployed();
    Token = await ERC20.deploy(owner.address, ethers.utils.parseEther("100"));
    await Token.deployed();

    await Token.increaseAllowance(DDCAC.address, ethers.utils.parseEther("10"));
  });

  describe("Deployment", function () {
    it("Verify Address Owner", async function () {
      expect(await DDCAC.owner()).to.equal(owner.address);
    });

    it("Verify $TEST allowance equals 10", async function () {
      expect(await Token.allowance(owner.address, DDCAC.address)).to.equal(ethers.utils.parseEther("10"));
    });

    it("Verify $DDCAC supply is 0", async function () {
      expect(await DDCAC.totalSupply()).to.equal(0);
    });

  });

  describe("Mint", function () {

    it("Verify Supply equals 0", async function () {
      let supply = await DDCAC.totalSupply();
      expect(supply).to.be.equal(0);

    });

    it("Mint NFT", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
    });

    it("Verify Supply equals 1", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
      supply = await DDCAC.totalSupply();
      expect(supply).to.be.equal(1);
      let nftOwner = await DDCAC.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
    });

    it("Verify addr1 owns NFT #0", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
      supply = await DDCAC.totalSupply();
      expect(supply).to.be.equal(1);
      let nftOwner = await DDCAC.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
      nftOwner = await DDCAC.ownerOf(0);
      expect(nftOwner).to.equal(addr1.address);
    });
  });

  describe("Gas Token Donation", function () {

    it("Verify Starting Balances", async function () {
      let donorBalance = await provider.getBalance(addr1.address);
      let artistBalance = await provider.getBalance(addr2.address);
      expect(donorBalance).to.equal(ethers.utils.parseEther("10000"));
      expect(artistBalance).to.equal(ethers.utils.parseEther("10000"));
    });

    it("Donate Tokens", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
      let overrides = {value: ethers.utils.parseEther("1")};
      await DDCAC.artistDonation(0, overrides);
    });

    it("Verify Final Balance", async function () {
      let artistBalance = await provider.getBalance(addr2.address);
      expect(artistBalance).to.equal(ethers.utils.parseEther("10001"));
    });
  });

  describe("ERC-20 Token Donation", function () {
    it("Verify Token Balances", async function () {
      let donorBalance = await Token.balanceOf(owner.address);
      let artistBalance = await Token.balanceOf(addr2.address);
      expect(donorBalance).to.equal(ethers.utils.parseEther("100"));
      expect(artistBalance).to.equal(ethers.utils.parseEther("0"));
    });

    it("Verify Allowance", async function () {
      let allownace = await Token.allowance(owner.address, DDCAC.address);
      expect(allownace).to.equal(ethers.utils.parseEther("10"));
    });

    it("Call Function", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
      expect(await DDCAC.totalSupply()).to.be.equal(1);
      let donorBalance = await Token.balanceOf(owner.address);
      expect(donorBalance).to.equal(ethers.utils.parseEther("100"));
      await DDCAC.artistTokenDonation(0, Token.address, ethers.utils.parseEther("1"));
    });

    it("VVerify Final Balances", async function () {
      await DDCAC.reward(addr1.address, addr2.address);
      let donorBalance = await Token.balanceOf(owner.address);
      let artistBalance = await Token.balanceOf(addr2.address);
      await DDCAC.artistTokenDonation(0, Token.address, ethers.utils.parseEther("1"));
      donorBalance = await Token.balanceOf(owner.address);
      expect(donorBalance).to.equal(ethers.utils.parseEther("99"));
      artistBalance = await Token.balanceOf(addr2.address);
      expect(artistBalance).to.equal(ethers.utils.parseEther("1"));
    });
  });
});