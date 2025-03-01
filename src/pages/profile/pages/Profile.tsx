import { useState } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "../../../components/MainLayout";
import { useProfileStore } from "../profile.store";

interface ProfileFormData {
  firstName: string;
  lastName: string;
}

export function Profile() {
  const profile = useProfileStore((state) => state.user);

  // Initialize form with values from the store
  const initialData: ProfileFormData = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
  };

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: initialData,
  });

  const [editMode, setEditMode] = useState(false);

  const onSubmit = (data: ProfileFormData) => {
    console.log("Updated Profile:", data);
    // Call API to update profile here
    setEditMode(false);
  };

  return (
    <MainLayout pageTitle="Profile">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full md:w-3/4 lg:w-1/2">
          {/* First Name */}
            <label className="label">First Name</label>
            <input
              type="text"
              {...register("firstName")}
              disabled={!editMode}
              className="input"
            />

          {/* Last Name */}
            <label className="label">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              disabled={!editMode}
              className="input"
            />

          {/* Email (Read-only) */}
            <label className="label">Email</label>
            <p className="input">{profile?.email}</p>

          {/* Actions */}
          <div className="flex gap-4">
            {editMode ? (
              <>
                <button type="submit" className="button-primary w-full lg:w-fit flex-1">
                  Save
                </button>
                <button
                  type="button"
                  className="w-full lg:w-fit button-primary bg-gray-500 flex-1"
                  onClick={() => {
                    reset(initialData);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="button-primary w-full lg:w-fit flex-1"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}

            <button className="button-primary bg-red-600 w-full lg:w-fit flex-1">
              Delete Account
            </button>
          </div>
        </form>
    </MainLayout>
  );
}

export default Profile;
