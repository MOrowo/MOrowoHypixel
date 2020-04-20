const axios = require("axios")
const Discord = require("discord.js")
const { config } = require("dotenv");

config({
    path: __dirname + "/.env"
});

var parsedIGN = ""
var ign = ""
var parsedRank = ""
var parsedUUID = ""
var parsedKarma = 0
var parsedLevel = 0
var parsedOnline = true
var parsedVersion = ""


const slothpixel = "https://api.slothpixel.me/api/players/"
const hypixel = "https://api.hypixel.net/player?key=" + process.env.HYPIXEL_TOKEN + "&uuid="
const mojang = "https://api.mojang.com/users/profiles/minecraft/"


async function GetUUID() {
    try {
        var response = await axios.get(mojang + ign);
        parsedUUID = response.data.id;
    } catch (error) {
        console.log(error);
    }
}

async function getIGN() {
    await GetUUID()
    try {
        var response = await axios.get(hypixel + parsedUUID)
        parsedIGN = response.data.player.displayname;

    } catch (error) {
        console.log(error);
    }
}

async function getRank() {
    var response = await axios.get(hypixel + parsedUUID)
    if (response.data.player.rank != undefined) {
        parsedRank = response.data.player.rank
    } else if (response.data.player.newPackageRank != undefined) {
        parsedRank = response.data.player.newPackageRank.replace("_PLUS", "+");
    } else {
        parsedRank = "NONE"
    }
}

async function getKarma() {
    try {
        var response = await axios.get(slothpixel + ign);
        parsedKarma = response.data.karma;
        parsedKarma = String(parsedKarma)
    } catch (error) {
        console.log(error)
    }
}

async function getLevel() {
    try {
        var response = await axios.get(slothpixel + ign);
        parsedLevel = response.data.level;
        parsedLevel = String(parsedLevel)
    } catch (error) {
        console.log(error)
    }
}

async function getOnline() {
    try {
        var response = await axios.get(slothpixel + ign)
        parsedOnline = response.data.online;
        if (parsedOnline == true) {
            parsedOnline = "🟢 " + "Online"
        } else {
            parsedOnline = "🔴 " + "Offline"
        }
    } catch (error) {
        console.log(error)
    }
}

async function getVersion() {
    try {
        var response = await axios.get(slothpixel + ign)
        parsedVersion = response.data.mc_version
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    name: "stats",
    category: "hypixel",
    description: "Send hypixel stats",
    run: async(client, message, args) => {
        if (args[0] != undefined) {
            console.log(args[0])
            ign = args[0]
            message.channel.send("Fetching API...")
            try {
                //
                await getIGN();
                await getRank();
                await getKarma();
                await getLevel();
                await getOnline();
                await getVersion();
                //
                var Statss = new Discord.RichEmbed()
                    .setTitle(parsedIGN + "'s stats")
                    .addField("**DisplayName :**", parsedIGN)
                    .addField("**Rank: **", parsedRank)
                    .addField("**Karma: **", parsedKarma)
                    .addField("**Level: **", parsedLevel)
                    .addField("**Online: **", parsedOnline)
                    .addField("**Minecraft version: **", parsedVersion)
                    .setColor(0xffdd00)
                    .setFooter("Created by MOR#3968")
                    .setTimestamp()
                message.channel.send(Statss)
            } catch (error) {
                var Error_message = new Discord.RichEmbed()
                    .setTitle(":x: Error! make sure that IGN is correct.")
                message.channel.send(Error_message)
                    //console.log(error)
            }
        } else {
            const errorStats = new Discord.RichEmbed()
                .setTitle(":x: Error! please use correct format _stats <IGN>.")
            message.channel.send(errorStats)
        }
    }
}