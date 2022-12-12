import {useDispatch, useSelector} from 'react-redux';
import {getMovies} from '../redux/reducers/reports';
import {useEffect} from 'react';

export default function useReports() {
  const {movies} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  useEffect(() => {
    fetchMovies();
  }, []);
}
// const useReports = () => useSelector(state => state.moviesReducer);
//export default useReports;
