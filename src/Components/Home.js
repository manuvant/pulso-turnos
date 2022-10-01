import logo from './img/logo1024.png';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../App';
import UserService from '../Services/UserService';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from "./Card"

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Home = () => {
    const navigate = useNavigate();
    const context = useContext(Context);
    const [user, setUser] = useState({});
    const [classes, setClasses] = useState([]);
    const [open, setOpen] = useState(false);
    const [c, setC] = useState({})

    const getUser = async () => {
        try {
            const user = await UserService.findById(context.currentUser.id, {
                include: ['bills', 'plans']
            });
            setUser(user.data)
        } catch (err) {
            console.log(err)
        }

    };

    const getUserClasses = async () => {
        const classes = await UserService.findLinked(context.currentUser.id, 'classe-instances', { order: ['date DESC'], limit: 10 })
        setClasses(classes.data);
    };

    useEffect(() => {
        getUser();
        getUserClasses();
        console.log('tirmae la goma')
    }, []);

    const handleClose = () => setOpen(false);

    const openModal = (c) => () => {
        setC(c);
        setOpen(true);
    };

    const cancelClass = async () => {
        const today = moment().format();
        const date = moment(c.dayString).add(c.hourString, "hours")
        const diff = date.diff(today, "minutes");

        if (diff > 15) {
            const rsp = await UserService.unlink(context.currentUser.id, 'classes', c.id);
            getUserClasses(context.currentUser?.id)
        } else {
        }
        handleClose();
    };

    return (
        <div style={{ backgroundColor: '#553651' }}>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: "flex", justifyContent: "center" }}>
                            Cancelar turno?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ display: "flex", justifyContent: "space-around" }}>
                            <h5 onClick={cancelClass}>Si</h5><h5 onClick={handleClose}>No</h5>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center", textAlign: 'center', backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 0, paddingLeft: 10, font: 'icon', color: 'white' }}>
                <div>
                    <img alt="" src={logo} style={{ height: 20, width: 20, marginTop: 17 }} />
                </div>
                <h5>ULSO HOME</h5>

            </div>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <div style={{ background: 'yellow', borderRadius: 10, width: '80%', padding: 5, marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
                    <h5>
                        Notificaciones
                    </h5>
                </div>
            </div>
            {
                classes[0]
                    ?
                    <div>
                        <div>
                            <div style={{
                                color: 'white',
                                fontSize: 23,
                                textAlign: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                                fontFamily: 'basicLight'
                            }}>
                                Tus clases
                            </div>
                        </div>
                        {
                            classes.map(c => (
                                <Card>
                                    <Typography>{c.name}</Typography>
                                    <div>
                                        {moment(c.date).format('DD/MM/YYYY') + '  ' + c.hourString + "hs"}
                                        {<h4 style={{ color: 'red', margin: 5 }} onClick={openModal(c)}>CANCELAR</h4>}
                                    </div>
                                </Card>))
                        }

                    </div>
                    : <div style={{ height: 150, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{
                            color: 'white',
                            fontSize: 23,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                            fontFamily: 'basicLight'
                        }}>
                            No tienes proximas clases
                        </div>
                        <Stack direction="column" spacing={2} >
                            <Button style={{ color: 'orange', backgroundColor: "yellow" }} onClick={() => { navigate("/clases") }}>
                                Ver proximas clases
                            </Button>
                        </Stack>
                    </div>
            }
        </div>
    )
};

// agregar react router
// me fijo en el context el user
// traer el usuario loguiado
// traigo la clase que tiene suscriptas a futuro
// y hago una card con la actividad y el horario(confondo)
// agrego la posibilidad de cancelar turno
// mostrar los anuncios
// agregar notificaciones react notify

export default Home;