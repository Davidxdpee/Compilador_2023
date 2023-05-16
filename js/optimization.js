import { txtopti,regex_endFunction,regex_StartFunction,regex_detectFunction,cleanSpaces,regex_OPAn, LineNumber, compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2, regex_test ,buttonOpti} from "./regex.js";

// Obtenemos el botón de optimización por su id
const btnOptimization = document.getElementById("Optimization");

// Agregamos un evento de escucha al botón de optimización
buttonOpti.addEventListener("click", (e) => {
    e.preventDefault()
  // Aquí colocamos todo el código que queremos que se ejecute cuando se presione el botón
  Optimization()
});

function getNumbLinesFunction(){
    const input = textarea.value;
    const re = /(ENT|CAD|FLOT)\s+(\w+)\s*\(([^)]*)\)\s*{([^}]*)}/gm;
    const resultados = [];
    let m;
  
    while ((m = re.exec(input)) !== null) {
      const cuerpoFuncion = m[4];
      // Contar número de líneas dentro del cuerpo de la función
      const numLineas = cuerpoFuncion.trim().split('\n').length;
      // Agregar resultado al arreglo de resultados
      resultados.push(numLineas);
    }
    return resultados;
}
function getLengthFunctions (){
//Primero comenzamos identificando la cantidad de funciones que hay
let lines = textarea.value.split("\n").filter(line => line != " ")
let functionCount = 0;
for (let line of lines) {
    if (line.trim().match(regex_function1)) {
        functionCount++
    }
}
return functionCount;
}

// let unaivaliable(){
//   // const funciones = [];

// // const regex = /(ENT|CAD|FLOT)\s+([\w#]+)\s*\(\s*([\w#,\s]*)\)\s*{([\s\S]+?)}/g;

// // let match;
// // while ((match = regex.exec(codigo)) !== null) {
// //   const tipo = match[1];
// //   const nombre = match[2];
// //   const parametros = match[3].split(',').map(p => p.trim()).filter(p => p !== '');
// //   const contenido = match[4].trim();
  
// //   funciones.push({ tipo, nombre, parametros, contenido });
// // }

// // console.log(funciones);
// }

function firstfunctionmoretwo(){
   console.log("FUNCIONANDO")
   let parametrosotrafuncion;
   let codigo = textarea.value
   let optimizedCode = codigo;
   let operador ;
   let firstpart;
   let infoguardar = [] ;
   const regex = /(ENT|CAD|FLOT)\s+([\w#]+)\s*\(\s*([\w#,\s]*)\)\s*{([\s\S]+?)}/g;
   let match;
   let functionsToDelete = []; // Array para guardar las funciones a eliminar
   let nombreFuncionIdentificada = null;
   let funcionllamadora;
   while ((match = regex.exec(codigo)) !== null) {
     const tipo = match[1];
     const nombre = match[2];
     funcionllamadora= match[2];
     const parametros = match[3].split(',').map(p => p.trim()).filter(p => p !== '');
     const contenido = match[4].trim();
     let contenidoFuncion = [];
     let llamadacontenido = [];
     contenido.split('\n').forEach(linea => {
       contenidoFuncion.push(linea.trim());
     });
     // buscar si hay una llamada a otra funcion dentro del contenido de esta funcion
     const regexLlamada = /(\b[\w#]+\b)\s*\(\s*([\w#,.\s]*)\s*\)/g;
     let matchLlamada;
     while ((matchLlamada = regexLlamada.exec(contenido)) !== null) {
       ////////////////////////
       //////////////////////
       const nombreLlamada = matchLlamada[1];
       const parametrosLlamada = matchLlamada[2].split(',').map(p => p.trim()).filter(p => p !== '');
       console.log(parametrosLlamada)
       console.log(parametros)
   //////////////////////////////////
       // buscar si la llamada usa algun parametro que coincida con el nombre de una variable de esta funcion
       let contieneParametroLlamada = true;
       for (let parametroLlamada of parametrosLlamada) {
         if (parametros.includes(parametroLlamada) || /#Ale\d+/.test(parametroLlamada)) {
           contieneParametroLlamada = true;
           break;
         }
       }
       

   ///////////////AQUI BUSCAMOS EL CONTENIDO DE LA FUNCION LLAMADA
       const regexDefFuncion = new RegExp(`(ENT|CAD|FLOT)\\s+${nombreLlamada}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{([\\s\\S]+?)}`, 'g');
   const matchDefFuncion = regexDefFuncion.exec(codigo);

   if (matchDefFuncion !== null) {
     const contenidoFuncionLlamada = matchDefFuncion[3].trim();
     const parametrosFuncionLlamada = matchDefFuncion[2].split(',').map(p => p.trim());
          parametrosotrafuncion = parametrosFuncionLlamada;
     const regex = /#Ale\d+/;
 parametrosotrafuncion = parametrosFuncionLlamada.map(str => str.match(regex)[0]);
console.log(parametrosotrafuncion)
     console.log(`Contenido de la función "${nombreLlamada}":`);
     console.log(contenidoFuncionLlamada);
     console.log(parametrosFuncionLlamada)
     contenidoFuncionLlamada.split('\n').forEach(linea => {
      llamadacontenido.push(linea.trim());
    });
     const regex_OPAn = /^#Ale[0-9]*\s\=\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))(\s*[+\-*\%\/]\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))){1,}\s\;$/;
     const regexOperadores = /[\+\-\*\/\%]/g;
     let lines = contenidoFuncionLlamada.split("\n").filter(line => line != " ")
     for (let line of lines) {
       if (line.trim().match(regex_OPAn)) {
        if (parametrosotrafuncion.every(variable => line.includes(variable))) {
          console.log(`La entrada "${line}" contiene ambas variables`);
           const operadores = line.match(regexOperadores);   
           let partes = line.split(' ')     
       console.log(line)
       console.log(operadores)
       operador=operadores[0];
      firstpart=partes[0]
        }else{
          console.log("no encontró nada")
        }
       }
     } 
   }
   
   ////////////////////////////////////////////////////////
       console.log(`La función "${nombre}" llama a la función "${nombreLlamada}"`);
       functionsToDelete.push(nombreLlamada); // Agregar la función a eliminar
         for (let i = 0; i < llamadacontenido.length; i++) {
           if (regex_OPAn.test(llamadacontenido[i])) {
            if (parametrosotrafuncion.every(variable => llamadacontenido[i].includes(variable))) {
             let contenido = llamadacontenido[i];
             let palabras = contenido.split(' ');
             llamadacontenido[i] = firstpart+' = '+parametrosLlamada[0]+' '+operador+' '+parametrosLlamada[1]+' ;'
           }
          }
         }
         let nuevoContenidoFuncion = llamadacontenido.join('\n');
         optimizedCode = optimizedCode.replace(contenido, nuevoContenidoFuncion);
     }
   }
   console.log(functionsToDelete)
   // Eliminar las funciones marcadas para borrar
   for (let functionName of functionsToDelete) {
     optimizedCode = optimizedCode.replace(new RegExp(`(\\b(ENT|CAD|FLOT)\\s+${functionName}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{[\\s\\S]*?})`), '');
   }
   //optimizedCode = optimizedCode.replace(/\s{3,}/g, '\n\n');
   optimizedCode = optimizedCode.replace(/\s{2,}/g, '\n');
   document.getElementById('textoptimized').value = optimizedCode;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function secondfunctioneqormoretwo(){
 console.log("FUNCIONANDO")
let codigo = textarea.value
let optimizedCode = codigo;
let operador ;
const regex = /(ENT|CAD|FLOT)\s+([\w#]+)\s*\(\s*([\w#,\s]*)\)\s*{([\s\S]+?)}/g;
let match;
let functionsToDelete = []; // Array para guardar las funciones a eliminar
let nombreFuncionIdentificada = null;
let funcionllamadora;
while ((match = regex.exec(codigo)) !== null) {
  const tipo = match[1];
  const nombre = match[2];
  funcionllamadora= match[2];
  const parametros = match[3].split(',').map(p => p.trim()).filter(p => p !== '');
  const contenido = match[4].trim();
  let contenidoFuncion = [];
  contenido.split('\n').forEach(linea => {
    contenidoFuncion.push(linea.trim());
  });
  // buscar si hay una llamada a otra funcion dentro del contenido de esta funcion
  const regexLlamada = /(\b[\w#]+\b)\s*\(\s*([\w#,.\s]*)\s*\)/g;
  let matchLlamada;
  while ((matchLlamada = regexLlamada.exec(contenido)) !== null) {
    ////////////////////////
    //////////////////////
    const nombreLlamada = matchLlamada[1];
    const parametrosLlamada = matchLlamada[2].split(',').map(p => p.trim()).filter(p => p !== '');
    console.log("contenido de funcion identificad")
    console.log(contenidoFuncion)
    console.log("matchllamada")
    console.log(matchLlamada[0])
    console.log("nombrellamada")
    console.log(nombreLlamada)
    console.log("parametrosLlamada")
    console.log(parametrosLlamada)
//////////////////////////////////
    // buscar si la llamada usa algun parametro que coincida con el nombre de una variable de esta funcion
    let contieneParametroLlamada = true;
    for (let parametroLlamada of parametrosLlamada) {
      if (parametros.includes(parametroLlamada) || /#Ale\d+/.test(parametroLlamada)) {
        contieneParametroLlamada = true;
        break;
      }
    }
///////////////AQUI BUSCAMOS EL CONTENIDO DE LA FUNCION LLAMADA
    const regexDefFuncion = new RegExp(`(ENT|CAD|FLOT)\\s+${nombreLlamada}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{([\\s\\S]+?)}`, 'g');
const matchDefFuncion = regexDefFuncion.exec(codigo);
if (matchDefFuncion !== null) {
  const contenidoFuncionLlamada = matchDefFuncion[3].trim();
  console.log(`Contenido de la función "${nombreLlamada}":`);
  console.log(contenidoFuncionLlamada);
  const regex_OPAn = /^#Ale[0-9]*\s\=\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))(\s*[+\-*\%\/]\s*(?:#Ale\d+|\d+(?:\.\d+)?|\(\s*[?:#Ale\d+|\d+(?:\.\d+)?\-*\/\%\s]+\s*\))){1,}\s\;$/;

  const regexOperadores = /[\+\-\*\/\%]/g;
  
  let lines = contenidoFuncionLlamada.split("\n").filter(line => line != " ")
  for (let line of lines) {
    if (line.trim().match(regex_OPAn)) {
      const operadores = line.match(regexOperadores);
    console.log(line)
    console.log(operadores)
    operador=operadores[0];
    }
  }
  
}
////////////////////////////////////////////////////////
      console.log(`La función "${nombre}" llama a la función "${nombreLlamada}"`);
      functionsToDelete.push(nombreLlamada); // Agregar la función a eliminar
    
      for (let i = 0; i < contenidoFuncion.length; i++) {
        if (regex_test.test(contenidoFuncion[i])) {
          let contenido = contenidoFuncion[i];
          let palabras = contenido.split(' ');

          contenidoFuncion[i] = palabras[0]+' = '+parametrosLlamada[0]+' '+operador+' '+parametrosLlamada[1]+' ;'
        }
      }
      let nuevoContenidoFuncion = contenidoFuncion.join('\n');
      optimizedCode = optimizedCode.replace(contenido, nuevoContenidoFuncion);
    
  }
}
console.log(functionsToDelete)
// Eliminar las funciones marcadas para borrar
for (let functionName of functionsToDelete) {
  optimizedCode = optimizedCode.replace(new RegExp(`(\\b(ENT|CAD|FLOT)\\s+${functionName}\\s*\\(\\s*([^)]*?)\\s*\\)\\s*{[\\s\\S]*?})`), '');
}
//optimizedCode = optimizedCode.replace(/\s{3,}/g, '\n\n');
optimizedCode = optimizedCode.replace(/\s{2,}/g, '\n');
document.getElementById('textoptimized').value = optimizedCode;
}

// function getFunctionDetails() {
//     console.log("funcion funcionando")
//     const reFunctionDef = /(ENT|CAD|FLOT)\s+(\w+)\s*\(([^)]*)\)\s*{([^}]*)}/gm;
//     const reOp1 = /(\w+)\s*=\s*([\w\d]+\.[\w\d]+|\d+|\w+)\s*([-+\/*])\s*([\w\d]+\.[\w\d]+|\d+|\w+)/gm;
//     const reOp2 = /(\w+)\s*=\s*(\w+)\s*\(([\w\d]+|\w+)\s*,\s*([\w\d]+|\w+)\s*\)/gm;
//     let input = txtopti.value
//     let result = input;
  
//     // Replace function calls with corresponding operation
//     let m;
//     while ((m = reFunctionDef.exec(input)) !== null) {
//       const functionName = m[2];
//       const functionBody = m[3];
  
//       // Check for variable = variable/numeroentero,decimal OperadorAritmetico variable/numeroentero,decimal
//       let op1Match;
//       while ((op1Match = reOp1.exec(functionBody)) !== null) {
//         const variable = op1Match[1];
//         const operand1 = op1Match[2];
//         const operator = op1Match[3];
//         const operand2 = op1Match[4];
  
//         const replacement = `${variable} = ${operand1} ${operator} ${operand2}`;
//         result = result.replace(`${functionName} ( ${variable}, ${operand1} )`, replacement);
//       }
  
//       // Check for variable = nombrefuncion ( variable , variable )
//       let op2Match;
//       while ((op2Match = reOp2.exec(functionBody)) !== null) {
//         const variable = op2Match[1];
//         const funcName = op2Match[2];
//         const operand1 = op2Match[3];
//         const operand2 = op2Match[4];
  
//         const replacement = `${variable} = ${operand1} + ${operand2}`;
//         result = result.replace(`${funcName} ( ${variable}, ${operand1} )`, replacement);
//       }
//     }
  
//     // Return optimized code
//     const optimizedCode = result;
//     document.getElementById('textoptimized').value = optimizedCode;
//     console.log(optimizedCode)
//   }
  

function twofunction(){
    //Comenzaremos trabajando con las que solo contienen dos lineas en cada función
    let lines = textarea.value.split("\n").filter(line => line != " ")
    let linesfunction = getNumbLinesFunction();
    const txt = document.getElementById("textoptimized")
    console.log(linesfunction)
    if(linesfunction[0]>2){
      // let xd = getFunctionDetails()
      alert("la función que se llama es la que tiene más lineas")
      firstfunctionmoretwo()
       //document.getElementById('textoptimized').value = "XD";
    }else{
      alert("la función que se llama es solo contiene una linea")
      secondfunctioneqormoretwo()
    }
}

function Optimization (){
    //Primero comenzamos identificando la cantidad de funciones que hay
 const lenght = getLengthFunctions();
 switch(lenght){
    case 0:
        txtopti.value=textarea.value;
        break;
    case 1:
        txtopti.value=textarea.value;
        break;
    case 2:
        twofunction();
        break;
    }

}


function clean (){
    document.getElementById("textarea").value = "";
  txtopti.value=""
  const tablecomp = document.getElementById("table");
  tablecomp.innerHTML = `
  <tbody id="table">
  <tbody>
  `;

  const ErrorTable = document.getElementById("error");
  ErrorTable.innerHTML = `
  <thead>
    <tr>
    <th>Token</th> <th>Lexema</th> <th>Linea</th> <th>Descripcion</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
`;

  const TriploTable = document.getElementById("triplo");
  TriploTable.innerHTML= `
  <thead>
      <tr>
  <th>Linea</th><th>Dato objeto</th> <th>Dato fuente</th> <th>Operador</th>
</tr>   
</thead>
  <tbody id="triplo1">
  <tbody>
</table>
  `
}



