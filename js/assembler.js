import {cleanSpaces,regex_OPAn,LineNumberOpti,txtopti,regex_test,LineNumber,compilador,inputFile,loadButton,regex_CAD,regex_ENT,regex_FLOT,regex_TYPE,regex_aritmetics,regex_asignation,regex_asignation2,regex_boolean,regex_callfunction,regex_constfunction,regex_function,regex_function1,regex_return,regex_separator,regular_expresion,rows,table,textarea,textarea1,variable1,variable2,buttonOpti,txtassembler, regex_detectFunction } from "./regex.js";
///17/05/2023 comienza el ensamblador
compilador.addEventListener("click", (e) => {
    e.preventDefault()
    Assembler()
  });


function Assembler(){
    let TextToPrint= ""
    let lines = txtopti.value.split("\n").filter(line => line != " ") 
    
        for (let line of lines) {

            if(line.match(regex_detectFunction)){
                console.log(TextToPrint)
                TextToPrint+="JMP Asigna_Parametros\n"
                TextToPrint+="INICIO:\n"
            
                }//END OF THE FUNCTION DETECT
        //Here we check the type of asignation A = B
        if (line.match(regex_asignation2)) { 
            let parts = line.split(/\s|[(,)]+/); //Split the line in parts for use eachone
            TextToPrint+= "MOV AX, "+parts[2]+"\n"           
            TextToPrint+= "MOV "+parts[0]+", AX\n"
            TextToPrint+= "\n";
        }//END OF THE FUNCTION TO ASIGNATION
    
    //////////////////////////////////////////////
       //Here we analyze the OPA A = B OPA C ;      A = B + C
       if (line.trim().match(regex_OPAn)) {
        console.log("Lo que entro fue "+line)
        let parts = line.split(' ')
        //We use a foreach to print both registers by each OPA
            switch(parts[3]){
                case "+":
                    // x = x + 1;
                    // MOV AX, x;
                    // ADD AX, 1;
                    // MOV x, AX;
                TextToPrint+= "MOV AX, "+parts[2]+"\n";
                TextToPrint+= "ADD AX, "+parts[4]+"\n";
                TextToPrint+= "MOV "+parts[0]+", AX\n"
                TextToPrint+= "\n";
                break;
                // x = x - 1;
                // MOV AX, x;
                // SUB AX, 1;
                // MOV x, AX;
                case "-":
                TextToPrint+= "MOV AX, "+parts[2]+"\n";
                TextToPrint+= "SUB AX, "+parts[4]+"\n";
                TextToPrint+= "MOV "+parts[0]+", AX\n"
                TextToPrint+= "\n";
                break;
                
                case "*":
                    // w2 = x * z;
                    // MOV AX, X;
                    // MOV BL, Z;
                    // MUL BL;
                    // MOV W2, AX;
                    TextToPrint+= "MOV AX, "+parts[2]+"\n";
                    TextToPrint+= "MOV BL, "+parts[4]+"\n";
                    TextToPrint+= "MUL BL \n";
                    TextToPrint+= "MOV "+parts[0]+", AX\n"
                    TextToPrint+= "\n";
                break;
                case "/":
                    // x = w / 5 ;
                    // MOV AX, w;
                    // MOV BL, 5;
                    // DIV BL;
                    // MOV X, AL;
                    TextToPrint+= "MOV AX, "+parts[2]+"\n";
                    TextToPrint+= "MOV BL, "+parts[4]+"\n";
                    TextToPrint+= "DIV BL \n";
                    TextToPrint+= "MOV "+parts[0]+", AX\n"
                    TextToPrint+= "\n";
                break;
                case "%":
                    // a = w % z 
                    // MOV AL, w;
                    // MOV BL, Z;
                    // DIV BL;
                    // MOV a, AH;
                    TextToPrint+= "MOV AL, "+parts[2]+"\n";
                    TextToPrint+= "MOV BL, "+parts[4]+"\n";
                    TextToPrint+= "DIV BL \n";
                    TextToPrint+= "MOV "+parts[0]+", AH\n"
                    TextToPrint+= "\n";
                break;
            }
            
}//AQUI TERMINA EL IF DE LAS OPERACIONES ARITMETICAS
if(line.match(regex_return)){
TextToPrint+="JMP Valor_A_Retornar;\n\n"
}

if(line.match(regex_test)){
    // ASIGNA_PARAMETROS:
    // MOV AX, 3;
    // MOV X, AX;
    // MOV AX, 5;
    // MOV Y, AX;
TextToPrint+="ASIGNA_PARAMETROS\n";
TextToPrint+="MOV AX,"+"\n"
TextToPrint+="MOV "+", AX"+"\n"
TextToPrint+="MOV AX,"+"\n"
TextToPrint+="MOV "+", AX\n"
TextToPrint+="JMP INICIO\n\n"
TextToPrint+="VALOR_A_RETORNAR:\n"
TextToPrint+="MOV AX"+"\n"
TextToPrint+="MOV "+", AX;\n\n"
}

        }///AQUI SE TERMINA EL FOR PRINCIPAL
    ///////////
    //AQUI SE IMPRIME
    txtassembler.innerHTML = TextToPrint;
}




