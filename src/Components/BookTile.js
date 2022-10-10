

function BookTile({onClick}){

    return(
        <div onClick={onClick} className="flex flex-col md:flex-row text-sm font-bold md:text-lg justify-between w-full bg-white border border-transparent shadow-xl p-5 rounded hover:scale-110 hover:cursor-pointer"> 
            <p>Book Title</p>
            <p>Book ISBN</p>
            <p>Book Author</p>
        </div>
    )

}

export default BookTile;