import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  
  const name = localStorage.getItem("ongName");
  const id = localStorage.getItem("ongId");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: id
        }
      })
      .then(res => {
        setIncidents(res.data);
      });
  }, [id]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: id,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert("erro ao deletar caso, tente novamente");
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="Be the Hero!" />
        <span>Bem vinda, {name}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>valor</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
