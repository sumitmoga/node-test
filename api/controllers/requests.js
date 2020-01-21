const Request = require('../models/requests');

exports.createRequest = (req, res, next) => {

    // Assuming this data will come from db (schema)
    let requestsData = [{
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    },
    {
        clientId: 3,
        requestId: 'yyy',
        hours: 3
    },
    {
        clientId: 4,
        requestId: 'uuu',
        hours: 7
    }];

    // Request form data 
    let dataObj = {}
    if (req.body.clientId && req.body.requestId && req.body.hours) {
        dataObj = {
            clientId: parseInt(req.body.clientId),
            requestId: req.body.requestId,
            hours: parseInt(req.body.hours)
        }
    }

    requestsData.push(dataObj);


    // Assuming this data in db for buttlers infromation
    let butlersData = {
        butlers: [
            {
                requests: ['abc', 'zzz'],
                availableTime: 0
            },
            {
                requests: ['def', 'ghi'],
                availableTime: 3
            },
        ],
        spreadClientIds: [1, 2]
    }

    //loginc for assining Requests 
    // This should be done in different way when we will directly with db data using queries
    
    requestsData.map((request) => {
        if (!alreadyExist(request, butlersData.butlers)) {
            var getAvailableButler = butlersData.butlers.findIndex((butler) => {
                return butler.availableTime >= request.hours
            })
            if (getAvailableButler > -1) {
                butlersData.butlers[getAvailableButler].requests.push(request.requestId)
                butlersData.butlers[getAvailableButler].availableTime = butlersData.butlers[getAvailableButler].availableTime - request.hours
            } else {
                const getLength = butlersData.butlers.length;
                const obj = {
                    requests: [request.requestId],
                    availableTime: 8 - request.hours
                }
                butlersData.butlers[getLength] = obj
            }
            if (!butlersData.spreadClientIds.includes(request.clientId)) {
                butlersData.spreadClientIds.push(request.clientId)
            }
        }

    })

    res.status(200).json({ data: butlersData })

};

const alreadyExist = (value, data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].requests.includes(value.requestId)) {
            return true;
            break
        } else if (i == (data.length - 1) && !data[i].requests.includes(value.requestId)) {
            return false
        }
    }
}







