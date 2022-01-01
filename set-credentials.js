'use strict'
//
const { readdirSync } = require('fs')
const { resolve } = require('path')
const fs = require('fs')
const path = require('path')

const args = process.argv

// const key = args[3]
// const secret = args[4]

const cliArguments = retrieveVariables()
const startingFolder = cliArguments[0]
const outputFolder = cliArguments[1]
cliArguments.shift()
cliArguments.shift()
const newVars = getVariablesSets(cliArguments) 

function retrieveVariables(){
    let givenArguments = []
    process.argv.forEach( (val)=> {
        givenArguments.push(val)
      })
    // remove node.exe path and file name 
    givenArguments.shift() 
    givenArguments.shift() 
    return givenArguments 
}

function getVariablesSets(cliArguments){
  let newvars = []
  for(let i = 0 ; i< cliArguments.length; i = i+2){
      let obj = {
          targetName: cliArguments[i],
          value: cliArguments[i+1]
      }
      newvars.push(obj)
      
  }
  return newvars
}

// const testFolder = 'to-validate'

function getModifiedFiles(Folder,newValues) {
  const results = setCredentials(Folder,newValues)
  createNewSides(results)
}

function setCredentials(folder,newValues) {
    /* 
    newValues = [
        {
            targetName: xxx,
            value: yyy
        }
    ]
     */
  // get files
  const imageDirPath = resolve(__dirname, folder)
  const files = readdirSync(imageDirPath)
  const newObjects = []
  const jsonObjects = []
  // create objects
  files.forEach((file) =>
    getObject(imageDirPath + `/${file}`, jsonObjects, file)
  )
  newValues.forEach((val)=>{
    jsonObjects.forEach((obj) => modify(obj,val.targetName,val.value, newObjects))
  })
//   jsonObjects.forEach((obj) => modify(obj, 'id=key', key, newObjects))
//   jsonObjects.forEach((obj) => modify(obj, 'id=secret', secret, newObjects))
  return newObjects
}

function getObject(filePath, jsonObjects, file) {
  const jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const information = {
    fileName: file,
    obj: jsonObject,
  }
  jsonObjects.push(information)
}

function modify(jsonObject, targetValue, newValue, newObjects) {
  const newObject = setNewValue(jsonObject, targetValue, newValue)
  newObject.fileName = getNewName(newObject.fileName)
  newObjects.push(newObject)
}

function findIndex(jsonObject, targetValue) {
  const commands = jsonObject.tests[0].commands
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].command === 'type' && commands[i].target === targetValue) {
      return i
    }
  }
}

function setNewValue(jsonObject, targetValue, newValue) {
  const newObject = jsonObject
  newObject.obj.tests[0].commands[
    findIndex(jsonObject.obj, targetValue)
  ].value = newValue
  return newObject
}

function getNewName(oldName) {
  return oldName.substring(0, oldName.length - 4) + 'side'
}

function write(information,destination) {
  const name = path.join(destination, information.fileName)
  // console.log(name)
  const jsonObject = JSON.stringify(information.obj)
  fs.writeFile(name, jsonObject, (err) => {
    if (err) {
      console.error('Error writing file', err)
    } else {
      console.info('Successfully wrote file ' + name)
    }
  })
}

function createNewSides(jsonObjects) {
  jsonObjects.forEach((obj) => write(obj,outputFolder))
}

getModifiedFiles(startingFolder,newVars)
