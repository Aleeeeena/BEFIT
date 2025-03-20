import axios from 'axios'

const commonapi=async(httpMethod,url,reqBody,reqHeader)=>{

 const reqconfig={



    method:httpMethod,
    url,
    data:reqBody,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
 }


return await axios(reqconfig).then(res=>
 {return res}
).catch(err=>{
    return err
})

}

export default commonapi