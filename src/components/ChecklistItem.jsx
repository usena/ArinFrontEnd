import React from 'react'
import CustomCheckbox from './CustomCheckbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const ChecklistItem = ({ text, onCheck, onTrash }) => {
    const styles = {
        container: 'flex flex-row items-center gap-3 w-full last:border-b-0 border-b-1 first:border-t-0 border-t-1 border-gray-100 py-2',
        text: 'text-lg font-thin',
        x_btn: 'ml-auto mr-3 text-lg hover:text-neutral-400 cursor-pointer transition-colors'
    }

    return (
        <div className={styles.container}>
            <CustomCheckbox onCheck={() => onCheck()}/>
            <p className={styles.text}>{text}</p>
            <button className={styles.x_btn} onClick={() => onTrash()}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    )
}

export default ChecklistItem