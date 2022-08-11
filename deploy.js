// this deploy function is gonna do everything that remix IDE did automatically
// the first step we always did was to compile our solidity contract
// to compile, we are gonna use a tool called solc.js

const ethers = require("ethers") // we import the ethers dependency
const fs = require("fs-extra")

//const keyword makes it so that ethers cannot be changed

async function main() {
    // we have flexibility to wait for the functions to finish
    // compile them in our code
    // compile them separately
    // http://127.0.0.1:7545

    // this is how we are going to connect to our fake blockchain
    const provider = new ethers.providers.JsonRpcProvider(
        "HTTP://172.29.64.1:7545"
    )

    // this way we have a connection to a wallet with which we can sign different transactions
    const wallet = new ethers.Wallet(
        "958fb5ee7589fe9ff237d9098aa64f1abd5bf7aadde772e97d3d3c32b3ae5407",
        provider
    )

    // we also need the abi of our contract (so that our javascript code knows how to interact with the contract )
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    // and the binary (main compiled code)
    // that are both generated when we compile the contract
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet) // object in ethers we can use to deploy contracts
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy({
        //if we dont include the await keyword, this console will print "Promise {pending}" because it will execute before contract is deployed
        /** gasPrice: 10000000, gasLimit: 100000000000      ---->>> Inside the deploy function we can add different parameters for the deployment of our contract */
    }) // deployment of the contract with ethers
    /*
    The reason we want await is for to wait for the contract to be deployed
    If you do ctrl +  click over a function it takes you to the source code (HELPFULL)
  */

    const transactionReceipt = await contract.deployTransaction.wait(1) //you can only get this when you wait for the block confirmation
    // console.log("Here is the deployment transaction (transaction response): ");
    // console.log(contract.deployTransaction);      //this is what you get just when you deploy (initially)
    // console.log("Here is the transaction receipt: ");
    //console.log(transactionReceipt);
}

main()
    .then(() => process.exit(0)) // js syntax for waiting for the function main() to finish
    .catch((error) => {
        console.error(error) // and if not, for it to return an error
        process.exit(1)
    })
