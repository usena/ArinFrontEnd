import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalTemplate from '../components/ModalTemplate';
import ProgressBar from '../components/ProgressBar';
import ChecklistItem from '../components/ChecklistItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faInfoCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {
            const token = localStorage.getItem('token');
            console.log(token)
            if (!token) {
                navigate('/log-in');
            }
        }, []);

    const [viewAddItemModal, setViewAddItemModal] = useState(false)
    const [viewAssignTokenModal, setViewAssignTokenModal] = useState(false)
    const [viewLogOutModal, setViewLogOutModal] = useState(false)

    const [tasks, setTasks] = useState([
        {
            id: 0,
            text: 'Wash the dishes',
            completed: false
        },
        {
            id: 1,
            text: 'Sweep the floors',
            completed: false
        },
        {
            id: 2,
            text: 'Do the homework',
            completed: false
        },
        {
            id: 3,
            text: 'Bake a cake',
            completed: false
        },
    ])

    const toggleCompleted = (id) => {
        setTasks(prev => 
        prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
        )
    }

    const removeItem = (id) => {
        setTasks(prev => 
        prev.filter(item => item.id != id)
        )
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const AddItemModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const newItem = {id: tasks.length ,text: formData.get('task'), completed: false}
            setTasks(prev => [...prev, newItem])
            console.log(newItem)
            setViewAddItemModal(false)
        }
    
        const styles = {
            input: 'bg-gray-100 border-b-2 border-gray-300 w-full h-10 my-3 px-3',
            btn_container: 'flex flex-row gap-3 justify-end',
            button: 'bg-gray-200 p-2 rounded-lg',
            submit: 'bg-blue-500 text-white p-2 rounded-lg'
        }
    
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Input your task here</label>
                <input required className={styles.input} type="text" placeholder='Task' name='task'/>
                <div className={styles.btn_container}>
                <button className={styles.button}>Cancel</button>
                <input className={styles.submit} type="submit" value="Add Item" />
                </div>
            </form>
        )
    }

    const AssignTokenModal = () => {
        const handleSubmit = (e) => {
        e.preventDefault()
        alert("Token assigned!")
        setViewAssignTokenModal(false)
        }

        const styles = {
            input: 'bg-gray-100 border-b-2 border-gray-300 w-full h-10 my-3 px-3',
            btn_container: 'flex flex-row gap-3 justify-end',
            button: 'bg-gray-200 p-2 rounded-lg',
            submit: 'bg-blue-500 text-white p-2 rounded-lg'
        }

        return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <label>Input Name</label>
            <input required className={styles.input} type="text" placeholder='Name' name='task'/>
            <label>Input ID</label>
            <input required className={styles.input} type="text" placeholder='ID' name='task'/>
            <div className={styles.btn_container}>
            <button className={styles.button}>Cancel</button>
            <input className={styles.submit} type="submit" value="Assign" />
            </div>
        </form>
        )
    }

    const LogOutModal = () => {
        const handleSubmit = (e) => {
        e.preventDefault()
        alert("Token assigned!")
        setViewAssignTokenModal(false)
        }

        const styles = {
            btn_container: 'flex flex-row gap-3 justify-end my-3',
            button: 'bg-gray-200 hover:bg-gray-300 p-2 w-full rounded-lg',
            logOut_btn: 'bg-red-500 hover:bg-red-900 text-white p-2 w-full rounded-lg'
        }

        return (
            <div>
                <h1>Are you sure you want to log out? You will be redirected back to login page</h1>
                <div className={styles.btn_container}>
                    <button className={styles.button} onClick={() => setViewLogOutModal(false)}>Cancel</button>
                    <button className={styles.logOut_btn} onClick={() => handleLogout()}>Log Out</button>
                </div>
            </div>
        )
    }

    
    const styles = {
        page: "flex justify-center items-center h-screen text-lg text-[#367c62]",
        container: "bg-white w-200 px-10 py-7 mx-auto rounded-2xl shadow-lg/20",

        header: "font-bold text-2xl border-b-2 pb-3",
        text: "my-3",
        section: 'mb-2',

        textarea: 'w-full min-h-40 mt-2 p-2 border-1 border-gray-300 rounded-md',
        action_btn: 'w-full bg-white hover:bg-gray-100 active:bg-gray-200 p-3 text-left text-xl rounded-xl flex flex-row items-center cursor-pointer justify-between transition-colors',

        form: "flex flex-col items-center gap-5",
        data_input: "flex flex-col font-semibold w-full",
        input: "bg-gray-100 p-3 rounded-xl border border-neutral-300 font-light text-gray-500",
        button: "text-white bg-[#367c62] hover:bg-[#2f614e] transition-colors hover w-full h-14 my-3 rounded-xl text-xl",
        logOut_btn: "text-white bg-red-500 hover:bg-red-200 hover:border hover:border-red-500 hover:text-red-500 transition-colors hover w-full h-14 my-3 rounded-xl text-xl"
    }
    
    return (
        <div className={styles.page}>
            <ModalTemplate title="Add Checklist Item" content={<AddItemModal />} visibility={viewAddItemModal} onCloseBtn={() => setViewAddItemModal(false)}/>
            <ModalTemplate title="Assign Token" content={<AssignTokenModal />} visibility={viewAssignTokenModal} onCloseBtn={() => setViewAssignTokenModal(false)}/>
            <ModalTemplate title="Confirm Log Out?" content={<LogOutModal />} visibility={viewLogOutModal} onCloseBtn={() => setViewLogOutModal(false)}/>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h1 className={styles.header}>🪙 Token Goes Here*</h1>
                    <button className={styles.button} onClick={() => setViewAssignTokenModal(true)}>Assign Token</button>
                </section>

                <section className={styles.section}>
                    <h1 className={styles.header}>✅ Checklist</h1>
                    <ProgressBar sections={tasks.length} completed={tasks.filter(task => task.completed).length}/>
                    <button className={styles.button} onClick={() => setViewAddItemModal(true)}>+ Add Item</button>
                    <div>
                        {tasks.map( ({id, text}, key) => 
                        <ChecklistItem key={key} text={text} onCheck={()=>{toggleCompleted(id)}} onTrash={()=>{removeItem(id)}} />
                        )}
                    </div>
                </section>

                <section className={styles.section}>
                    <h1 className={styles.header}>📝 Description</h1>
                    <textarea className={styles.textarea} name="" id="" placeholder='Enter description here'></textarea>
                </section>

                <section className={styles.section}>
                    <h1 className={styles.header}>📋 Notes</h1>
                    <textarea className={styles.textarea} name="" id="" placeholder='Enter notes here'></textarea>
                </section>

                <section className={styles.section}>
                    <h1 className={styles.header}>✨ Actions</h1>
                    <div className='flex flex-col items-start'>
                    <button className={styles.action_btn}>
                        <p> - Add Comment </p>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                    <button className={styles.action_btn}>
                        <p> - View Sender Info </p>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                    </button>
                </div>
                </section>
                <button className={styles.logOut_btn} onClick={() => setViewLogOutModal(true)}><b><FontAwesomeIcon icon={faDoorOpen} /> Log out</b></button>
            </div>
        </div>
    )
}

export default Dashboard