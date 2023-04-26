import { regex_test,LineNumber,compilador,inputFile,loadButton,regex_CAD,regex_ENT,regex_FLOT,regex_TYPE,regex_aritmetics,regex_asignation,regex_asignation2,regex_boolean,regex_callfunction,regex_constfunction,regex_function,regex_function1,regex_return,regex_separator,regular_expresion,rows,table,textarea,textarea1,variable1,variable2 } from "./regex.js";

let arrayGlobal = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
compilador.addEventListener("click", (e) => {
    e.preventDefault();
    let val1 = null;
    const arrayFunction = getInfoFunction();
    if(arrayFunction.length!==0){
      val1 = arrayFunction[0].type;
    }else{
  
    }
    Compare(arrayFunction);
  })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function to find words in the table of symbols

function FindWord(word) {
  for (let i = 0; i < rows.length; i++) {
    const celda = rows[i].cells[0];
    if (celda.textContent === word) {
      const cell = rows[i].cells[1];
      return cell.textContent || null;
    }
  }
  return null;
}

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //To get and make the error table
  
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
  
  
  
  //Here we check de first part of the asignation that is #Ale5  in #Ale5 = Suma ( P , P)

  if(line.match(regex_test)){
    let parts = line.split(/\s|[(,)]+/);
    let error = "";
    let var1 = parts[0];
    const valor3 = FindWord(var1);

    if(valor11[0].type){
      if(typeof valor3 === "undefined" || valor3 === null || (typeof valor3 === "string" && valor3.trim() === "")){
        error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
      }else if(valor3 && valor11[0].type !== valor3){
        if(valor3 === "FLOT" && valor11[0].type === "ENT"){
                  
        }else{ 
          error += `<tr><td>ErrSem${++counterVal}</td><td>${var1}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor3}"</td></tr>`;
          }
      }
    }

  
    ErrorTable.innerHTML += error;
  }



  ////////////////////////////////////////////////////////////////////////// /////////////////////////////////

    ///Here detect if is an return
  if(line.match(regex_return)){  
   let error = "";
      const valor13 = FindWord(linelexemas[1]);
      const cell = FindWord(linelexemas[1]);
      console.log(cell)
      console.log(cell.textContent)
      if(!cell || typeof cell.textContent === "undefined" || cell.textContent === "") {
        console.log("La variable "+linelexemas[1]+" se encontró pero no tiene dato")
}

if(valor11[0].type){
  if(typeof valor13 === "undefined" || valor13 === null || (typeof valor13 === "string" && valor13.trim() === "")){
      error += `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[1]}</td><td>${lineCounter}</td><td>Variable nula o indefinida</td></tr>`;
  } else if(valor11[0].type !== valor13){
      if(valor11[0].type === "FLOT" && valor13 === "ENT"){
          // do nothing
      } else {
          error += `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[1]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor11[0].type}"</td></tr>`;
      }
  }
}

  ErrorTable.innerHTML += error;
  
    }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Here we check the parameters inside of a fuction  #Ale33 , #Ale44 in #Ale2 = Suma ( #Ale33 , #Ale44 )
  if (line.match(regex_test)) {
    let length = getLenghtFunction(line);
if(length>0){    
    const match = line.match(/\((.*?)\)/);
if (match) {
  const content = match[1]; 
  let words = content.split(/\s*,\s*/); 
  words = words.map(str => str.replace(/\s+/g, ''));
  for (let i = 0; i < words.length; i++) {
    
    const valor = FindWord(words[i]);
    const valor2 = FindWord(valor11[i].variable)
    console.log(valor)

    if(valor2){
      if(typeof valor === "undefined" || valor === null || (typeof valor === "string" && valor.trim() === "")){
        error += `<tr><td>ErrSem${++counterVal}</td><td>${words[i]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
      } else  if(valor2 !== valor){
        if(valor2 === "FLOT" && valor === "ENT"){
        }else{
          error += `<tr><td>ErrSem${++counterVal}</td><td>${words[i]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor2}"</td></tr>`;
        }
      }
    }




  //  if (valor) {
  //   if(valor2 && valor !== valor2){
  //     if(valor2 === "FLOT" && valor === "ENT"){
            
  //     }else{ 
  //         error += `<tr><td>ErrSem${++counterVal}</td><td>${words[i]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor2}"</td></tr>`;
  //     }
  //   }
  // }else{
  //               error += `<tr><td>ErrSem${++counterVal}</td><td>${words[i]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
  // }
  
     }
  }
}else{
  console.log("No hay parámetros")
}
ErrorTable.innerHTML += error;
}
  
///////////////////////////////////////////////////////////////////
  //Here it detect if the asignation is correct from  the type A = B ;
    if(line.match(regex_asignation2)){
      //Here we have the first word A in A = B
      const valor1 = FindWord(linelexemas[0]);
      //Here we have the second word B in A = B
      const valor3 = FindWord(linelexemas[2]);

if(valor1){
      //If the valor of the second word doesnot exist in the table, print the lexema and undefined variable
  if(typeof valor3 === "undefined" || valor3 === null || (typeof valor3 === "string" && valor3.trim() === "")){
    error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;
  } else  if(typeof valor1 === "undefined" || valor1 === null || (typeof valor1 === "string" && valor1.trim() === "")){
    //If the valor of the first word doesnot exist in the table, print the lexema and undefined variable
  error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[0]}</td><td>${lineCounter}</td><td>Variable indefinida</td></tr>`;;
  
  }else if(valor1!== valor3){
     //Here we check if the first valor is flot and the second is ENT does not enter in the error table
    if(valor1 === "FLOT" && valor3 === "ENT"){
    }else{
      error+=  `<tr><td>ErrSem${++counterVal}</td><td>${linelexemas[2]}</td><td>${lineCounter}</td><td>Incompatibilidad de tipos "${valor1}"</td></tr>`; 
    }
  }
}
       ErrorTable.innerHTML += error;
      }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  }
  //Function to get information for the error table
  function  getInfoFunction (){
    let lines = textarea.value.split("\n").filter(line => line != " ")
    let parameters=[];

  for (let line of lines) {
    if (line.trim().match(regex_function1)) {
      let parts = line.split(/\s|[(,)]+/);
  
    //Here we use and function to know how many parameters have the function

    let numWords = 0;
    let words;
    const match = line.match(/\((.*?)\)/);
    if (match) {
      const content = match[1]; 
      
      if(content.length===1) {
        words = [];
        numWords = 0;
      }else{
       words = content.split(/\s*,\s*/); 
       numWords = words.length; 
      }
       
    }
    if(numWords>0){
      const match = line.match(/\((.*?)\)/);
      if (match) {
      const content = match[1]; 
      let words = content.split(/\s*,\s*/); 
      words = words.map(str => str.replace(/\s+/g, ''));
   
      for (let i = 0; i < words.length; i++) {
       let result = Array.from(words[i].matchAll(/\s*#\w+\s*/g)).map(match => match[0]);   
       console.log(result)
         parameters.push({
          type : parts[0],
          name : parts[1],
          variable: result.join(' ')
          
        })
      }
   
      }
    }else{
      parameters.push({
        type : parts[0],
        name : parts[1],
        variable: ''
        
      })
    }
    }
  }
  return parameters;
  }
  //Function to get the lenght of the Function
  function getLenghtFunction(text){
    let numWords = 0;
    let words;
    const match = text.match(/\((.*?)\)/);
  
    if (match) {
      const content = match[1]; 
      
      if(content.length===1) {
        words = [];
        numWords = 0;
      }else{
       words = content.split(/\s*,\s*/); 
       numWords = words.length; 
      }
       
    }
    return numWords;
  }








  