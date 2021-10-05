const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');

var fileId = '16zLoK5c2JlivLxHp-15GcynsemHexm18';
console.log("driveTest ln 6");
var dest = fs.createWriteStream('./tmp/photo.png');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('drivetest')
        .setDescription('don\'t expect this to stick around i\'m just trying to get drive wired in lol'),
    async execute(interaction, drive) {
        await attatchPhoto(interaction, drive);
    },
};

function attatchPhoto(interaction, drive){
	try{
        console.log("driveTest ln 21");
        let resp = drive.files.get({
            fileId: fileId,
            alt: 'media'
          });
        resp.then( function (x) {
            x;
            console.log('Done');
            })
            .catch( function (err) {
            console.log('Error during download', err);
            })
		interaction.reply({files: ["./tmp/photo.png"]});
	} catch (error) {
		console.error(error);
	}
}