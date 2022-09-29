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
    if( botDestination !== null) {
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

Parse.Cloud.define("getBookList", async (request) => {
  let requestParams = request.params;
  let title = requestParams.title;
  let query = new Parse.Query("Book");
  if (isNaN(title)) {
    query.contains("title",title);
  } else {
    query.contains("ISBN",title);
  }
  return await query.find();
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
