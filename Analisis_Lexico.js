const compilador = document.getElementById('boton');
const textarea = document.getElementById("textarea");
const inputFile = document.getElementById('inputFile');
const loadButton = document.getElementById('loadButton');
const table = document.getElementById('table1');
const rows = table.rows;
const textarea1 = document.querySelector('#textarea');
const LineNumber = document.querySelector('#numeros-linea');
const regular_expresion = /#Ale[0-9]+/g
const regex_ENT = /^3[0-9]+3$/g
const regex_CAD = /(["'])[A-Z]+\1/gi
const regex_FLOT = /[0-9]+\.3[0-9]+3/gi
const regex_TYPE = /^(FLOT|CAD|ENT|return)$/
const regex_separator = /[\s\{\}\(\)\,\;]/
const regex_aritmetics= /[+]|[-]|[\/]|[*]|[%]|[=]/
const regex_boolean = /^(&&|\|\|)$/
const regex_asignation = /^#Ale[0-9]+\s=\s\w+;\s*$/
const regex_asignation2 = /^#Ale[0-9]+\s*=\s*(\S+)\s+;$/ 




loadButton.addEventListener('click', function(e) {
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
  reader.addEventListener('load', function(event) {
    textarea.value = event.target.result;
    countlines()
  });
  
  // Leer el archivo como texto
  reader.readAsText(file);
});

compilador.addEventListener("click", (e) => {
 e.preventDefault();
 const lexema = getLexema();
 PrintTable(lexema);
Compare();
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


function Compare(){
  var counterVal = 0;
  let lines = textarea.value.split("\n").filter(line=>line!=" ")
 
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
  if(line.match(regex_asignation2)){
    const valor1 = FindWord(linelexemas[0]);
    const valor3 = FindWord(linelexemas[2]);
    // Si el valor existe, busca el valor de la tercera palabra en la tabla
    let error = "";
    if (valor1) {
      // Si ambos valores no coinciden, imprime en la tabla de errores el lexema y su incompatibilidad
      if (valor3 && valor1 !== valor3) {        
        error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor1}"</td></tr>`; 
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
  }
}

function getLexema(){
let lines = textarea.value.split("\n").filter(line=>line!=" ")
let lexemas = []

for(let line of lines){
const linelexemas = line.split(" ").filter(line=>line!=' ')

  
  for(let lexema of linelexemas){
    let lexemaEntry = {
      type: "",
      lexema
      }
      switch(linelexemas[0]){
        case "ENT":
          if(lexema.match(regular_expresion)){
            lexemaEntry = {
              type: linelexemas[0],
              lexema
            }
            lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
            if(!lexemaExist){
              lexemas.push(lexemaEntry)
            }
          }
        break;
        case "CAD":
          if(lexema.match(regular_expresion)){
            lexemaEntry = {
              type: linelexemas[0],
              lexema
            }
            lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
            if(!lexemaExist){
              lexemas.push(lexemaEntry)
            }
          }
        break;
        case "FLOT":
          if(lexema.match(regular_expresion)){
            lexemaEntry = {
              type: linelexemas[0],
              lexema
            }
            lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
            if(!lexemaExist){
              lexemas.push(lexemaEntry)
            }
          }
        break;
      }


      
      if(lexema.match(regex_ENT)){
        lexemaEntry = {
          type: "ENT",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }
      }



      if(lexema.match(regex_CAD)){
        lexemaEntry = {
          type: "CAD",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }
      }



      if(lexema.match(regex_FLOT)){
        lexemaEntry = {
          type: "FLOT",
          lexema
        }
        lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }
      }
      if(lexema.match(regex_separator)){
        lexemaEntry = {
          type: " ",
          lexema  
        }

         lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }

      }
      if(lexema.match(regex_aritmetics)){
        lexemaEntry = {
          type: " ",
          lexema  
        }

         lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }

      }


      if(lexema.match(regex_boolean)){
        lexemaEntry = {
          type: " ",
          lexema  
        }

         lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
          lexemas.push(lexemaEntry)
        }

      }

      if(lexema.match(regex_TYPE)){
        lexemaEntry = {
          type: " ",
          lexema  
        }

         lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)
        if(!lexemaExist){
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
    data += "<tr><td>" + lexema[i].lexema+ "</td><td>" + lexema[i].type;
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


 
function countlines(){
  const lineas = textarea.value.split('\n').length;
  let HTMLNumber = '';
  for (let i = 1; i <= lineas; i++) {
    HTMLNumber += i + '<br>';
  }
  LineNumber.innerHTML = HTMLNumber;
}

 textarea.addEventListener('input', function() {
  countlines();
 });


 countlines();

