import { useState, useContext, useEffect } from 'react';
import ClassService from '../Services/ClassService';
import logo from './img/logo1024.png';
import frente from './img/frente.jpeg';

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
        <div style={{ backgroundColor: '#553651' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center", textAlign: 'center', backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 0, paddingLeft: 10, font: 'icon', color: 'white' }}>
                <div>
                    <img alt="" src={logo} style={{ height: 20, width: 20, marginTop: 17 }} />
                </div>
                <h5>ULSO TURNOS</h5>
            </div>
            <h1 style={{ font: 'icon', color: 'orange', fontSize: 40, textAlign: 'center' }}>
                Clases
            </h1>
            {
                clases.map(c => <div style={{
                    width: '100',
                    justifyContent: "center",
                    borderRadius: 10,
                    paddingLeft: 10,
                    color: 'white',
                    textAlign: 'left',
                    height: '10vh',
                    fontSize: 20,
                    backgroundImage: `url(${frente})`,
                    padding: 5,
                    marginTop: 10
                }}>
                    {c.name}
                </div>)
            }
            
        </div>
    )
};

export default Clases;


