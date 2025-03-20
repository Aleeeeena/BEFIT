import React, { useContext } from 'react'
import Authentication from './pages/Authentication'
import Home from './pages/Home'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import AdminDash from './pages/Admindash'
import Admintotalusers from './pages/Admintotalusers'
import Totaldietian from './pages/Totaldietian'
import TotalPayment from './pages/Totalpayment'
import Pendingapproval from './dietitian/pages/Pendingapproval'
import Dietitiandashboard from './dietitian/pages/Dietitiandashboard'
import ViewEarnings from './dietitian/pages/ViewEarnings'
import OpenChats from './dietitian/pages/OpenChats'
import ViewClients from './dietitian/pages/ViewClients'
import ClientDetails from './dietitian/pages/ClientDetails'
import Inbox from './dietitian/pages/Inbox'
import Userdash from './user/pages/Userdash'
import UserprofileSettings from './user/pages/UseprofileSettings'
import Subscribe from './user/pages/Subscribe'
import WorkoutPage from './user/pages/WorkoutPage'
import TrackPage from './user/pages/TrackPage'
import ConsultPage from './user/pages/ConsultPage'
import ConsultForm from './user/pages/ConsultForm'
import Paymentsuccess from './user/pages/Paymentsuccess'
import Mydietitians from './user/pages/Mydietitians'
import Chatwithdietian from './user/pages/Chatwithdietian'
import Report from './user/pages/Report'
import Befitai from './user/pages/Befitai'
import { tokenauthcontext } from './context/Contextapi'

















function App() {

  const{isauthorized}=useContext(tokenauthcontext)
  return (
    <>





   <Routes>
   <Route path={'/'} element={<Home />}  />
   <Route path={'/login'} element={<Authentication />}  />
   <Route path={'/register-user'} element={<Authentication insideregister={true} />}  />
   <Route path={'/register-dietian'} element={<Authentication insideregister={true} />}  />
   <Route path={'/admin-dashboard'}  element={<AdminDash />}  />
   <Route path={'/total-users'}  element={<Admintotalusers /> }  />
   <Route path={'/total-dietians'} element={<Totaldietian /> }   />
   <Route path={'/total-payment'} element={<TotalPayment />}   />



   

   

   <Route path={'/pending-approval'}   element={<Pendingapproval />} />
  <Route path={'/dietitian-dashboard'}  element={<Dietitiandashboard /> }  />
  <Route path={'/dietitian-earnings'}  element={<ViewEarnings /> }  />
  <Route path={'/dietitian/chat'}  element={<OpenChats /> }/>
  <Route path={'/dietitian/clients'}  element={<ViewClients />}/>
  <Route path={'/view/client/progress'}  element={<ClientDetails /> }/>
  <Route path={'/openchat/:id'}  element={<Inbox /> }/>
 







  <Route path={'/userdashboard'}  element={<Userdash /> }/>
  <Route path={'/user-profile-settings'}  element={<UserprofileSettings />}  />
  <Route path={'/user-consult'}  element={<ConsultPage /> }/>
  <Route path={'/user-workout'}  element={<WorkoutPage /> }/>
  <Route path={'/user-track-progress'}  element={<TrackPage /> } />
  <Route path={'/user-subscribe'}  element={<Subscribe /> }/>
  <Route path={'/consult-now'}  element={<ConsultForm /> } />
  <Route path={'/success'}  element={<Paymentsuccess /> } />
  <Route path={'/mydietitians'}  element={<Mydietitians /> } />
  <Route path={'/chatwithmydietitians'}  element={<Chatwithdietian /> } />
  <Route path={'/seereport'}  element={<Report /> }/>
  <Route path={'/befitai'}  element={<Befitai />} />



    </Routes>
    
    
    </>
  )
}

export default App