import requests

BASE_URL = "https://parseapi.back4app.com/functions/"
HEADERS = {
    'X-Parse-Application-id': 'v840lhtRewsAyjbP5uC8DUgZ7lT1x5dwXdtbTJQs',
    'X-Parse-REST-API-Key' : 'RCGvPiJOSQ6SWucyiLu0jzgGJpJKr1zeKn57bLtq',
    'Content-type':'application/json',   
}

def checkAssignment(robotID=None):
    '''
        CHECKS IF ROBOT HAS BEEN ASSIGNED
        RETURNS NONE OR BOOK ID
    '''
    if(robotID == None):
        return None

    function = "CheckBotAssignment" # define function

    result = requests.post(
        url=BASE_URL+function,
        params={
            'botName':robotID
            },
        headers=HEADERS
    )

    data = result.json()

    if(not data['result']["Assigned"]):
        return None
    
    return getBookInfo(data['result']['Destination']['objectId'])


def getBookInfo(bookID=None):
    '''
        CHECK BOOK INFORMATION FROM DATABASE GIVEN BOOK ID
    '''
    if(bookID == None):
        return None

    function = "GetBook" # define function

    result = requests.post(
        url=BASE_URL+function,
        params={
            'objectId':bookID
            },
        headers=HEADERS
    )

    data = result.json()

    if(len(data) == 0):
        return None
    
    return data['result'][0]


print(checkAssignment('Bob'))