export const fetchNotes = async (page, limit) => {
  try {

      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/notes/get?page=${page}&?limit=${limit}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
          },
      });
      //add a delay for the loading animation 
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
