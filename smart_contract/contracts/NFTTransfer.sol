// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract NFTTransfer {
    uint256 transferCount;

    event TransferNFT(address from, address receiver, string nftAddress, string message, uint timestamp, string keyword);

    struct NFTTransferStruct {
        address sender;
        address receiver;
        string nftAddress;
        string message;
        uint timestamp;
        string keyword;
    }

    NFTTransferStruct[] nftTransactions;

    function addToBlockchain(address payable receiver, string memory nftAddress, string memory message, string memory keyword) public {
        transferCount += 1;
        nftTransactions.push(NFTTransferStruct(msg.sender, receiver, nftAddress, message, block.timestamp, keyword));

        emit TransferNFT(msg.sender, receiver, nftAddress, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (NFTTransferStruct[] memory) {
        return nftTransactions;
    }

    
}