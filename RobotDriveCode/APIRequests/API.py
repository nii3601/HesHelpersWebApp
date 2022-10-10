import requests

BASE_URL = "https://parseapi.back4app.com/functions/"

def checkAssignment(robotID=None):
    '''
        CHECKS IF ROBOT HAS BEEN ASSIGNED
        RETURNS NONE OR BOOK ID
    '''
    if(robotID == None):
        return None

    function = "CheckBotAssignment" # define function

    result = requests.get(
        url=BASE_URL+function,
        params={
            'botName':robotID
            }
    )

    data = result.json()

    if(not data.Assigned):
        return None
    
    return data.Destination.objectID


def getBookInfo(bookID=None):
    '''
        CHECK BOOK INFORMATION FROM DATABASE GIVEN BOOK ID
    '''
    pass

