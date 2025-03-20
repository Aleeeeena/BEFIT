import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { getprofiledetailsAPI, profileAPI } from "../../services/allapi";
import commonapi from "../../services/commonrequestconfig";
import serverurl from "../../services/url";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokenauthcontext } from "../../context/Contextapi";



function UserprofileSettings() {

  const{setisauthorized}=useContext(tokenauthcontext)
  const [profilePic, setProfilePic] = useState(null);
  const [pro, setPro] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    email: "",
    profileImage: null,
  });
const navigate =useNavigate()
  useEffect(() => {
    getDetail();
  }, []);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setFormData({ ...formData, profileImage: file });
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch User Details
  const getDetail = async () => {
    const userId = sessionStorage.getItem("userid");

    try {
      const res = await getprofiledetailsAPI(userId);
      console.log(res.data);

      if (res.data) {
        setPro(res.data);
        setProfilePic(res.data.dp ? `${serverurl}/${res.data.dp}` : null);

        // Populate form fields
        setFormData({
          name: res.data.name || "",
          age: res.data.age || "",
          height: res.data.height || "",
          weight: res.data.weight || "",
          email: res.data.email || "",
          profileImage: `https://befitbackend.onrender.com/${res.data.dp}`, // Image will be uploaded separately
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const logout=()=>{

    sessionStorage.clear()
    setisauthorized(false)
    navigate('/')
      }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("height", formData.height);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("userId", sessionStorage.getItem("userid"));
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const reqHeader = { "Content-Type": "multipart/form-data" };
      const response = await profileAPI(formDataToSend, reqHeader);
      console.log(response.data);
      
      // Refresh profile after update
      getDetail();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Profile Settings</h2>

      <div className="text-center my-3">
        <Image
          src={profilePic || "https://via.placeholder.com/150"}
          roundedCircle
          width={150}
          height={150}
          className="border"
        />

        <Form.Group controlId="formFile" className="mt-2">
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit" className="px-4">
            Save Changes
          </Button>
        </div>
      </Form>

      <div><button onClick={logout} className="btn btn-danger">Logout</button></div>
    </Container>


  );
}

export default UserprofileSettings;

