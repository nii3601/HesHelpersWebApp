// The example below shows you how a cloud code function looks like.

// Parse Server 3.x
Parse.Cloud.define("hello", (request) => {
	return("Hello world!");
});

Parse.Cloud.define("CheckBotAssignment", async (request) => {
  let query = new Parse.Query("Bot");
  let requestParams = request.params;
  let botName = requestParams.botName;
  query.equalTo('ID', botName);
  const bot = await query.first();
  if (bot) {
    const botDestination = bot.get('Destination');
    if( botDestination !== undefined) {
      return {Assigned: true, Destination: botDestination};
    }
    else {
      return {Assigned: false, Destination: null};
    }
  }
});

Parse.Cloud.define("FetchBotDirections", async (request) => {
  let requestParams = request.params;
  let botName = requestParams.botName;
  let botDestination = requestParams.Destination;
 
  let query1 = new Parse.Query("Book");
  query1.equalTo("objectId", botDestination);
  const bookPointer = await query1.first();
  if(bookPointer) {
    let query2 = new Parse.Query("Directions");
    query2.equalTo('Book', bookPointer);
    const Directions = await query2.first();
    if (Directions) {
      let query3 = new Parse.Query("Map");
      let mapPointerId = bookPointer.get('Map').id;
      query3.equalTo('objectId', mapPointerId);
      const map = await query3.first();
      if(map) {
        return {Directions: Directions.get('DirCoordinates'), Floor: map };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
});

Parse.Cloud.define("GetBook", async (request) => {
  let requestParams = request.params;
  let id = requestParams.objectId;
  let query = new Parse.Query("Book");
  query.equalTo('objectId',id);
  const book  = await query.find();
  if (book) {
    return book;
  }
});

Parse.Cloud.define("SetBook", async (request) => {
  let requestParams = request.params;
  let id = requestParams.objectId;
  let query = new Parse.Query("Book");
  query.equalTo('objectId',id);
  let query2 = new Parse.Query("Bot");
  query2.equalTo('Destination', undefined);
  let botSet = new Parse.Object("Bot");
  const bot = await query2.first();
  const book  = await query.find();
  if (book && bot) {
    botSet.set("objectId", bot.id);
    botSet.set("ID", bot.get("ID"));
    botSet.set('Destination', book[0]);
    let response = await botSet.save();
    return true;
  } else if (book == undefined) {
    return {response: false, reason: "Book not found"};
  } else {
    return {response: false, reason: "No bot available", book: book};
  }
});

Parse.Cloud.define("ResetBot", async (request) => {
  let requestParams = request.params;
  let botName = requestParams.botName;
  let botReset = new Parse.Object("Bot");
  let query = new Parse.Query("Bot");
  query.equalTo('ID', botName);
  const bot = await query.first();
  if (bot) {
    botReset.set("objectId", bot.id);
    botReset.set("ID", bot.get("ID"));
    botReset.unset("Destination");
    let res = await botReset.save();
    return true;
  } else {
    return false;
  }
    
});

Parse.Cloud.define("CreateBook", async (request) => {
  const title = request.params.title;
  const ISBN = request.params.ISBN;
  const author = request.params.author;
  const floor = request.params.floor;
  const color = request.params.color;
  const location = request.params.location;

  const book = new Parse.Object('Book');
  let query = new Parse.Query("Map");
  query.equalTo('Floor', floor);
  const map = await query.first();

  book.set('Title', title);
  book.set('ISBN', ISBN);
  book.set('Author', author);
  book.set('Map', map);
  book.set('Color', color);
  book.set('Location', location);

  try {
      return await book.save();
    } catch (error) {
      console.log('Book create - Error - ' + error.code + ' ' + error.message);
      return error
    }
});

/* Parse Server 2.x
* Parse.Cloud.define("hello", function(request, response){
* 	response.success("Hello world!");
* });
*/

// To see it working, you only need to call it through SDK or REST API.
// Here is how you have to call it via REST API:

/** curl -X POST \
* -H "X-Parse-Application-Id: v840lhtRewsAyjbP5uC8DUgZ7lT1x5dwXdtbTJQs" \
* -H "X-Parse-REST-API-Key: RCGvPiJOSQ6SWucyiLu0jzgGJpJKr1zeKn57bLtq" \
* -H "Content-Type: application/json" \
* -d "{}" \
* https://parseapi.back4app.com/functions/hello
*/

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */
