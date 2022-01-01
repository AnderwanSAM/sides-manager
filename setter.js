'use strict'

function setVariable(variableName,jsonObject,newValue){
    const newObject = jsonObject
  newObject.obj.tests[0].commands[
    findIndex(jsonObject.obj, targetValue)
  ].value = newValue
  return newObject
}



function findIndex(jsonObject, targetValue) {
    const commands = jsonObject.tests[0].commands
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].command === 'type' && commands[i].target === targetValue) {
        return i
      }
    }
  }
  
  function modify(jsonObject, targetValue, newValue, newObjects) {
    const newObject = setNewValue(jsonObject, targetValue, newValue)
    newObject.fileName = getNewName(newObject.fileName)
    newObjects.push(newObject)
  }
  


function setCredentials(folder, target, newValue) {
    // get files
    const imageDirPath = resolve(__dirname, folder)
    const files = readdirSync(imageDirPath)
    const newObjects = []
    const jsonObjects = []
    // create objects
    files.forEach((file) =>
      getObject(imageDirPath + `/${file}`, jsonObjects, file)
    )
    jsonObjects.forEach((obj) => modify(obj,target,newValue, newObjects))
   // jsonObjects.forEach((obj) => modify(obj, 'id=secret', secret, newObjects))
    return newObjects
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
  

module.exports = {
    setCredentials,
    modify,
    findIndex,
    setVariable
}