import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const onSubmitChange = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: username,
        password: password
      },{
        withCredentials: true
      })
      navigate("/home")
    } catch (error) {
      return setError(error.response.data.message)
    }
  }
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">

            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
              <span className="h1 fw-bold mb-0">Logo</span>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

              <form onSubmit={onSubmitChange}>

                <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                <p>{error}</p>
                <div className="form-outline mb-4">
                  <input type="text" id="form2Example18" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form2Example18">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form2Example28" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="*******" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                </div>

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                </div>

                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                <p>Don't have an account? <a href="/register" className="link-info">Register here</a></p>

              </form>

            </div>

          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login" className="w-100 vh-100" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;