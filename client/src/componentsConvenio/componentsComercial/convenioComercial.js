//En este componente está la tabla con info de los pagos de afiliados + CRUD; Pertenece al perfil de Directiva.
import React, { useState, useEffect } from "react";
/* import { DataGrid } from "@material-ui/data-grid";
 */ import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Modal, TextField, Button } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import ResetSearch from "@material-ui/icons/Clear";
import Filter from "@material-ui/icons/FilterList";
import Export from "@material-ui/icons/SaveAlt";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import NextPage from "@material-ui/icons/ChevronRight";
import PreviousPage from "@material-ui/icons/ChevronLeft";
import SortArrow from "@material-ui/icons/ArrowUpward";

const columns = [ 
  {
    title: "id convenio",
    field: "id_conv",
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
  {
    title: "Nombre Convenio",
    field: "nombre_conv",
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
  {
    title: "Fecha de ingreso",
    field: "fecha_conv",
    type: "date",
    dateSetting: {
      format: "dd/MM/yyyy",
    },
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
  {
    title: "Descripción",
    field: "descripcion_conv",
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
  {
    title: "Monto máximo de compra",
    field: "monto_max_compra_c",
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
  {
    title: "N° máximo de cuotas",
    field: "numero_max_cuotas_c",
    headerStyle: {
      backgroundColor: "#3374FF",
    },
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
  },
}));

function ConvenioComercial() {
  const styles = useStyles();
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [listConvenioC, setListConvenioC] = useState([]);
/*   const [id_conv, setid_conv = useState([]); */
  const [convenioCSelect, setConvenioCSelect] = useState({
    id_conv: "",
    nombre_conv: "",
    fecha_conv: "",
    descripcion_conv: "",
    monto_max_compra_c: "",
    numero_max_cuotas_c: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvenioCSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await Axios.get("http://localhost:3001/showConvenioC")
      .then((response) => {
        setListConvenioC(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async (id) => {
    await Axios.put("http://localhost:3001/editConvenioC", {
      id_conv: convenioCSelect.id_conv,
      nombre_conv: convenioCSelect.nombre_conv,
      fecha_conv: convenioCSelect.fecha_conv,
      descripcion_conv: convenioCSelect.descripcion_conv,
      monto_max_compra_c: convenioCSelect.monto_max_compra_c,
      numero_max_cuotas_c: convenioCSelect.numero_max_cuotas_c,
    })
      .then((response) => {
        setListConvenioC(
          listConvenioC.filter((val) => {
            return val.id_conv === convenioCSelect.id_conv
              ? {
                id_conv: convenioCSelect.id_conv,
                nombre_conv: convenioCSelect.nombre_conv,
                fecha_conv: convenioCSelect.fecha_conv,
                descripcion_conv: convenioCSelect.descripcion_conv,
                monto_max_compra_c: convenioCSelect.monto_max_compra_c,
                numero_max_cuotas_c: convenioCSelect.numero_max_cuotas_c,
                }
              : val;
          })
        );
        OCModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SelectConvenioC = (id_conv, caso) => {
    setConvenioCSelect(id_conv);
    caso === "Editar" ? OCModalEditar() : OCModalEliminar();
  };

  const OCModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const OCModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionDelete = async () => {
    await Axios.delete(`http://localhost:3001/deleteConvenioC/${convenioCSelect.id_conv}`)
      .then((response) => {
        setListConvenioC(
          listConvenioC.filter((val) => {
            return val.id_conv != convenioCSelect.id_conv;
          })
        );
        OCModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  //Interfaz de modal editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Convenio</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre del convenio"
        name="nombre_conv"
        variant= "outlined"
        onChange={handleChange}
        value={convenioCSelect && convenioCSelect.nombre_conv}
      />
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="fecha_conv"
        type="date"
        variant= "outlined"
        format="yyyy-MM-dd"
        onChange={handleChange}
        value={convenioCSelect && convenioCSelect.fecha_conv}
      />
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripción"
        name="descripcion_conv"
        variant= "outlined"
        onChange={handleChange}
        value={convenioCSelect && convenioCSelect.descripcion_conv}
      />

      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Monto máximo de compra"
        name="monto_max_compra_c"
        variant= "outlined"
        onChange={handleChange}
        value={convenioCSelect && convenioCSelect.monto_max_compra_c}
      />
      
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="N° máximo de cuotas"
        name="numero_max_cuotas_c"
        variant= "outlined"
        onChange={handleChange}
        value={convenioCSelect && convenioCSelect.numero_max_cuotas_c}
      />
      
      <br />
      <div align="right">
        <Button 
        color="primary"
        onClick={(e) => {
          peticionPut();
          OCModalEditar();
        }}>
          Editar
        </Button>
        <Button onClick={() => OCModalEditar()}> Cancelar </Button>
      </div>
    </div>
  );

  //interfaz de model eliminar
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
      Estás seguro que deseas eliminar el siguiente Convenio:{" "}
        <b>{convenioCSelect && convenioCSelect.id_conv}</b>{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => {peticionDelete();OCModalEliminar()}}>
          SI
        </Button>
        <Button onClick={() => OCModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <MaterialTable
        title="Lista de Convenios"
        data={listConvenioC}
        columns={columns}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar Convenio",
            onClick: (event, rowData) => SelectConvenioC(rowData, "Editar"),
            iconProps: {
              style: { backgroundColor: "#33ACFF" },
            },
          },
          {
            icon: DeleteIcon,
            tooltip: "Eliminar Convenio",
            onClick: (event, rowData) => SelectConvenioC(rowData, "Eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: "#3374FF",
            color: "#FFF",
            fontSize: "14px",
          },
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
          pagination: {
            labelRowsSelect: "Filas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página",
          },
          toolbar: {
            searchTooltip: "Busqueda",
            searchPlaceholder: "Buscar",
            exportTitle: "Exportar",
            exportName: "Exportar a CSV",
          },
        }}
        icons={{
          Search: Search,
          ResetSearch: ResetSearch,
          Filter: Filter,
          Export: Export,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: NextPage,
          PreviousPage: PreviousPage,
          SortArrow: SortArrow,
        }}
      />

      <Modal open={modalEditar} onClose={OCModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={OCModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}
export default ConvenioComercial;