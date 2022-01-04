const fs = require("fs")
const { Collection } = require("discord.js")

const cmdFiles = fs.readdirSync("./commands")

function navigateCommands(func) {
    for (const dir of cmdFiles) {
        const category = `./commands/${dir}`
        const cmds = fs.readdirSync(category)
        for (const cmdFile of cmds) {
            func(cmdFile, category)
        }
    }
}

function listCommands() {
    const commands = new Collection()
    const commandList = [] 
    for (const dir of cmdFiles) {
        const cmds = fs.readdirSync(`./commands/${dir}`)
        for (const cmdFile of cmds) {
            commandList.push([cmdFile.data.name, cmdFile.data.description])
        }
        commands.set(category, commandList)
    }
    return commands 
}

module.exports  = {
    navigateCommands,
    listCommands
}