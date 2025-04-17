// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseilyNFT is ERC721URIStorage, Ownable {
    uint256 public currentTokenId;

    mapping(uint256 => address) public creators;

    constructor() ERC721("MintMuseily", "MUSLY") {}

    function mint(address to, string memory metadataURI) public onlyOwner returns (uint256) {
        uint256 tokenId = ++currentTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        creators[tokenId] = to;
        return tokenId;
    }
}
