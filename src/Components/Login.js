import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import logo from './img/logo1024.png';
import AuthService from '../Services/AuthService';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Context } from '../App';


const Login = () => {
    const context = useContext(Context)
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [invalidData, setInvalidData] = useState(false);


    const handleChangeUser = (evt) => {
        setUser({...user,
            [evt.target.name]: evt.target.value
        });
    };

    // const onClickLogin = async () => {
    //     console.log('asdsad')

    //     try {
    //         const res = await AuthService.login({
    //             mail: user.email,
    //             password: user.password
    //         });
    //         console.log('asdsaw213d', res)

    //         context.setCurrentUser(res.data);

    //     } catch (err) {
    //         console.log('err', err)
    //         if (err) {
    //             setInvalidData(true);
    //             setTimeout(function () { setInvalidData(false) }, 2000);
    //         }
    //     }
    // };

    const login = async () => {
        const log = await AuthService.login(user.email.toLowerCase(), user.password.toLowerCase()) 
           if (!log.data || log.status !== 200) {
              console.log("Credenciales incorrectas, intente nuevamente");
           }
           console.log(log.data)
           context.setCurrentUser(log.data);
        ;
     };

    console.log('user', user)

    return (
        <div>
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 30, backgroundColor: "#553651" }}>
                <h1 style={{backgroundColor: "orange", color: "#553651"}}>
                    LOGIN
                </h1>
                <img alt="" src={logo} style={{ height: 70, width: 70, marginBottom: 50 }} />

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" name='email' label="Mail" variant="filled"  onChange={handleChangeUser} />
                    <TextField id="filled-basic" label="Contraseña" name='password' variant="filled" onChange={handleChangeUser} />
                    {
                        invalidData
                            ? <h2 style={{ margin: 5, color: "#553651" }}>DATOS INCORRECTOS</h2>
                            : null
                    }
                </Box>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={login} style={{padding: 8, marginTop: 30, backgroundColor: "orange", color: "#553651", width: 250}}>Ingresar</Button>
                </Stack>

            </div>
        </div>
    )
};

export default Login;