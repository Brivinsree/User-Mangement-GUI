import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form';
import { UserService } from "../../utils/services/user.service";
import { STATUS } from "../../utils/constants";
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import userStyle from './user.module.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';








const Userform = ({ setOpen, selectedRowData, isEdit, handleAllUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        user_pic: null
    });
    const [isProfileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState({});

    const userService = new UserService();
    const navigate = useNavigate();


    const validateField = (name, value) => {
        let errorMsg = "";

        switch (name) {
            case "name":
                if (!value) {
                    errorMsg = "Name is required.";
                } else if (!/^[a-zA-Z]+$/.test(value)) {
                    errorMsg = "Name can only contain alphabets.";
                }
                break;

            case "email":
                if (!value) {
                    errorMsg = "Email is required.";
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    errorMsg = "Please enter a valid email address.";
                }
                break;

            case "phone_number":
                if (!value) {
                    errorMsg = "Phone Number is required.";
                }
                else if (!/^[789][0-9]{9}$/.test(value)) {
                    errorMsg = "Phone Number must start with 7, 8, or 9 and be 10 digits long.";
                }
                break;

            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.phone_number) newErrors.phone_number = "Phone Number is required.";
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Form is valid if no errors
    };






    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Perform submit logic (e.g., API call)
            let userpayload = {
                name: formData?.name,
                email: formData?.email,
                phone_number: formData?.phone_number,
                user_pic: isProfileImage
            };
            //Add User
            if (!isEdit) {
                const postuser = await userService.postUsers(userpayload);
                if (postuser.status === STATUS.SUCCESS) {
                    setOpen(false);
                    toast(postuser?.message);
                    handleAllUser();
                    navigate("/user");
                } else {
                    setOpen(true);
                    toast(postuser?.response?.data.message);
                }
            } else {
                const postuser = await userService.updateUsers(userpayload, selectedRowData._id);
                if (postuser.status === STATUS.SUCCESS) {
                    setOpen(false);
                    toast(postuser?.message);
                    handleAllUser();
                    navigate("/user");
                } else {
                    setOpen(false);
                    toast(postuser?.response?.data.message);
                }
            }
        } else {
            console.log("Form has errors:", errors);
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Validate individual fields
        validateField(name, value);
    };
    const handleProfileImage = async (e) => {
        const fileInput = e.target;
        const selectedFile = fileInput.files?.[0] || null;
        const formData = new FormData();
        formData.append("profilePic", selectedFile);
        try {
            const userpic_upload = await userService.uploadFile(formData);
            if (userpic_upload.status) {
                setProfileImage(userpic_upload?.file?.path);
            }
        } catch (error) {
            // console.log(error)
        }

    };

    useEffect(() => {
        if (isEdit) {
            setFormData({
                name: selectedRowData?.name,
                email: selectedRowData?.email,
                phone_number: selectedRowData?.phone_number,
                // user_pic: isProfileImage?.filename
            })
        }

    }, [isEdit])
    return (
        <div className={userStyle.container}>
            <div>
                <h3 style={{ fontSize: '24px', color: 'blue' }}>{!isEdit ? "Add User Form" : "Edit User Form"}</h3>
                <IoIosCloseCircleOutline className={userStyle.closeIcon} onClick={() => setOpen(false)} />

            </div>
            <form onSubmit={onSubmit}>
                <div className={userStyle.form_group}>
                    <label className={userStyle.form_label}>Name</label>
                    <input
                        type='text'
                        className={userStyle.form_control}
                        name="name"
                        onChange={handleChange}
                        value={formData?.name || ''}

                    />
                    {/* Errors */}
                    {errors.name && <span className={userStyle.errorMsg}>{errors.name}</span>}

                </div>
                <div className={userStyle.form_group}>
                    <label className={userStyle.form_label}>Email</label>
                    <input type='email' className={userStyle.form_control} name="email"
                        onChange={handleChange}

                        value={formData?.email || ''} />
                    {/* Errors */}
                    {errors.email && <span className={userStyle.errorMsg}>{errors.email}</span>}

                </div>
                <div className={userStyle.form_group}>
                    <label className={userStyle.form_label}>Phone Number</label>
                    <input type='text' className={userStyle.form_control} name="phone_number"
                        onChange={handleChange}

                        value={formData?.phone_number || ''} />
                    {/* name="phone_number" onChange={handleChange} value={selectedRowData?.phone_number} {...register("phone_number", {
                        required: true,
                        minLength: {
                            value: 10,
                            message: "Phone number must be 10 digits",
                        },
                        maxLength: {
                            value: 10,
                            message: "Phone number must be 10 digits",
                        },
                        pattern: {
                            value: /^[789][0-9]{9}$/,
                            message: "Phone number must start with 7, 8, or 9 and be 10 digits long",
                        },


                    })} /> */}
                    {/* Errors */}
                    {errors.phone_number && <span className={userStyle.errorMsg}>{errors.phone_number}</span>}


                </div>
                <div className={userStyle.form_group}>
                    <input type='file' accept="image/*"
                        id="imageUpload"
                        onChange={handleProfileImage}
                        name="user_pic"
                    />
                    {/* {isEdit ? <p>{formData?.user_pic}</p> : ""} */}

                </div>
                <div>
                    <label></label>
                    <button type="submit">{!isEdit ? 'Add' : 'Edit'}</button>
                </div>

            </form>
            <ToastContainer />

        </div>
    )


}

export default Userform;