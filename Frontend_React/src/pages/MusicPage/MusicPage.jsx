import {MusicList} from '../../components/MusicList/MusicList'
import audio from './Denis1.mp3'


export const MusicPage = ({langEn}) => {




  return (
    <>
    {langEn ? <h1 style={{color: 'darkorange'}}>My music</h1> : <h1 style={{color: 'darkorange'}}>Моя музыка</h1>}
    <button onClick={()=>{}}>Play</button> 





    
    <figure>
    <figcaption>По просьбе Дениса:</figcaption>
    <audio  src="http://localhost:3020/public/Denis1.mp3">
    </audio>
    </figure>
<MusicList langEn={langEn}/>
    </>
  )
}