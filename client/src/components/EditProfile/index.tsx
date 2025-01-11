import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../pages/Login/authSlice";
import type { User } from "../../services/api.types";

interface EditProfileProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({setEditMode}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const cancelEditMode = () => {
    setEditMode(false);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (formData) {
      const firstName = (formData.get('firstName') === null || formData.get('firstName') === '') ? event.currentTarget.firstName.getAttribute('placeholder') as string : formData.get('firstName') as string;
      
      const lastName = (formData.get('lastName') === null || formData.get('lastName') === '') ? event.currentTarget.lastName.getAttribute('placeholder') as string : formData.get('lastName') as string;

      const updateUserProfile: User = {
        id: user?.id as string,
        email: user?.email as string,
        firstName: firstName,
        lastName: lastName,
        createdAt: user?.createdAt as string,
        updatedAt: Date.now().toString(),
      }

      dispatch(updateProfile(updateUserProfile));  
    }

    setEditMode(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-y-[20px]">
          <div className="flex gap-x-[20px]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-[200px] h-[35px] text-black pl-[10px] rounded-[3px]"
                placeholder={user?.firstName}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-[200px] h-[35px] text-black pl-[10px] rounded-[3px]"
                placeholder={user?.lastName}
              />
            </div>
          </div>
          <div className="flex gap-x-[20px]">
            <button type="submit" className="block w-[80px] p-[8px] text-[1.1rem] font-bold border-[#00bc77] border-r-solid border-r-[2px] border-r-black border-b-solid border-b-[2px] border-b-black bg-[#00bc77] text-white">Save</button>
            <button type="button" className="block w-[80px] p-[8px] text-[1.1rem] font-bold border-[#00bc77] border-r-solid border-r-[2px] border-r-black border-b-solid border-b-[2px] border-b-black bg-[#00bc77] text-white" onClick={cancelEditMode}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;