import './index.css';
import TaskInput from './components/AddNewTasks.jsx';
import Tasks from './components/Tasks.jsx';
import Footer from './components/Footer.jsx';
import { useEffect, useState } from 'react';
import image from './assets/todo list design.jpg';
import GmailAuth from './components/GmailAuth.jsx';
import Overlay from './components/Overlay.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 6000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black">
          <img src={image} alt="Loading" className="w-full h-full  object-fill" />
        </div>
      )}
      <div className={`${loading ? 'hidden' : 'block'} flex flex-col justify-center items-center`}>
        <h1 className='my-7 text-white text-3xl uppercase font-bold'>Todo List ✍ </h1>
        {user && <TaskInput user={user} />}
        {user && <Tasks user={user} />}
        {showLogin && (
          <>
            <Overlay className="opacity-100"/>
            <GmailAuth setShowLogin={setShowLogin} setUser={setUser} />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
