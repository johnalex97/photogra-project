import React, { useState, useContext } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const { setToken } = useContext(AuthContext);
  const { setUserName } = useContext(AuthContext);
  const { setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      setUserName(response.data.username);
      setUserId(response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userid", response.data.id);
      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      setUserName(null);
      setUserId(null);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set the error message if present in the error response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>

<section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Iniciar sesion
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Ingrese su correo y contraseña para iniciar sesion
        </Typography>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
        <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Correo Electronico
              </Typography>
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="alanturing@email.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Contraseña
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
            Iniciar Sesion
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="mt-4 text-center font-normal"
          >
            Aun no tienes una cuenta?{" "}
            <Link to={`/signup`} className="font-medium text-gray-900">
              Crear Cuenta
            </Link>
          </Typography>
        </form>
      </div>
    </section>
    </div>
  );
};
