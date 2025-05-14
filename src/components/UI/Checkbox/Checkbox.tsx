
import './Checkbox.scss'

interface CheckboxProps {
  check: boolean;
  onHandleToggle: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ check, onHandleToggle }) => {

  return (
    <label className="checkbox__wrap">
      <input 
        type="checkbox" 
        className="checkbox__input" 
        checked={check} 
        onChange={onHandleToggle} 
      />
      <span className='checkbox__checkmark'></span>
    </label>
  )
}

