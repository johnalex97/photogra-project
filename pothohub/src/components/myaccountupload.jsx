import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const MyAccountUpload = () => {

  const { token } = useContext(AuthContext);
  const { userName, userId } = useContext(AuthContext);

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [category, setCategoy] = useState();
  const [name, setName] = useState();
  const [responseData, setResponseData] = useState();
  
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const [successMessage, setSuccessMessage] = useState(null); // Success Messages
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const form = new FormData();
        form.append('file', file);

        const responseImageUpload = await axios.post(process.env.REACT_APP_BACKEND_BASE_URL+'/api/upload', form);

        axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND_BASE_URL}/api/portafolio/upload`,
          data : { 
            imageId: responseImageUpload.data.id,
            category: category,
            imageName: responseImageUpload.data.name,
            userId,
            userName,
            caption: name,
          }
        })
        .then((response) => {
          if (response.data.success){
            setName("");
            setFile(null);
            setCategoy("");
            setPreview(null);
            setResponseData(response.data);
            setSuccessMessage(response.data.message);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 1000);
          }
        })
        .catch(error => console.error(error));

      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data); // Set the error message if present in the error response
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    };

    function handleOnChange(e) {
      setFile(e.target.files[0]);

      const newFile = new FileReader;

      newFile.onload = function() {
        setPreview(newFile.result);
      }

      newFile.readAsDataURL(e.target.files[0]);
    }

    if (!token){
      return <Navigate to="/login" />;
    }
    return (
      <>
        <section className="inline-block text-center items-center p-8">
          <div className="relative">
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Sube una imagen
            </Typography>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
            {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}{" "}
            <form onSubmit={handleSubmit} enctype="multipart/form-data" className="mx-auto max-w-[24rem] text-left">
              <div className="mb-6">
                  <label htmlFor="password">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Nombre
                    </Typography>
                  </label>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Atardecer, Via Lactea"
                      required
                      class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                  <label
                      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Categoria
                  </Typography>
                </label>
                <select id="categories" 
                  value={category}
                  required
                  onChange={(e) => setCategoy(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Categoria</option>
                  <option value="portraits">Retratos</option>
                  <option value="food">Alimentos</option>
                  <option value="nature">Naturaleza</option>
                  <option value="products">Productos</option>
                </select>
              </div>
              <div className="mb-6">
              <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Archivo de imagen
                  </Typography>
                </label>
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    name="uploaded_file"
                    onChange={handleOnChange}
                  />
              </div>
              <div>
              </div>
              <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
                Subir
              </Button>
              <div className="relative">
                  {preview && (
                    <>
                      <a>Vista previa</a>
                      <img src={preview} alt="Upload preview" />
                    </>
                  )}
              </div>
            </form>
          </div>
        </section>
      </>
      );
};