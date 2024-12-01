import DataTable from "react-data-table-component";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";



const UserDataTable = ({ userlist, editUser, deleteUser }) => {
    const columns = [
        {
            name: 'Created At',
            selector: row => row.created_at,
            cell: (row) => (
                <div>
                    {format(new Date(row?.created_at), 'dd-MM-yyyy h:mm a')}  {/* Custom format */}
                </div>
            )

        },
        {
            name: "Image",
            selector: row => row.user_pic,
            cell: (row) => (
                <div>
                    <img src={row.user_pic} alt="User image" width={50} height={50} />
                </div>
            )

        },
        {
            name: "Name",
            selector: (row) => row.name
        },
        {
            name: "Email",
            selector: (row) => row.email
        },
        {
            name: "Phone Number",
            selector: (row) => row.phone_number
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <FaUserEdit onClick={() => editUser(row)} />
                    <MdDelete onClick={() => deleteUser(row)} />

                </div>
            )
        }

    ];
    return (
        <>
            <DataTable
                // title="User List"
                columns={columns}
                data={userlist}
                pagination
                highlightOnHover
            // selectableRows
            />

        </>

    )
}

export default UserDataTable;