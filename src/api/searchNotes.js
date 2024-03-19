export const searchNotes = async (page = 1, limit = 8, searchQuery) => {
    if(!searchQuery) return {notes:[],totalResults:0};
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/notes/search?q=${searchQuery}&page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
  
      // Add a delay for the loading animation 
      await new Promise(resolve => setTimeout(resolve, 5000));
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      return error;
    }
  };
  