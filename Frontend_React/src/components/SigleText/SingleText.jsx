import './singleText.scss'


export const SingleText = ({singleText, langEn}) => {

const enContent = singleText.content_en
const ruContent = singleText.content_ru
 
  return (
    <>
    <div>{singleText.name}</div>
    <pre className='single__text__content'>{langEn ? enContent : ruContent }</pre>
    </>
  )
}