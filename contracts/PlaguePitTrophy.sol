// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PlaguePitTrophy is ERC721, ERC721Enumerable, Ownable, Pausable {
    using Counters for Counters.Counter;

    /// @notice Counter for number of mints
    Counters.Counter public _champIds;
    /// @dev Base URI used for token metadata
    string private _baseTokenUri;

    struct Trophy {
        // Collection ID #
        uint256 id;
        // Mint Date
        uint256 mintDate;
        // Winners Address
        address winner;
        // BUBO Id
        uint256 buboId;
    }

    /// @dev Array of Trophies (Hall Of BUBOs)
    mapping(uint256 => Trophy) internal _hallOfBUBOs;

    /*
     * @param _tokenURI the URL for the tokenURI (metadata)          
     */    
    constructor(
        string memory _tokenURI
    ) ERC721("Plague Pit Trophy", "PLAGUE") {
        _baseTokenUri = _tokenURI;
    }

    /*
     * @notice Mint a Plague Pit Trophy directly into the winners address
     * @param _champ Address of the winner         
     */    
    function reward(address _champ, uint256 _buboId) external whenNotPaused onlyOwner {   
        uint256 id = _champIds.current();     
        _hallOfBUBOs[id] = Trophy(id, block.timestamp, _champ, _buboId);
        _safeMint(_champ,  id);
        _champIds.increment();
    }

    /* @notice Pause Plague Pit Trophy minting */  
    function pauseMinting() external onlyOwner {
        _pause();
    }

    /* @notice Resume Plague Pit Trophy minting*/  
    function unpauseMinting() external onlyOwner {
        _unpause();
    }      

    // Internal functions

    /* @notice Returns the baseURI */      
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenUri;
    }

    // public functions

    /* @notice Returns an address array of winners 
     * @param _champId Address of the winner    
     */   
    function getChampion(uint256 _champId) public view returns(Trophy memory) {
        return _hallOfBUBOs[_champId];
    }

    /* @notice Returns an array of winning addresses */   
    function getHallOfBUBOs() public view returns(address[] memory) {
        address[] memory winners;
        for (uint256 i = 0; i < totalSupply(); i++) {
            winners[i] = _hallOfBUBOs[i].winner;
        }
        return winners;
    }    

    /* @notice Returns an array of all Art */   
    function getCollection() public view returns(Trophy[] memory) {
        Trophy[] memory collection = new Trophy[](totalSupply());
        for (uint256 i = 0; i < totalSupply(); i++) {
            Trophy storage trophy = _hallOfBUBOs[i];
            collection[i] = trophy;
        }
        return collection;
    }    

    /*
     * @notice set the baseURI
     * @param baseURI
     */  
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenUri = baseURI;
    }      
    /* 
     * @notice Returns the baseURI 
     * @param tokenId 
     */         
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(_baseURI(), toString(tokenId), ".json"));
    }

    function toString(uint256 value) internal pure returns (string memory) {
    // Inspired by OraclizeAPI's implementation - MIT license
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 digits;

        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);

        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }    

    /*
     * Why Override? Without this, you will get the 2 errors below. 
     * Derived contract must override function "_beforeTokenTransfer". Two or more base classes define function with same name and parameter types.
     * Derived contract must override function "supportsInterface". Two or more base classes define function with same name and parameter types.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);

        // do stuff before every transfer
        // e.g. check that vote (other than when minted) 
        // being transferred to registered candidate
    }
    
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }    
}