import { useEffect } from "react";
import { auth, googleProvider } from "../Firebase";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

function GmailAuth({ setShowLogin, setUser }) {

    const signIn = async () => {
        try {
            setShowLogin(false);
            await signInWithPopup(auth, googleProvider);

            // Set the logged-in user in the App state
            setUser(auth.currentUser);

            // Save the user's UID to localStorage
            localStorage.setItem('user', auth.currentUser.uid);
        } catch (error) {
            console.log(error);
        }
    };

    // Check for existing user session
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setShowLogin(false);
                setUser(user);

                // Save the user's UID to localStorage
                localStorage.setItem('user', user.uid);
            } else {
                setShowLogin(true);
                setUser(null);
                localStorage.removeItem('user');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [setShowLogin, setUser]);

    return (
        <div className='w-[300px] h-auto py-3 px-3 bg-[#1B1A17] border-t-[#A35709] border-t-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col justify-center items-center'>
            <button
                className="text-white mx-3 uppercase inline-block bg-[#A35709] rounded-full px-4 py-2 hover:bg-[#A35709] transition-colors duration-300 focus:outline-none focus:ring focus:ring-[#FF8303] focus:ring-offset-2"
                onClick={signIn}
            >
               <i className="bi bi-google"></i> Sign In With Google
            </button>
        </div>
    );
}

export default GmailAuth;
