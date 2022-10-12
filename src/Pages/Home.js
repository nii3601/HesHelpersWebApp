import { useEffect, useState } from 'react';
import BookTile from "../Components/BookTile";
import { searchBook } from '../Services';

function Home() {

    const [query, setquery] = useState('');
    const [results, setResults] = useState(null);

    function onSearch() {
        console.log({ query });
        if (query !== '') {
            searchBook(query).then((result) => {
                // console.log({result});
                setResults(result);
                console.log({result})
            })

        }
    }

    function clickResult() {
        console.log("clicked")
    }

    function queryChange(e) {
        setquery(e.target.value);
    }

    useEffect(() => {
        // searchBook('Tes').then((result)=>{
        //     console.log({result});
        // })
    }, [])

    return (
        <div className={`flex flex-col items-center bg-blue-400 pt-5 pb-5 min-h-screen h-auto`}>
            <p className="text-3xl font-bold mb-3 text-white uppercase">Hesburgh Helper</p>
            <p className="text-lg font-bold mb-3 text-white">Search for a book</p>
            <input
                className="w-72 text-center rounded p-3 border border-transparent mb-2 text-lg"
                placeholder="Enter book title or ISBN"
                onChange={queryChange}
                value={query}
            />
            <button
                onClick={onSearch}
                className="text-xl p-3 w-60 bg-black text-white rounded mt-5 shadow-xl hover:scale-110">
                Search
            </button>

            <p className="text-white text-center mt-2 text-lg font-bold">A robot will be assigned to you after you find your book</p>
            {
                results ?
                    <>
                        <p className="text-xl text-white font-bold mt-10 border-t-2 border-white">Search Results</p>
                        <div className="mt-5 w-3/4 space-y-10">
                            {
                                results.map((item, index) => {
                                    return <BookTile
                                        key={index} 
                                        onClick={clickResult}
                                        item={item}
                                        />
                                })
                            }
                        </div>
                    </>
                    :

                    <></>
            }


        </div>
    );


}

export default Home;