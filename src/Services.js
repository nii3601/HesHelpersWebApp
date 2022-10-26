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

export const searchBookID = async(query) =>{
  // set up parse queries
  let parseQuery_bookId = new Parse.Query('Book');
  parseQuery_bookId.equalTo('objectId',query);
  let finalQuery = Parse.Query.or(parseQuery_bookId);
  // execute queries
  let result = await finalQuery.first();
  return result;
}

export const setBook = async(bookId) =>{
  let id = bookId;
  let query = new Parse.Query("Book");
  query.equalTo('objectId',id);
  let query2 = new Parse.Query("Bot");
  query2.equalTo('Destination', undefined);
  let botSet = new Parse.Object("Bot");
  const bot = await query2.first();
  const book  = await query.first();
  if (book && bot) {
    botSet.set("objectId", bot.id);
    botSet.set("ID", bot.get("ID"));
    botSet.set('Destination', book);
    let response = await botSet.save();
    return {response: true, object: response};
  } else if (book === undefined) {
    return {response: false, reason: "Book not found"};
  } else {
    return {response: false, reason: "No bot available", book: book};
  }
}