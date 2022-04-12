// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title BLOOD Token (The native ecosystem token of Bubonic Bastards)
 * @dev Extends standard ERC20 contract from OpenZeppelin
 */
contract TEST is ERC20("Test ERC20 Token", "TEST") {

    /**
     * @notice Construct the TEST token
     */
    constructor(address _testWallet, uint256 _mintAmount) {
        _mint(_testWallet, _mintAmount);
    }

}