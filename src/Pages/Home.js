import { useState } from 'react';
import BookTile from "../Components/BookTile";

function Home() {

    const [showResults, setResults] = useState(false);

    function onSearch() {
        setResults(!showResults);
    }

    return (
        <div className={`flex flex-col items-center bg-blue-400 pt-5 pb-5 ${!showResults ? "h-screen" : ""}`}>
            <p className="text-3xl font-bold mb-3 text-white uppercase">Hesburg Helper</p>
            <p className="text-lg font-bold mb-3 text-white">Search for a book</p>
            <input
                className="w-72 text-center rounded p-3 border border-transparent mb-2 text-lg"
                placeholder="Enter book title or ISBN"
            />
            <button
                onClick={onSearch}
                className="text-xl p-3 w-60 bg-black text-white rounded mt-5 shadow-xl hover:scale-110">
                Search
            </button>

            <p className="text-white text-center mt-2 text-lg font-bold">A robot will be assigned to you after you find your book</p>
            {
                showResults ?
                    <>
                        <p className="text-xl text-white font-bold mt-10 border-t-2 border-white">Search Results</p>
                        <div className="mt-5 w-3/4 space-y-10">
                            <BookTile />
                            <BookTile />
                            <BookTile />
                            <BookTile />
                            <BookTile />
                            <BookTile />
                            <BookTile />
                        </div>
                    </>
                    :

                    <></>
            }


        </div>
    );


}

export default Home;