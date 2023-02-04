// const compilador = document.getElementById('boton');
// const textarea = document.getElementById("textarea");
// const importbutton = document.getElementById("import")
// let datatype = "Hola";

// importbutton.addEventListener("click", () => {



// })


// compilador.addEventListener("click", (e) => {
//   e.preventDefault();
//   const declarations = obtenerDeclaraciones()
//   const arraynorepeat = removewords(declarations);
  
//   PrintTable(arraynorepeat);
// })

// function PrintTable(table) {
//   var fill = document.getElementById("tabla");
//   var data = "";

//   console.log(table)
//   for (var i = 0; i < table.length; i++) {
//     data += "<tr><td>" + table[i] + "</td><td>" + datatype;

//   }
//   fill.innerHTML = data;
// }

// function obtenerDeclaraciones(){
//   const lines = textarea.value.split("\n");
//   let declarations = [];
  
//   for (let line of lines) {
//     let lineWords = line.split(" ");
    
//     if(lineWords[0] === "ENT" || lineWords[0] === "CAD" || lineWords[0] === "FLOT"){
//       declarations.push(
//         line.match(/#Ale[0-9]+/g).map(d => ({type: lineWords[0], variable : d}))
//       )
//     }

//   }
//   return declarations.flat()
// }

// function read() {
//   //const lines = textarea.value.split("/[\s,\.]+/");
//   const lines = textarea.value.split("\n");
//   let words = [];
//   for (let line of lines) {
//     let lineWords = line.split(" ");

//     words = words.concat(lineWords);

//   }
//   words.filter((word, index, self) => self.indexOf(word) === index);
//   return words;
// }

// function removewords(declarations) {
//   let array = read();
//   return array.filter((word, index, self) => {
//     return self.indexOf(word) === index
//   })
// }



const compilador = document.getElementById('boton');
const textarea = document.getElementById("textarea");
const importbutton = document.getElementById("import")
const regular_expresion = /#Ale[0-9]+/g
const clean = document.getElementById("clean");





document.getElementById('fileinput').addEventListener('change', readfile, false);


compilador.addEventListener("click", (e) => {
 e.preventDefault();
 const lexema = getLexema();
 PrintTable(lexema);
})


function readfile(e){
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    showText(contenido);
  };
  lector.readAsText(archivo);
}

function showText(contenido) {
  var elemento = document.getElementById('textarea');
  elemento.innerHTML = contenido;
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
          }
        break;
         
        case "CAD":
          if(lexema.match(regular_expresion)){
            lexemaEntry = {
              type: linelexemas[0],
              lexema
            }
          }
        break;

        case "FLOT":
          if(lexema.match(regular_expresion)){
            lexemaEntry = {
              type: linelexemas[0],
              lexema
            }
          }
        break;
      }
     

      let lexemaExist = !!lexemas.find(lexema=>lexema.lexema == lexemaEntry.lexema)

      if(!lexemaExist){
        lexemas.push(lexemaEntry)
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
  // document.getElementById("table").innerHTML = "";

 })