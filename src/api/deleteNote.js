export const deleteNote = async (id) => {
    if(id){
        try {    
            let success = false
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
          if (response.status === 200){
            success = true
          }
          return success
        } catch (error) {
            throw error
        }
    }
}