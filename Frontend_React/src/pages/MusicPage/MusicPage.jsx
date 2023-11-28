import {MusicList} from '../../components/MusicList/MusicList'

export const MusicPage = ({langEn}) => {

  return (
    <>
    {langEn ? <h1 style={{color: 'darkorange'}}>My music</h1> : <h1 style={{color: 'darkorange'}}>Моя музыка</h1>}
    
<MusicList langEn={langEn}/>
    </>
  )
}