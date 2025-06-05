import React from 'react'


const ProgressBar = ({ sections, completed }) => {
    const progress = completed / sections
    
    const statusStyle = () => {
        if (progress < 1){
            if (progress == 0){return 'bg-black'}
            else {return 'bg-yellow-400'}
        }
        else {return 'bg-green-600'}
    }
    const statusDisplay = () => {
        if (progress < 1){
            if (progress == 0){return 'Inactive'}
            else {return 'In progress'}
        }
        else {return 'Completed'}
    }

    const styles = {
        container: 'flex flex-row justify-between items-center gap-5',
        bar: 'bg-gray-200 w-4/5 h-2 rounded',
        progress : `bg-blue-500 h-full rounded transition-all`,
        status: `text-white text-center w-30 py-1 rounded-xl ${statusStyle()}`
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <div className={styles.progress} style={{ width: `${progress * 100}%` }}></div>
            </div>
            <div>
                {Math.round(progress * 100)}%
            </div>
            <div className={styles.status}>
                {statusDisplay()}
            </div>
        </div>
    )
}

export default ProgressBar