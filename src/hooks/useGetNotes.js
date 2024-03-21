import { useState, useEffect, useContext } from 'react';
import { fetchNotes } from '../api/notes';
import noteContext, { useNoteContext } from '../context/notes/noteContext';
import { debounce } from '../utils/debounce';

export default function useGetNotes(page = 1, limit = 6) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const { notes, setNotes } = useContext(noteContext);

  const {searchTriggered} = useNoteContext();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError({});

      try {
        const response = await (fetchNotes(page, limit));
        
        if(response){
          setNotes(prev => [...prev, ...response.results]); // Replace existing posts with new ones
          setHasMore(page < response.totalPages);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log("EEEEEEEEEE=============== ",e)
          setError({ message: e.message });
      }
    };

    const debouncedFetchData = debounce(fetchData)
    if(!searchTriggered){
      debouncedFetchData();
    }
  }, [page, searchTriggered]);


  return { loading, error, notes, hasMore };
}
