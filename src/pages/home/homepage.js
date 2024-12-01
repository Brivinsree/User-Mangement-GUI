import bridgeralog from '../../assets/BRIDGERA.png'

import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <>
            <div>
                <div>
                    <h1><img src={bridgeralog} alt="Bridgera Logo" width={60} height={50} />Welcome to Bridgera</h1>
                </div>
                <Link to="/user"><h1>User Management System</h1></Link>
            </div>
        </>
    )
}

export default HomePage;