import styles from './SelectOptions.module.css'
function SelectOptions({ id, title, values = [], defaultValue, handleOptionChange, isDisabled, isRequire }) {
   return (
      <div className={styles.wrapper}>
         <label className={styles.labelSelect} htmlFor={id}>
            {title} {isRequire && <span style={{ color: 'red' }}>*</span>}
         </label>

         <select
            id={id}
            className={styles.select}
            value={defaultValue !== '' ? defaultValue : 'select'}
            onChange={handleOptionChange}
            disabled={isDisabled}
         >
            <option value="select">--{title}--</option>
            {values.map((value, index) => (
               <option key={index} value={value.valueMember} className={styles.option}>
                  {value.displayMember}
               </option>
            ))}
         </select>
      </div>
   )
}

export default SelectOptions
