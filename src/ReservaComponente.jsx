import React from 'react';
import { useState } from 'react';

const ReservaComponente = ({ producto, precio }) => {
  const [linkPago, setLinkPago] = useState('');

  const generarReserva = async () => {
    console.log("TOKEN", process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN)
    
    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          items: [
            {
              title: producto,
              unit_price: Number(precio),
              quantity: Number(1),
            }
          ],
          back_urls: {
            success: `${process.env.REACT_APP_BACK}/pay/feedback/success`,
            failure: `${process.env.REACT_APP_BACK}/pay/feedback/failure`,
            pending: `${process.env.REACT_APP_BACK}/pay/feedback/pending`,
          },
      
          auto_return: 'approved',
        }),
      });

      const data = await response.json();

      setLinkPago(data.init_point);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("linkPago", linkPago)
    console.log("setLinkPago", setLinkPago)


const handleCopyLink = () => {
  navigator.clipboard.writeText(linkPago);
};

    return (
      <div>
        <h2>Reserva de {producto}</h2>
        <p>Precio: ${precio}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" value={linkPago} readOnly />
          <button onClick={handleCopyLink}>Copy Text</button>
        </div>
        <br />
        {linkPago ? (
          <a href={linkPago} target="_blank" rel="noopener noreferrer">
            Ir a MercadoPago para pagar
          </a>
        ) : (
          <button onClick={generarReserva}>Generar reserva</button>
        )}
      </div>
    );
};  

export default ReservaComponente;