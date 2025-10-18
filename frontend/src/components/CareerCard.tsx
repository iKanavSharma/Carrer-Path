import React from "react";

interface Career{
    id:number;
    title:string;
    skills:string[];
}

interface CarrerCardProps{
    career:Career;
}

const CareerCard:React.FC<CarrerCardProps>=({career})=>{
    return <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {career.title}
        </h2>
        <ul className="text-gray-600 mb-4">
            {career.skills.map((skills,index)=>(
                <li key={index}>.{skills}</li>
            ))}
        </ul>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            View Details
        </button>
    </div>
};

export default CareerCard;