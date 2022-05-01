# Plague Pits Trophy

<img src="https://avatars.githubusercontent.com/u/39045722?s=200&v=4" data-canonical-src="https://avatars.githubusercontent.com/u/39045722?s=200&v=4" width="20" height="20" /> Contract Address:
```
Coming Soon!
```

## DDCAC User Manual

### Minting
```
reward(address _winner, address _artist)
``` 
Winners `Address` and Artist Donation `Address` are input parameters.
This function will mint directly into the winners address, and can only be called by the contract owner.
Creating a new `Art` piece in the collection, this contract tracks dates and donation counts.

### History
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


### BaseURI
```
setBaseURI(string memory baseURI)
```
baseURI `(string)` URL is the only input parameter.
The baseURI is set during deployment and can be changed using this function. 
This contract concats `.json` at the end of the string, and this can be removed on [line 73](https://github.com/DegenDwarfs/CommunityArtCollection/blob/e511de346e98e353c7823ef3aabaa6da2e6ff836/contracts/DDCAC.sol#L73).

## Dev Manual

### Install Contract Dependecies

The first steps are to clone the repository and install its dependencies:

```sh
git clone https://github.com/stinkyfi/DegenDwarfs.git
cd DegenDwarfs
npm install
```

### Deploy
On a new terminal, go to the repository's root folder and run this to
deploy the contract:

```sh
npx hardhat run scripts/deploy.js --network <network>
```

### Verify
On a new terminal, go to the repository's root folder and run this to
verify the contract:

```sh
npx hardhat verify --network <network> <contract_address> <"BaseURI String">
```

### Test
On a new terminal, go to the repository's root folder and run this to
test the contract:

```sh
npx hardhat test
```
