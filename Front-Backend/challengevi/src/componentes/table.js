import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import {
    Alert, Button, Grid, TextField, Box, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table
} from "@mui/material"

//prueba
const TableDense = () => {
const [data, setData] = useState([])
const [name, setName] = useState('')
const [year, setYear] = useState('')
const [values, setValues] = useState('')
const [amount, setAmount] = useState('');   
const [idauto, setIdAuto] = useState('');   
const [showForm, setShowForm] = useState(true) 
const [showAlert, setShowAlert] = useState(false); 
const [showButtonSave, setShowButtonSave] = useState(true) 
const baseURL = "http://localhost:3001/challengev";

const showFormData = () => {
    setShowForm(false)       
    }
    
const onChangeName = (event) => { setName(event.target.value) }
const onChangeYear = (event) => { setYear(event.target.value) }
const onChangeValues = (event) => { setValues(event.target.value) }
const onChangeAmount = (event) => { setAmount(event.target.value) }

const save = () => {
    if (name === "" || year === "" || values === "" || amount ==="") {
        setShowAlert(true);
    } else {
        if (!showForm) {
         axios
            .post("http://localhost:3001/addAuto", {
            nombreVehiculo: name,
            añoFabricacion: year,
            precioVehiculo: values,
            cantidad: amount,
            })
            .then((response) => {
                setName("");
                setYear("");
                setValues("");
                setAmount("");
                setIdAuto("");
                setShowForm(true);
                setShowButtonSave(true);
                setShowAlert(false);
                getData();
            });
        }
    }
}
    
    //TRAER DATOS
const getData = async () => {
    try {
        const { data: response } = await axios.get(baseURL)
        setData(response)
    } catch (error) {
        console.log('Error', error)
    }
}
    
const edit = ((obj) => {
    setShowForm(false)
    setShowButtonSave(false)
    setName(obj.nombreVehiculo);
    setYear(obj.añoFabricacion)
    setValues(obj.precioVehiculo)
    setAmount(obj.cantidad)
    setIdAuto(obj.idauto)
    console.log(obj);
});
    
const update = (() => {
    if (name === "" || year === "" || values === "" || amount === "") {
        setShowAlert(true);
    } else {
        axios.put(`http://localhost:3001/actualizar/${idauto}`, {
            nombreVehiculo: name,
            añoFabricacion: year,
            precioVehiculo: values,
            cantidad: amount
        }).then(() => {
            setName("");
            setYear("");
            setValues("");
            setAmount("");
            setIdAuto("");
            setShowForm(true)
            setShowButtonSave(true)
            setShowAlert(false);
            getData()
        })
    }
})

const cancel = (() => {
    setShowForm(true);
    setName('');
    setYear('');
    setValues('');
    setAmount('');
    setIdAuto('');
    setShowButtonSave(true);
    setShowAlert(false);
})
//CUANDO SE CARGUE EL COMPONENTE SE EJECUTE LA FUNCION
    
useEffect(() => {
getData()
}, [])

return (
    <Box>
    {!showForm && (
        <Grid container>
            <Grid item xs={12}>
            {
            showAlert &&
                <Alert severity="warning">Debes llenar todos los campos</Alert>
            }
            </Grid>
                    
            <Grid align="center" sx={{ mt: 8 }} item xs={3}>
                <TextField value={name} onChange={onChangeName} id="outlined-basic" label="Nombre del Vehiculo" variant="outlined"/>
            </Grid>
                
            <Grid align="center" sx={{ mt: 8 }} item xs={3}>
                <TextField value={year} onChange={onChangeYear} id="outlined-basic" label="Año de Fabricacion" variant="outlined"/>
            </Grid>
                
            <Grid align="center" sx={{ mt: 8 }} item xs={3}>
                <TextField value={values} onChange={onChangeValues} id="outlined-basic" label="Precio" variant="outlined"/>
            </Grid>
                
            <Grid align="center" sx={{ mt: 8 }} item xs={3}>
                <TextField value={amount} onChange={onChangeAmount} id="outlined-basic" label="Cantidad" variant="outlined"/>
            </Grid>

        {
        showButtonSave ?
        <Grid container>            
            <Grid align="center" sx={{ mt: 12 }} item xs={1}>
                <Button onClick={() => {save()}}variant="outlined">Guardar</Button>
            </Grid>
                            
            <Grid align="center" sx={{ mt: 12 }} item xs={3}>
                <Button onClick={() => {cancel()}} color = "error" variant="outlined">Cancelar</Button>
            </Grid>
            </Grid>
                            :
                <Grid container>            
            <Grid align="center" sx={{ mt: 12 }} item xs={1}>
                <Button onClick={() => {update()}}variant="outlined">Actualizar</Button>
            </Grid>
                            
            <Grid align="center" sx={{ mt: 12 }} item xs={3}>
                <Button onClick={() => {cancel()}} color = "error" variant="outlined">Cancelar</Button>
            </Grid>
        </Grid>
        }
        </Grid>
    )}
        {showForm && (
        <Grid container>
            <Grid item sx={{ mb: 4 }}>
                <Button onClick={() => { showFormData();}} variant="outlined"> Crear Auto </Button>
            </Grid>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>idauto</TableCell>
                    <TableCell align="right">Nombre Vehiculo</TableCell>
                    <TableCell align="right">Año Fabricacion</TableCell>
                    <TableCell align="right">Precio Vehiculo</TableCell>
                    <TableCell align="right">Cantidad</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                      <TableRow
                      key={row.idauto}
                      onClick={() => {edit(row)}}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.idauto}
                      </TableCell>
                      <TableCell align="right">{row.nombreVehiculo}</TableCell>
                      <TableCell align="right">{row.añoFabricacion}</TableCell>
                      <TableCell align="right">{row.precioVehiculo}</TableCell>
                      <TableCell align="right">{row.cantidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Box>
    );
}


export default TableDense