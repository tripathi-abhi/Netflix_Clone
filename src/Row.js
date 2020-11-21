import React,{useState, useEffect} from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {

    // a snippet which runs only on a condition of variable

    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(()=>{
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    // blank brackets run once when loading row

    const options = {
        height: "300",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
            .then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch(error => console.log(error))
        }
    }

    return(
        <div className="row">
            {/* row title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* row_posters */}
                {console.log(movies)}
                {movies.map((movie)=>(
                    <img 
                    key={movie.id}
                    onClick = {() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path }`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={options} />}
        </div>
    )
}

export default Row;