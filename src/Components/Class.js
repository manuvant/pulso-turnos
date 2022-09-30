import logo from './img/logo1024.png';
import frente from './img/frente.jpeg';
import { useEffect, useState } from 'react';
import ClassService from '../Services/ClassService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Class = () => {
  const [clase, setClases] = useState({});

  const getClase = async () => {
    const clase = await ClassService.findById('61511aadd3060280e0966398');

    setClases(clase.data)
  };

  useEffect(() => {
    getClase();
  }, []);

  console.log(clase)
  return (
    <div style={{ backgroundColor: '#553651', height: '100vh' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: "center", textAlign: 'center', backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 0, paddingLeft: 10, font: 'icon', color: 'white' }}>
        <div>
          <img alt="" src={logo} style={{ height: 20, width: 20, marginTop: 17 }} />
        </div>
        <h5>ULSO CLASS</h5>
      </div>
      <div>
        <img alt="" src={frente} style={{ width: '100%', height: 200 }} />
        <span style={{
          color: '#441b3e',
          letterSpacing: 3,
          fontSize: 25, fontFamily: 'basicLight',
          bottom: 25, padding: 7,
          backgroundColor: '#f18b0c',
        }}>{clase.name}</span>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 50 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Lu</TableCell>
                <TableCell align="right">Ma</TableCell>
                <TableCell align="right">Mie</TableCell>
                <TableCell align="right">Ju</TableCell>
                <TableCell align="right">Vie</TableCell>
                <TableCell align="right">Sa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {clase &&
                  ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => {
                    return (
                      <TableRow
                      //   key={}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {clase?.dayStructure && clase?.dayStructure[day]
                          ? clase?.dayStructure[day].map(h => (
                              <TableCell align="right">
                                {h}
                              </TableCell>
                          ))
                          : null}
                      </TableRow>
                    )
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
};

export default Class