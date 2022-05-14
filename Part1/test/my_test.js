const { poseidonContract } = require("circomlibjs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { groth16 } = require("snarkjs");

function unstringifyBigInts(o) {
    if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
        return BigInt(o);
    } else if ((typeof(o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o) ))  {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o===null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach( (k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

describe("MerkleTree", function () {
    let Verifier;
    let verifier;

    beforeEach(async function () {
        // Verifier = await ethers.getContractFactory("MerkleTree", {
        //     libraries: {
        //         PoseidonT3: poseidonT3.address
        //     },
        // });
        // verifier = await Verifier.deploy();
        // await verifier.deployed();
    });

    it("Insert two new leaves and verify the first leaf in an inclusion proof", async function () {
        const Input = {
            "leaves": ["1", "2", "3", "4" , "5", "6", "7", "8"]
        }
        const { proof, publicSignals } = await groth16.fullProve(Input, "circuits/circuit_js/circuit.wasm","circuits/circuit_final.zkey");
        console.log(publicSignals);

        // [bonus] verify the second leaf with the inclusion proof
    });
});
