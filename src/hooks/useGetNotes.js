import { useState, useEffect, useContext } from 'react';
import { fetchNotes } from '../api/fetchNotes';
// import { getCurrentTime } from '../utils/helpers';
import noteContext from '../context/notes/noteContext';

export default function useGetNotes(page = 1, limit = 6) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const { notes, setNotes } = useContext(noteContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError({});

      try {
        const response = await fetchNotes(page, limit);
        console.log("🚀 ~ fetchData ~ response:", response)
        
        setNotes(prev => [...prev, ...response.results]); // Replace existing posts with new ones
        setHasMore(page < response.totalPages);
        setLoading(false);
      } catch (e) {
        setLoading(false);
          setError({ message: e.message });
          console.log(e.message)
      }
    };

    fetchData();
  }, [page]);

//   const addPostLocally = (title, content, userID, author) => {
//     const newPost = {
//       title: title,
//       content: content,
//       user: userID,
//       author: author,
//       createdAt: getCurrentTime(),
//     };
//     setNotes((prevPosts) => [newPost, ...prevPosts]);
//   };

  return { loading, error, notes, hasMore };
}
