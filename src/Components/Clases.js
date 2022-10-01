import { useState, useEffect } from 'react';
import ClassService from '../Services/ClassService';
import logo from './img/logo1024.png';
import Card from './Card';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Clases = () => {
    const [clases, setClases] = useState([]);
    const [openDays, setOpenDays] = useState(false);

    const getClasses = async () => {
        const rsp = await ClassService.find();
        setClases(rsp.data);
    };

    const handleClick = (c) => () => {
        console.log('claseClikeada', c);
        setOpenDays(true);

    };

    useEffect(() => {
        getClasses()
    }, [])


    return (
        <div style={{ backgroundColor: '#553651', width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center", textAlign: 'center', backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 0, paddingLeft: 10, font: 'icon', color: 'white' }}>
                <div>
                    <img alt="" src={logo} style={{ height: 20, width: 20, marginTop: 17 }} />
                </div>
                <h5>ULSO TURNOS</h5>
            </div>
            <h1 style={{ font: 'icon', color: 'orange', fontSize: 40, textAlign: 'center' }}>
                Clases
            </h1>
            <Box width="100%" display="flex" alignItems="center" flexDirection="column" justifyContent="center">
                {
                    clases.map(c => (
                        <Box >
                            <Link style={{ textDecoration: "none", width: "100%", width: "100%", display: "flex", justifyContent: "center" ,alignItems:"center" }} to={`/classe/${c.id}`}>
                                <Card>
                                    {c.name}
                                </Card>
                            </Link>
                        </Box>
                    ))
                }
            </Box>
        </div>
    )
};

export default Clases;


