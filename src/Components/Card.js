
import frente from './img/frente.jpeg';

const Card = ({ children }) => {
    return (
        <div style={{
            minWidth: "320px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            color: 'white',
            height: '80px',
            fontSize: "16px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${frente})`,
            padding: "8px",
            margin: "8px",
        }}>
            {children}
        </div>
    )
};

export default Card;