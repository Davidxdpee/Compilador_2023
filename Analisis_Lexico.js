import { regex_test,LineNumber,compilador,inputFile,loadButton,regex_CAD,regex_ENT,regex_FLOT,regex_TYPE,regex_aritmetics,regex_asignation,regex_asignation2,regex_boolean,regex_callfunction,regex_constfunction,regex_function,regex_function1,regex_return,regex_separator,regular_expresion,rows,table,textarea,textarea1,variable1,variable2 } from "./regex.js";

let arrayGlobal = [];

let lexemaExist;

loadButton.addEventListener('click', function (e) {
  e.preventDefault();
  countlines();
  //We comprove if we choosen a file
  if (inputFile.files.length === 0) {
    alert('Por favor, seleccione un archivo');
    return;
  }
  const file = inputFile.files[0];
  const reader = new FileReader();

  //Charge the file content in the textarea
  reader.addEventListener('load', function (event) {
    textarea.value = event.target.result;
    countlines()
  });

  // Read the file as text
  reader.readAsText(file);
});

compilador.addEventListener("click", (e) => {
  e.preventDefault();
  let val1 = null;
  const arrayFunction = getInfoFunction();
  if(arrayFunction.length!==0){
    val1 = arrayFunction[0].type;
  }else{

  }
  const lexema = getLexema();
  PrintTable(lexema);
  Compare(arrayFunction);
  countlines()
 

})


function FindWord(word) {
  for (let i = 0; i < rows.length; i++) {
    const celda = rows[i].cells[0];
    if (celda.textContent === word) {
      const cell = rows[i].cells[1];
      return cell.textContent;
    }
  }
  return null;
}


function Compare(valor11){
  var counterVal = 0;
  let lines = textarea.value.trim().split("\n").filter(line=>line!=" ")
 
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
let lineCounter = 0;
  for(let line of lines){
  const linelexemas = line.split(" ").filter(line=>line!=' ')
  lineCounter++;
  let error = "";
 
///////////////////////////////////////////////////////////////////////////////

//Here we use a regex to detect when assign a variable to the method

 


//Here we check de first part of the asignation
if(line.match(regex_test)){
  let parts = line.split(/\s|[(,)]+/);
  let var1 = parts[0];
  let var2 = parts[5];
  let var3 = parts[8];
  let error = "";
  const valor3 = FindWord(var1);
 console.log("La parte 1 es "+var1+" y su valor es "+valor3+" y la parte 2 es la funcion "+valor11[0].name+" y su valor es "+valor11[0].type)
  console.log("El valor a comparar es "+valor11[0].type+" y el valor con el que se compara es "+valor3+" el cual su variable es"+var1);
  //Here we check the first word of asignation that it exist and if exists we check if is valid
  if(valor11[0].type){
    if(valor3 && valor11[0].type !== valor3){
      if(valor3 === "FLOT" && valor11[0].type === "ENT"){
            
      }else{ 
      error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor11[0].type}"</td></tr>`;
      }
      
    } else {
      if(!valor3){
        error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
      }
    }
  }
  ErrorTable.innerHTML += error;

}


/////////////////////////////////////////////////////////////////////////////////////////////



    
  if(line.match(regex_test)){
  
    //Here we check if the second word does exist and if is compatible with the asignation
    let parts = line.split(/\s|[(,)]+/);
    let var1 = parts[0];
    let var2 = parts[5];
    let var3 = parts[8];
    const valor31 = FindWord(var2);
    const valor32 = FindWord(valor11[0].variable1)
       if(valor32){
        if(valor31 && valor32 !== valor31){
          if(valor32 === "FLOT" && valor31 === "ENT"){
            
          }else{ 
          error += `<tr><td>ErrSem${++counterVal}</td><td>${var2}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor32}"</td></tr>`;
          }
        } else {
          if(!valor31){
            error += `<tr><td>ErrSem${++counterVal}</td><td>${var2}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
          }
        }
        
      }
    }

  




        
///////////////////////////////////////////////////////////////////////////////////////////////



  if(line.match(regex_test)){
    //Here we gonna check if the third word exist and if is compatible with the asignation
    let partes = line.split(/\s|[(,)]+/);
    let var1 = partes[0];
    let var2 = partes[5];
    let var3 = partes[8];
       const valor311 = FindWord(var3);
       const valor322 = FindWord(valor11[0].variable)
       if(valor322){
        if(valor311 && valor322 !== valor311){
          if(valor322 === "FLOT" && valor311 === "ENT"){
            
          }else{ 
          error += `<tr><td>ErrSem${++counterVal}</td><td>${var3}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos  es "${valor322}"</td></tr>`;
          }
        } else {
          if(!valor311){
            error += `<tr><td>ErrSem${++counterVal}</td><td>${var3}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
          }else{
  
          }
        }
      }
      ErrorTable.innerHTML += error;  
    
    }
        



///////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///Here detect if is an return
  if(line.match(regex_return)){

    let error = "";
    const valor13 = FindWord(linelexemas[1]);

if(valor11[0].type){
  if(valor13 && valor11[0].type !== valor13){
    error += `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[1]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor11[0].type}"</td></tr>`;
  } else {
    if(!valor13){
      error += `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[1]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
    }else{

    }
  }
}
ErrorTable.innerHTML += error;

  }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Here it detect if the asignation is correct from  the type A = B ;
  if(line.match(regex_asignation2)){
    const valor1 = FindWord(linelexemas[0]);
    const valor3 = FindWord(linelexemas[2]);
    //if the word exist, it find the valor in the third word of the table
    if (valor1) {
      //If both valor does not match, print in the error table the lexema and his incompatibility
      if (valor3 && valor1 !== valor3) {    
        //Here we check if the first valor is flot and the second is ENT does not enter in the error table
         if(valor1 === "FLOT" && valor3 === "ENT"){
          
         }else{
          error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor1}"</td></tr>`; 
         }
      } else {

        //If the valor of the third word doesnot exist in the table, print the lexema and undefined variable
        if (!valor3) {
          error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
        }
      }
    } else {
        //If the valor of the first word doesnot exist in the table, print the lexema and undefined variable
      error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[0]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;;

      }
     ErrorTable.innerHTML += error;
    }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
}

function getInfoFunction (){
  let arrayFunction = [];
  let lines = textarea.value.split("\n").filter(line => line != " ")
  let lexemas = []
  
  for (let line of lines) {
    const linelexemas = line.trim().split(" ").filter(line => line != ' ')

  if (line.trim().match(regex_function1)) {
    let parts = line.split(/\s|[(,)]+/);

    let type = parts[0];
    let name = parts[1];
    let variable1 = parts[5];
    let variable =parts[9];
    // console.log("Este es el texto en partes "+partes+" y la variable es "+variable)
  
    let info = {
      type,
      name,
      variable1,
      variable,
    };
    arrayGlobal.push(info);
    arrayFunction.push(info);
    }
  }
return arrayFunction;
}

/////////////////////////////////////////////////////////////////////////////////////////
function getLexema() {
  let counterVal = 0;
  let lines = textarea.value.split("\n").filter(line => line != " ")
  let lexemas = []
  ++counterVal;
  for (let line of lines) {
    const linelexemas = line.trim().split(" ").filter(line => line != ' ')
    if(line.match(regex_test)){
         //Heres comes the regex that make to match with the ENT CAD y FLOT en #Ale2 = suma ( 303 , 303 )
          var entfun = /^3[0-9]+3$/g
          var entfunmatch = line.matchAll(entfun)
  
    
          var flotfun = /^[0-9]+\.3[0-9]+3$/g
          var flotfunmatch = line.matchAll(flotfun);
          
          var cadfun = /(["'])[A-Z]+\1/gi;
          var cadfunmatch = line.matchAll(cadfun);
    }
    
    if (line.trim().match(regex_function1)) {
      let parts = line.split(/\s|[(,)]+/);
      let type = parts[0];
      let name = parts[1];
      let variable1 = parts[4];
      let variable =parts[8];
      console.log("Este es el texto en partes "+parts)
      //We are looking for a string of CAD #Alenumber
      var cadRegex = /CAD #(\w+)/g;
      var cadMatches = line.matchAll(cadRegex);
    
      let info = {
        type,
        name,
        variable1,
        variable,
      };

         //We are looking for a string of ENT #Alenumber
      var entRegex = /ENT #(\w+)/g;
      var entMatches = line.matchAll(entRegex);

      var flotRegex = /FLOT #(\w+)/g;
      var flotMatches = line.matchAll(flotRegex);


      //With the for we gonna find the coincidences of CAD # y save the valors in the array
      for (const match of cadMatches) {
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == match[1])
        if (!lexemaExist) {
          lexemas.push( {
            type: "CAD",
            lexema:"#"+match[1]
          }
            )
        }

      }

      //With the for we gonna find the coincidences of ENT # y save the valors in the array
      for (const match of entMatches) {
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == match[1])
        if (!lexemaExist) {
          lexemas.push( {
            type: "ENT",
            lexema:"#"+match[1]
          }
            )
        }
      }

      for (const match of flotMatches) {
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == match[1])
        if (!lexemaExist) {
          lexemas.push( {
            type: "FLOT",
            lexema:"#"+match[1]
          }
            )
        }

      }
    }
////////////////////////////////////////////////////////////////////////////////
    //Here we read each word of the String
    for (let lexema of linelexemas) {
      let lexemaEntry = {
        type: "",
        lexema
      }

      //Here with the switch we compare the case and save in the object to print it in the table
      switch (linelexemas[0]) {
        case "ENT":

          if (!line.match(regex_function1)) {

            if (lexema.match(regular_expresion)) {
              lexemaEntry = {
                type: linelexemas[0],
                lexema
              }
              lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
              if (!lexemaExist) {
                lexemas.push(lexemaEntry)
              }
            }

          }
          break;
        case "CAD":
          if (!line.match(regex_function1)) {

            if (lexema.match(regular_expresion)) {
              lexemaEntry = {
                type: linelexemas[0],
                lexema
              }
              lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
              if (!lexemaExist) {
                lexemas.push(lexemaEntry)
              }
            }

          }
          break;
        case "FLOT":
          if (!line.match(regex_function1)) {

            if (lexema.match(regular_expresion)) {
              lexemaEntry = {
                type: linelexemas[0],
                lexema
              }
              lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
              if (!lexemaExist) {
                lexemas.push(lexemaEntry)
              }
            }

          }
          break;
      }


//////////////////////////////////////////////////////////////////////////////////////////
//Here we made the same that the before code comparing
      if (lexema.match(regex_ENT)) {
        lexemaEntry = {
          type: "ENT",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }
      }



      if (lexema.match(regex_CAD)) {
        lexemaEntry = {
          type: "CAD",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }
      }
      if (lexema.match(regex_FLOT)) {
        lexemaEntry = {
          type: "FLOT",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }
      }
      if (lexema.match(regex_separator)) {
        lexemaEntry = {
          type: " ",
          lexema
        }

        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }

      }
      if (lexema.match(regex_aritmetics)) {
        lexemaEntry = {
          type: " ",
          lexema
        }

        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }

      }
      if (lexema.match(regex_boolean)) {
        lexemaEntry = {
          type: " ",
          lexema
        }

        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }
      }
      if (lexema.match(regex_TYPE)) {
        lexemaEntry = {
          type: " ",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == lexemaEntry.lexema)
        if (!lexemaExist) {
          lexemas.push(lexemaEntry)
        }
      }
    }
  }
  return lexemas;
}

////////////////////////////////////////////////////////////////////////////////
//Function to print the table
function PrintTable(lexema) {
  var fill = document.getElementById("table");
  var data = "";
  for (var i = 0; i < lexema.length; i++) {
    data += "<tr><td>" + lexema[i].lexema + "</td><td>" + lexema[i].type;
  }
  fill.innerHTML = data;
}

////////////////////////////////////////////////////////////////////////////////
clean.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("textarea").value = "";
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

})


////////////////////////////////////////////////////////////////////////////////
function countlines() {
  const lineas = textarea.value.split('\n').length;
  let HTMLNumber = '';
  for (let i = 1; i <= lineas; i++) {
    HTMLNumber += i + '<br>';
  }
  LineNumber.innerHTML = HTMLNumber;
}

textarea.addEventListener('input', function () {
  countlines();
});
////////////////////////////////////////////////////////////////////////////////

countlines();

