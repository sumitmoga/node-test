# Node Test for Assigning client requests to Butlers

#For run:
* run npm install

#after installing all packages run:
* npm start

# Test Steps
* it will run on http://localhost:3000/
* open this in Postman with type POST http://localhost:3000/request
* Under Body select type Raw and JSON(application/JSON) type
* add data like
```
  {
        clientId: 1,
        requestId: 'abc',
        hours: 6
    }
  ```

# Assumptions 
* Below data will be in DB,
* hours will be equal or less than 8hours

```
const exampleRequests = [
    {
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
    }
]

const exampleReturnValue = {
    butlers: [
        {
            requests: ['abc', 'zzz']
        },
        {
            requests: ['def','ghi']
        }
    ],
    spreadClientIds: [1,2]
}
```


