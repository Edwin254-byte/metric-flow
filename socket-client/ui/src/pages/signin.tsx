import { jwtDecode } from "jwt-decode";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { useNavigate } from "react-router-dom";

import { SOCKET_SERVER_URL, TKN_KEY } from "../constants";
import { AuthContext } from "../store";
import "./signin.css";

export function SigninPage() {
  const [token, setToken] = useState(localStorage.getItem(TKN_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //navigate to /metrics if there is a token
    if (token && !authCtx.isLoggedIn) {
      const payload = jwtDecode(token);

      if (payload.exp) {
        const timeDiff = payload.exp * 1000 - Date.now();
        const tknExpInMs = 1 * 60 * 60 * 1000;
        //Set the user to be logged in, if the token is not yet expired
        if (timeDiff > 1000 && timeDiff < tknExpInMs) authCtx.setToken(token);
        else setError("Sorry, your session has expired please signin again.");
      }
    }
    if (authCtx.isLoggedIn) navigate("/metrics");
  }, [token, authCtx, navigate]);

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const signinHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SOCKET_SERVER_URL}/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
      });

      // if (!response.ok) throw new Error("An error occurred during signin. Please try again later.");
      const resData = (await response.json()) as { token: string } | { msg: string };
      console.log("response data:", resData);

      if ("msg" in resData) throw new Error(resData.msg);

      if ("token" in resData) {
        //set the token to local storage
        localStorage.setItem(TKN_KEY, resData.token);
        setToken(resData.token);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //validate email and password
    if (email.length === 0 || !email.includes("@") || !email.includes(".")) return;
    if (password.length === 0 || password.length < 6) return;

    //sign-in the user
    await signinHandler(email, password);
  };

  const clearError = () => setError("");
  return (
    <>
      {error && (
        <div className="alert alert-danger  alert-dismissible text-center " role="alert">
          {error}
          <button id="close-btn" onClick={clearError}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <LoadingOverlay active={isLoading} spinner text="Signing in. Please wait...">
        <section id="sc" className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      onChange={emailHandler}
                      value={email}
                    />
                    <label className="form-label" htmlFor="form1Example13">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      onInput={passwordHandler}
                      value={password}
                    />
                    <label className="form-label" htmlFor="form1Example23">
                      Password
                    </label>
                  </div>

                  <div className="d-flex justify-content-around align-items-center mb-4">
                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                      Sign in
                    </button>
                    <a href="#!">Forgot password?</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </LoadingOverlay>
    </>
  );
}
