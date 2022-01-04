const fs = require("fs")
const { Collection } = require("discord.js")

const cmdFiles = fs.readdirSync("./commands")

function navigateCommands(func) {
    for (const dir of cmdFiles) {
        const cmds = fs.readdirSync(`./commands/${dir}`)
        for (const cmd of cmds) {
            func(`${dir}/${cmd}`)
        }
    }
}

function listCommands() {
    const commands = new Collection()
    const commandList = [] 
    for (const dir of cmdFiles) {
        const cmds = fs.readdirSync(`./commands/${dir}`)
        for (const cmdFile of cmds) {
            const cmd = require(`${dir}/${cmdFile}`)
            commandList.push([cmd.data.name, cmd.data.description])
        }
        commands.set(category, commandList)
    }
    return commands 
}

module.exports  = {
    navigateCommands,
    listCommands
}