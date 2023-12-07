import { useEffect, useState } from "react"; 
import useSound from "use-sound";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import './music_track_card.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import cn from 'classnames'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export const MusicCard = ({track_name, track, langEn, track_description_en, handleMusicLike, track_id, currentUser, track_description_ru, track_image, track_source, track_likes }) => {
  // Стейт для лайков
  const [musicIsLiked, setMusicIsLiked] = useState(false)
  // Стейт для попапа о том, что нужно авторизоваться
  const [showPopoverNotAuth, setShowPopoverNotAuth] = useState(false)
  // Стейт для изменения класса кнопки с редактированием
  const [showEditBtn, setShowEditBtn] = useState(false)
  // Стейт для изменения класса кнопки для копирования
  const [showCopyBtn, setShowCopyBtn] = useState(false)
    // Стейт для изменения класса кнопки для скачивания
    const [showDownloadBtn, setShowDownloadBtn] = useState(false)





  // Чтобы отлайканные актуальный юзером карточки меняли цвет лайка на оранжевый, а при снятии лайка - обратно становились белыми  
  useEffect(()=> {
    if (track_likes?.some((s) => s === currentUser.uid))
    setMusicIsLiked(true);
  else setMusicIsLiked(false);
  }, [track_likes, currentUser])
  

// Кнопка при нажатии на лайк
const handleLikeClick = () => {
  if (currentUser !== '')
  {handleMusicLike(track);
    setShowPopoverNotAuth(false)}
  
  else setShowPopoverNotAuth(true)
} 

useEffect(()=>{
  if (showPopoverNotAuth)
  setTimeout(()=>{setShowPopoverNotAuth(false)}, 5000)
},[currentUser, showPopoverNotAuth])



  // Логика для плеера
  const [isPlaying, setIsPlaying] = useState(false)  
 
  
  const [play, { pause, duration, sound }] = useSound(track_source);
  const [currentTime, setCurrentTime] = useState({
    min: "",
    sec: "",
  });
  const [seconds, setSeconds] = useState(0);
  const [copied, setCopied] = useState(false)
  
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } 
    else {
      play();
      setIsPlaying(true);
    }
  };
// Время 
    let sec = duration / 1000;
    
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    let time = {
      min: min,
      sec: secRemain
    }
    if (time.sec < 10) {time.sec = '0' + time.sec}
  
    useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        let sec = Math.floor(sound.seek([]) % 60);
        if (sec < 10) {sec = '0' + sec};
        setCurrentTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);


  // Функция для копирования
  
  const copyOnClick = () => {
    navigator.clipboard.writeText(track_source);
    setCopied(true);
    setTimeout(()=> {setCopied(false);}, 3000)
    
  }
// Функция для скачивания

  function downloadTrack(blob, fileName = track_name) {
    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display:none",
      download: `${fileName}.mp3`,
      type:'audio/mpeg'
    
    });
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
  }


// Фетч для скачивания
  const downloadOnClick = () => {
  fetch(track_source,  {headers: {
    "Content-Type": "audio/mpeg",
    "Content-Disposition": "attachment"},
  })
  .then( res => res.blob() )
  .then( blob => {
    downloadTrack(blob)
  });
}




  return (
  <div className="music_page_audio_player_container" >
    <div>
      <div className="music_page_audio_player_wrapper">
        <div className="music_page_audio_player_edit_wrpapper" >
        
        </div>
        <div>
          <h3 className="music_page_track_title">{track_name}</h3>
          {langEn ?  <p className="music_page_track_description">{track_description_en}</p> 
          :
          <p className="music_page_track_description">{track_description_ru}</p>}
        </div>
        <img
          className="music_page_audio_image"
          src={track_image}
        />
        <div className="player_bottom_container">
          <div>
              <div className="music_page_player_time_sign">
                {/* Current Time */}
                {currentTime.sec !== 0 &&
                <span>
                  {currentTime.min}{':'}{currentTime.sec}
                </span>
                }
                <div>
            {/* Duration */}
            </div>
                <span className="duration">
                  {time.min}:{time.sec}
                </span>
                
            </div>
          </div>
          <div className="music_page_player_range">
            {/* Control btns */}
            {!isPlaying ? (
              <button className="music_page_player_btn" onClick={()=>{playingButton()}}>
                  <PlayCircleIcon />
              </button>
            ) : (
              <button className="music_page_player_btn" onClick={()=>{playingButton()}}>
                  <PauseCircleIcon />
              </button>
            )}
            <input
              type="range"
              min="0"
              max={duration / 1000}
              default="0"
              value={seconds}
              className="music_page_player_range_timeline"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
          </div>
        </div>
          <div className="music_page_player_controls">
          {/* Попап с требованием авторизоваться, чтобы ставить лайки */}
          
            <div className="music_page_player_controls_like_wrapper">
              {/* Кнопка с лайком */}
              <button onClick={()=>{handleLikeClick()}}  className={cn("music_page_player_controls_like_btn", { ["music_page_player_controls_like_btn_Active"]: musicIsLiked })} title={langEn ? 'Like' : 'Нравится'}><ThumbUpOutlinedIcon fontSize="14px"/>
                <span >{track_likes.length}</span>
              </button>
            
              {/* Количество лайков */}
              
            </div>


            <div className="music_page_player_controls_btn_copy_wrapper">
              
              {/* Попап при копировании, исчезает */}
              <span className={cn("music_player_copied_temp_span", {["music_player_copied_temp_span_Active"]: copied})} > {langEn? 'Copied!' : "Скопировано!"}</span>
              
              <button className={cn("music_page_audio_player_edit_btn", { ["music_page_audio_player_edit_btn_Visible"]: showEditBtn })} 
                title={langEn ? 'Edit' : 'Редактировать'}
                onMouseEnter={()=>{setShowEditBtn(true)}} 
                onMouseLeave={()=>{setShowEditBtn(false)}}><EditIcon fontSize="14px"/>
              </button>


              
              {/* Кнопка для копирования ссылки на аудио файл */}
              <button className={cn("music_page_audio_player_edit_btn", { ["music_page_audio_player_edit_btn_Visible"]: showCopyBtn })}  
              title={langEn ? 'Copy link' : 'Копировать ссылку'} 
              onMouseEnter={()=>{setShowCopyBtn(true)}} 
              onMouseLeave={()=>{setShowCopyBtn(false)}}
              onClick={()=>copyOnClick()}><ContentCopyIcon fontSize="14px"/></button>
              {/* Кнопка для скачивания */}
            
              <button 
              className={cn("music_page_audio_player_edit_btn", { ["music_page_audio_player_edit_btn_Visible"]: showDownloadBtn })}
              onMouseEnter={()=>{setShowDownloadBtn(true)}} 
              onMouseLeave={()=>{setShowDownloadBtn(false)}}
              onClick={()=>{downloadOnClick()}} title={langEn ? 'Download' : 'Скачать'} >
                <DownloadIcon fontSize="14px"/>
              </button>
              
              </div>
            
          </div>
              {showPopoverNotAuth && 
            <div className="music_page_player_warn_wrapper">
              <Link style={{textDecoration: 'none'}} to='/sign-in'>
              <small className="music_page_player_warn">{
                langEn ? 'Please, sign in to be able to give likes' : 'Пожалуйста, войдите, чтобы ставить лайки'}</small>
              </Link>
            </div>}
      </div>
    </div>
  </div>
  )
}