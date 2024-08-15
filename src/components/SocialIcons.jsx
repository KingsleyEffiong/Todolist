
function SocialIcons({handleEditClick}){
    return(
      <div className="w-[100%] h-[36px] flex flex-row space-x-2 my-2 justify-end">
        <button>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" fill="#242320" stroke="#A35709"/>
        <path d="M22.5556 20.9511C21.9645 20.9511 21.4356 21.1844 21.0311 21.55L15.4856 18.3222C15.5245 18.1433 15.5556 17.9644 15.5556 17.7778C15.5556 17.5911 15.5245 17.4122 15.4856 17.2333L20.9689 14.0367C21.3889 14.4256 21.9411 14.6667 22.5556 14.6667C23.8467 14.6667 24.8889 13.6244 24.8889 12.3333C24.8889 11.0422 23.8467 10 22.5556 10C21.2645 10 20.2222 11.0422 20.2222 12.3333C20.2222 12.52 20.2534 12.6989 20.2922 12.8778L14.8089 16.0744C14.3889 15.6856 13.8367 15.4444 13.2222 15.4444C11.9311 15.4444 10.8889 16.4867 10.8889 17.7778C10.8889 19.0689 11.9311 20.1111 13.2222 20.1111C13.8367 20.1111 14.3889 19.87 14.8089 19.4811L20.3467 22.7167C20.3078 22.88 20.2845 23.0511 20.2845 23.2222C20.2845 24.4744 21.3034 25.4933 22.5556 25.4933C23.8078 25.4933 24.8267 24.4744 24.8267 23.2222C24.8267 21.97 23.8078 20.9511 22.5556 20.9511Z" fill="#D9D9D9"/>
        </svg>
        </button>

        <button>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" fill="#242320" stroke="#A35709"/>
        <path d="M19.6328 14.5469V23H17.375V14.5469H19.6328ZM17.2344 12.3438C17.2344 12.0156 17.349 11.7448 17.5781 11.5312C17.8073 11.3177 18.1146 11.2109 18.5 11.2109C18.8802 11.2109 19.1849 11.3177 19.4141 11.5312C19.6484 11.7448 19.7656 12.0156 19.7656 12.3438C19.7656 12.6719 19.6484 12.9427 19.4141 13.1562C19.1849 13.3698 18.8802 13.4766 18.5 13.4766C18.1146 13.4766 17.8073 13.3698 17.5781 13.1562C17.349 12.9427 17.2344 12.6719 17.2344 12.3438Z" fill="white"/>
        </svg>
        </button>

        <button onClick={handleEditClick}>
       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" fill="#242320" stroke="#A35709"/>
        <g clipPath="url(#clip0_23_123)">
        <path d="M12 21.5V24H14.5L21.8733 16.6267L19.3733 14.1267L12 21.5ZM23.8067 14.6933C24.0667 14.4333 24.0667 14.0133 23.8067 13.7533L22.2467 12.1933C21.9867 11.9333 21.5667 11.9333 21.3067 12.1933L20.0867 13.4133L22.5867 15.9133L23.8067 14.6933Z" fill="#D9D9D9"/>
        </g>
        <defs>
        <clipPath id="clip0_23_123">
        <rect width="16" height="16" fill="white" transform="translate(10 10)"/>
        </clipPath>
        </defs>
        </svg>
        </button>

      </div>
    )
  }

  export default SocialIcons