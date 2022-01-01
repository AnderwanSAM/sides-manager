function retrieveVariables(){
    const givenArguments = []
    process.argv.forEach( (val)=> {
        givenArguments.push(val)
      })
    givenArguments.shift()
    givenArguments.shift()
    // console.log(givenArguments.shift())
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

 //  retrieveVariables()
const temp = retrieveVariables()
temp.shift()
temp.shift()
const results = getVariablesSets(temp)
// console.log(results)
