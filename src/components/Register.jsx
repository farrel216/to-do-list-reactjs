import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [error, setError] = useState(null)

    const nav = useNavigate()
  const onSubmitChange = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username: username,
        password: password,
        confPassword: confPassword
      })
      nav("/")
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
                  <input type="text" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="username">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="*******" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="confirmPass" value={confPassword} onChange={(e) => { setConfPassword(e.target.value) }} placeholder="*******" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="confirmPass">Confirm Password</label>
                </div>

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Register</button>
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

export default Register;