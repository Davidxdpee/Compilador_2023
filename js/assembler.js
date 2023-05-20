import { cleanSpaces, regex_OPAn, LineNumberOpti, txtopti, regex_test, LineNumber, compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2, buttonOpti, txtassembler, regex_detectFunction } from "./regex.js";
///17/05/2023 comienza el ensamblador
///19/05/2023 se termina el ensamblador en clase de caceres 7:53 pm xd
//button of compilador to excute everything
compilador.addEventListener("click", (e) => {
    e.preventDefault()
    Assembler()
});


function Assembler() {
    let TextToPrint = ""
    let lines = txtopti.value.split("\n").filter(line => line != " ")

    for (let line of lines) {

        if (line.match(regex_detectFunction)) {
            TextToPrint += "JMP Asigna_Parametros;\n"
            TextToPrint += "INICIO:\n"

        }//END OF THE FUNCTION DETECT
        //Here we check the type of asignation A = B
        if (line.match(regex_asignation2)) {
            let parts = line.split(/\s|[(,)]+/); //Split the line in parts for use eachone
            TextToPrint += "MOV AX, " + parts[2] + ";\n"
            TextToPrint += "MOV " + parts[0] + ", AX;\n"
            TextToPrint += "\n";
        }//END OF THE FUNCTION TO ASIGNATION

        //////////////////////////////////////////////
        //Here we analyze the OPA A = B OPA C ;      A = B + C
        if (line.trim().match(regex_OPAn)) {
            let parts = line.split(' ')
            switch (parts[3]) {
                case "+":
                    // x = x + 1;
                    // MOV AX, x;
                    // ADD AX, 1;
                    // MOV x, AX;
                    TextToPrint += "MOV AX, " + parts[2] + ";\n";
                    TextToPrint += "ADD AX, " + parts[4] + ";\n";
                    TextToPrint += "MOV " + parts[0] + ", AX;\n"
                    TextToPrint += "\n";
                    break;
                // x = x - 1;
                // MOV AX, x;
                // SUB AX, 1;
                // MOV x, AX;
                case "-":
                    TextToPrint += "MOV AX, " + parts[2] + ";\n";
                    TextToPrint += "SUB AX, " + parts[4] + ";\n";
                    TextToPrint += "MOV " + parts[0] + ", AX;\n"
                    TextToPrint += "\n";
                    break;

                case "*":
                    // w2 = x * z;
                    // MOV AX, X;
                    // MOV BL, Z;
                    // MUL BL;
                    // MOV W2, AX;
                    TextToPrint += "MOV AX, " + parts[2] + ";\n";
                    TextToPrint += "MOV BL, " + parts[4] + ";\n";
                    TextToPrint += "MUL BL; \n";
                    TextToPrint += "MOV " + parts[0] + ", AX;\n"
                    TextToPrint += "\n";
                    break;
                case "/":
                    // x = w / 5 ;
                    // MOV AX, w;
                    // MOV BL, 5;
                    // DIV BL;
                    // MOV X, AL;
                    TextToPrint += "MOV AX, " + parts[2] + ";\n";
                    TextToPrint += "MOV BL, " + parts[4] + ";\n";
                    TextToPrint += "DIV BL; \n";
                    TextToPrint += "MOV " + parts[0] + ", AX;\n"
                    TextToPrint += "\n";
                    break;
                case "%":
                    // a = w % z 
                    // MOV AL, w;
                    // MOV BL, Z;
                    // DIV BL;
                    // MOV a, AH;
                    TextToPrint += "MOV AL, " + parts[2] + ";\n";
                    TextToPrint += "MOV BL, " + parts[4] + ";\n";
                    TextToPrint += "DIV BL \n";
                    TextToPrint += "MOV " + parts[0] + ", AH;\n"
                    TextToPrint += "\n";
                    break;
            }

        }//Here end the if of the aritmetics operations

        if (line.match(regex_return)) { //If to match an return / return #Ale2 ;
            TextToPrint += "JMP Valor_A_Retornar;\n\n"
        }
        //We identify when we call a function 
        if (line.match(regex_test)) {
            let returns = getReturnFunction();
            let lenght = getLenghtFunction(line);
            if (lenght > 0) {
                let parameters = getParametersFunction()
                // ASIGNA_PARAMETROS:
                // MOV AX, 3;
                // MOV X, AX;
                // MOV AX, 5;
                // MOV Y, AX;
                TextToPrint += "ASIGNA_PARAMETROS\n";
                //A for to set the asignation with N parameters
                for (let i = 0; i < lenght; i++) {
                    TextToPrint += "MOV AX," + parameters[0].parameterasignfunction1[i] + ";\n"
                    TextToPrint += "MOV " + parameters[0].parametersfunction1[i] + ", AX" + ";\n"
                }
                //Print the JMP and set the return
                TextToPrint += "JMP INICIO\n\n"
                TextToPrint += "VALOR_A_RETORNAR:\n"
                TextToPrint += "MOV AX," + returns[0].parameterreturn1 + ";\n"
                TextToPrint += "MOV " + returns[0].parameterasignreturn1 + ", AX;\n\n"
            } else {
                // In case of the function has 0 parameters
                TextToPrint += "ASIGNA_PARAMETROS:\n";
                TextToPrint += "JMP INICIO;\n\n"
                TextToPrint += "VALOR_A_RETORNAR:\n"
                TextToPrint += "MOV AX," + returns[0].parameterreturn1 + ";\n"
                TextToPrint += "MOV " + returns[0].parameterasignreturn1 + ", AX;\n\n"
            }
        }

    }/// Here finish the main for
    ///////////
    //Here we print the assembler
    txtassembler.innerHTML = TextToPrint;
}

function getReturnFunction() {
    let lines = txtopti.value.split("\n").filter(line => line != " ")
    let thingstosave = []
    let parameterreturn;
    let parameterasignreturn;
    for (let line of lines) {
        //If to get the parameter of the return
        if (line.match(regex_return)) {
            let parts = line.split(' ')
            parameterreturn = parts[1];
        }
        //If to get the paremeter to asign in the return when we call a function / #Ale3 in #Ale3 = Suma ( #Ale4 , #Ale5 ) ;
        if (line.match(regex_test)) {
            let parts = line.split(' ')
            parameterasignreturn = parts[0];
        }
    }
    //Save the information in an array
    thingstosave.push({
        parameterreturn1: parameterreturn,
        parameterasignreturn1: parameterasignreturn
    })
    return thingstosave;
}


//////////////////////////////
function getParametersFunction() {
    let lines = txtopti.value.split("\n").filter(line => line != " ")
    let parametersfunction;
    let parameterasignfunction;
    let thingstosave = []
    for (let line of lines) {
        //If to get the parameters inside of function// #Ale2,#Ale3 => ENT suma ( ENT #Ale2, ENT #Ale3 )
        if (line.match(regex_detectFunction)) {
            parametersfunction = getParameters(line);
        }
        //If to get the asign parameters inside a function call / #Ale2,#Ale3 => #Ale2 = suma ( #Ale2, #Ale3 ) ;
        if (line.match(regex_test)) {
            parameterasignfunction = getParameters(line)
        }
    }
    //Save the information in an array
    thingstosave.push({
        parametersfunction1: parametersfunction,
        parameterasignfunction1: parameterasignfunction
    })
    return thingstosave;
}

//Function to get the number of parameters that have the function
function getLenghtFunction(text) {
    let numWords = 0;
    let words;
    const match = text.match(/\((.*?)\)/);

    if (match) {
        const content = match[1];

        if (content.length === 1) {
            words = [];
            numWords = 0;
        } else {
            words = content.split(/\s*,\s*/);
            numWords = words.length;
        }

    }
    return numWords;
}

//Function to get the parameters in a function
function getParameters(line) {
    const match = line.match(/\((.*?)\)/);
    let variables;
    let result;
    if (match) {
        const content = match[1]; //Get the parameters in the function
        variables = content.split(/\s*,\s*/); //Set it in an array
        result = Array.from(content.matchAll(/\s*#\w+\s*/g)).map(match => match[0]);
    }
    return result;
}