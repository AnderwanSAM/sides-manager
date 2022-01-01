const { readdirSync, rename } = require('fs')
const { resolve } = require('path')

// const args = process.argv
// const inputFolder = args[2]


function getNewName(oldName,extension) {
    // extension  = json or side
  return oldName.substring(0, oldName.length - 4) + extension
}

function renameFiles(inputFolderName){
// Get path to sides  directory
const imageDirPath = resolve(__dirname,inputFolder)

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath)

// Loop through each file that was retrieved and rename it as json
files.forEach((file) =>
  rename(
    imageDirPath + `/${file}`,
    imageDirPath + `/${getNewName(file,'json')}`,
    (err) => console.error(err)
  )
)
}

module.exports ={
    renameFiles
}