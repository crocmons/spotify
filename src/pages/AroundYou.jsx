import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios"
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
const [country, setcountry] = useState('');
const [loading, setLoading] = useState(true);
const {activeSong, isPlaying} = useSelector((state)=> state.player);
const {data, isFetching, error} = useGetSongsByCountryQuery(country);
useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_QTaRfdF4JwgTfgs9KRK82Tv81VC9m`)
    .then((res)=> setcountry(res?.data?.location.country))
    .catch((err)=> console.log(err))
    .finally(()=> setLoading(false));

}, [country]);

if(isFetching && loading) return <Loader title="Songs Around you"/>
if(error && country ) return <Error />
return (

<div className='flex flex-col'>
<h2 className='font-bold text-3xl text-left mt-4 mb-10 text-white'>Around You <span className='font-black'>IN</span>
</h2>
<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
{data?.map((song,i)=>(
    <SongCard 
    key={song.key}
    song={song}
    isPlaying={isPlaying}
    activeSong={activeSong}
    data={data}
    i={i}
    />
))}
</div>
</div>
)
}

export default AroundYou;
