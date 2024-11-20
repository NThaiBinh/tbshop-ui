import cssInputValue from './InputValue.module.css'

function InputValue({
   id,
   title,
   value,
   message,
   type = 'text',
   min,
   max,
   maxLength,
   onChange,
   isRequire,
   isDisabled,
}) {
   return (
      <div className={cssInputValue.groupInput}>
         <label className={cssInputValue.labelInput} htmlFor={id}>
            {title} {isRequire && <span style={{ color: 'red' }}>*</span>}
         </label>
         <input
            id={id}
            className={cssInputValue.inputValue}
            type={type}
            min={min}
            max={max}
            maxLength={maxLength}
            name={id}
            disabled={isDisabled}
            value={value !== null ? value : ''}
            onChange={onChange}
         />
         <label className={cssInputValue.labelMessage}>{message}</label>
      </div>
   )
}

export default InputValue
