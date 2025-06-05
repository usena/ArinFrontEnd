import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'


const CustomCheckbox = ({ onCheck }) => {
    const [checked, setChecked] = useState(false)
    const styles = {
        container: 'w-6 h-6 rounded-md transition-all cursor-pointer ',
        default: 'border border-neutral-300 hover:bg-neutral-200',
        checked: 'bg-blue-500 text-white'
    }
    const containerStyles = styles.container + (checked ? styles.checked : styles.default)
    const onClickEvent = () => {
        setChecked(!checked)
        if(onCheck){onCheck()}
    }
    
    return (
        <button className={containerStyles} onClick={onClickEvent}>
            {checked ? <FontAwesomeIcon icon={faCheck} /> : null}
        </button>
    )
}

export default CustomCheckbox