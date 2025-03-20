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
   <Route path={'/total-users'}  element={isauthorized?<Admintotalusers />:<Navigate to={'/login'}/> }  />
   <Route path={'/total-dietians'} element={isauthorized?<Totaldietian />:<Navigate to={'/login'}/> }   />
   <Route path={'/total-payment'} element={isauthorized?<TotalPayment />:<Navigate to={'/login'}/> }   />



   

   

   <Route path={'/pending-approval'}   element={<Pendingapproval />} />
  <Route path={'/dietitian-dashboard'}  element={<Dietitiandashboard /> }  />
  <Route path={'/dietitian-earnings'}  element={isauthorized?<ViewEarnings />:<Navigate to={'/login'}/> }  />
  <Route path={'/dietitian/chat'}  element={isauthorized?<OpenChats />:<Navigate to={'/login'}/> }/>
  <Route path={'/dietitian/clients'}  element={isauthorized?<ViewClients />:<Navigate to={'/login'}/> }/>
  <Route path={'/view/client/progress'}  element={isauthorized?<ClientDetails />:<Navigate to={'/login'}/> }/>
  <Route path={'/openchat/:id'}  element={isauthorized?<Inbox />:<Navigate to={'/login'}/> }/>
 







  <Route path={'/userdashboard'}  element={<Userdash /> }/>
  <Route path={'/user-profile-settings'}  element={isauthorized?<UserprofileSettings />:<Navigate  to={'/login'}/> }  />
  <Route path={'/user-consult'}  element={isauthorized?<ConsultPage />:<Navigate to={'/login'}/> }/>
  <Route path={'/user-workout'}  element={isauthorized?<WorkoutPage />:<Navigate to={'/login'}/> }/>
  <Route path={'/user-track-progress'}  element={isauthorized?<TrackPage />:<Navigate to={'/login'}/> } />
  <Route path={'/user-subscribe'}  element={isauthorized?<Subscribe />:<Navigate to={'/login'}/> }/>
  <Route path={'/consult-now'}  element={isauthorized?<ConsultForm />:<Navigate to={'/login'}/> } />
  <Route path={'/success'}  element={isauthorized?<Paymentsuccess />:<Navigate to={'/login'}/> } />
  <Route path={'/mydietitians'}  element={isauthorized?<Mydietitians />:<Navigate to={'/login'}/> } />
  <Route path={'/chatwithmydietitians'}  element={isauthorized?<Chatwithdietian />:<Navigate to={'/login'}/> } />
  <Route path={'/seereport'}  element={isauthorized?<Report />:<Navigate to={'/login'}/> }/>
  <Route path={'/befitai'}  element={isauthorized?<Befitai />:<Navigate to={'/login'}/> } />



    </Routes>
    
    
    </>
  )
}

export default App