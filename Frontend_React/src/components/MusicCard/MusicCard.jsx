import { useEffect, useState } from "react"; 
import useSound from "use-sound";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import './music_track_card.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {download} from '../../utils/download'
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import { useForm } from "react-hook-form";


export const MusicCard = ({name, langEn, description_en, description_ru, image, source, likes }) => {
  

  
  
  // Логика для плеера
  const [isPlaying, setIsPlaying] = useState(false)  
  const [play, { pause, duration, sound }] = useSound(source);
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


  // const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

  // Функция для копирования
  
  const copyOnClick = () => {
    navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(()=> {setCopied(false);}, 3000)
    
  }

  return (
  <div>
    <div className="music_page_audio_player_container">
      <div className="music_page_audio_player_wrapper">
        <div>
          <h2 className="music_page_track_title">{name}</h2>
          {langEn ?  <p className="music_page_track_description">{description_en}</p> 
          :
          <p className="music_page_track_description">{description_ru}</p>}
        </div>
        <img
          className="music_page_audio_image"
          src={image}
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
            <div className="music_page_player_controls_like_wrapper">
              <button className="music_page_player_controls_like_btn" title={langEn ? 'Like' : 'Нравится'}><ThumbUpOutlinedIcon fontSize="small"/></button>
              <span className="music_page_player_controls_like_num">{likes}</span>
            </div>
            <div className="music_page_player_controls_btn_copy_wrapper">
            {copied && <span className="music_player_copied_temp_span">{langEn? 'Copied!' : "Скопировано!"}</span>}
            <button className="music_page_player_controls_btn_copy" title={langEn ? 'Copy link' : 'Копировать ссылку'} onClick={()=>copyOnClick()}><ContentCopyIcon fontSize="small"/></button>
            <Link to={`${source}`} target="_blank">
              <button title={langEn ? 'Download' : 'Скачать'} className="music_page_player_controls_btn_copy">
                <DownloadIcon fontSize="small"/>
              </button>
            </Link>
            </div>
          </div>
        
      </div>
    </div>
  </div>
  )
}