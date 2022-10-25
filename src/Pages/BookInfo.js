import { useEffect, useState } from 'react';
import BookTile from "../Components/BookTile";
import { searchBookID, setBook } from '../Services';
import {useLocation} from 'react-router-dom';

function BookInfo(){
  const location = useLocation();
  const book = location.state.book;

  function checkout(bookId){
    console.log(setBook(bookId));
    
  }
  return(
    <div className={`flex flex-col items-center bg-blue-400 pt-5 pb-5 min-h-screen h-auto`}>
      <p className="text-3xl font-bold mb-3 text-white uppercase">Hesburgh Helper</p>
      <p className="text-lg font-bold mb-3 text-white">Book Information</p>
      <div className="flex flex-col md:flex-row text-sm font-bold md:text-lg justify-between w-full bg-white border border-transparent shadow-xl p-5 rounded" style={{width: "75%"}}>
        <div className="flex flex-col font-family: 'georgia';">
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
        className="text-xl p-3 w-60 bg-blue text-white font-bold rounded mt-5 shadow-xl hover:scale-110 " style={{border: "2px solid white"}}>
        Request Book
      </button>
    </div>
  );
}

export default BookInfo;