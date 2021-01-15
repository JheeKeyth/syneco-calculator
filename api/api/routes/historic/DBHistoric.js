var config = require('../../../config/dbconfig');
const sql = require('mssql');

function createTable(){
  //Connect database with configs
  sql.connect(config)
    .then(() => {
      console.log('connected');
      // Create Table
      const table = new sql.Table('historic');
      table.create = true;
      table.columns.add('expression', sql.NVarChar(200), {nullable: false});
      table.columns.add('result', sql.Float, {nullable: false});

      // Add test item
      table.rows.add('5 + 5', '10');

      //Request
      const request = new sql.Request()
      return request.bulk(table)
    }).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
}

// Get all operations in Historic Table
async function getHistoric() {
  try {
    let connection = await sql.connect(config);
    let historic = await connection.request().query("SELECT * from historic");
    return historic.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

// Add new Operation in Historic Table
async function addOperation(operation) {
  try {
    let connection = await sql.connect(config);
    await connection.request().query('INSERT INTO historic(expression, result) VALUES (\'' + operation.expression + '\', ' + operation.result + ')');
  }
  catch (error) {
    console.log(error);
  }
  
}

async function deleteHistoric(){
  try {
    let connection = await sql.connect(config);
    await connection.request().query('DELETE FROM historic');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getHistoric: getHistoric,
  addOperation: addOperation,
  createTable: createTable,
  deleteHistoric: deleteHistoric
}
  
