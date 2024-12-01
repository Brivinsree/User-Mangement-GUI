import { useEffect, useState } from "react";
import { UserService } from "../../utils/services/user.service";
import { STATUS } from "../../utils/constants";
import UserDataTable from "./userdatatable";
import { Sheet } from 'react-modal-sheet';
import UserForm from './userform';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import userStyle from './user.module.css';
import { IoIosAdd } from "react-icons/io";





const UserComponent = () => {
    const userService = new UserService();
    // const [loading, setLoading] = useState(true);
    const [userDisplay, setUserDisplay] = useState([])
    const [isOpen, setOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const fetchAllUsers = async () => {
        const getuser = await userService.getAllUsers();
        if (getuser.status === STATUS.SUCCESS && !!getuser.data) {
            const user_data = getuser?.data;
            setUserDisplay(user_data);
        } else {
            setUserDisplay([]);

        }
    };
    useEffect(() => {
        fetchAllUsers();
    }, [])

    const handleAddUser = () => {
        setOpen(true);
        setSelectedRowData({});
        setIsEdit(false);
    }

    const handleAllUser = () => {
        fetchAllUsers();
    }

    const editUser = async (data) => {
        setOpen(true);
        setSelectedRowData(data);
        setIsEdit(true);
        fetchAllUsers();
    }

    const deleteData = async (remove_data) => {
        const deleteuser = await userService.deleteUsers(remove_data._id);
        if (deleteuser.status === STATUS.SUCCESS) {
            const delete_data = deleteuser?.message;
            toast.success(delete_data);
        }
        fetchAllUsers();
    }

    const deleteUser = async (data) => {
        deleteData(data);
    }


    return (
        <>
            <h1>User List</h1>
            <div className={userStyle.mainpage}>
                <div className={userStyle.adduser}>
                    <div></div>
                    <div className={userStyle.addicon} onClick={handleAddUser}>
                        <span><IoIosAdd /></span><span>Add User</span>
                    </div>
                    {/* <button onClick={handleAddUser} >Add User</button> */}
                </div>
                <UserDataTable userlist={userDisplay} editUser={editUser} deleteUser={deleteUser} />
                <Sheet isOpen={isOpen} onClose={() => setOpen(false)} className={userStyle.modalopen}>
                    <Sheet.Container style={{ width: '500px', margin: 'auto', right: '30px', left: '100px' }}>
                        <Sheet.Header />
                        <Sheet.Content>{<UserForm setOpen={setOpen} selectedRowData={selectedRowData} isEdit={isEdit} handleAllUser={handleAllUser} />}</Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet>
            </div>
        </>
    )
}

export default UserComponent;



{/* <UserFormDetail
                setOpen={setSheetOpen}
                fetchUserData={updateUserData}
                editData={selectedRowData}
                isEdit={isEdit}
              /> */}
