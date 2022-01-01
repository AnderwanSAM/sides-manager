/* 
This file contains the functions needed to read and write the files */
'use strict'

const { readdirSync, rename } = require('fs')
const { resolve } = require('path')
const fs = require('fs')

function getFilesInFolder(folderName){
const imageDirPath = resolve(__dirname,folderName)
const files = readdirSync(imageDirPath)
return files , imageDirPath
}

function renameToJson(directory,filename){
    rename(
        directory + `/${filename}`,
        directory + `/${getNewName(filename)}`,
        (err) => {if (err !== null) {console.error(err)}}
      )
    
}


function writeJsonObject (jsonObjectI, destinationFolderPath, filename){
    const name = path.join(destinationFolderPath, information.fileName)
    // console.log(name)
    const jsonObject = JSON.stringify(jsonObjectI)
    fs.writeFile(name, jsonObject, (err) => {
      if (err) {
        console.error('Error writing file', err)
      } else {
        console.info('Successfully wrote file' + filename)
      }
    })
  
}

// The following function reads

function getConfiguration(configFilePath){
    const jsonObject = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))
    return jsonObject
}

function getNewName(oldName) {
    return oldName.substring(0, oldName.length - 4) + 'json'
  }
  

  function createNewSides(jsonObjects) {
    jsonObjects.forEach((obj) => write(obj))
  }
  

  function getObject(filePath, jsonObjects, file) {
    const jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const information = {
      fileName: file,
      obj: jsonObject,
    }
    jsonObjects.push(information)
  }
  

module.exports={
  getObject, 
  createNewSides,
  getConfiguration,
  getNewName, 
  getFilesInFolder,
  writeJsonObject,
  renameToJson, 
}

  