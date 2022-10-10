import Parse from "parse";
/**
 * FUNCTION TO SEARCH BOOK VIA QUERY (BOOK TITLE OR ISBN)
 * Returns a book object
 * @param {*} query (ISBN || BOOK TITLE)
 */
export const searchBook = async(query) =>{
    // set up parse queries
    let parseQuery_bookTitle = new Parse.Query('Book');
    parseQuery_bookTitle.matches('Title',query,'i');
    let parseQuery_ISBN = new Parse.Query('Book');
    parseQuery_ISBN.equalTo('ISBN',query);

    let finalQuery = Parse.Query.or(parseQuery_bookTitle,parseQuery_ISBN);

    // execute queries
    let result = await finalQuery.find();

    return result;
}