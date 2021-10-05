const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');
const {google} = require('googleapis');

var fileId = '16zLoK5c2JlivLxHp-15GcynsemHexm18';
console.log("driveTest ln 6");
var dest = fs.createWriteStream('./tmp/photo.png');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('drivetest')
        .setDescription('don\'t expect this to stick around i\'m just trying to get drive wired in lol'),
    async execute(interaction) {
        await attatchPhoto(interaction);
    },
};

function attatchPhoto(interaction){
	try{
        console.log("driveTest ln 21");
        drive.files.get({
            fileId: fileId,
            alt: 'media'
          })
              .on('end', function () {
                console.log('Done');
              })
              .on('error', function (err) {
                console.log('Error during download', err);
              })
              .pipe(dest);
		interaction.reply({files: ["./tmp/photo.png"]});
	} catch (error) {
		console.error(error);
	}
}