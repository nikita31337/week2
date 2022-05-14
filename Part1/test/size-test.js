const { poseidonContract } = require("circomlibjs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { groth16 } = require("snarkjs");


describe("MerkleTree", function () {

    it("Insert two new leaves and verify the first leaf in an inclusion proof", async function () {
        const Input = {
            "in": "1"
        }
        const { proof, publicSignals } = await groth16.fullProve(Input, "circuits/circuit_js/circuit.wasm","circuits/circuit_final.zkey");
        console.log(proof);

    });
});
