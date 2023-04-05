//Here we gonna save every const to use in any document

export const variable1 = "Hola";
export const variable2 = "Mundo";
export const compilador = document.getElementById('boton');
export const textarea = document.getElementById("textarea");
export const inputFile = document.getElementById('inputFile');
export const loadButton = document.getElementById('loadButton');
export const table = document.getElementById('table1');
export const rows = table.rows;
export const textarea1 = document.querySelector('#textarea');
export const LineNumber = document.querySelector('#numeros-linea');
export const regular_expresion = /#Ale[0-9]+/g
export const regex_ENT = /^3[0-9]+3$/g
export const regex_CAD = /(["'])[A-Z]+\1/gi
export const regex_FLOT = /^[0-9]+\.3[0-9]+3$/g
export const regex_TYPE = /^(FLOT|CAD|ENT|return)$/
export const regex_separator = /[\s\{\}\(\)\,\;]/
export const regex_aritmetics = /[+]|[-]|[\/]|[*]|[%]|[=]/
export const regex_boolean = /^(&&|\|\|)$/
export const regex_asignation = /^#Ale[0-9]+\s=\s\w+;\s*$/
export const regex_asignation2 = /^#Ale[0-9]+\s*=\s*(\S+)\s+;$/
export const regex_function = /^\w+\s+(FLOT|CAD|ENT)\s*\(\s*(?:(?:\w+\s+\w+)|(?:\w+))?(?:\s*,\s*(?:(?:\w+\s+\w+)|(?:\w+)))*\s*\)$/
export const regex_function1 = /^(FLOT|CAD|ENT)\s[a-zA-Z]+\s\(\s(FLOT|CAD|ENT)\s#Ale[0-9]+\s\,\s(FLOT|CAD|ENT)\s#Ale[0-9]+\s\)$/
export const regex_return = /^return\s/
export const regex_constfunction = /^#Ale[0-9]+\s\=\s[a-zA-Z]+\s\(\s#Ale[0-9]+\s\,\s#Ale[0-9]+\s\)\s\;$/;
export const regex_callfunction = /^(#Ale\d+|3\d+3|(["'])\b[a-zA-Z]+\b\1|[0-9]+\.3[0-9]+3)/;
export const regex_test = /^#Ale[0-9]+\s\=\s[a-zA-Z]+\s\(\s/;
export const regex_OPAn = /^#Ale[0-9]*\s\=\s*(?:#Ale\d+|\d+|\(\s*[?:#Ale\d+|\d+\-*\/\s]+\s*\))(\s*[+\-*\/]\s*(?:#Ale\d+|\d+|\(\s*[?:#Ale\d+|\d+\-*\/\s]+\s*\))){1,}\s\;$/
export const cleanSpaces = (arr) => arr.filter(element => element != "")
export const regex_detectFunction = /^(FLOT|CAD|ENT)\s[a-zA-Z]+\s\(/