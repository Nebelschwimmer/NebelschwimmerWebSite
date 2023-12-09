import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import {MusicList} from '../../components/MusicList/MusicList'
import { addLikeById } from '../../utils/api_music';
import './musicPage.css'
import AddIcon from '@mui/icons-material/Add';
import { AddMusicForm } from './AddMusicForm/AddMusicForm';

export const MusicPage = ({langEn, showModal, setShowModal, trackList, setMusicLiked, handleMusicLike, setTrackList, currentUser}) => {




  return (
    <div className='music_page_container'>
      <div  className='music_page_container_title_btn_wrapper'>
        {langEn ? <h1 className='music_page_title'>My Music</h1> : <h1 className='music_page_title'>Моя музыка</h1>}
        <button onClick={()=>{setShowModal(true)}} className='music_page_add_btn'>{langEn ? 'Add New Track' : "Добавить музыку"}<AddIcon/> </button>
      </div>
      < MusicList trackList={trackList} handleMusicLike={handleMusicLike} setTrackList={setTrackList} langEn={langEn} setMusicLiked={setMusicLiked} currentUser={currentUser}/>
        {!!showModal &&
        <ModalWindow setShowModal={setShowModal} showModal={showModal}>
          <AddMusicForm langEn={langEn}/>
        </ModalWindow>
        }
    </div>
  )
}