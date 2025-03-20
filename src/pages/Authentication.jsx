import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { dietitianregisterAPI, loginAPI, registerAPI } from '../services/allapi';

function Authentication({ insideregister }) {
  const [registerdetails, setregisterdetails] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    certificate: null,
    experience: "",
    specialization: ""
  });

  const [logindetails, setlogindetails] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleregister = async () => {
    console.log(registerdetails);

    if (registerdetails.username && registerdetails.password && registerdetails.email && registerdetails.role) {
      if (registerdetails.role === "dietitian") {
        if (registerdetails.certificate && registerdetails.specialization && registerdetails.experience) {
          const reqbody = new FormData();
          reqbody.append("username", registerdetails.username);
          reqbody.append("password", registerdetails.password);
          reqbody.append("email", registerdetails.email);
          reqbody.append("role", registerdetails.role);
          reqbody.append("experience", registerdetails.experience);
          reqbody.append("specialization", registerdetails.specialization);
          reqbody.append("certificate", registerdetails.certificate);

          const reqheader = { "content-type": 'multipart/form-data' };
          const result = await dietitianregisterAPI(reqbody, reqheader);
          if (result.status == 200) {
            navigate('/pending-approval');
          } else {
            alert(result.status);
          }
        } else {
          alert("Dietitians must upload a certificate for approval.");
        }
      } else {
        const result = await registerAPI(registerdetails);
        if (result.status == 200) {
          alert("Registered successfully");
          navigate('/login');
        } else if (result.status == 406) {
          alert("Already registered, please login");
          navigate('/login');
        } else {
          alert("Something went wrong");
        }
      }
    } else {
      alert("Please fill out the form completely.");
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    if (logindetails.email && logindetails.password) {
      try {
        const result = await loginAPI({ email: logindetails.email, password: logindetails.password });
        console.log(result);
        if (result.data.token) {
          const role = result.data.user.role;

          const approved=result.data.user.isApproved

          if (role == "user") {



            alert("User success..");
            sessionStorage.setItem("userid",result.data.user._id)
            console.log(sessionStorage.getItem("userid"));
            sessionStorage.setItem("role",result.data.user.role)
            console.log(sessionStorage.getItem("role"));
            sessionStorage.setItem("token",result.data.token)
            console.log(sessionStorage.getItem("token"));
            


            navigate('/userdashboard')
          } else if (role == "dietitian") {
            alert("Dietitian login successful");

            sessionStorage.setItem("userid",result.data.user._id)
            console.log(sessionStorage.getItem("userid"));
            sessionStorage.setItem("role",result.data.user.role)
            console.log(sessionStorage.getItem("role"));
            sessionStorage.setItem("token",result.data.token)
            console.log(sessionStorage.getItem("token"));

           
            if (approved) {
              navigate('/dietitian-dashboard')
              
            }
            else{
              navigate('/pending-approval')
            }

           
          }

          else if(role=="admin"){

            sessionStorage.setItem("userid",result.data.user._id)
            console.log(sessionStorage.getItem("userid"));
            sessionStorage.setItem("role",result.data.user.role)
            console.log(sessionStorage.getItem("role"));
            sessionStorage.setItem("token",result.data.token)
            console.log(sessionStorage.getItem("token"));
            navigate('/admin-dashboard')
          }

        } else {
          if (result.status == 400) {
            alert("Invalid email or password");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill the form completely");
    }
  };

  return (
    <>
      <div className="bg-black text-center d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh', width: '100%' }}>

        <div className="bg-white border rounded p-4 d-flex flex-column align-items-center"
          style={{ height: 'auto', width: '400px' }}>

          {insideregister ? <h3 className="mb-4">REGISTER</h3> : <h3 className="mb-4">LOGIN</h3>}

          {insideregister ? (
            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3 w-100">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setregisterdetails({ ...registerdetails, username: e.target.value });
                }}
              />
            </FloatingLabel>
          ) : (
            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3 w-100">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setlogindetails({ ...logindetails, email: e.target.value })}
              />
            </FloatingLabel>
          )}

          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 w-100">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                if (insideregister) {
                  setregisterdetails({ ...registerdetails, password: e.target.value });
                } else {
                  setlogindetails({ ...logindetails, password: e.target.value });
                }
              }}
            />
          </FloatingLabel>

          {insideregister && (
            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3 w-100">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setregisterdetails({ ...registerdetails, email: e.target.value })}
              />
            </FloatingLabel>
          )}

          {insideregister && (
            <FloatingLabel controlId="floatingRole" label="Select Role" className="mb-3 w-100">
              <Form.Select
                aria-label="Floating label select example"
                value={registerdetails.role}
                onChange={(e) => setregisterdetails({ ...registerdetails, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="user">For Personal Use</option>
                <option value="dietitian">Dietitian</option>
              </Form.Select>
            </FloatingLabel>
          )}

          {registerdetails.role === 'dietitian' && insideregister && (
            <div className="mb-3 w-100">
              <label className="form-label fw-bold">Upload Certification</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.jpg,.png"
                onChange={(e) => setregisterdetails({ ...registerdetails, certificate: e.target.files[0] })}
              />
              Experience:
              <input onChange={(e) => setregisterdetails({ ...registerdetails, experience: e.target.value })} type="number" />

              Specialization:
              <input onChange={(e) => setregisterdetails({ ...registerdetails, specialization: e.target.value })} type="text" />
            </div>
          )}

          {insideregister ? (
            <div className='w-100'>
              <button onClick={handleregister} className="btn btn-dark w-100 mt-3">Register</button>
              <p>Already Registered? <a href="login">Login</a></p>
            </div>
          ) : (
            <div className='w-100'>
              <button onClick={handlelogin} className="btn btn-dark w-100 mt-3">Login</button>
              <p>Not Registered Yet? <a href="Register-user">Register</a></p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Authentication;
