import { useEffect, useState } from "react";
import CareerCard from "../components/CareerCard";


const Dashboard=()=>{
    interface Career{
        id:number;
        title:string;
        skills:string[];
    }
    const [careerPaths,setCareerPaths]=useState<Career[]>([]);
    //static data
    //rnedring
    useEffect(()=>{
        const data=[
            {
                id:1,
                title:"Web Developer",
                skills:["HTML","CSS","JavaScript"],
            },
            {
                id:2,
                title:"Data Developer",
                skills:["Pyton","Machine Learning","SQL"],
            },
            {
                id:3,
                title:"Prodcut Manager",
                skills:["Leadership","UX/UI Design","Agile"],
            },
        ];
        setCareerPaths(data);
    },[]);

    return <div className="min-h-screen bg-gray-50 pt-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome to the Dashboard!
        </h1>
        <p className="text-center text-gray-600 mt-2">
            Discover your career path.
        </p>
        {/*career card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 max-w-6xl mx-auto">
            {careerPaths.map((career)=>(
                <CareerCard key={career.id} career={career}/>
            ))}
        </div>
    </div>
};
export default Dashboard;