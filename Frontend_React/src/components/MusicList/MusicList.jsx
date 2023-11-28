import music_tracks_data from './Music_list.json'
import {MusicCard} from '../MusicCard/MusicCard'
import './music_track_list.css'
import { useState, useEffect } from 'react'
import {api} from '../../utils/api'

export const MusicList = ({langEn}) => {
  // const music_track_list_stingrified = JSON.stringify(music_tracks_data)
  // const music_track_list = JSON.parse(music_track_list_stingrified)

const [trackList, setTrackList] = useState([]);


useEffect(()=> {
  fetch('http://localhost:3020/music')
  .then((res)=>res.json())
  .then((result)=> setTrackList(result.data) )
}, [])
console.log(trackList)


// useEffect(()=> {
// //   api.getTrackList().then((data)=>setTrackList(data))
// // }, [])
// // console.log(trackList)





  return (
<div className='track_list_cards'>
{trackList.length ? 
trackList?.map((el) => {
        return (
          <MusicCard
            {...el}
            name = {el.track_name}
            key={el.track_id}
            id={el.track_id}
            description_en={el.track_description_en}
            description_ru={el.track_description_ru}
            image={el.track_image}
            likes={el.track_likes}
            comments={el.track_comments}
            source={el.track_source}
            langEn={langEn}
          
          />
        );
      })
      : <span>No music added or server connection problems</span>}
</div>
  )
}