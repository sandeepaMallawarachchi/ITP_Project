import {useState,useEffect} from "react"
import { useParams } from "react-router-dom";
import { Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import SearchBar from "./inventorySearchBar";
import logo from "../../images/logo.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header(){

    const navigate = useNavigate()
    const { id } = useParams();

    const [manager, setManager] = useState({
        firstName: "",
        designation: "",
    });

    const [profilePicture, setProfilePicture] = useState('');

    //when user clicks logo, navigate to dashbaord
    function handleDashboard(){
        navigate(`/inventory/dashboard/${id}`)
    }

    //retrieving manager details
    useEffect(() => {
        const fetchManagerDetails = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/getManager/${id}`);
                console.log(res.data);
                const managerData = res.data.manager || res.data;
                const { firstName, designation } = managerData;
                setManager({ firstName, designation });
            } catch (error) {
                console.log("error", error.message);
            }
        };

        fetchManagerDetails();
    }, [id]);

    //retrieving the profile picture
    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const res = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/empLogin/changeProfilePicture/${id}`);
                console.log(res.data);

                const { imageURL } = res.data.image;
                setProfilePicture(imageURL);
            } catch (error) {
                console.log("Error fetching image", error.message);
            }
        };
        fetchProfilePicture();
    }, [id]);

    const handleProfilePic = () => {
        navigate(`/inventory/account/${id}`)
    };
  
    return (
        <div className="fixed top-0 right-0 z-50 w-full" >
            <Navbar fluid rounded  style={{ backgroundColor: "#E5E5E5"}} >
                <div className='ml-10' onClick={handleDashboard}>
                    <img src={logo} id='logo' alt="logo" width="150"  />
                </div>
                <SearchBar />

                <div className="flex md:order-2  mr-20 items-start" onClick={handleProfilePic}>
                    <Avatar alt="User settings" img={profilePicture} rounded />
                        <div className="ml-4 flex flex-col">
                            <span className='text-green-500 font-bold'>{manager.firstName}</span>
                            <span className='text-green-400 '>{manager.designation}</span>
                        </div>
                    <Navbar.Toggle />
                </div>
            </Navbar>
        </div>
    )

    
}