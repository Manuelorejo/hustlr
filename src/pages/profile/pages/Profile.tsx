import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiUser, CiTrash } from "react-icons/ci";
import {
  useGetProfile,
  useUpdateProfile,
  useChangePassword,
  useDeleteAccount,
} from "../profile.api";
import MainLayout from "../../../components/MainLayout";
import LoadingScreen from "../../../components/LoadingScreen";
import { TbLoader2 } from "react-icons/tb";
import { User } from "../profile.types";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export function Profile() {
  const { data: profile } = useGetProfile();
  const [editMode, setEditMode] = useState(false);
  const { mutate: updateProfile, isPending: updateProfilePending } =
    useUpdateProfile();
  const { mutate: changePassword, isPending: changePasswordPending } =
    useChangePassword();
  const { mutate: deleteAccount, isPending: deleteAccountPending } =
    useDeleteAccount();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Profile Form
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
    },
  });

  // Password Change Form
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmitProfile = async (data: Partial<User>) => {
    updateProfile(data, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  const onSubmitPasswordChange = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    changePassword(data, {
      onSuccess: () => {
        resetPassword();
      },
    });
  };

  const handleDeleteAccount = async () => {
    deleteAccount();
  };

  if (deleteAccountPending) {
    return <LoadingScreen />;
  }

  return (
    <MainLayout pageTitle="Profile">
      <div className="space-y-10 my-10">
        <h2 className="text-xl">User Information</h2>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div className="flex flex-col gap-5 lg:w-1/5 items-center text-center">
            <div className="border border-primary flex items-center justify-center w-32 h-32 rounded-full">
              <CiUser className="text-6xl" />
            </div>
            <div>
              <p className="text-xl font-medium">{profile?.firstName}</p>
              <p>{profile?.email}</p>
            </div>
          </div>

          <form
            onSubmit={handleProfileSubmit(onSubmitProfile)}
            className="space-y-10 lg:space-y-16 flex-1"
          >
            <div className="space-y-2">
              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <label className="label w-full lg:w-[10%]">First Name</label>
                <input
                  type="text"
                  {...profileRegister("firstName", {
                    required: "First name is required",
                  })}
                  disabled={!editMode}
                  className="input flex-1"
                />
              </div>
              {profileErrors.firstName?.message && (
                <p className="text-red-500 italic text-sm float-right">
                  {String(profileErrors.firstName.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <label className="label w-full lg:w-[10%]">Last Name</label>
                <input
                  type="text"
                  {...profileRegister("lastName", {
                    required: "Last name is required",
                  })}
                  disabled={!editMode}
                  className="input flex-1"
                />
              </div>
              {profileErrors.lastName?.message && (
                <p className="text-red-500 italic text-sm float-right">
                  {String(profileErrors.lastName.message)}
                </p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-5 items-center">
              <label className="label w-full lg:w-[10%]">Email</label>
              <p className="input flex-1">{profile?.email}</p>
            </div>

            <div className="flex gap-4 justify-end">
              {editMode ? (
                <>
                  <button
                    type="submit"
                    className="button-primary lg:w-40"
                    disabled={updateProfilePending}
                  >
                    {updateProfilePending ? (
                      <TbLoader2 className="text-xl animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    className="button-primary bg-gray-500 lg:w-40"
                    onClick={() => {
                      resetProfile();
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div
                  className="button-primary w-full lg:w-40"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-10 my-10">
        <h2 className="text-xl">Security</h2>
        <form
          onSubmit={handlePasswordSubmit(onSubmitPasswordChange)}
          className="space-y-10 lg:space-y-16"
        >
          <div className="space-y-2">
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              <label className="label w-full lg:w-[15%]">
                Current Password
              </label>
              <div className="flex-1 relative bg-red-400 w-full">
              <input
                type={showCurrentPassword ? "text" : "password"}
                {...passwordRegister("currentPassword", {
                  required: "Current password is required",
                })}
                className="input flex-1"
              />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <VscEyeClosed className="text-2xl" />
                  ) : (
                    <VscEye className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
            {passwordErrors.currentPassword?.message && (
              <p className="text-red-500 italic text-sm float-right">
                {String(passwordErrors.currentPassword.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              <label className="label w-full lg:w-[15%]">New Password</label>
              <div className="flex-1 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...passwordRegister("newPassword", {
                    required: "New password is required",
                  })}
                  className="input flex-1"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <VscEyeClosed className="text-2xl" />
                  ) : (
                    <VscEye className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
            {passwordErrors.newPassword?.message && (
              <p className="text-red-500 italic text-sm float-right">
                {String(passwordErrors.newPassword.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              <label className="label w-full lg:w-[15%]">
                Confirm New Password
              </label>
              <div className="flex-1 relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  {...passwordRegister("confirmNewPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                  className="input flex-1"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                >
                  {showConfirmNewPassword ? (
                    <VscEyeClosed className="text-2xl" />
                  ) : (
                    <VscEye className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
            {passwordErrors.confirmNewPassword?.message && (
              <p className="text-red-500 italic text-sm float-right">
                {String(passwordErrors.confirmNewPassword.message)}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="button-primary lg:w-52"
              disabled={changePasswordPending}
            >
              {changePasswordPending ? (
                <TbLoader2 className="text-xl animate-spin" />
              ) : (
                "Change Passowrd"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-10 my-10">
        <p className="w-full lg:w-3/4">
          Deleting your account is permanent and cannot be undone. All your
          saved jobs and preferences will be lost. Please make sure you're
          certain before proceeding.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="text-red-500 border border-red-500 rounded-full px-2 py-2 flex items-center gap-1 w-fit"
        >
          <CiTrash className="text-xl" /> Delete Account
        </button>
      </div>
    </MainLayout>
  );
}

export default Profile;
