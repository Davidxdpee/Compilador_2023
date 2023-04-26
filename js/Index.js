import { regex_test,LineNumber,compilador,inputFile,loadButton,regex_CAD,regex_ENT,regex_FLOT,regex_TYPE,regex_aritmetics,regex_asignation,regex_asignation2,regex_boolean,regex_callfunction,regex_constfunction,regex_function,regex_function1,regex_return,regex_separator,regular_expresion,rows,table,textarea,textarea1,variable1,variable2 } from "./regex.js";


//This is the main class that we use to begin the program, beginning with the symbol table
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
  const lexema = getLexema();
  PrintTable(lexema);
  countlines()
})



/////////////////////////////////////////////////////////////////////////////////////////
function getLexema() {
  let counterVal = 0;
  let lines = textarea.value.split("\n").filter(line => line != " ")
  let lexemas = []
  ++counterVal;
  for (let line of lines) {
    const linelexemas = line.trim().split(" ").filter(line => line != ' ')
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


    ///////////////////////////////////////
    // if(line.trim().match(regular_expresion)){
      
    //  const matches = [line].map(match => match[0]);

    //   matches.forEach((match) => {
    //     Recortamos únicamente los #Ale[0-9] y los buscamos en el array de lexemas
    //     const found = lexemas.find((lexema) => lexema.lexema === keyword);
    
    //     Si no se encuentra la palabra en el array de lexemas, la agregamos con type: vacío
    //     if (!found) {
    //       lexemas.push({ type: '', lexema: keyword });
    //     } else {
    //       Si la palabra ya existe en el array, mantemos su propiedad type actual
    //       found.type = found.type || '';
    //     }
    //   });
    
    // }
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
//Here we analyze the vars that starts with #Ale[0-9] and it does not declared
      let regex_onlyvar = /#Ale[0-9]+/  
if (lexema.match(regex_onlyvar)){
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

