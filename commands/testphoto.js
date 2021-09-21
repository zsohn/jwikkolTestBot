const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');

const imgDir = "Assets/testPhoto"
const testPhoto = fs.readdirSync(imgDir).filter(file => file.endsWith('.jpg'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testphoto')
		.setDescription('Replies with a photo from '+imgDir+'.'),
	async execute(interaction) {
		await attatchPhoto(interaction);
	},
};

function attatchPhoto(interaction){
	interaction.reply({files: [imgDir+"/"+testPhoto[Math.floor(Math.random()*testPhoto.length)]]});
}
