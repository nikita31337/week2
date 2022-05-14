//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { PoseidonT3 } from "./Poseidon.sol"; //an existing library to perform Poseidon hash on solidity
import  "./verifier.sol"; //inherits with the MerkleTreeInclusionProof verifier contract

contract MerkleTree is Verifier {
    uint256[] public hashes; // the Merkle tree in flattened array form
    uint256 public index = 0; // the current index of the first unfilled leaf
    uint256 public root; // the current Merkle root

    constructor() {
        for (uint i = 0; i < 16; i++) {
            hashes.push(0);
        }
    }

    function calculate_root() public returns (uint256) {
        uint n = 3;

        uint256[2] memory buf;
        uint p = 0;
        for(uint k = n; k > 0; k--) {
            for (uint i = 0; i < 2**(k-1); i++) {
                buf[0] = hashes[0];
                buf[1] =  hashes[1];
                hashes[p + 2**k + i] = PoseidonT3.poseidon([hashes[p + i * 2], hashes[p + i * 2 + 1]]);
            }
            p += 2**k;
        }

        return hashes[p];
    }

    function insertLeaf(uint256 hashedLeaf) public returns (uint256) {
        hashes[index] = hashedLeaf;
        index += 1;
        return calculate_root();
    }

    function verify(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[1] memory input
        ) public view returns (bool) {

        return Verifier.verifyProof(a, b, c, input);
        // [assignment] verify an inclusion proof and check that the proof root matches current root
    }
}
