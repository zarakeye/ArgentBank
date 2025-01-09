import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const EditProfile: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleCancel = () => {
    
  }

  return (
    <div>
      <form onSubmit={() => {}}>
        <div className="flex flex-col items-center gap-y-[20px]">
          <div className="flex gap-x-[20px]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-[100px]"
                placeholder={user?.firstName}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-[100px]"
                placeholder={user?.lastName}
              />
            </div>
          </div>
          <div className="flex gap-x-[20px]">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;