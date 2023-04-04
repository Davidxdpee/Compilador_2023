import { cleanSpaces,regex_OPAn, LineNumber, compilador, inputFile, loadButton, regex_CAD, regex_ENT, regex_FLOT, regex_TYPE, regex_aritmetics, regex_asignation, regex_asignation2, regex_boolean, regex_callfunction, regex_constfunction, regex_function, regex_function1, regex_return, regex_separator, regular_expresion, rows, table, textarea, textarea1, variable1, variable2 } from "./regex.js";
compilador.addEventListener("click", () => {
   
    print()
})

//////////////////////////////////////////////////////////////


let tem = []
let triploOriginal = {
    linea: '',
    do: '',
    df: '',
    op: ''
}
tem = [triploOriginal]



function getLexema() {

    console.log("Dato objeto  Dato fuente Operador")

    let lines = textarea.value.split("\n").filter(line => line != " ")
    let lexemas = []
    let counterVal = 1;
    let tablaTriplo = []
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
    }
    // console.log(triploOriginal, triplo)
    console.log(tablaTriplo)
    return tablaTriplo

  


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