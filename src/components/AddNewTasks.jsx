import { useState } from "react";
import { db } from "../Firebase.js";
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewTasks({ user }) {
  const [titleTask, setTitleTask] = useState('');
  const [aboutTask, setAboutTask] = useState('');
  const tasksRef = collection(db, 'tasks');

  async function handleSubmitTask(e) {
    e.preventDefault();
  
    if (titleTask.trim() && aboutTask.trim()) {
      try {
        await addDoc(tasksRef, {
          userId: user.uid,  // Associate the task with the logged-in user
          titleTask: titleTask,
          aboutTask: aboutTask
        });
        toast.success('Task added successfully');
        setTitleTask(''); 
        setAboutTask(''); 
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    } else {
      toast.warning('Please fill in both fields'); 
    }
  }
  
  return (
    <div className="w-[390px] h-40 py-6 flex justify-center items-center">
      <div className="w-[345px] h-[30px] flex flex-row justify-between">
        <div className="w-[267px] h-[70px] flex flex-col space-y-2">
          <input
            className="w-auto h-[32] py-1 px-3 rounded-sm bg-[#242320] outline-none border border-[#FF8303] placeholder:text-[#F0E3CA] placeholder:opacity-40 text-white focus:bg-[#2B2A27]"
            type="text"
            placeholder="Title...."
            value={titleTask}
            onChange={(e) => setTitleTask(e.target.value)}
          />
          <input
            className="w-auto h-[32] py-1 px-3 rounded-sm bg-[#242320] outline-none border border-[#FF8303] placeholder:text-[#F0E3CA] placeholder:opacity-40 text-white focus:bg-[#2B2A27]"
            type="text"
            placeholder="About...."
            value={aboutTask}
            onChange={(e) => setAboutTask(e.target.value)}
          />
        </div>
        <button 
          className="outline-none group"
          onClick={handleSubmitTask} 
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="68" height="68" rx="7" fill="#1B1A17" stroke="#FF8303" stroke-width="2"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M36.5 24C36.5 23.4477 36.0523 23 35.5 23H34.5C33.9477 23 33.5 23.4477 33.5 24V32.5C33.5 33.0523 33.0523 33.5 32.5 33.5H24C23.4477 33.5 23 33.9477 23 34.5V35.5C23 36.0523 23.4477 36.5 24 36.5H32.5C33.0523 36.5 33.5 36.9477 33.5 37.5V46C33.5 46.5523 33.9477 47 34.5 47H35.5C36.0523 47 36.5 46.5523 36.5 46V37.5C36.5 36.9477 36.9477 36.5 37.5 36.5H46C46.5523 36.5 47 36.0523 47 35.5V34.5C47 33.9477 46.5523 33.5 46 33.5H37.5C36.9477 33.5 36.5 33.0523 36.5 32.5V24Z" fill="#FF8303"/>
        </svg>

        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewTasks;
