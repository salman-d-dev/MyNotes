import { useState } from "react"

const usePostData = () =>{
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null)
    const [success, setSuccess] = useState(false)
    
    const sendData = async(apiCall, formData) =>{
        //reset states on every try
        setLoading(true);
        setIsError(false)
        setError(null)


        try {
            const {data, success} = await apiCall(formData);
            setLoading(false)
            setData(data)
            setSuccess(success)
        } catch (error) {
            console.log("Hooooook ========== ",error)
            setIsError(true)
            setError(error.message)
        }
    }
    return {loading, isError, error, data, success, sendData}
}

export default usePostData;