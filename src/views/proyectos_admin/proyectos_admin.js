import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./proyectos_admin.css";
import { useQuery, gql } from "@apollo/client";

const projects_Query = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
    }
  }
`;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "proyecto", headerName: "Proyecto", width: 130 },
  { field: "estado", headerName: "Estado", width: 130 },
];

export default function DataTable() {
  const { data, loading, error } = useQuery(projects_Query);
  const [projects, setPojects] = useState([]);
  useEffect(() => {
    if (!loading && !error) {
      const projectsFormated = data.Proyectos.map((project) => ({
        id: project._id,
        proyecto: project.nombre,
        estado: project.estado,
      }));
      setPojects(projectsFormated);
    }
  }, [data, error, loading]);
  return (
    <div style={{ height: 400, width: "80%" }}>
      <h4 className="title">LISTA PROYECTOS</h4>
      <DataGrid
        className="table_user"
        rows={projects}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
      <button className="buttonR">Revisar </button>
    </div>
  );
}