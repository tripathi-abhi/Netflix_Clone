import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;

// default import can be named renamed and non-default must be {name}

// only one default export in one file but multiple exports.