// this is a way of saving your private key in an even more secure way that in  .env file

const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY) // we access the wallet with the private key

    const encryptedJsonKey = await wallet.encrypt(
        // and woth the encrypt funcion inside ethers we can encrypt this
        process.env.PRIVATE_KEY_PASSWORD, // we will set a password for the encryption
        process.env.PRIVATE_KEY // and give the function the private key we want to encrypt
    )

    console.log(encryptedJsonKey)

    fs.writeFileSync("./encryptedKey.json", encryptedJsonKey) //with this command, we will create a JSON file that saves the encrypted key
    // people will be able to see this, but without the password of the private key they will be unable to decrypt it

    // once this is saved, we can delete the PRIVATE_KEY and PRIVATE_KEY_PASSWORD from the .env file
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
