const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');

let fileId = '16zLoK5c2JlivLxHp-15GcynsemHexm18';
let dest = fs.createWriteStream('./tmp/photo.png');

const imgDirPath = "jikolibottest/Assets/testPhoto"
let dirId;
let session;
let drive;
let auth;



module.exports = {
    data: new SlashCommandBuilder()
        .setName('drivetest')
        .setDescription('don\'t expect this to stick around i\'m just trying to get drive wired in lol'),
    async execute(interaction) {
        await attatchPhoto(interaction);
    },
    async init(googleSession){
        await queueFindPhotosDir(googleSession);
    },
};

async function queueFindPhotosDir(googleSession){
  session = googleSession;
  console.log("is init working????");
  session.queueOnSave(findPhotosDir);
}

function findPhotosDir(auth1, drive1){
  drive = drive1;
  auth = auth1;
  //start with google drive path to images source folder
  //parse path
  //set active directory to root
  //recursively query the active directory for the next element of the path
  //once the id of the imgages source folder is located
  //list the images in image source folder
  //use math.rand to select a random element in the list
  //set fileid to that
  //profit
  listFiles();
}


async function attatchPhoto(interaction){
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


function listFiles() {
  drive.files.list({
    q: "mimeType = 'application/vnd.google-apps.folder' and name = 'jikolibottest'",
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}