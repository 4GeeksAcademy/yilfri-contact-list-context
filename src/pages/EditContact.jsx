// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

export const EditContact = (props) => {
  const { store } = useGlobalReducer()

  const { theId } = useParams()
  const contact = store.contacts.find(contact => contact.id === parseInt(theId));

  return (
    <div className="container">
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" className="form-control" value={contact.name} onChange={(e) => e.target.value} />
      <br />
      <label htmlFor="phone">Teléfono:</label>
      <input type="text" id="phone" className="form-control" value={contact.phone} onChange={(e) => setPhone(e.target.value)} />
      <br />
      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" id="email" className="form-control" value={contact.email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor="address">Dirección:</label>
      <input type="text" id="address" className="form-control" value={contact.address} onChange={(e) => setAddress(e.target.value)} />
      <br />


      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button">Editar contacto</button>
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
