const excelJS = require("exceljs");


const exportGuest = async (guests) => { 
  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("Invitados"); // New Worksheet
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Nombre Invitado", key: "nombre", width: 30 }, 
    { header: "Apellido Invitado", key: "apellido", width: 30 },
    { header: "Menú", key: "menu", width: 30 },
    { header: "Nombre Acompañante", key: "nombreAcompnanante", width: 30 },
    { header: "Apellido Acompañante", key: "apellidoAcompanante", width: 30 },
    { header: "Menú Acompañante", key: "menuAcompanante", width: 30 }
];
// Looping through User data

guests.forEach((guest) => {
    worksheet.addRow(guest.dataValues); // Add data in worksheet
});
// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
});
try {
  await workbook.xlsx.writeFile(`invitados.xlsx`)

} catch (err) {
    throw new Error("Error al exportar la lista")
  }
};
module.exports = exportGuest;