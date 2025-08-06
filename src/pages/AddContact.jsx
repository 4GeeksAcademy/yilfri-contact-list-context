import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState } from "react";

export const AddContact = () => {

  const { store, dispatch } = useGlobalReducer()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertDanger, setAlertDanger] = useState(false)

  function addContact() {
    if (name != '' && phone != '' && email != '' && address != '') {
      const optionsRequest = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address,
          })
      }
      fetch("https://playground.4geeks.com/contact/agendas/yilfri/contacts", optionsRequest)
        .then(res => res.json())
        .then(data => {
          setName('')
          setPhone('')
          setEmail('')
          setAddress('')
          setAlertSuccess(true)

          setInterval(() => {
            setAlertSuccess(false)
          }, 3000);
        })
    } else {
      setAlertDanger(true)

      setInterval(() => {
        setAlertDanger(false)
      }, 3000);
    }

  }

  return (
    <div className="container">
      <div className="alert alert-success" style={{ display: (alertSuccess == false ? "none" : "block") }} role="alert">
        Contacto agregado exitosamente
      </div>
      <div className="alert alert-danger" style={{ display: (alertDanger == false ? "none" : "block") }} role="alert">
        Debes completar todos los datos
      </div>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label htmlFor="phone">Teléfono:</label>
      <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <br />
      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor="address">Dirección:</label>
      <input type="text" id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
      <br />


      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={addContact}>Agregar contacto</button>
      </div>
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Regresar a la agenda</span>
      </Link>

    </div>

  );
};
