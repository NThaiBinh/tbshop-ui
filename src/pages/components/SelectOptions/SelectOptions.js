import cssSelectOptions from './SelectOptions.module.css'
function SelectOptions({ id, title, values = [], defaultValue, handleOptionChange, isDisabled, isRequire }) {
   return (
      <div className={cssSelectOptions.wrapper}>
         <label className={cssSelectOptions.labelSelect} htmlFor={id}>
            {title} {isRequire && <span style={{ color: 'red' }}>*</span>}
         </label>

         <select
            id={id}
            className={cssSelectOptions.select}
            value={defaultValue !== '' ? defaultValue : 'select'}
            onChange={handleOptionChange}
            disabled={isDisabled}
         >
            <option value="select">--{title}--</option>
            {values.map((value, index) => (
               <option key={index} value={value.valueMember} className={cssSelectOptions.option}>
                  {value.displayMember}
               </option>
            ))}
         </select>
      </div>
   )
}

export default SelectOptions
