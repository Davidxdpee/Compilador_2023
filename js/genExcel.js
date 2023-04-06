// import { compilador } from "./regex";
// compilador.addEventListener("click", () => {
//    console.log("FUNCIONANDO CLASE GEN")
   
// })

//     function print(){
//     const table = document.getElementById("triplo");

//     // Convertir la tabla en una matriz de datos
//     const data = [];
//     for (let i = 0; i < table.rows.length; i++) {
//       const row = table.rows[i];
//       const rowData = [];
//       for (let j = 0; j < row.cells.length; j++) {
//         rowData.push(row.cells[j].innerText);
//       }
//       data.push(rowData);
//     }
    
//     // Crear un libro de trabajo de Excel
//     const workbook = XLSX.utils.book_new();
    
//     // Crear una hoja de trabajo y agregar la tabla de datos
//     const sheet = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(workbook, sheet, "Datos");
    
//     // Convertir el libro de trabajo a un archivo de Excel binario
//     const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    
//     // Descargar el archivo como un archivo de Excel
//     function downloadExcel(filename, content) {
//       const blob = new Blob([s2ab(content)], { type: "application/octet-stream" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       link.click();
//       setTimeout(() => URL.revokeObjectURL(url), 1000);
//     }
    
//     function s2ab(s) {
//       const buf = new ArrayBuffer(s.length);
//       const view = new Uint8Array(buf);
//       for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
//       return buf;
//     }
    
//     // Descargar la tabla como un archivo de Excel con nombre "datos.xlsx"
//     downloadExcel("datos.xlsx", wbout);
    
//     // Abrir el archivo de Excel recién descargado
//     const file = new File([wbout], "datos.xlsx", { type: "application/octet-stream" });
//     const url = URL.createObjectURL(file);
//     window.open(url);
// }
// const generar = document.getElementById("btnExportar")

// generar.addEventListener("click",(e)=>{
//   e.preventDefault()
//   exportTableToExcel("triplo","Triplo Equipo 3")

// })
// function exportTableToExcel(tableID, filename = ''){
//   var downloadLink;
//   var dataType = 'application/vnd.ms-excel';
//   var tableSelect = document.getElementById(tableID);
//   var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
//   // Specify file name
//   filename = filename?filename+'.xls':'excel_data.xls';
  
//   // Create download link element
//   downloadLink = document.createElement("a");
  
//   document.body.appendChild(downloadLink);
  
//   if(navigator.msSaveOrOpenBlob){
//       var blob = new Blob(['ufeff', tableHTML], {
//           type: dataType
//       });
//       navigator.msSaveOrOpenBlob( blob, filename);
//   }else{
//       // Create a link to the file
//       downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
//       // Setting the file name
//       downloadLink.download = filename;
      
//       //triggering the function
//       downloadLink.click();
//   }
// }

const boton = document.getElementById("btnExportar")
boton.addEventListener("click",(e)=>{
e.preventDefault()
  exportData()
})

function exportData(){
	var table2excel = new Table2Excel();
  table2excel.export(document.getElementById("triplo"));	
}
