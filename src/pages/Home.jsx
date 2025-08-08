import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    getContacts()
  }, [])

  function getContacts() {
    fetch("https://playground.4geeks.com/contact/agendas/yilfri")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "get_contacts", payload: data.contacts })
      })
  }

  function deleteContact(id) {
    const optionsRequest = {
        method: "DELETE",
        redirect: "follow"
      }

      fetch(`https://playground.4geeks.com/contact/agendas/yilfri/contacts/${id}`, optionsRequest)
      .then(res => res.text())
      .then(data => {
        getContacts()
      })
  }

  return (
    <div className="container">
      {store && store.contacts?.map((contact) => {
        return <div className="card mb-3 mx-3 bg-light" key={contact.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={rigoImageUrl} className="img-fluid rounded-circle" alt="Rigo" />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text"><i className="fa fa-map-marker"></i> {contact.address}</p>
                <p className="card-text"><i className="fa fa-phone"></i> {contact.phone}</p>
                <p className="card-text"><i className="fa fa-envelope"></i> {contact.email}</p>
              </div>
              <div className="col-md-2">
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${contact.id}`}>
                    <button type="button" className="btn btn-secondary"><i className="fa-solid fa-pencil"></i></button>
                  </Link>
                  <button type="button" className="btn btn-danger mx-3" onClick={() => deleteContact(contact.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      })}
    </div>
  );
}; 