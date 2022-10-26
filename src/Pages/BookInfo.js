import { useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import BookTile from "../Components/BookTile";
import { searchBookID, setBook } from '../Services';
import { useParams } from 'react-router-dom';

function BookInfo() {
    const [isLoading, setLoading] = useState(true);
    const [book, setBookLocal] = useState(null);

    let params = useParams();

    function checkout(bookId) {
        setLoading(true);
        setBook(bookId).then((result)=>{
            // Success response
            // False - book not found
            // False - no bot availabe

            console.log({result})
            if (!result.response) {
                alert(result.reason)
            }
            else{
                alert('success')
            }
        });
        setLoading(false);
    }

    useEffect(() => {
        console.log(params);
        searchBookID(params.bookID).then((result) => {
            setBookLocal(result);
            setLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div className={`flex flex-col items-center bg-blue-400 pt-5 pb-5 min-h-screen h-auto justify-center`}>
                <FallingLines
                    color="#FFFFFF"
                    width="150"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
                <p className='text-white text-xl uppercase'>loading...</p>
            </div>
        );
    }
    else {
        return (
            <div className={`flex flex-col items-center bg-blue-400 pt-5 pb-5 min-h-screen h-auto`}>
                <p className="text-3xl font-bold mb-3 text-white uppercase">Hesburgh Helper</p>
                <p className="text-lg font-bold mb-3 text-white">Book Information</p>
                <div className="flex flex-col md:flex-row text-sm font-bold md:text-lg justify-between w-full bg-white border border-transparent shadow-xl p-5 rounded" style={{ width: "75%" }}>
                    <div className="flex flex-col font-serif space-y-2">
                        <p>Title: {book?.get("Title")}</p>
                        <p>Author: {book?.get("Author")}</p>
                        <p>Publisher: {book?.get("Imprint")}</p>
                        <p>ISBN: {book?.get("ISBN")}</p>
                        <p>Call Number: {book?.get("CallNumber")}</p>
                        <p>Barcode: {book?.get("Barcode")}</p>
                        <p>Location: {book?.get("Location")}</p>
                        <p>Library: {book?.get("SubLibrary")}</p>
                    </div>
                </div>
                <button onClick={() => checkout(book?.id)}
                    className="text-xl p-3 w-60 bg-blue text-white font-bold rounded mt-5 shadow-xl hover:scale-110 " style={{ border: "2px solid white" }}>
                    Request Book
                </button>
            </div>
        );
    }


}

export default BookInfo;