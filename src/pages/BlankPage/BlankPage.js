import styles from './BlankPage.module.css'
import imageBlankPage from '../imagePages/image-blank-page.jpg'

function BlankPage() {
   return (
      <div className={styles.wrapper}>
         <img className={styles.img} src={imageBlankPage} alt="Trang trống" />
         <h2>Không có gì ở đây</h2>
      </div>
   )
}

export default BlankPage
