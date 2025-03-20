import commonapi from "./commonrequestconfig";
import serverurl from "./url";

//userregister
export const registerAPI=async(reqBody)=>{

    return await commonapi("POST",`${serverurl}/register-user`,reqBody)
 }

 export const dietitianregisterAPI=async(reqBody,reqHeader)=>{

    return await commonapi("POST",`${serverurl}/register-dietitian`,reqBody,reqHeader)
 }

//login


export const loginAPI=async(reqBody)=>{

    return await commonapi("POST",`${serverurl}/login`,reqBody)
 }

 //totalusersa for admin


 export const allusersforadminAPI=async()=>{

   return await commonapi("GET",`${serverurl}/getalluser/admin`,"")
}
//delete user for admin


export const deleteuserforadminAPI=async(id)=>{

   return await commonapi("DELETE",`${serverurl}/admin/delete/${id}`,{})

}

//get unapproved dietitians

export const allunapproveddietitians=async()=>{

   return await commonapi("GET",`${serverurl}/getallunapproveddietitians/admin`,"")
}

//approve dietian



export const approvedietitianAPI=async(id,reqBody)=>{

   return await commonapi("PUT",`${serverurl}/dietitian/approve/${id}`,reqBody)

}
//reject dietitian


export const rejectdietitianAPI=async(id)=>{

   return await commonapi("DELETE",`${serverurl}/reject/approval/${id}`,{})

}
//get all dietitians
export const getallactive=async()=>{

   return await commonapi("GET",`${serverurl}/getallactivedietitians`,"")
}


//all active dietitians for user


export const getalldietitiansforuserAPI=async()=>{

   return await commonapi("GET",`${serverurl}/alldietitians/user`,"")
}

//to get all the subscribe dusers for the admin


export const getallsubscribedusersAPI=async()=>{

   return await commonapi("GET",`${serverurl}/getallsubscribedusers`,"")
}


export const getallsubscribersofthedietitianAPI=async(dietitianId)=>{

   return await commonapi("GET",`${serverurl}/getalldietitiansubscribers/${dietitianId}`,"")
}


//pending to done

export const pendingtodoneAPI=async(id)=>{

   return await commonapi("PUT",`${serverurl}/pendingtodone/${id}`)

}


//remove dietitoan

export const removedietitianAPI=async(id)=>{

   return await commonapi("DELETE",`${serverurl}/removedietitian/${id}`,{})

}


//forpaymnet oage
export const paymentpage=async()=>{

   return await commonapi("GET",`${serverurl}/paymentpage`,"")
}
//get all clients  for dietitians

export const getallclientAPI=async(id)=>{

   return await commonapi("GET",`${serverurl}/allclients/${id}`,"")
}

//post treatment plans for clients

export const postplanAPI=async(reqBody)=>{

   return await commonapi("POST",`${serverurl}/treatment`,reqBody)
}
//get my dietians
export const getallofmydietitiansAPI=async(id)=>{

   return await commonapi("GET",`${serverurl}/getmydietitians/${id}`,"")
}


//post details by client

export const postdetailsAPI=async(reqBody)=>{

   return await commonapi("POST",`${serverurl}/postdetails`,reqBody)
}

//get all suggestuions

export const getallsuggestionAPI=async(clientid,dietid)=>{

   return await commonapi("GET",`${serverurl}/getsuggestion/${clientid}/${dietid}`,"")
}
//get all earning details
export const getearningdetails=async(id)=>{

   return await commonapi("GET",`${serverurl}/earningdetails/${id}`,"")
}

//get the client report

export const getreportAPI=async(dietid,clientid)=>{

   return await commonapi("GET",`${serverurl}/clientreport/${dietid}/${clientid}`,"")
}

//send profile details
export const profileAPI=async(reqBody,reqHeader)=>{

   return await commonapi("POST",`${serverurl}/profile`,reqBody,reqHeader)
}
//get profile details

export const getprofiledetailsAPI=async(userId)=>{

   return await commonapi("GET",`${serverurl}/getprofiledetails/${userId}`,"")
}

