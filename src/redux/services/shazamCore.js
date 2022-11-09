import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


    export const shazamCoreApi = createApi({
        reducerPath:"shazamCoreApi",
        baseQuery:fetchBaseQuery({
            baseUrl:"https://shazam-core.p.rapidapi.com/v1",
            prepareHeaders:(headers) =>{
                headers.set('X-RapidAPI-Key',"ff73c7cec1msh3af8810b892319bp123d2ejsn49f3879c1700");
                return headers;
            }
        }),
        endpoints:(builder)=>({
           getTopCharts:builder.query({
            query: () => "/charts/world"
           }),
           getSongsDetails: builder.query({
            query:(songid)=> `/tracks/details?track_id=${songid}`
           }),
           getSongRelated: builder.query({
             query:(songid)=> `/tracks/related?track_id=${songid}`
           }),
           getArtistsDetails:builder.query({
             query:(artistId)=>`/artists/details?artist_id=${artistId}`
           }),
           getSongsByCountry: builder.query({
            query:()=> `/charts/country?country_code=IN`
           }),
           getSongsByGenre:builder.query({
            query:(genre)=>`/charts/genre-world?genre_code=${genre}`
           }),
           getSongsBySearch:builder.query({
            query:(searchTerm)=>`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
           }),
        })
    });

    export const {useGetTopChartsQuery, useGetSongsDetailsQuery, useGetSongRelatedQuery, useGetArtistsDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreQuery, useGetSongsBySearchQuery} = shazamCoreApi;