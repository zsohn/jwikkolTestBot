const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');


//start with google drive path to images source folder
//parse path
//set active directory to root
//recursively query the active directory for the next element of the path
//once the id of the imgages source folder is located
//list the images in image source folder
//use math.rand to select a random element in the list
//set fileid to that
//profit


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

async function attatchPhoto(interaction, drive){
    await drive.files.get(
      { fileId, alt: 'media'},
      { responseType: 'stream'}
    ).then(res => {
      res.data
        .on('error', err => console.error('ERROR: Download failed.'))
        .pipe(dest);
    });
    interaction.reply({files: ["./tmp/photo.png"]});
  }