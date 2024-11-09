import React from "react";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import "./Science_Fiction.css";
import Header from "../components/Header/Header";
const Science_Fiction = () => {
  return (
    <div className="section-container" style={{ backgroundColor: "#cae2f3" }}>
      <div>
        <Header />
      </div>
      <div className="body">
      <div className="body-items">
      <img src={"../../assets/images/Dautruong.jpeg"} alt="Đấu trường sinh tử" /> <h3>Đấu trường sinh tử</h3>
          <img src={"../../assets/images/Thegioi.webp"} alt="Một thế giới dũng cảm" /> <h3>Một thế giới dũng cảm</h3>
          <img src={"../../assets/images/Nepgap.jpeg"} alt="Nếp gấp thời gian" /> <h3>Nếp gấp thời gian</h3>
      </div>
          
          
        
        
        
      </div>

     
    </div>
  );
};

export default Science_Fiction;
