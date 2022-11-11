# import http.client
import httplib
import json

conn = httplib.HTTPSConnection("parseapi.back4app.com")
payload = ''
headers = {
      'X-Parse-Application-id': 'v840lhtRewsAyjbP5uC8DUgZ7lT1x5dwXdtbTJQs',
      'X-Parse-REST-API-Key': 'RCGvPiJOSQ6SWucyiLu0jzgGJpJKr1zeKn57bLtq',
      'Content-type': 'application/json'
    }

def checkAssignment(robotID=None):
    '''
        CHECKS IF ROBOT HAS BEEN ASSIGNED
        RETURNS NONE OR BOOK ID
    '''
    if(robotID == None):
        return None

    function = "CheckBotAssignment" # define function

    conn.request("POST", "/functions/CheckBotAssignment?botName="+robotID, payload, headers)
    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)

    conn.close()

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

    conn.request("POST", "/functions/GetBook?objectId="+bookID, payload, headers)
    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)

    if(len(data) == 0):
        return None

    conn.close()
    
    return data['result'][0]



def resetBot(botName=None):
    '''
        RESETS ROBOT STATUS
    '''
    if(botName == None):
        return None

    function = "ResetBot" # define function

    conn.request("POST", "/functions/ResetBot?botName="+botName, payload, headers)
    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)

    if(not data['result']):
        return None

    conn.close()
    
    return data['result']

