const compilador = document.getElementById('boton');
const textarea = document.getElementById("textarea");
const importbutton = document.getElementById("import")
const regular_expresion = /#Ale[0-9]+/g
const regex_ENT = /^3[0-9]+3$/g
const regex_CAD = /(["'])[A-Z]+\1/gi
const regex_FLOT = /[0-9]+\.3[0-9]+3/gi
const regex_TYPE = /^(FLOT|CAD|ENT|return)$/
const regex_separator = /[\s\{\}\(\)\,\;]/
const regex_aritmetics= /^([+]|[-]|[\/]|[*]|[%]|[=])$/
const regex_boolean = /^(&&|\|\|)$/
const regex_letters = /[A-Z]/i


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
    var content = e.target.result;
    showText(content);
  };
  lector.readAsText(archivo);
}

function showText(content) {
  var elemento = document.getElementById('textarea');
  elemento.innerHTML = content;
  countlines();
}



function getLexema(){
let contador = 0;
let lines = textarea.value.split("\n").filter(line=>line!=" ")
let lexemas = []
for(let i = 0; i<lines.length;i++){
for(let line of lines){
const linelexemas = line.split(" ").filter(line=>line!=' ')

  for(let lexema of linelexemas){
    let lexemaEntry = {
      type: "",
      lexema
      }

      console.log(Object.values(lexemaEntry))
      
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

      if(lexema.match(regex_letters)){
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

      contador++;
    
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

 const textarea1 = document.querySelector('#textarea');
 const numerosLinea = document.querySelector('#numeros-linea');
 
function countlines(){
  const lineas = textarea.value.split('\n').length;
  let numerosLineaHtml = '';
  for (let i = 1; i <= lineas; i++) {
    numerosLineaHtml += i + '<br>';
  }
  numerosLinea.innerHTML = numerosLineaHtml;
}

 textarea.addEventListener('input', function() {
  countlines();
 });


 countlines();



