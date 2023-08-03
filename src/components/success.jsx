import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Success = () => {
  // Ottieni l'oggetto "location" dal React Router, che contiene le informazioni dell'URL corrente
  const location = useLocation();

  // Ottieni i parametri dall'URL tramite URLSearchParams
  const urlParams = new URLSearchParams(location.search);

  // Ottieni il valore del parametro "token" dall'URL
  const token = urlParams.get('token');

  // Stampa il valore del token nella console per il debug
  console.log(token);

  // Funzione per salvare il token nel localStorage del browser
  const saveUserToLocalStorage = (token) => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }

  // Effetto collaterale che salva il token nel localStorage quando il componente si monta o quando il token cambia
  useEffect(() => {
    saveUserToLocalStorage(token);
  }, [token]);

  return (
    <div>
      <h1>Success</h1>
    </div>
  )
}

export default Success
