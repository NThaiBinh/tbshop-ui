import styles from './SearchDashbroad.module.css'

function SearchDashbroad({ value, onChange }) {
   return (
      <div className={styles.wrapper}>
         <input
            className={styles.input}
            type="search"
            placeholder="Bạn cần tìm gì?"
            onChange={onChange}
            value={value}
         />
      </div>
   )
}

export default SearchDashbroad
