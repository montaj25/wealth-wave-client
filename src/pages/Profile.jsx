import { use, useState } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";


const MyProfile = () => {
    const { user } = use(AuthContext);
    // console.log(user)

    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");

    const handleUpdate = () => {
        if (!name || !photo) {
            return Swal.fire({
                icon: "error",
                text: "Name and Photo URL can't be empty"
            })
        }

        updateProfile(user, {
            displayName: name,
            photoURL: photo,
        })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    text: "Your profile has been updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed!",
                    text: err.message,
                });
            });
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-base-200 shadow-lg rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                My Profile
            </h2>

            <div className="flex flex-col items-center">
                <img
                    src={photo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
                />


                <div className="w-full space-y-4">
                    <div>
                        <label className="label font-semibold">Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    <div>
                        <label className="label font-semibold">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full bg-gray-200"
                            value={user?.email}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Photo URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>

                    <button onClick={handleUpdate} className="btn btn-primary w-full mt-4">
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
