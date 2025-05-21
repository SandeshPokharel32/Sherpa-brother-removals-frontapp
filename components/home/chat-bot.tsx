"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "react-whatsapp-widget/dist/index.css";

const ChatBot = () => {
  return (
    <div className="z-200">
      <FloatingWhatsApp
        avatar="images/fallback-image.jpeg"
        phoneNumber="+9779851235820"
        accountName="Extreme Adventure Helpline"
        chatMessage={`Welcome to Extreme Adventure! Ready to take your thrill-seeking ?`}
      />
    </div>
  );
};

export default ChatBot;
