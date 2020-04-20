const { RichEmbed } = require("discord.js")
module.exports = {
    name: "poomer",
    category: "fun",
    description: "Ok Poomer",
    run: async(client, message, args) => {
        const Poomembed = new RichEmbed()
            .setFooter("Created by MOR#3968")
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle("Ok pOOMER")
            // Edit the message
        message.channel.send("Poomer")
        message.channel.send(Poomembed)
    }

}