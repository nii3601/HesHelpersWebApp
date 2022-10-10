

function BookTile({onClick,item}){

    return(
        <div onClick={onClick} className="flex flex-col md:flex-row text-sm font-bold md:text-lg justify-between w-full bg-white border border-transparent shadow-xl p-5 rounded hover:scale-110 hover:cursor-pointer">
            <div className="flex flex-col">
                <p>Title</p>
                <p className="text-base font-light">{item?.get("Title")}</p>
            </div> 

            <div className="flex flex-col">
                <p>ISBN</p>
                <p className="text-base font-light">{item?.get("ISBN")}</p>
            </div> 

            <div className="flex flex-col">
                <p>Author</p>
                <p className="text-base font-light">{item?.get("Author")}</p>
            </div>
        </div>
    )

}

export default BookTile;