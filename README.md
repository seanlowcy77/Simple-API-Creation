# Simple Get, Post, Put, Delete API

## 1. Introduction

This code was made using Node, Express and Joi. It is my first go at creating a simple Get, Post, Put and Delete API. In the code, you can observe that there are originally 3 courses:

```
    { id: 1, name: "CS1010S" },
    { id: 2, name: "CS2103" },
    { id: 3, name: "CS3219" }
```

Do have fun testing the APIs locally or on Postman!

## 2. Quick Start

Before launching the application ensure that the following are installed:

```
1. nodemon
2. Joi
3. express
4. node
```

Their versions are found below under `Requirements`.

The default port has been set to port 3000. If you wish to change the port simply enter:

```
export PORT=<DESIRED PORT NUMBER>
```

into the terminal.

After that, enter

```
nodemon index.js
```

The server will then start listening for requests. After that enjoy typing the API requests in! For b and c (POST and PUT requests) you require a message body. Thus it is advisable to test b and c via [Postman](https://www.postman.com/). Click the link below to import the Collection and test the APIs! The collection below uses the localhost port of 3000 - if you're using a different port do change it!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/828d6a05127917ced48a)

### Note: Remember to run / deploy the server before you do so!

## 3. Description and Guide to use APIs

### a. GET Request

1. If you perform a HTTP get request while using `/api/courses` path, this will return the entire list of courses, along with a 200 OK status. For example such as below (original course list)

```
    { id: 1, name: "CS1010S" },
    { id: 2, name: "CS2103" },
    { id: 3, name: "CS3219" }
```

2. If you perform a get request while using `api/courses/<id>` path, this will return the specific course with the id requested, along with a 200 OK status. For example, `api/courses/2` will return

```
{
    "id": 2,
    "name": "CS2103"
}
```

### Things to Note

-   For 1, if the list is empty an empty array will be returned
-   For 2., if the id entered is invalid, an error message, `The course with the given id was not found` with a 404 Not Found status will be returned to the client.

### b. POST Request

1. If you perform a HTTP post request while using `/api/courses` path along with a message body such as:

```
{
	"name": "CS2100"
}
```

A new course of CS2100 will be added, along with a 200 OK status. The server will then return:

```
{
    "id": <NEW_ID>,
    "name": "CS2100"
}
```

where NEW_ID is simply the length of the current array + 1.

### Things to Note

-   If the body is invalid - such as "name" not being entered, a 400 Bad Request will be returned along with an error message `"name" is required`.
-   In addition, since all courses in NUS have 6 characters normally, should the client enter any course smaller than 6 characters, a 400 Bad Request will be returned along with an error message `"name" length must be at least 6 characters long`.

### c. PUT Request

1. If you perform a HTTP put request while using `/api/courses/<id>` path along with a message body such as:

```
{
	"name": <NEW_COURSE_NAME>
}
```

The course name of the id in the parameter of the request will be changed to the `NEW_COURSE_NAME` as indicated, along with a 200 OK status.

### Things to Note

-   If the id entered in the request parameters is invalid (there does not exist a course than has that particular id) an error message, `The course with the given id was not found` with a 404 Not Found status will be returned to the client.
-   If the body is invalid - such as "name" not being entered, a 400 Bad Request will be returned along with an error message `"name" is required`.
-   In addition, since all courses in NUS have 6 characters normally, should the client enter any course smaller than 6 characters, a 400 Bad Request will be returned along with an error message `"name" length must be at least 6 characters long`.

### d. DELETE Request

1. If you perform a HTTP delete request while using the `/api/courses/<id>` path,
   if the id is valid, the course with that particular id will be deleted with a 200 OK status message returned, along with the course that was removed.

For example after entering `/api/courses/2`, since the course exists, it will return

```
{
    "id": 2,
    "name": "CS2103"
}
```

with a 200 OK status.

### Things to Note

-   If the id entered in the request parameters is invalid (there does not exist a course than has that particular id) an error message, `The course with the given id was not found` with a 404 Not Found status will be returned to the client.

## 4. Requirements

The file is currently run on

1. node v12.16.0
2. express v4.17.1
3. Joi v17.2.1
4. nodemon v2.0.4
