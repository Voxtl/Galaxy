// Load NPM modules
import { default as dotenv } from "dotenv"
import { Server } from "./server"

// Initalise .env
dotenv.config()

// Welcome message
console.log("  _______      ___       __          ___      ___   ___ ____    ____ ")
console.log(" /  _____|    /   \\     |  |        /   \\     \\  \\ /  / \\   \\  /   / ")
console.log("|  |  __     /  ^  \\    |  |       /  ^  \\     \\  V  /   \\   \\/   /  ")
console.log("|  | |_ |   /  /_\\  \\   |  |      /  /_\\  \\     >   <     \\_    _/   ")
console.log("|  |__| |  /  _____  \\  |  `----./  _____  \\   /  .  \\      |  |     ")
console.log(" \\______| /__/     \\__\\ |_______/__/     \\__\\ /__/ \\__\\     |__|     ")
console.log("")

const server = new Server({
    // It's impossible to tell without some overly complex type-guard if these are not undefined, hence the type assertions.
    address: process.env.ADDRESS as string,
    port: parseInt(process.env.PORT as string)
})

server.init()
