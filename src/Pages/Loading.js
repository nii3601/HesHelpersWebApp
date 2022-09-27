import BarLoader from "react-spinners/BarLoader";
function Loading(){

    return(

        <div className="flex flex-col items-center justify-center bg-blue-400 h-screen">
            <BarLoader
                color="#FFFFFF"
                height={10}
                width={200}
            />
            <p className="mt-20 font-bold text-lg text-white">Loading.....</p>
        </div>

    );

}

export default Loading;