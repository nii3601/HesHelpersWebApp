import json
import os


# conn = httplib.HTTPSConnection("parseapi.back4app.com")
payload = ''
headers = {
    'X-Parse-Application-id': '09M3nDzFBQYtv11gPT4aISDZPwIFJOEBJIfsWLce',
    'X-Parse-REST-API-Key': 'cbH3b0KbxUjFGVPyFSdzTIpjuAjUqgJO2dJXYq0P',
    'Content-type': 'application/json'
    }


def checkAssignment(robotID=None):
    '''
        CHECKS IF ROBOT HAS BEEN ASSIGNED
        RETURNS NONE OR BOOK ID
    '''

    if(robotID == None):
        return None

    stream = os.popen('sh testDB.sh ' + str("https://parseapi.back4app.com/functions/CheckBotAssignment?botName="+robotID) )
    output = stream.read()

    data = json.loads(output)

    if(not data['result']["Assigned"]):
        return None
    
    return getBookInfo(data['result']['Destination']['objectId'])


def getBookInfo(bookID=None):
    '''
        CHECK BOOK INFORMATION FROM DATABASE GIVEN BOOK ID
    '''
    if(bookID == None):
        return None

    stream = os.popen('sh testDB.sh ' + str("https://parseapi.back4app.com/functions/GetBook?objectId="+bookID) )
    output = stream.read()

    data = json.loads(output)

    if(len(data) == 0):
        return None
    
    return data['result'][0]



def resetBot(botName=None):
    '''
        RESETS ROBOT STATUS
    '''
    if(botName == None):
        return None

    stream = os.popen('sh testDB.sh ' + str("https://parseapi.back4app.com/functions/ResetBot?botName="+botName) )
    output = stream.read()
    data = json.loads(output)

    if(not data['result']):
        return None

    return data['result']

print(checkAssignment("Bill"))