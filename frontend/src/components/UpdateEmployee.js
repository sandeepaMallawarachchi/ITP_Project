import React,{useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

function UpdateDetails(){
    const {id} = useParams();
    const [empDetails,setEmpDetails] = useState({
        empId:"",
        firstName:"",
        lastName:"",
        gender:"",
        department:"",
        designation:"",
        address:"",
        email:"",
        phoneNo:""
    })
    const navigate = useNavigate();
}