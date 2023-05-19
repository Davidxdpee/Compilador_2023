import { txtopti, regex_endFunction, regex_StartFunction, regex_detectFunction, cleanSpaces, regex_OPAn , compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2, regex_test, buttonOpti } from "./regex.js";

// We add the button to execute the optimization
buttonOpti.addEventListener("click", (e) => {
  e.preventDefault()
  Optimization()
  
});

function getNumbLinesFunction() {
  const input = textarea.value;
  const re = /(ENT|CAD|FLOT)\s+(\w+)\s*\(([^)]*)\)\s*{([^}]*)}/gm;
  const results = [];
  let m;
  while ((m = re.exec(input)) !== null) {
    const FunctionBody = m[4];
    //We count the number of lines inside of the function
    const LineNumber = FunctionBody.trim().split('\n').length;
    //Add the num to return
    results.push(LineNumber);
  }
  return results;
}
function getLengthFunctions() {
  //We identify the number of function are in the code
  let lines = textarea.value.split("\n").filter(line => line != " ")
  let functionCount = 0;
  for (let line of lines) {
    if (line.trim().match(regex_function1)) {
      functionCount++
    }
  }
  return functionCount;
}


function firstfunctionmoretwo() {

  let otherfunctionparameter;
  let codigo = textarea.value
  let optimizedCode = codigo;
  let operador;
  let firstpart;
  const regex = /(ENT|CAD|FLOT)\s+([\w#]+)\s*\(\s*([\w#,\s]*)\)\s*{([\s\S]+?)}/g;
  let match;
  let functionsToDelete = []; // Array to delete the functions unless
  let callingfunction;
  //Identify every function
  while ((match = regex.exec(codigo)) !== null) {
    const type = match[1];
    const name = match[2];
    callingfunction = match[2];
    const parameters = match[3].split(',').map(p => p.trim()).filter(p => p !== '');
    const content = match[4].trim();
    let Functioncontent = [];
    let CallContent = [];
    content.split('\n').forEach(line => {
      Functioncontent.push(line.trim());
    });
    //Find if are there another function inside of the content of that function
    const regex_call = /(\b[\w#]+\b)\s*\(\s*([\w#,.\s]*)\s*\)/g;
    let MatchCall;
    while ((MatchCall = regex_call.exec(content)) !== null) {
      const NameCall = MatchCall[1];
      const CallParameters = MatchCall[2].split(',').map(p => p.trim()).filter(p => p !== '');
      //console.log(CallParameters)
      //console.log(parameters)
      ///////////////////////////////////////////////////////////////////////
      //Finf if the call use some parameter that match with the name of some variable of this function
      let ContainParameterCall = true;
      for (let ParameterCall of CallParameters) {
        if (parameters.includes(ParameterCall) || /#Ale\d+/.test(ParameterCall)) {
          ContainParameterCall = true;
          break;
        }
      }
      ///Fin the content of the called function
      const regexDefFunction = new RegExp(`(ENT|CAD|FLOT)\\s+${NameCall}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{([\\s\\S]+?)}`, 'g');
      const matchDefFunction = regexDefFunction.exec(codigo);
      if (matchDefFunction !== null) {
        const FunctioncontentCall = matchDefFunction[3].trim();
        const CallFunctionParameters = matchDefFunction[2].split(',').map(p => p.trim());
        otherfunctionparameter = CallFunctionParameters;
        const regex = /#Ale\d+/;
        otherfunctionparameter = CallFunctionParameters.map(str => str.match(regex)[0]);
        FunctioncontentCall.split('\n').forEach(line => {
          CallContent.push(line.trim());
        });
        const regex_OPAn = /^#Ale[0-9]*\s\=\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))(\s*[+\-*\%\/]\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))){1,}\s\;$/;
        const regexOperadores = /[\+\-\*\/\%]/g;
        let lines = FunctioncontentCall.split("\n").filter(line => line != " ")
        for (let line of lines) {
          if (line.trim().match(regex_OPAn)) {
            //Here we check if the line that is and operation A = A + B ; Includes the parameters of the function
            if (otherfunctionparameter.every(variable => line.includes(variable))) {
              //console.log(`La entrada "${line}" contiene ambas variables`);
              const operadores = line.match(regexOperadores);
              let parts = line.split(' ')
              operador = operadores[0];
              firstpart = parts[0]
            } else {
              //console.log("No encontró nada")
            }
          }
        }
      }
      ////////////////////////////////////////////////////////
      //console.log(`La función "${name}" llama a la función "${NameCall}"`);
      functionsToDelete.push(NameCall); // Add the function to delete in the optimization
      for (let i = 0; i < CallContent.length; i++) {
        //We match if the line is and aritmetic operation
        if (regex_OPAn.test(CallContent[i])) {
          //We match if the aritmetic operation has the variables of the function
          if (otherfunctionparameter.every(variable => CallContent[i].includes(variable))) {
            let content = CallContent[i];
            let words = content.split(' ');
            CallContent[i] = firstpart + ' = ' + CallParameters[0] + ' ' + operador + ' ' + CallParameters[1] + ' ;'
          }
        }
      }
      let newFunctionContent = CallContent.join('\n');
      //Replace the the content with the new content inside of function
      optimizedCode = optimizedCode.replace(content, newFunctionContent);
    }
  }
  //console.log(functionsToDelete)
  // Delete the functions unless 
  for (let functionName of functionsToDelete) {
    optimizedCode = optimizedCode.replace(new RegExp(`(\\b(ENT|CAD|FLOT)\\s+${functionName}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{[\\s\\S]*?})`), '');
  }
  optimizedCode = optimizedCode.replace(/\s{2,}/g, '\n');
  document.getElementById('textoptimized').value = optimizedCode;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function secondfunctioneqormoretwo() {
  let codigo = textarea.value
  let optimizedCode = codigo;
  let operador;
  const regex = /(ENT|CAD|FLOT)\s+([\w#]+)\s*\(\s*([\w#,\s]*)\)\s*{([\s\S]+?)}/g;
  let match;
  let functionsToDelete = []; //Array to save the functions to delete
  let callingfunction;
  while ((match = regex.exec(codigo)) !== null) {
    const type = match[1];
    const name = match[2];
    callingfunction = match[2];
    const parameters = match[3].split(',').map(p => p.trim()).filter(p => p !== '');
    const content = match[4].trim();
    let Functioncontent = [];
    content.split('\n').forEach(line => {
      Functioncontent.push(line.trim());
    });
    //Find if are there a call to other function inside of the content of that function
    const regex_call = /(\b[\w#]+\b)\s*\(\s*([\w#,.\s]*)\s*\)/g;
    let MatchCall;
    while ((MatchCall = regex_call.exec(content)) !== null) {
   
      const NameCall = MatchCall[1];
      const CallParameters = MatchCall[2].split(',').map(p => p.trim()).filter(p => p !== '');
      //////////////////////////////////
      //Find if in the call it uses some parameter that match with the name of some variable of that function
      let ContainParameterCall = true;
      for (let ParameterCall of CallParameters) {
        if (parameters.includes(ParameterCall) || /#Ale\d+/.test(ParameterCall)) {
          ContainParameterCall = true;
          break;
        }
      }
      ////Find the content of the called function
      const regexDefFunction = new RegExp(`(ENT|CAD|FLOT)\\s+${NameCall}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{([\\s\\S]+?)}`, 'g');
      const matchDefFunction = regexDefFunction.exec(codigo);
      if (matchDefFunction !== null) {
        const FunctioncontentCall = matchDefFunction[3].trim();
        //console.log(`Contenido de la función "${NameCall}":`);
        //console.log(FunctioncontentCall);
        const regex_OPAn = /^#Ale[0-9]*\s\=\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))(\s*[+\-*\%\/]\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))){1,}\s\;$/;
        const regexOperadores = /[\+\-\*\/\%]/g;
        let lines = FunctioncontentCall.split("\n").filter(line => line != " ")
        for (let line of lines) {
          if (line.trim().match(regex_OPAn)) {
            const operadores = line.match(regexOperadores);
            operador = operadores[0];
          }
        }

      }
      ////////////////////////////////////////////////////////
      //console.log(`La función "${name}" llama a la función "${NameCall}"`);
      functionsToDelete.push(NameCall); // Add the function to delete
      for (let i = 0; i < Functioncontent.length; i++) {
        if (regex_test.test(Functioncontent[i])) {
          let content = Functioncontent[i];
          let words = content.split(' ');
          Functioncontent[i] = words[0] + ' = ' + CallParameters[0] + ' ' + operador + ' ' + CallParameters[1] + ' ;'
        }
      }
      let newFunctionContent = Functioncontent.join('\n');
      optimizedCode = optimizedCode.replace(content, newFunctionContent);

    }
  }
  //console.log(functionsToDelete)
  // Delete the functions when we optimize
  for (let functionName of functionsToDelete) {
    optimizedCode = optimizedCode.replace(new RegExp(`(\\b(ENT|CAD|FLOT)\\s+${functionName}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{[\\s\\S]*?})`), '');
  }
  optimizedCode = optimizedCode.replace(/\s{2,}/g, '\n');
  document.getElementById('textoptimized').value = optimizedCode;
}


function twofunction() {  
  let linesfunction = getNumbLinesFunction();
  const txt = document.getElementById("textoptimized")
//if the number of lines inside of the first function is more than 2
  if (linesfunction[0] > 2) {
    firstfunctionmoretwo()
  } else {
    secondfunctioneqormoretwo()
  }
}

function Optimization() {
  //We identify the number of function that are in the code
  const lenght = getLengthFunctions();
  switch (lenght) {
    case 0:
      txtopti.value = textarea.value;
      break;
    case 1:
      txtopti.value = textarea.value;
      break;
    case 2:
      twofunction();
      break;
  }
}

  



