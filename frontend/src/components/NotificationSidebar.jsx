import { useEffect,useState } from "react";
import api from "../services/api";

export default function NotificationSidebar(){

const [notifications,setNotifications]
=useState([]);

useEffect(()=>{

loadNotifications();

},[]);

const loadNotifications=async()=>{

const res=
await api.get("/notifications");

setNotifications(res.data);
};

return(

<div className="notification-sidebar">

<h3>Notifications</h3>

{
notifications.map(item=>(
<div key={item._id}>
{item.message}
</div>
))
}

</div>

);
}