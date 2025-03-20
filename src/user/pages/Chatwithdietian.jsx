import React, { useEffect, useState } from "react";
import axios from "axios";

function Chatwithdietian() {
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState("");

    // Get stored user details
    const dietitianId = sessionStorage.getItem("dietitianid"); 
    const clientId = sessionStorage.getItem("userid"); 

    useEffect(() => {
        if (dietitianId && clientId) {
            fetchMessages();
        } else {
            console.error("Missing dietitianId or clientId");
        }
    }, []);

    const fetchMessages = async () => {
        try {
            console.log(`Fetching messages for Dietitian: ${dietitianId}, Client: ${clientId}`);
            const response = await axios.get(`https://befitbackend.onrender.com/api/chat/${dietitianId}/${clientId}`);
            console.log("Messages API Response:", response.data); 

            setMessages(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching messages", error);
            setMessages([]);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        if (!dietitianId || !clientId) {
            console.error("Cannot send message: Missing dietitianId or clientId");
            return;
        }

        const senderId = sessionStorage.getItem("userid"); 
        const senderModel = "UserSubscription"; 

        try {
            await axios.post(`https://befitbackend.onrender.com/api/chat/${dietitianId}/${clientId}`, {
                senderId,
                senderModel,
                message: newMessage,
            });

            setMessages(prevMessages => [
                ...prevMessages,
                { sender: senderModel === "DietitianSubscription" ? "diet" : "client", message: newMessage }
            ]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="d-flex flex-column border border-info h-100 w-100 p-3 " style={{ height: "500px" }}>
            <div className="flex-grow-1 overflow-auto p-2" style={{ maxHeight: "400px" }}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`p-2 rounded mb-2 ${msg.sender === "diet" ? "bg-primary text-white ms-auto" : "bg-light"}`} style={{ maxWidth: "75%" }}>
                            {msg.message}
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No messages yet...</p>
                )}
            </div>

            <div className="d-flex align-items-center border-top p-2">
                <input 
                    type="text" 
                    className="form-control me-2" 
                    placeholder="Type a message..." 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <button className="btn btn-info" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatwithdietian;
