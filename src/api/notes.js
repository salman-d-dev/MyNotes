const host = process.env.REACT_APP_BACKEND_HOST;

export const fetchNotes = async (page, limit) => {
  try {
    const response = await fetch(
      `${host}/api/v1/notes/get?page=${page}&?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    //add a delay for the loading animation
    await new Promise((resolve) => setTimeout(resolve, 5000));

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

export const addNote = async (title, description, tag) => {
  try {
    let success = false;
    const response = await fetch(
      `${host}/api/v1/notes/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    if (response.status === 200) {
      success = true;
    }
    return success;
  } catch (error) {
    throw error;
  }
};

export const editNote = async (id, title, description, tag) => {
  try {
    let success = false;
    const response = await fetch(
      `${host}/api/v1/notes/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    if (response.status === 200) {
      success = true;
    }
    return success;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  if (id) {
    try {
      let success = false;
      const response = await fetch(
        `${host}/api/v1/notes/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        success = true;
      }
      return success;
    } catch (error) {
      throw error;
    }
  }
};

export const searchNotes = async (page = 1, limit = 8, searchQuery) => {
  if (!searchQuery) return { notes: [], totalResults: 0 };
  try {
    const response = await fetch(
      `${host}/api/v1/notes/search?q=${searchQuery}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    // Add a delay for the loading animation
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
