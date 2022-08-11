// THIS CLASS IS FOR DEMONSTRATING HOW TO INTERACT WITH THE CONTRACT ONCE WE HAVE DEPLOYED IT
// the code is originally the same one from deploy.js
// it is split to commment and show individually the interaction functions i am going to add

const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "HTTP://172.29.64.1:7545"
    )

    const wallet = new ethers.Wallet(
        "958fb5ee7589fe9ff237d9098aa64f1abd5bf7aadde772e97d3d3c32b3ae5407",
        provider
    )

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    // as retrieve is just a view function, this is not gonna cost us any gas.
    // getting the number

    const currentFavoriteNumber = await contract.retrieve() // since we passed the ABI (application binary interface) we have access to all of the contracts functions
    console.log(`Current Favorite Number: ${+currentFavoriteNumber.toString()}`) // we have to add toString to print out a more readable answer

    // with the backticks `` we can put a string inside to make the console.log more understadable
    // now we wanna change the favorite number so we call the function store()

    const transactionResponse = await contract.store("7")
    const transactionReceipt = await transactionResponse.wait(1) // we normally dont do a lot with the transaction receipt
    const updatedFavoriteNumber = await contract.retrieve()

    console.log(`Updated favorite number is: ${updatedFavoriteNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
