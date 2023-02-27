//Here we declare every variable that we need to access
const compilador = document.getElementById('boton');
const textarea = document.getElementById("textarea");
const inputFile = document.getElementById('inputFile');
const loadButton = document.getElementById('loadButton');
const table = document.getElementById('table1');
const rows = table.rows;
const textarea1 = document.querySelector('#textarea');
const LineNumber = document.querySelector('#numeros-linea');


//Here we have only Regular Expression
const regular_expresion = /#Ale[0-9]+/g
const regex_ENT = /^3[0-9]+3$/g
const regex_CAD = /(["'])[A-Z]+\1/gi
const regex_FLOT = /^[0-9]+\.3[0-9]+3$/g
const regex_TYPE = /^(FLOT|CAD|ENT|return)$/
const regex_separator = /[\s\{\}\(\)\,\;]/
const regex_aritmetics = /[+]|[-]|[\/]|[*]|[%]|[=]/
const regex_boolean = /^(&&|\|\|)$/
const regex_asignation = /^#Ale[0-9]+\s=\s\w+;\s*$/
const regex_asignation2 = /^#Ale[0-9]+\s*=\s*(\S+)\s+;$/
const regex_function = /^\w+\s+(FLOT|CAD|ENT)\s*\(\s*(?:(?:\w+\s+\w+)|(?:\w+))?(?:\s*,\s*(?:(?:\w+\s+\w+)|(?:\w+)))*\s*\)$/
const regex_function1 = /^(FLOT|CAD|ENT)\s[a-zA-Z]+\s\(\s(FLOT|CAD|ENT)\s#Ale[0-9]+\s\,\s(FLOT|CAD|ENT)\s#Ale[0-9]+\s\)$/
const regex_return = /^return\s#Ale[0-9]+\s\;$/
const regex_constfunction = /^#Ale[0-9]+\s\=\s[a-zA-Z]+\s\(\s#Ale[0-9]+\s\,\s#Ale[0-9]+\s\)\s\;$/;
const regex_callfunction = /^(#Ale\d+|3\d+3|(["'])\b[a-zA-Z]+\b\1|[0-9]+\.3[0-9]+3)/;
let arrayGlobal = [];



loadButton.addEventListener('click', function (e) {
  e.preventDefault();
  countlines();
  // Comprobar si se ha seleccionado un archivo
  if (inputFile.files.length === 0) {
    alert('Por favor, seleccione un archivo');
    return;
  }
  const file = inputFile.files[0];
  const reader = new FileReader();

  // Cargar el contenido del archivo en el textarea
  reader.addEventListener('load', function (event) {
    textarea.value = event.target.result;
    countlines()
  });

  // Leer el archivo como texto
  reader.readAsText(file);
});

compilador.addEventListener("click", (e) => {
  e.preventDefault();
  let valor1 = null;
  const arrayFunction = getInfoFunction();
  if(arrayFunction.length!==0){
   valor1 = arrayFunction[0].tipo;
    console.log("El valor de la variable impresa por medio del metodo es "+valor1);  
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
//Aqui detecta cuando asignamos a una variable la suma
  regex_test = /^#Ale[0-9]+\s\=\s[a-zA-Z]+\s\(\s/;



//Aqui checamos si la primera
if(line.match(regex_test)){
  console.log("La linea de asignacion es: "+line);
  let partes = line.split(/\s|[(,)]+/);
  let var1 = partes[0];
  let var2 = partes[5];
  let var3 = partes[8];

  let error = "";
  const valor3 = FindWord(var1);
 console.log("La parte 1 es "+var1+" y su valor es "+valor3+" y la parte 2 es la funcion "+valor11[0].nombre+" y su valor es "+valor11[0].tipo)
  console.log("El valor a comparar es "+valor11[0].tipo+" y el valor con el que se compara es "+valor3+" el cual su variable es"+var1);
  //Aqui checamos que la primera palabra exista y si existe checamos si es valida o no
  
 
  if(valor11[0].tipo){
    if(valor3 && valor11[0].tipo !== valor3){
      if(valor3 === "FLOT" && valor11[0].tipo === "ENT"){
            
      }else{ 
      error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor11[0].tipo}"</td></tr>`;
      }
      
    } else {
      if(!valor3){
        error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
      }
    }
  }
  ErrorTable.innerHTML += error;

}














    
  if(line.match(regex_test)){
    //Aqui vamos a checar si la segunda palabra existe y si es compatible con su asignación
    let partes = line.split(/\s|[(,)]+/);
    let var1 = partes[0];
    let var2 = partes[5];
    let var3 = partes[8];
       const valor31 = FindWord(var2);
       const valor32 = FindWord(valor11[0].variable1)
      //  console.log("la variable 1 es "+valor11[0].variable1 +" y el valor del tipo de variable anterior es "+valor32)
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

  




        




  if(line.match(regex_test)){
    //Aqui vamos a checar si la tercera palabra existe y si es compatible con su asignación
    let partes = line.split(/\s|[(,)]+/);
    let var1 = partes[0];
    let var2 = partes[5];
    let var3 = partes[8];
       const valor311 = FindWord(var3);
       const valor322 = FindWord(valor11[0].variable)
       console.log("la variable 1 es "+valor11[0].variable +" y el valor del tipo de variable anterior es "+valor322+" y su variable a comparar es "+var3)
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

  ///Aquí detecta si es un return
  if(line.match(regex_return)){
   // console.log("La linea de return es "+line);
  //  console.log(linelexemas[1]);
    let error = "";
    const valor13 = FindWord(linelexemas[1]);
  // console.log("El primer valor es "+valor11+" y el segundo valor es "+valor3)
    for (let i = 0; i < arrayGlobal.length; i++) {
  //   console.log(arrayGlobal[i]);
   }
   //console.log("Primer elemento "+valor11+" segundo elemento "+arrayGlobal[0].nombre);

if(valor11[0].tipo){
  if(valor13 && valor11[0].tipo !== valor13){
    error += `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[1]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor11[0].tipo}"</td></tr>`;
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

//Aqui se  detecta si la asignación está correcta del tipo A = B ;
  if(line.match(regex_asignation2)){
    const valor1 = FindWord(linelexemas[0]);
    const valor3 = FindWord(linelexemas[2]);
    // Si el valor existe, busca el valor de la tercera palabra en la tabla
    if (valor1) {
      // Si ambos valores no coinciden, imprime en la tabla de errores el lexema y su incompatibilidad
      if (valor3 && valor1 !== valor3) {    
         if(valor1 === "FLOT" && valor3 === "ENT"){
          
         }else{
          error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor1}"</td></tr>`; 

         }

        
      } else {
        // Si el valor de la tercera palabra no existe en la tabla, imprime el lexema y variable indefinida
        if (!valor3) {
          console.log("La palabra "+linelexemas[2]+" no existe");
          error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
        }
      }
    } else {
      // Si el valor de la primera palabra no existe en la tabla, imprime el lexema y variable indefinida
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
    let partes = line.split(/\s|[(,)]+/);

    let tipo = partes[0];
    let nombre = partes[1];
    let variable1 = partes[5];
    let variable =partes[9];
    console.log("Este es el texto en partes "+partes+" y la variable es "+variable)
  
    let info = {
      tipo,
      nombre,
      variable1,
      variable,
    };
    arrayGlobal.push(info);
    arrayFunction.push(info);
    }
  }
return arrayFunction;
}


function getLexema() {
  let counterVal = 0;
  let lines = textarea.value.split("\n").filter(line => line != " ")
  let lexemas = []
  ++counterVal;
  for (let line of lines) {
    const linelexemas = line.trim().split(" ").filter(line => line != ' ')
    const regex_test = /^#Ale[0-9]+\s\=\s[a-zA-Z]+\s\(\s/;
    if(line.match(regex_test)){
          //Aqui pondré las regex que se encargan de coincidir con el ENT CAD y FLOT en #Ale2 = suma ( 303 , 303 )
          var entfun = /^3[0-9]+3$/g
          var entfunmatch = line.matchAll(entfun)
  
    
          var flotfun = /^[0-9]+\.3[0-9]+3$/g
          var flotfunmatch = line.matchAll(flotfun);
          
          var cadfun = /(["'])[A-Z]+\1/gi;
          var cadfunmatch = line.matchAll(cadfun);

          

   
    }
    
    if (line.trim().match(regex_function1)) {
      let partes = line.split(/\s|[(,)]+/);

      let tipo = partes[0];
      let nombre = partes[1];
      let variable1 = partes[4];
      let variable =partes[8];
      console.log("Este es el texto en partes "+partes)
      // buscar todas las instancias de CAD # seguido de un identificador
      var cadRegex = /CAD #(\w+)/g;
      var cadMatches = line.matchAll(cadRegex);
    
      let info = {
        tipo,
        nombre,
        variable1,
        variable,
      };
     // arrayGlobal.push(info);


      for (let i = 0; i < arrayGlobal.length; i++) {
     //   console.log(arrayGlobal[i]);
      }
  

      // buscar todas las instancias de ENT # seguido de un identificador
      var entRegex = /ENT #(\w+)/g;
      var entMatches = line.matchAll(entRegex);

      var flotRegex = /FLOT #(\w+)/g;
      var flotMatches = line.matchAll(flotRegex);

      var typeRegex = /^(FLOT|CAD|ENT)\s[a-zA-Z]+$/g;
      var typeMatches = line.matchAll(typeRegex);

      // crear un objeto para almacenar los valores de las variables
      var variables = [];

      // iterar sobre las coincidencias de CAD # y guardar los valores en el objeto variables
      for (const match of cadMatches) {
        variables.push({ type: "CAD", name: match[1] })
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == match[1])
        if (!lexemaExist) {
          lexemas.push( {
            type: "CAD",
            lexema:"#"+match[1]
          }
            )
        }

      }

      // iterar sobre las coincidencias de ENT # y guardar los valores en el objeto variables
      for (const match of entMatches) {
        // variables[match[1]] = "ENT";
        variables.push({ type: "ENT", name: match[1] })
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
        // variables[match[1]] = "FLOT";
        variables.push({ type: "FLOT", name: match[1] })
        lexemaExist = !!lexemas.find(lexema => lexema.lexema == match[1])
        if (!lexemaExist) {
          lexemas.push( {
            type: "FLOT",
            lexema:"#"+match[1]
          }
            )
        }

      }

      // imprimir los valores de las variables
      console.log(variables);


    }

    
    for (let lexema of linelexemas) {



      let lexemaEntry = {
        type: "",
        lexema
      }
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



function PrintTable(lexema) {
  var fill = document.getElementById("table");
  var data = "";
  for (var i = 0; i < lexema.length; i++) {
    data += "<tr><td>" + lexema[i].lexema + "</td><td>" + lexema[i].type;
  }
  fill.innerHTML = data;
}

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


countlines();

