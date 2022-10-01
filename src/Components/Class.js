import logo from './img/logo1024.png';
import frente from './img/frente.jpeg';
import { useEffect, useState } from 'react';
import ClassService from '../Services/ClassService';
import { Box, Button, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const days = {
	"MO": "Lu",
	"TU": "Ma",
	"WE": "Mi",
	"TH": "Ju",
	"FR": "Vi",
	"SA": "Sa"
};

const Class = () => {
	const [clase, setClases] = useState({});
	const [hidden, setHidden] = useState(true);
	const [showButton, setShowButton] = useState(true);
	const { id } = useParams();

	const getClase = async () => {
		const classe = await ClassService.findById(id);
		setClases(classe.data);

		let days = Object.keys(classe.data.dayStructure);
		
		for (let i = 0; i < days.length; i++) {
			let day = days[i];

			if (classe.data.dayStructure[day].length > 3) {
				break;
			} else {
				setShowButton(false);
			}
		}
	};

	useEffect(() => {
		getClase();
	}, []);

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
			<Box display="flex" pt="20px" px="20px">
				{['MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
					<div style={{ display: "flex", flexDirection: "column", width: "16.6%" }}>
						<div style={{ color: "white", textAlign: "center" }}>
							{days[day]}
						</div>
						<Divider sx={{ background: "orange", my: "12px" }} />
						<div style={{ height: hidden ? "160px" : "auto", overflowY: "hidden" }}>
							{
								clase?.dayStructure
								&& clase?.dayStructure[day]
								&& clase?.dayStructure[day].map(h =>
								(
									<div style={{ color: "white", padding: "4px", textAlign: "center" }}>
										{h}
									</div>
								))
							}
						</div>
					</div>
				))}
			</Box>
			<Divider sx={{ background: "orange", mx: "20px", my: "8px" }} />
			{
				showButton && (
					<Box display="flex" justifyContent="center">
						<Button
							onClick={() => setHidden(!hidden)}
							style={{ textTransform: "none", color: "orange" }}>
								{
									hidden ? "Ver más" : "Ver menos"
								}
							</Button>
					</Box>
				)
			}
			
		</div>
	)
};

export default Class



