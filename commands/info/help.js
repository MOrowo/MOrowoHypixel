const Discord = require("discord.js")
module.exports = {
    name: "help",
    aliases: ["helps"],
    category: "info",
    description: "Returns help",
    run: async(client, message, args) => {
        const HelpEmbed = new Discord.RichEmbed()
            .setTitle("Help???")
            .addField("meme:", "send a meme")
            .addField("poomer: ", "get definition of poomer")
            .addField("stats: ", "get hypixel player stats")
            .addField("ping: ", "get ur ping")
            .setColor("RANDOM")
            .setFooter("Created by MOR#3968")
            .setTimestamp()
        message.channel.send(HelpEmbed)
    }
}