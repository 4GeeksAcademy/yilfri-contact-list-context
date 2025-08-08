// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

export const EditContact = (props) => {
  const { store, dispatch } = useGlobalReducer()


  const { theId } = useParams()
  const contact = store.contacts.find(contact => contact.id === parseInt(theId));

  const [formData, setFormData] = useState({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    address: contact.address,
  });

  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertDanger, setAlertDanger] = useState(false)


  function updateContact() {
    const optionsRequest = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(`https://playground.4geeks.com/contact/agendas/yilfri/contacts/${theId}`, optionsRequest)
      .then(res => res.json())
      .then(data => {

        if (formData.name != '' && formData.phone != '' && formData.email != '' && formData.address != '') {
          setAlertSuccess(true)

          setInterval(() => {
            setAlertSuccess(false)
          }, 3000);

        } else {
          setAlertDanger(true)

          setInterval(() => {
            setAlertDanger(false)
          }, 3000);
        }
      })
  }

  return (
    <div className="container">
      <div className="alert alert-success" style={{ display: (alertSuccess == false ? "none" : "block") }} role="alert">
        Contacto editado exitosamente
      </div>
      <div className="alert alert-danger" style={{ display: (alertDanger == false ? "none" : "block") }} role="alert">
        Debes completar todos los datos
      </div>

      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <br />
      <label htmlFor="phone">Teléfono:</label>
      <input type="text" id="phone" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <br />
      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" id="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <br />
      <label htmlFor="address">Dirección:</label>
      <input type="text" id="address" className="form-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      <br />

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={updateContact}>Editar contacto</button>
      </div>
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Regresar a la agenda</span>
      </Link>

    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
EditContact.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
