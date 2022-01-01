'use strict'
import * as filesM from './files-manager'
import * as setterS from './setter'

function changeVariables(sidesFolder, destinationFolder, variables) {
    // sidesFolder is the name of the folder where the sides to modify are 

    // destinationFolder is the folder where the files should be placed once modified 

    // variables is an array ob object. Each object  should contain the name of the target and the new value this target should have 
    /* 
    {
        target: <string>
        value : <...>
    } */

    // rename the files 
    const files, directory = filesM.getFilesInFolder(sidesFolder)
    files.forEach((file)=>filesM.renameToJson(directory,file))
    
    // set variables 
    let finalObject; 
    variables.forEach((obj)=>{
        finalObject = setterS.setCredentials(sidesFolder,obj.target,obj.value)
    } )


}



exports = {
    changeVariables
}