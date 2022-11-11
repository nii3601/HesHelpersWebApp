#!/bin/bash
echo $1
curl --location --request POST "https://parseapi.back4app.com/functions/CheckBotAssignment?botName=$1" \
--header 'X-Parse-Application-id: v840lhtRewsAyjbP5uC8DUgZ7lT1x5dwXdtbTJQs' \
--header 'X-Parse-REST-API-Key: RCGvPiJOSQ6SWucyiLu0jzgGJpJKr1zeKn57bLtq' \
--header 'Content-type: application/json'