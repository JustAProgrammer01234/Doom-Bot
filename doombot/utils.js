const fs = require("fs")
const { Collection } = require("discord.js")

const cmdFiles = fs.readdirSync("./commands")

function navigateCommands(func) {
    for (const dir of cmdFiles) {
        const category = fs.readdirSync(`./commands/${dir}`)
        for (const cmdFile of category) {
            func(category, cmdFile)
        }
    }
}

function listCommands() {
    const commands = new Collection()
    const commandList = [] 
    for (const dir of cmdFiles) {
        const category = fs.readdirSync(`./commands/${dir}`)
        for (const cmdFile of category) {
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