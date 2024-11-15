import cssBlankPage from './BlankPage.module.css'
import imageBlankPage from '../imagePages/image-blank-page.jpg'

function BlankPage() {
   return (
      <div className={cssBlankPage.wrapper}>
         <img className={cssBlankPage.img} src={imageBlankPage} />
         <h2>Không có gì ở đây</h2>
      </div>
   )
}

export default BlankPage
