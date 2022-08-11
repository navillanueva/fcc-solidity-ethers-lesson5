// ENVIRONMENT VARIABLES
// In the original code everyone can see our private key and connection to the blockchain
// If we were to upload it to github, this would be dangerous
// For fixing this we have to download dotenv package with yarn

const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config() // we import the dotenv package

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RPC_URL_TN
    ) // not necesarry for safety reasons but just in case we want to ensure are the only ones that connect to this RPC endpoint

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_TN, provider) // using process.env we can access all of the variables we save in the .env file

    /** 
     but once we have encrypted the key there is a better way of accessing this, like follows
     the password we manually introduce in the terminal when we call this class

        const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8")
        let wallet = new ethers.Wallet.fromEncryptedJsonSync(
            encryptedJson,
            process.env.PRIVATE_KEY_PASSWORD
        ) 
        wallet = await wallet.connect(provider) ---> we have to connect the wallet to the provider (our blockchain) because if not it will not work

     This codes showcase a more secure way of dealing with the privateKEY but during the course we will use the less secure one
    */
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")

    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    console.log(`Contract Address: ${contract.address}`) // so we can insert the contract address into goerli etherscan and verify everything is true

    const currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number: ${+currentFavoriteNumber.toString()}`)

    const transactionResponse = await contract.store("7")
    const transactionReceipt = await transactionResponse.wait(1)
    const updatedFavoriteNumber = await contract.retrieve()

    console.log(`Updated favorite number is: ${updatedFavoriteNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
