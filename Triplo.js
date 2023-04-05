import { regex_detectFunction,cleanSpaces,regex_OPAn, LineNumber, compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2, regex_test } from "./regex.js";


compilador.addEventListener("click", () => {
   
    print()
})

//////////////////////////////////////////////////////////////

function prueba (){
    const codigo = `ENT #Ale1 , #Ale2 ;
CAD #Ale3 , #Ale4 ;
FLOT #Ale5 ;
#Ale1 = #Ale1 + #Ale2 ;
FLOT Suma ( ENT #Ale22 , FLOT #Ale23 )
{
ENT #Ale24 ;
#Ale22 = 303 ;
#Ale24 = 323 ;
#Ale23 = #Ale24 + #Ale22 ;
return #Ale23 ;
}

#Ale5 = #Ale2 - #Ale1 ;
#Ale5 = Suma (#Ale1 , #Ale2 ) ;
#Ale3 = "Hola" ;`;

const regex = /FLOT Suma \(\s*(ENT|CAD|FLOT)\s+#[a-zA-Z0-9]+\s*,\s*(ENT|CAD|FLOT)\s+#[a-zA-Z0-9]+\s*\)\s*\{([\s\S]*)\}/;

const match = codigo.match(regex);

if (match) {
  const inicio = codigo.slice(0, match.index).split('\n').length;
  const fin = inicio + match[0].split('\n').length - 1;
  console.log(`La función empieza en la línea ${inicio} y termina en la línea ${fin}`);
} else {
  console.log('No se encontró la función');
}
}

let triploOriginal = {
    linea: '',
    do: '',
    df: '',
    op: ''
}




function getLexema() {
    const regex_endFunction = /^\}\s*$/;
    
    let lines = textarea.value.split("\n").filter(line => line != " ")
    let num = []
    let counterVal = 1;
    let tablaTriplo = []
    
    let numeroDespuesFuncion = null;
        for (let line of lines) {
        const linelexemas = line.trim().split(" ").filter(line => line != ' ')
       

        // Aqui serían los que solo es de tipo A = B

        if (line.match(regex_asignation2)) { 
            let parts = line.split(/\s|[(,)]+/);
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: parts[2],
                    op: '='
                }
            )
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: parts[0],
                    df: 'T1',
                    op: '='
                }
            )
        }  
        //Aqui los de tipo A = Operacion con n elementos
        if (line.trim().match(regex_OPAn)) {
        let tokens = cleanSpaces(line.split(" ")) 
            for(let i=1; i<tokens.length; i++){
                if (["=", "-", "/", "+", "*", "%"].includes(tokens[i])) {
                tablaTriplo.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: tokens[i + 1],
                    op: tokens[i]
                })
                }
            }
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: tokens[0],
                    df: 'T1',
                    op: '='
                }
            ) 
        }

        if(line.match(regex_test)){
            console.log("Se detecto la llamada ala funcion:"+line+" en la linea "+counterVal);
            
            let numPalabras = 0;
            let palabras;
            let parts = line.split(/\s|[(,)]+/);
            console.log("El tamaño de la función es "+parts.length)
            const match = line.match(/\((.*?)\)/);

            if (match) {
              const contenido = match[1]; // Obtener el contenido capturado entre los paréntesis
               palabras = contenido.split(/\s*,\s*/); // Dividir el contenido en palabras utilizando coma y espacios como separadores
               numPalabras = palabras.length; // Obtener el número de palabras
              console.log(`Número de palabras dentro de los paréntesis: ${numPalabras}`);
            }

            
            if(numPalabras>0){
                console.log("Función con parámetros");

             if(numPalabras>=2){
                console.log("Es de 2 parámetros bro")
                tablaTriplo.push({
                    line: counterVal++,
                    do:"T1",
                    df: palabras[0],
                    op: '='
                })
                tablaTriplo.push({
                    line: counterVal++,
                    do:"PX1",
                    df: "T1",
                    op: '='
                })

                tablaTriplo.push({
                    line: counterVal++,
                    do:"T1",
                    df: palabras[1],
                    op: '='
                })
                tablaTriplo.push({
                    line: counterVal++,
                    do:"PX2",
                    df: "T1",
                    op: '='
                })

              

             }else{
                console.log("Es de un parámetro bro")
                tablaTriplo.push({
                    line: counterVal++,
                    do:"T1",
                    df: palabras[0],
                    op: '='
                })
                tablaTriplo.push({
                    line: counterVal++,
                    do:"PX1",
                    df: "T1",
                    op: '='
                })

             }   

            }else{
                console.log("Funcion sin parámetros")
            }
            
            let valor = getJMPfunction();
            let  start = Number(valor[0].startFunction) +1;
            tablaTriplo.push({
                line: counterVal++,
                do:"",
                df: start,
                op: 'JMP'
            })
        }
      
        if(line.match(regex_detectFunction)){
          //  console.log("Se detecto la funcion:"+line);
            
            let valor = getJMPfunction();
          let  end = Number(valor[2].endFunction) +2;
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: "",
                    df: end,
                    op: 'JMP'
                }
            ) 
        }


        if(line.match(regex_return)){
            let parts = line.split(/\s|[(,)]+/);
            let valor = getJMPfunction();
            let  ret = Number(valor[3].return) +1;
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: "T1",
                    df: parts[1],
                    op: '='
                }
            )
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: valor[3].startFunction,
                    df: "T1",
                    op: '='
                }
            )
            
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: "",
                    df: ret,
                    op: 'JMP'
                }
            ) 
        }



    }
    // console.log(triploOriginal, triplo)
    console.log(tablaTriplo)
    return tablaTriplo

  


}


function getJMPfunction (){
    const regex_StartFunction = /^\{\s*$/;
   const regex_endFunction = /^\}\s*$/;
    let lines = textarea.value.split("\n").filter(line => line != " ")
    let num = []
    let counterVal = 1;
    let tablaTriplo = []
    let ejemplo=null;
    let ret=null;
    let numeroDespuesFuncion = null;
        for (let line of lines) {
        const linelexemas = line.trim().split(" ").filter(line => line != ' ')
       

        // Aqui serían los que solo es de tipo A = B

        if (line.match(regex_asignation2)) { 
            let parts = line.split(/\s|[(,)]+/);
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: parts[2],
                    op: '='
                }
            )
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: parts[0],
                    df: 'T1',
                    op: '='
                }
            )
        }  
        //Aqui los de tipo A = Operacion con n elementos
        if (line.trim().match(regex_OPAn)) {
        let tokens = cleanSpaces(line.split(" ")) 
            for(let i=1; i<tokens.length; i++){
                if (["=", "-", "/", "+", "*", "%"].includes(tokens[i])) {
                tablaTriplo.push(
                {
                    line: counterVal++,
                    do: 'T1',
                    df: tokens[i + 1],
                    op: tokens[i]
                })
                }
            }
            tablaTriplo.push(
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

            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: "T1",
                    df: parts[1],
                    op: '='
                }
            )
            
            tablaTriplo.push(
                {
                    line: counterVal++,
                    do: "",
                    df: "Aquivaelnumero",
                    op: 'JMP'
                }
            ) 
        }

        if (line.match(regex_endFunction)) {
            //  console.log("Se termino la funcion:" + line);
             
              numeroDespuesFuncion = counterVal;
              num.push({
                  endFunction: numeroDespuesFuncion++,
                  startFunction: '',
                  return: ''
              })
              
         //     console.log("El numero es ; "+numeroDespuesFuncion)
          
          }
  
  
          if (line.match(regex_StartFunction)) {
            //  console.log("Se comienza la funcion:" + line);
             
             ejemplo = counterVal;
              
              //console.log("El numero es ; "+ejemplo)
  
              num.push({
                  endFunction: numeroDespuesFuncion,
                  startFunction: ejemplo,
                  return: ''
              })
           
          }


        if (line.match(regex_test)) {
            console.log("Se toma el return en:" + line);
            let parts = line.split(/\s|[(,)]+/);
              ret = counterVal;
            console.log("El numero es del la llamada es ; "+ret)



            let numPalabras = 0;
            let palabras;
            const match = line.match(/\((.*?)\)/);

            if (match) {
              const contenido = match[1]; // Obtener el contenido capturado entre los paréntesis
               palabras = contenido.split(/\s*,\s*/); // Dividir el contenido en palabras utilizando coma y espacios como separadores
               numPalabras = palabras.length; // Obtener el número de palabras
              console.log(`Número de palabras dentro de los paréntesis: ${numPalabras}`);
            }
            if(numPalabras>=2){
                ret =ret+6;
            }else{
                ret= ret +4;
            }






            num.push({
                endFunction: '',
                startFunction: parts[0], //Se lo asigno a startfunction pero es nada más el segundo valor asignado al
                return: ret
            })
         
        }

        if(line.match(regex_return)){
            let parts = line.split(/\s|[(,)]+/);
            num.push({
                endFunction: '',
                startFunction: '',
                return: parts[1]
            })
         
        }
    }
   
    console.log(num)
    return num;

}
//Se cuentan cuantos JUMPS hay y dependiendo de eso es la sumatoria
function NJUMP(){
    var tabla = document.getElementById("triplo");
    let suma = 0;
    // Inicializa un contador
    var contador = 0;
    
    // Recorre todas las filas de la tabla
    for (var i = 0; i < tabla.rows.length; i++) {
      var fila = tabla.rows[i];
      
      // Recorre todas las celdas de la fila
      for (var j = 0; j < fila.cells.length; j++) {
        var celda = fila.cells[j];
        
        // Compara el contenido de la celda con la palabra deseada
        if (celda.innerHTML === "JMP") {
          contador++;
            if(contador===3){
                suma=2;
            }else{
                suma=1;
            }
          
        }
      }
    }
    return suma;
}

function print() {
    var tbody = document.getElementById("triplo1");
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
    console.log(triploOriginal);
}