<img src="https://github.com/DegenDwarfs/CommunityArtCollection/blob/main/images/commArt.png">
The Dwarf Community Art Collection.
<br><br>
Part of Roadmap Phase 1 - Admire the Art

- Each NFT(ERC-721) is an exclusive 1/1 donated by a community member.
- The Dwarf team gets the final say of what makes it into the collection.
- These NFTs are not to be sold by the team, they are to be given away as part of parties, contests, or roadmap events.
- Any community member can contribute, and the Dwarf art is fair use.
- ONLY Dwarf Holders qualify to receive these NFTs!
- They will be extremely limited to start (given we have not yet sold out) so as not to dilute the main collection.
<br><br>

<img src="https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp" data-canonical-src="https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp" width="12" height="18" /> Contract Address:
```
0xAfc1DECec1D08358C9Ac9570BaAd74d9a773D9c5
```

# User Manual

## Minting
```
reward(address _winner, address _artist)
``` 
Winners `Address` and Artist Donation `Address` are input parameters.
This function will mint directly into the winners address, and can only be called by the contract owner.
Creating a new `Art` piece in the collection, this contract tracks dates and donation counts.

## History
```
ArtWinners()
```
No input parameters. This function returns an array of addresses (winners).

```
getArtPiece(uint256 _artId)
``` 
NFT art ID number `(uint256)` as only parameter. It will return Art scrut containing all information on the piece.

```
getCollection()
```
No input parameters. This function returns an array of Art scruts (collection).

## Artist Donations
```
artistDonation(uint256 _artId)
```
NFT art ID number `(uint256)` as only paramenter. 
Example: You want to donate to the artist of NFT ID # 1, you will pass the value 1 into the function.
This contract allows Artist who donate art pieces to receive donations. 
Donations are handled in the gas token, set the payable amount to be donated.
To donate ERC-20 tokens, please see `artistTokenDonation` function.

```
artistTokenDonation(uint256 _artId, address tokenAddress, uint256 amount)
```
> :warning:<b>Warning:</b> This contract expects amount of tokens entered to be in wei. 1 ETH =  1000000000000000000 WEI

NFT art ID number `(uint256)`, `(address)` to the ERC-20 token you will donate, the `(uint256)`amount of tokens in wei you want to donate.
Example: You want to donate to the artist of NFT ID # 1, you will pass the value 1 into the function.
This contract allows Artists who donate art pieces to receive donations. 
<br>


## BaseURI
```
setBaseURI(string memory baseURI)
```
baseURI `(string)` URL is the only input parameter.
The baseURI is set during deployment and can be changed using this function. 
This contract concats `.json` at the end of the string, and this can be removed on [line 73](https://github.com/DegenDwarfs/CommunityArtCollection/blob/e511de346e98e353c7823ef3aabaa6da2e6ff836/contracts/DDCAC.sol#L73).

# Dev Manual

## Install Contract Dependecies

The first steps are to clone the repository and install its dependencies:

```sh
git clone https://github.com/stinkyfi/DegenDwarfs.git
cd DegenDwarfs
npm install
```

## Deploy
On a new terminal, go to the repository's root folder and run this to
deploy the contract:

```sh
npx hardhat run scripts/deploy.js --network <network>
```

## Verify
On a new terminal, go to the repository's root folder and run this to
verify the contract:

```sh
npx hardhat verify --network <network> <contract_address> <"BaseURI String">
```

## Test
On a new terminal, go to the repository's root folder and run this to
test the contract:

```sh
npx hardhat test
```

## ABI
Build a front-end for this contract by using the ABI located in [scripts/CommunityArtCollection.json](https://github.com/DegenDwarfs/CommunityArtCollection/blob/maxUtility/scripts/CommunityArtCollection.json)

<br><br>
<img src="https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp" data-canonical-src="https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp" width="12" height="18" /> On Ethreum Mainnet
