import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

export function SigninPage() {
  const [token, setToken] = useState(localStorage.getItem("tkn"));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //navigate to /metrics if there is a token
  if (token) {
    //More token verification to be added later
    navigate("/metrics");
  }

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("email: ", email);
    console.log("password: ", password);

    //validate email and password
    if (email.length === 0 || !email.includes("@") || !email.includes(".")) return;
    if (password.length === 0 || password.length < 6) return;

    //sign-in the user

    //store token to local storage
  };

  return (
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
  );
}
