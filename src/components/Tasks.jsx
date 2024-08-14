import { useEffect, useState } from "react";
import { db } from "../Firebase"
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import SocialIcons from './SocialIcons';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const tasksRef = collection(db, 'tasks');
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
       async function handleGetTasks(){
        try{
          const data =  await getDocs(tasksRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          setTasks(filteredData);
        }catch(e){
            console.log(e)
        }
        finally{
          setLoading(false);
        }
    }  
    const intervalId = setInterval(() => {
        handleGetTasks();
      }, 100);
      return () => clearInterval(intervalId);
    },[])

    async function handleDeleteTask(taskId){
      try{
        const deleteRef = doc(db, 'tasks', taskId);
        console.log(deleteRef);
        await deleteDoc(deleteRef);
        setTasks(selectedTask => selectedTask.filter(task => task.id !== taskId));
      }
      catch(e){
        console.log(e)
      }
    }
  return (
    <div className="w-[380px] h-[100%] flex flex-col justify-center items-center space-y-2 overflow-auto py-7">
       {loading ? (
        <div className="border-t-2 border-b-2 border-[#FF8303] my-3">
        <h1 className="text-[#F0E3CA] text-lg">LOADING........</h1>
        </div>
       ) :
        tasks.length > 0 ? (
        tasks.map((task) =>(
          <div className="py-2 w-[345px] relative" key={task.id}>
            <div className="flex flex-row justify-between items-center bg-[#242320] border border-[#A35709] rounded-md px-3 py-3">
            <div className="w-[265px] h-[46px] flex flex-col justify-normal">
                <h1 className="text-[#F0E3CA] text-lg font-bold">{task.titleTask}</h1>
                <h3 className="text-[#F0E3CA] text-base ">{task.aboutTask}</h3>
            </div>
            <button onClick={() =>handleDeleteTask(task.id)}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" rx="4" fill="#1B1A17" stroke="#A35709" strokeWidth="2"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.0908 12.121C12.823 11.8532 12.3888 11.8532 12.121 12.121C11.8532 12.3888 11.8532 12.8229 12.121 13.0907L14.3232 15.2929C14.7137 15.6834 14.7137 16.3166 14.3232 16.7071L12.1211 18.9093C11.8533 19.1771 11.8533 19.6112 12.1211 19.879C12.3889 20.1468 12.823 20.1468 13.0908 19.879L15.293 17.6769C15.6835 17.2864 16.3166 17.2864 16.7072 17.6769L18.9092 19.879C19.177 20.1467 19.6112 20.1467 19.879 19.879C20.1468 19.6112 20.1468 19.177 19.879 18.9092L17.6769 16.7071C17.2864 16.3166 17.2864 15.6834 17.6769 15.2929L19.879 13.0908C20.1468 12.823 20.1468 12.3888 19.879 12.121C19.6113 11.8533 19.1771 11.8533 18.9093 12.121L16.7072 14.3232C16.3166 14.7137 15.6835 14.7137 15.293 14.3232L13.0908 12.121Z" fill="#FF8303"/>
            </svg>
            </button>
            </div>
            <SocialIcons />
            </div>
        ))
       ) : (
        <div className="border-t-2 border-b-2 border-[#FF8303] my-3">
        <h1 className="text-[#F0E3CA] text-lg">No tasks</h1>
        </div>
       )}
    </div>
  )
}



export default Tasks