export const fetchNotes = async (page, limit) => {
  try {
      console.log("Fetching.............");

      // Add a delay of 5 seconds using setTimeout
      await new Promise(resolve => setTimeout(resolve, 10000));

      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/get?page=${page}&?limit=${limit}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
          },
      });

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
