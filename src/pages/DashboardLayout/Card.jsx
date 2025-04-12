import React from "react";


const Card = ({ color, title, value, icon }) => {
    return (
        <div
            className={`p-6 rounded-lg shadow-md text-white flex items-center`}
            style={{ backgroundColor: color }}
        >
            <div className="mr-4 text-3xl">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default Card;


