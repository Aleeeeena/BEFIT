import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getallofmydietitiansAPI, getallsuggestionAPI, postdetailsAPI } from '../../services/allapi'
import { Button, Modal } from 'react-bootstrap'



function Mydietitians() {
    const [mydietitians, setmydietitians] = useState([])
    const [show, setShow] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false); // New modal for "Hello User"
    const[report,setreport]=useState([])
const[deitid,setdietid]=useState("")
    // Food Intake Details State
    const [details, setDetails] = useState({
        earlyMorning: '',
        morning: '',
        lunch: '',
        evening: '',
        night: '',
        water: ''
    })
    const navigate = useNavigate()
    // Personal Info State
    const [personalInfo, setPersonalInfo] = useState({
        age: '',
        height: '',
        weight: '',
        purpose: ''
    })

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setdietid(id)
        setShow(true)}

    useEffect(() => {
        getmydietitians()
    }, [])


    const handleViewClose = () => setShowViewModal(false); // Close View Modal

    const handlesuggestions=async(dietid)=>{

       try {
        const clientid=sessionStorage.getItem('userid')
        const result=await getallsuggestionAPI(clientid,dietid)
        console.log(result.data);

        setreport(result.data)
        
       } catch (error) {

        console.log(error);
        
        
       }
        
    }


    const handleview = (id) => {

        const dietid=id
        setShowViewModal(true); // Open "Hello User" modal
        handlesuggestions(dietid)
    };

    const getmydietitians = async () => {
        const id = sessionStorage.getItem("userid")
        try {
            const result = await getallofmydietitiansAPI(id)
            console.log(result.data)

            if (result.data && result.data.dietitians) {
                setmydietitians(result.data.dietitians)
            } else {
                setmydietitians([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Handle input changes for food intake
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    // Handle input changes for personal info
    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target
        setPersonalInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }))
    }

    // Function to log all details when clicking "Done"


    const handleDone = async () => {
        const clientId = sessionStorage.getItem("userid"); // Assuming user ID from session
        const dietitianId = deitid // Set this dynamically based on selected dietitian
    
        const requestBody = {
            dietitianId,
            clientId,
            age: personalInfo.age,
            purpose: personalInfo.purpose,
            weight: personalInfo.weight,
            height: personalInfo.height,
            todayMealIntake: {
                earlyMorning: details.earlyMorning,
                morning: details.morning,
                lunch: details.lunch,
                evening: details.evening,
                night: details.night,
                water: details.water
            }
        };
    
        try {
            const response = await postdetailsAPI(requestBody);
            console.log("📌 API Response:", response.data);
            alert("Details submitted successfully!");
            handleClose();
        } catch (error) {
            console.error("❌ Error submitting details:", error);
            alert("Failed to submit details.");
        }
    };
    const handlechat=(id)=>{
      sessionStorage.setItem("dietitianid",id)
    }
   
  
    return (
        <>
            <h1 className='d-flex justify-content-center'>My Dietitians</h1>

           <div className='d-flex justify-content-center container mt-3'>



           <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Enter Details</th>
                        <th>See dietian's suggesion</th>
                        <th>Chat</th>
                    </tr>
                </thead>
                <tbody>
                    {mydietitians.length > 0 ? (
                        mydietitians.map((r, index) => (
                            <tr key={index}>
                                <td>{r.username}</td>
                                <td><button className='btn btn-warning' onClick={()=>handleShow(r._id)}>Enter</button></td>
                                <td><button className='btn btn-success' onClick={()=>handleview(r._id)}>View</button></td>
                                <td>
                                    <Link to='/chatwithmydietitians'>
                                        <button className='btn btn-info' onClick={()=>handlechat(r._id)}>Chat</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No subscribed dietitians available</td>
                        </tr>
                    )}
                </tbody>
            </table>
           </div>

            {/* Modal for Entering Details */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>🔹 Personal Information</h5>
                    <input name="age" value={personalInfo.age} onChange={handlePersonalInfoChange} placeholder='Age' className='form-control mb-2' type="number" />
                    <input name="height" value={personalInfo.height} onChange={handlePersonalInfoChange} placeholder='Height (cm)' className='form-control mb-2' type="number" />
                    <input name="weight" value={personalInfo.weight} onChange={handlePersonalInfoChange} placeholder='Weight (kg)' className='form-control mb-2' type="number" />
                    <input name="purpose" value={personalInfo.purpose} onChange={handlePersonalInfoChange} placeholder='Purpose (e.g., Weight Loss, Muscle Gain)' className='form-control mb-2' type="text" />

                    <h5 className='mt-3'>🍽️ Food Intake</h5>
                    <input name="earlyMorning" value={details.earlyMorning} onChange={handleInputChange} placeholder='Early Morning Food Intake' className='form-control mb-2' type="text" />
                    <input name="morning" value={details.morning} onChange={handleInputChange} placeholder='Morning Food Intake' className='form-control mb-2' type="text" />
                    <input name="lunch" value={details.lunch} onChange={handleInputChange} placeholder='Lunch Food Intake' className='form-control mb-2' type="text" />
                    <input name="evening" value={details.evening} onChange={handleInputChange} placeholder='Evening Food Intake' className='form-control mb-2' type="text" />
                    <input name="night" value={details.night} onChange={handleInputChange} placeholder='Night Food Intake' className='form-control mb-2' type="text" />
                    <input name="water" value={details.water} onChange={handleInputChange} placeholder='Water Intake (liters)' className='form-control mb-2' type="text" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleDone}>Done</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showViewModal} onHide={handleViewClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>👋 Hi User, Here's Your Report</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {report && report.clientDetails ? (
            <>
                <h5 className="text-primary">📝 Personal Details</h5>
                <p><strong>Age:</strong> {report.clientDetails.details.age} years</p>
                <p><strong>Height:</strong> {report.clientDetails.details.height} cm</p>
                <p><strong>Weight:</strong> {report.clientDetails.details.weight} kg</p>
                <p><strong>Purpose:</strong> {report.clientDetails.details.purpose}</p>

                <hr />

                <h5 className="text-success">🍽️ Today's Meal Intake</h5>
                <p><strong>Early Morning:</strong> {report.clientDetails.details.todayMealIntake.earlyMorning}</p>
                <p><strong>Morning:</strong> {report.clientDetails.details.todayMealIntake.morning}</p>
                <p><strong>Lunch:</strong> {report.clientDetails.details.todayMealIntake.lunch}</p>
                <p><strong>Evening:</strong> {report.clientDetails.details.todayMealIntake.evening}</p>
                <p><strong>Night:</strong> {report.clientDetails.details.todayMealIntake.night}</p>
                <p><strong>Water Intake:</strong> {report.clientDetails.details.todayMealIntake.waterIntake} liters</p>

                <hr />

                <h5 className="text-danger">📌 Suggested Treatment Plan</h5>
                <p><strong>Early Morning:</strong> {report.clientDetails.treatmentPlan.details.earlyMorning}</p>
                <p><strong>Morning:</strong> {report.clientDetails.treatmentPlan.details.morning}</p>
                <p><strong>Lunch:</strong> {report.clientDetails.treatmentPlan.details.lunch}</p>
                <p><strong>Evening:</strong> {report.clientDetails.treatmentPlan.details.evening}</p>
                <p><strong>Night:</strong> {report.clientDetails.treatmentPlan.details.night}</p>
                <p><strong>Recommended Water Intake:</strong> {report.clientDetails.treatmentPlan.details.waterIntake} liters</p>

                <p className="text-muted"><small>Last updated: {new Date(report.clientDetails.treatmentPlan.updatedAt).toLocaleString()}</small></p>
            </>
        ) : (
            <p>No report data available.</p>
        )}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleViewClose}>Close</Button>
    </Modal.Footer>
</Modal>

        </>
    )
}

export default Mydietitians
