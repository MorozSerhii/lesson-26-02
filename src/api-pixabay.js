// https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}
// 345007f9ab440e5b86cef51be6397df1
import axios from 'axios';
const key = '345007f9ab440e5b86cef51be6397df1';
const URL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=345007f9ab440e5b86cef51be6397df1&page=1';

export default async function getTrending() {
  const reqvestData = await axios.get(URL);
  return reqvestData;
}
