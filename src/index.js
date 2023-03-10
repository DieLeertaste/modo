// Importing
const {Client, Events, GatewayIntentBits, Collection} = require("discord.js")
require("dotenv").config()
const fs = require('node:fs')
const path = require('node:path')

// Create Discord Bot
const client = new Client({ intents:[
    GatewayIntentBits.Guilds,
]})

// Events
// Startup Event
client.once(Events.ClientReady, c => {
    console.log(`Loged in as ${c.user.tag}`)
})

// Interaction Create Event
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return
    
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})


// Command Handler
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] Der Command: ${filePath} fehlt "data" oder "execute"`)
    }
}

//Start the bot
client.login(process.env.TEST_TOKEN)

//Start Dashboard
app.listen()