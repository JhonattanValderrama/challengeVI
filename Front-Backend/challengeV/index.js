const express = require("express");
const mysql = require("mysql");

const app = express();
//prueba
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const conectBD = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "challengev"
});

app.get('/', (req, res) => {
    res.send('welcome to the auto')
})

// PARA TRAER TODA LA TABLA
app.get('/challengev', (req, res) => {
    const sql = 'SELECT * FROM auto'

    conectBD.query(sql, (error, resultados) => {
        if (error) throw error;

        if (resultados.length > 0) {
            res.json(resultados)
        } else {
            res.send('no resultados')
        }
    })
})

// PARA LLAMAR POR ID
app.get('/auto/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM auto where idauto = ${id}`

    conectBD.query(sql, (error, resultados) => {
        if (error) throw error;

        if (resultados.length > 0) {
            res.json(resultados)
        } else {
            res.send('no resultados2')
        }
    })
})

// SERVICIO DE CREACION
app.post('/addAuto', (req, res) => {
    const sql = 'INSERT INTO auto SET ?'

    const autoObj = {
      idAuto: req.body.idAuto,
      nombreVehiculo: req.body.nombreVehiculo,
      añoFabricacion: req.body.añoFabricacion,
      precioVehiculo: req.body.precioVehiculo,
      cantidad: req.body.cantidad
    }
    conectBD.query(sql, autoObj, error => {
        if (error) throw error

        res.send('Auto agregado')
    })
    console.log(autoObj);
})

// SERVICIO DE ACTUALIZACION
app.put('/actualizar/:id', (req, res) => {
    const id = req.params.id
    const { nombreVehiculo, añoFabricacion, precioVehiculo, cantidad } = req.body
    
    const sql = `UPDATE auto SET 
    nombreVehiculo = '${nombreVehiculo}',
    añoFabricacion = '${añoFabricacion}',
    precioVehiculo = '${precioVehiculo}',
    cantidad = '${cantidad}'
    where idauto = ${id}`;

    conectBD.query(sql, error => {
        if (error) throw error

        res.send('Auto actualizado')
    })

})



app.listen(3001,() => {
    console.log('server running in port 3001')
})
