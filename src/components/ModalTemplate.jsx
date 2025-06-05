import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const ModalTemplate = ({ title, content, visibility, onCloseBtn }) => {
    const styles = {
        container: 'bg-white p-5 rounded-xl  shadow-xl/20 w-1/2 transition-all',
        overlay: 'fixed inset-0 bg-[#00000050] flex justify-center items-center',
        title: 'flex flex-row items-center justify-between text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3',
        x_btn: 'hover:text-red-500 w-8 h-8 rounded cursor-pointer transition-colors'
    }

    if (visibility) return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                    <button 
                    className={styles.x_btn}
                    onClick={() => onCloseBtn()}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                {content}
            </div>
        </div>
    )
}
export default ModalTemplate