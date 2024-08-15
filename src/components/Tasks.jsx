import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import SocialIcons from './SocialIcons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Overlay from "./Overlay";

function Tasks({ user }) {
    const tasksRef = collection(db, 'tasks');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskAbout, setEditTaskAbout] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        async function handleGetTasks() {
            try {
                const q = query(tasksRef, where("userId", "==", user.uid)); // Filter tasks by userId
                const data = await getDocs(q);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setTasks(filteredData);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        handleGetTasks(); // Initial load

        const intervalId = setInterval(() => {
            handleGetTasks();
        }, 10000); // Interval to refresh the tasks

        return () => clearInterval(intervalId);
    }, [user]);

    const handleDeleteClick = (taskId) => {
        setSelectedTaskId(taskId);
        setShowAlert(true);
    };

    const handleEditClick = (task) => {
        setEditTaskAbout(task.aboutTask);
        setEditTaskTitle(task.titleTask);
        setSelectedTaskId(task.id);
        setShowEdit(true);
    };

    const handleEditTask = async () => {
        if (!selectedTaskId) {
            console.error("No task selected for editing");
            return;
        }
        try {
            const taskRef = doc(db, 'tasks', selectedTaskId);
            await updateDoc(taskRef, {
                titleTask: editTaskTitle,
                aboutTask: editTaskAbout,
            });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === selectedTaskId
                        ? { ...task, titleTask: editTaskTitle, aboutTask: editTaskAbout }
                        : task
                )
            );
            setShowEdit(false);
            toast.success('Task updated successfully');
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error('Failed to update task');
        }
    };

    const confirmDeleteTask = async () => {
        try {
            if (!selectedTaskId) {
                console.error("No task selected for deletion");
                return;
            }
            const deleteRef = doc(db, 'tasks', selectedTaskId);
            await deleteDoc(deleteRef);
            setTasks(tasks.filter(task => task.id !== selectedTaskId));
            setShowAlert(false);
            toast.success("Task deleted successfully!");
        } catch (e) {
            toast.error(`Error: ${e.message}`);
        }
    };

    const cancelDeleteTask = () => {
        setShowAlert(false);
        setSelectedTaskId(null);
    };

    return (
        <div className="w-[380px] h-[100%] flex flex-col justify-center items-center space-y-2 overflow-auto py-7">
            {loading ? (
                <div className="border-t-2 border-b-2 border-[#FF8303] my-3">
                    <h1 className="text-[#F0E3CA] text-lg">LOADING........</h1>
                </div>
            ) : tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="py-2 w-[345px] relative" key={task.id}>
                        <div className="flex flex-row justify-between items-center bg-[#242320] border border-[#A35709] rounded-md px-3 py-3">
                            <div className="w-[265px] h-[auto] flex flex-col justify-normal">
                                <h1 className="text-[#F0E3CA] text-lg font-bold">{task.titleTask}</h1>
                                <h3 className="text-[#F0E3CA] text-base ">{task.aboutTask}</h3>
                            </div>
                            <button onClick={() => handleDeleteClick(task.id)}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="30" height="30" rx="4" fill="#1B1A17" stroke="#A35709" strokeWidth="2" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.0908 12.121C12.823 11.8532 12.3888 11.8532 12.121 12.121C11.8532 12.3888 11.8532 12.8229 12.121 13.0907L14.3232 15.2929C14.7137 15.6834 14.7137 16.3166 14.3232 16.7071L12.1211 18.9093C11.8533 19.1771 11.8533 19.6112 12.1211 19.879C12.3889 20.1468 12.823 20.1468 13.0908 19.879L15.293 17.6769C15.6835 17.2864 16.3166 17.2864 16.7072 17.6769L18.9092 19.879C19.177 20.1467 19.6112 20.1467 19.879 19.879C20.1468 19.6112 20.1468 19.177 19.879 18.9092L17.6769 16.7071C17.2864 16.3166 17.2864 15.6834 17.6769 15.2929L19.879 13.0908C20.1468 12.823 20.1468 12.3888 19.879 12.121C19.6113 11.8533 19.1771 11.8533 18.9093 12.121L16.7072 14.3232C16.3166 14.7137 15.6835 14.7137 15.293 14.3232L13.0908 12.121Z" fill="#FF8303" />
                                </svg>
                            </button>
                        </div>
                        <SocialIcons handleEditClick={() => handleEditClick(task)} />
                    </div>
                ))
            ) : (
                <div className="border-t-2 border-b-2 border-[#FF8303] my-3">
                    <h1 className="text-[#F0E3CA] text-lg">No tasks</h1>
                </div>
            )}
            {showAlert && (
                <>
                    <Overlay />
                    <Alerts onConfirm={confirmDeleteTask} onCancel={cancelDeleteTask} />
                </>
            )}
            <ToastContainer />
            {showEdit && (
                <>
                    <Overlay />
                    <EditTask 
                        editTaskAbout={editTaskAbout} 
                        setEditTaskAbout={setEditTaskAbout} 
                        editTaskTitle={editTaskTitle} 
                        setEditTaskTitle={setEditTaskTitle} 
                        handleEditTask={handleEditTask} 
                        setShowEdit={setShowEdit} 
                    />
                </>
            )}
        </div>
    );
}

function Alerts({ onConfirm, onCancel }) {
    return (
        <div className="w-[281px] h-[143px] bg-[#1B1A17]  border-t-[#A35709] border-t-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center">
            <h1 className="text-[#F0E3CA] text-xl mb-10">Delete this task?</h1>
            <div className='flex flex-row justify-around w-[100%]'>
                <button onClick={onCancel} className="bg-[#242320] text-[#D9D9D9] p-2 w-[100px] rounded-sm border border-[#A35709]">Cancel</button>
                <button onClick={onConfirm} className="bg-[#A35709] text-[#D9D9D9] p-2 w-[100px] rounded-sm">Delete</button>
            </div>
        </div>
    )
}

function EditTask({ editTaskAbout, setEditTaskAbout, editTaskTitle, setEditTaskTitle, handleEditTask, setShowEdit }) {
    return (
        <div className="w-[281px] h-[300px] bg-[#1B1A17] border-t-[#A35709] border-t-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center space-y-5 p-5">
            <h1 className="text-[#F0E3CA] text-xl mb-2">Edit Task</h1>
            <input
                type="text"
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
                className="w-[100%] p-2 bg-[#242320] text-[#F0E3CA] border border-[#A35709] rounded-sm"
                placeholder="Task Title"
            />
            <textarea
                value={editTaskAbout}
                onChange={(e) => setEditTaskAbout(e.target.value)}
                className="w-[100%] p-2 bg-[#242320] text-[#F0E3CA] border border-[#A35709] rounded-sm"
                placeholder="About Task"
            />
            <div className='flex flex-row justify-around w-[100%]'>
                <button onClick={() => setShowEdit(false)} className="bg-[#242320] text-[#D9D9D9] p-2 w-[100px] rounded-sm border border-[#A35709]">Cancel</button>
                <button onClick={handleEditTask} className="bg-[#A35709] text-[#D9D9D9] p-2 w-[100px] rounded-sm">Save</button>
            </div>
        </div>
    );
}

export default Tasks;
