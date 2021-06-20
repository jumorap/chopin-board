import React, { useState } from "react";
import "../css/uploadForm.css";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MyDropzone from "./DropZone";
import InputText from "./InputText";
import { useMaterias, useProfesores, useMateriaMap } from "../ContextProvider";
import UploadedFile from "./UploadedFile";
import Archivos from "../../model/Archivos";
import CloseIcon from "@material-ui/icons/Close";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";


const useStyles = makeStyles(() => ({
  uploadButton: {
    background: "#AA0000",
    "&:hover": {
      backgroundColor: "#800000",
    },
    color: "#FFF",
    borderRadius: 30,
    border: 0,
    padding: "5px 20px",
    width: "80%",
    marginTop: "20px",
  },
  closeButton: {
    position: "relative",
    left: "90%",
    top: "-5px",
    padding: 0,
  },

  sharemessage: {
    position: "relative",
    textAlign: "center",
    top: "20px",
    fontFamily: "inherit",
    fontSize: "20px",
  },

  descriptionBox: {
    width: "100%",
    backgroundColor: "white",
    marginTop: "15px",
  },

  warningDropText: {
    color: "#f44336",
    fontSize: "0.75rem",
  },
}));


//**Funcion que crea el formulario para subir el archivo con todos sus campos de texto*/
const UploadForm = ({ handleClose, fileToEdit }) => {
  let user = firebaseAppAuth.currentUser;

  const materias = useMaterias();
  const profesores = useProfesores();
  /**The conection with the provider to check the existence of the subject */
  const [materiaMap, setMateriaMap] = useMateriaMap();

  const classes = useStyles();

  const [materiaText, setmateriaText] = useState("");
  const [profesorText, setProfesorText] = useState("");
  const [semestreText, setSemestreText] = useState("");
  const [categoriaText, setcategoriaText] = useState("");
  const [descripcionText, setDescripcionText] = useState("");
  const [file, setfile] = useState(null);

  const [materiaError, setmateriaError] = useState(false);
  const [profesorError, setProfesorError] = useState(false);
  const [semestreError, setSemestreError] = useState(false);
  const [categoriaError, setcategoriaError] = useState(false);
  const [fileError, setfileError] = useState(false);


  const handleChange = (event) => {
    setDescripcionText(event.target.value);
  };

  const handleSubmit = async () => {
    let errors = false;

    if (materiaText === null || materiaText.length === 0) {
      setmateriaError(true);
      errors = true;
    }
    if (profesorText === null || profesorText.length === 0) {
      setProfesorError(true);
      errors = true;
    }
    if (semestreText === null || semestreText.length === 0) {
      setSemestreError(true);
      errors = true;
    }
    if (categoriaText === null || categoriaText.length === 0) {
      setcategoriaError(true);
      errors = true;
    }
    if (file === null) {
      setfileError(true);
      errors = true;
    }
    console.log(materiaMap.mapMaterias)
    if (!errors) {      
      const new_archivo = await Archivos.crearArchivos(
        materiaText.id,
        descripcionText,
        profesorText.profesor,
        semestreText.semestre,
        user.uid,
        categoriaText.categoria,
        file
      );
      console.log(new_archivo);
      
      materiaMap.add_archivo(new_archivo)
      handleClose();
    }
  };


  return (
    <div className="container">
      <div className={classes.sharemessage}>
        {fileToEdit ? "Editar" : "Compartir"}
      </div>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>

      <div className="upload-form">
        <div className="subContainer">
          <div className="leftDiv">
            <InputText
              label={"Materias"}
              options={materias}
              optionLabel={"materia"}
              defaultValue={materiaText}
              setOption={setmateriaText}
              errorState={materiaError}
              setError={setmateriaError}
            />
            <InputText
              label={"Profesor"}
              options={profesores}
              optionLabel={"profesor"}
              defaultValue={profesorText}
              setOption={setProfesorText}
              errorState={profesorError}
              setError={setProfesorError}
            />
            <div className="semetre-categoria">
              <InputText
                label={"Semestre"}
                options={semestres}
                optionLabel={"semestre"}
                defaultValue={semestreText}
                setOption={setSemestreText}
                errorState={semestreError}
                setError={setSemestreError}
              />
              <InputText
                label={"Categoria"}
                options={categorias}
                optionLabel={"categoria"}
                defaultValue={categoriaText}
                setOption={setcategoriaText}
                errorState={categoriaError}
                setError={setcategoriaError}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              className={classes.descriptionBox}
              value={descripcionText}
              onChange={handleChange}
            />
          </div>
          <div className="rightDiv">
            {file === null ? (
              <MyDropzone setFile={setfile} />
            ) : (
              <UploadedFile fileName={file.name} setFile={setfile} />
            )}
            {fileError === true ? (
              <p className={classes.warningDropText}>
                Porfavor anexe un archivo
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button
          variant="contained"
          className={classes.uploadButton}
          onClick={handleSubmit}
        >
          {fileToEdit ? "Editar" : "Compartir"}
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;

const semestres = [
  { semestre: "2021-2" },
  { semestre: "2021-1" },
  { semestre: "2020-2" },
  { semestre: "2019-1" },
  { semestre: "2018-2" },
  { semestre: "2017-1" },
  { semestre: "2016-2" },
  { semestre: "2015-1" },
];

const categorias = [
  { categoria: "Parcial 1" },
  { categoria: "Parcial 2" },
  { categoria: "Parcial 3" },
  { categoria: "Parcial 4" },
  { categoria: "Taller 1" },
  { categoria: "Taller 2" },
  { categoria: "Taller 3" },
  { categoria: "Taller 4" },
  { categoria: "Taller 5" },
  { categoria: "Taller 6" },
  { categoria: "Taller 7" },
  { categoria: "Taller 8" },
];
