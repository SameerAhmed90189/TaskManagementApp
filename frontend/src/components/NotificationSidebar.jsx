import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../services/api";

export default function NotificationSidebar(){

const [notifications,setNotifications]
=useState([]);

useEffect(()=>{

loadNotifications();

const token = localStorage.getItem("token");
if (!token) {
return undefined;
}

const socket = io("http://localhost:5000", {
auth: { token }
});

socket.on("notification", (notification) => {
setNotifications((current) => [notification, ...current]);
});

return () => socket.disconnect();

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
notifications.length === 0 ? (
<p className="notification-empty">No notifications yet.</p>
) : notifications.map(item=>(
<div className="notification-item" key={item._id || `${item.type}-${item.taskId}-${item.message}`}>
{item.message}
</div>
))
}

</div>

);
}
