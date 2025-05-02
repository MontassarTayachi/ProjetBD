import React from "react";

const Card = ({ color, title, value, icon }) => {
    return (
        <div
            className="p-6 rounded-lg shadow-md text-white flex items-center"
            style={{
                background: color,
            }}
        >
            <div
                className="w-14 h-14 flex items-center justify-center rounded-full mr-4"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
            >
                <div className="text-2xl text-white">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default Card;
