require("dotenv").config()
const fs = require("fs")
const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const commands = []
const clientId = process.env["TEST_APPLICATION_ID"];
const guildId = process.env["TEST_GUILD"];

const commandfiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))

commandfiles.forEach(commandfile => {
    const command = require(`./commands/${commandfile}`)
    commands.push(command.data.toJSON())
})

const restClient = new REST({version: "9"}).setToken(process.env.TEST_TOKEN)

restClient.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
.then(() => console.log("Succesfully registered Commands"))
.catch(console.error)