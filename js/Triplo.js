import { txtopti,regex_endFunction,regex_StartFunction,regex_detectFunction,cleanSpaces,regex_OPAn, LineNumber, compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2, regex_test } from "./regex.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Here we call the botton to compile and print the table of Triplo
compilador.addEventListener("click", () => {
    print()
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Here we make the triplo

function getLexema() {

    let lines = txtopti.value.split("\n").filter(line => line != " ") 
    let counterVal = 1;
    let triploTable = []
    
        for (let line of lines) {
       
        //Here we check the type of asignation A = B
        if (line.match(regex_asignation2)) { 
            let parts = line.split(/\s|[(,)]+/); //Split the line in parts for use eachone
            triploTable.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: parts[2],
                    op: '='
                }
            )
            triploTable.push(
                {
                    line: counterVal++,
                    do: parts[0],
                    df: 'T1',
                    op: '='
                }
            )
        }  
        //Here we analyze the OPA A = B OPA C ;      A = B + C
        if (line.trim().match(regex_OPAn)) {
            ////console.log("Lo que entro fue "+line)
        let tokens = cleanSpaces(line.split(" ")) 
            //We use a foreach to print both registers by each OPA
            for(let i=1; i<tokens.length; i++){
                if (["=", "-", "/", "+", "*", "%"].includes(tokens[i])) {
                    ////console.log(tokens)
                triploTable.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: tokens[i + 1],
                    op: tokens[i]
                })
                }
            }
            triploTable.push(
                {
                    line: counterVal++,
                    do: tokens[0],
                    df: 'T1',
                    op: '='
                }
            ) 
        }
        //Here is when you call a function #Ale4 = Suma ( #Ale5 , #Ale6 ) [It can be empty or with parameters]
        if(line.match(regex_test)){
            let val = getJMPfunction();
            let parm = getParameters();
            let parf = getParametersCall();
            let numvariables = 0;
            let variables;
            const match = line.match(/\((.*?)\)/);
            if (match) {
                const content = match[1]; //Here we have the content of the function 
                
                if(content.length===1) {
                  variables = [];
                  numvariables = 0;
                }else{
                 variables = content.split(/\s*,\s*/); // Split the content in words in an array
                 numvariables = variables.length; // We get the lenght of the array
                }
              }
         //We analyze if the function its empty or with parameters
            if(numvariables>0){
                //With a cicle we make every part of the triplo with n parameters
                for (let i = 0; i < numvariables; i++) {
                triploTable.push({
                    line: counterVal++,
                    do:"T1",
                    df: parf[i].variableEnd,
                    op: '='
                })
                triploTable.push({
                    line: counterVal++,
                    do: parm[i].variableStart,
                    df: "T1",
                    op: '='
                })
             }

         //We get the length and set the JMP and the number
            let value = getJMPfunction();
            let  start = Number(value[1].startFunction) +1;
            triploTable.push({
                line: counterVal++,
                do:"",
                df: start,
                op: 'JMP'
            })

            triploTable.push(
                {
                    line: counterVal++,
                    do: "T1",
                    df: val[2].return,
                    op: '='
                }
            )
            triploTable.push(
                {
                    line: counterVal++,
                    do: val[4].startFunction,
                    df: "T1",
                    op: '='
                }
            )

//////////////////////////////////////////////////////////////////
            }else{
            //Here is when there are not parameters
             let value11 = getJMPfunction();
             let start11 = Number(value11[1].startFunction) +1;
            triploTable.push({
                line: counterVal++,
                do:"",
                df: start11,
                op: 'JMP'
            })
            triploTable.push(
                {
                    line: counterVal++,
                    do: "T1",
                    df: val[2].return,
                    op: '='
                }
            )
            triploTable.push(
                {
                    line: counterVal++,
                    do: val[4].startFunction,
                    df: "T1",
                    op: '='
                }
            )
            }

  
           
        }
      /////////////////////////////////////////////////////////////////////  
      //Here we detect where start and end the function to set the JMP
        if(line.match(regex_detectFunction)){
          let value = getJMPfunction();
          let  end = Number(value[3].endFunction);
            triploTable.push(
                {
                    line: counterVal++,
                    do: "",
                    df: end,
                    op: 'JMP'
                }
            ) 
        }

        //Here we check the return variable [return #Ale22 ;]
        //And set the triplo and the JMP
        if(line.match(regex_return)){
            let parts = line.split(/\s|[(,)]+/);
            let value = getJMPfunction();
            let  ret = Number(value[4].return) ;

            triploTable.push(
                {
                    line: counterVal++,
                    do: "",
                    df: ret,
                    op: 'JMP'
                }
            ) 
        }
    }
    //Print the table to verify if its everything is correct
    ////console.log(triploTable)
    return triploTable
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Here we get the information to set the number to jump in the JMP and
//the information necessary to complete the triplo
function getJMPfunction (){

    let lines = txtopti.value.split("\n").filter(line => line != " ")
    let num = []
    let counterVal = 1;
    let triploTable = []
    let jump=null;
    let ret=null;
    let numeroDespuesFuncion = null;
        for (let line of lines) {
   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         
//In this part we remake the function of getLexema
//but only to have the table of the triplo and get the information necessary

//Here we check the type of asignation A = B  
           if (line.match(regex_asignation2)) { 
            let parts = line.split(/\s|[(,)]+/);
            triploTable.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: parts[2],
                    op: '='
                }
            )
            triploTable.push(
                {
                    line: counterVal++,
                    do: parts[0],
                    df: 'T1',
                    op: '='
                }
            )
        }  
        //Here we analyze the OPA A = B OPA C ;      A = B + C
        if (line.trim().match(regex_OPAn)) {
        let tokens = cleanSpaces(line.split(" ")) 
            for(let i=1; i<tokens.length; i++){
                if (["=", "-", "/", "+", "*", "%"].includes(tokens[i])) {
                triploTable.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: tokens[i + 1],
                    op: tokens[i]
                })
                }
            }
            triploTable.push(
                {
                    line: counterVal++,
                    do: tokens[0],
                    df: 'T1',
                    op: '='
                }
            ) 
        }

        if(line.match(regex_return)){
            let parts = line.split(/\s|[(,)]+/);
            triploTable.push(
                {
                    line: counterVal++,
                    do: "T1",
                    df: parts[1],
                    op: '='
                }
            ) 
            triploTable.push(
                {
                    line: counterVal++,
                    do: "",
                    df: "",
                    op: 'JMP'
                }
            ) 
        }
        //We detect where end the function and get the number
        if (line.match(regex_endFunction)) {             
              numeroDespuesFuncion = counterVal;
              num.push({
                  endFunction: numeroDespuesFuncion++,
                  startFunction: '',
                  return: ''
              })
          }
  
        //We detect where start the function and ge the number to the JMP
          if (line.match(regex_StartFunction)) {             
             jump = counterVal;
              num.push({
                  endFunction: numeroDespuesFuncion,
                  startFunction: jump,
                  return: ''
              })
           
          }


        if (line.match(regex_test)) {
            let parts = line.split(/\s|[(,)]+/);
            ret = counterVal;
            let numvariables = 0;
            let variables;
            const match = line.match(/\((.*?)\)/);

            if (match) {
                const content = match[1]; //Here we have the content of the function 
                
                if(content.length===1) {
                  variables = [];
                  numvariables = 0;
                }else{
                 variables = content.split(/\s*,\s*/); // Split the content in words in an array
                 numvariables = variables.length; // We get the lenght of the array
                }
              }
                    ret += numvariables * 2 + 1;
                
            num.push({
                endFunction: '',
                startFunction: parts[0], //Here we save the first variable to can compare
                return: ret
            })
         
        }
        //Here we get the name of the variable that is returning
        if(line.match(regex_return)){
            let parts = line.split(/\s|[(,)]+/);
            num.push({
                endFunction: '',
                startFunction: '',
                return: parts[1]
            })
         
        }
        if(line.match(regex_detectFunction)){
            let numvariables = 0;
            let variables;
            let result;
            const match = line.match(/\((.*?)\)/);

            if (match) {
                const content = match[1]; //Get the parameters in the function
                variables = content.split(/\s*,\s*/); //Set it in an array
                numvariables = variables.length; // Get the lenght of the parameters
               result = Array.from(content.matchAll(/\s*#\w+\s*/g)).map(match => match[0]); 
            }
            //Case of the parameter will be 2 or 1
            if(numvariables>=2){
                num.push({
                    endFunction: result[1],
                    startFunction: result[0], //Here we set the parameters the function to dont declarate more variables
                    return: '',
                })
    
            }else{
                num.push({
                    endFunction: variables[0], //Set the unique parameter of the function
                    startFunction: '', 
                    return: '',
                })
            } 
        }   
    }
    //console.log(num)
    return num;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Here we get the parameters of the function when is declarated
function getParameters(){
    let lines = txtopti.value.split("\n").filter(line => line != " ")
    let parameters = []
    for (let line of lines) {
 if(line.match(regex_detectFunction)){
         const match = line.match(/\((.*?)\)/);
         if (match) {
                         const content = match[1]; 
      let words = content.split(/\s*,\s*/); 
      words = words.map(str => str.replace(/\s+/g, ''));
   
      for (let i = 0; i < words.length; i++) {
       let result = Array.from(words[i].matchAll(/\s*#\w+\s*/g)).map(match => match[0]);   
       //console.log(result)
         parameters.push({
        
          variableStart: result.join(' '),
          variableEnd: ''
          
        })
      } 
  }
            }   
        }
return parameters;
}

////////////////////////////////////////////////////////////////////////////////////////////
//Here we get the parameters when the function is called
function getParametersCall(){
    let lines = txtopti.value.split("\n").filter(line => line != " ")
    let parameters = []
        for (let line of lines) {
  
 if(line.match(regex_test)){

let length = getLenghtFunction(line);
if(length>0){    
const match = line.match(/\((.*?)\)/);
if (match) {
  const content = match[1].replace(/\s+/g, '');
  const words = content.split(','); 
  
      for (let i = 0; i < length; i++) {
         parameters.push({
          variableStart: '',
          variableEnd: words[i]
          
        })
      }         
                }

            }   
        }
        }
return parameters;
}

//Here we get the lenght of parameters in a fuction
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Here we gonna print the table
function print() {
    let tbody = document.getElementById("triplo1");
    let triplo =  getLexema()
    tbody.innerHTML = `
  
        <tbody id="triplo1">
        <tbody>
  `;
    triplo.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML =
            `
    <td>${item.line}</td>
    <td>${item.do}</td>
    <td> ${item.df} </td>
    <td> ${item.op} </td>
    `
        tbody.appendChild(tr)
    });
}