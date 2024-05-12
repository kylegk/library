# Nest.js Library Manager API

This API provides basic CRUD operations for a book collection. It serves as the backend for the Angular web application found in the `/ui` subdirectory in the root of this project.

## Using the API

This API uses JSON web tokens for authentication. For routes related to adding, editing, and updating books in the collection, an <code>"authorization": Bearer\<token></code> header must be provided with the request body.

Callers of this API can generate a JWT using the <code>/login</code> route. At this time, a caller can generate a JWT using any combination of **username** and **password** in the request body.

Routes are protected using the Nest.js Passport feature. The authentication guard will verify a token is included in the header, signed with the correct passphrase, and that the token has not expired.

## Routes

<details>
<summary>
<code>GET</code> <code><b>/login</b></code>
</summary> 
<br/>
Generate a JSON web token that will be required for all collection routes, with the exception of <code>/books</code> and <code>/books/book/details/:id</code>. 
<br/><br/>
Returns <code>HTTP 201</code> upon success.

##### Request

```
{
  "username": "username",
  "password": "password"
}
```

##### Response

```
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzIjoxNjI4NDYyMzMwLCJ1c2VyaWQiOjF9.LGte1UTgmzCg8L_FOdDPY7YsSlBeQQs3QyZDe2A7kNY"
}
```

</details>

<details>
<summary>
<code>POST</code> <code><b>/books/book/add</b></code>
</summary>
<br/>
Add a book to the collection. 
<br/><br/>
Returns <code>HTTP 201</code> upon success.

##### Request

```
{
	"isbn": "B0833FBNHV",
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"description": "The Pragmatic Programmer is one of those rare tech audiobooks you’ll listen, re-listen, and listen to again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh insights each and every time. ",
	"publisher": "David Thomas",
}
```

##### Response

```
{
	"isbn": "B0833FBNHV",
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"description": "The Pragmatic Programmer is one of those rare tech audiobooks you’ll listen, re-listen, and listen to again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh insights each and every time. ",
	"publisher": "David Thomas",
	"_id": "6598f2f57732a89e7d248c40",
	"createdAt": "2024-01-06T06:28:05.106Z",
	"updatedAt": "2024-01-06T06:28:05.106Z",
	"__v": 0
}
```

</details>

<details>
<summary>
<code>DELETE</code> <code><b>/books/book/remove/:id</b></code>
</summary> 
<br/>
Remove a book from the collection. 
<br/><br/>
Returns <code>HTTP 200</code> upon success.

##### Request

```
{
	"isbn": "B0833FBNHV",
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"description": "The Pragmatic Programmer is one of those rare tech audiobooks you’ll listen, re-listen, and listen to again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh insights each and every time. ",
	"publisher": "David Thomas",
}
```

##### Response

There is no body in the response. The client must validate HTTP status code to determine success.

</details>

<details>
<summary>
<code>PUT</code> <code><b>/books/book/update/:id</b></code> 
</summary>
<br/>
Update a book in the collection. The caller is only required to provide the field and value for which they wish to update; a fully formed book object is not required. 
<br/><br/>
Returns <code>HTTP 200</code> upon success.

<br/>

##### Request

```
{
	"description": "Updated description",
}
```

##### Response

```
{
	"isbn": "B0833FBNHV",
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"description": "Updated description",
	"publisher": "David Thomas",
	"_id": "6598f2f57732a89e7d248c40",
	"createdAt": "2024-01-06T06:29:05.106Z",
	"updatedAt": "2024-01-06T06:29:05.106Z",
	"__v": 1
}
```

</details>

<details>
<summary>
<code>GET</code> <code><b>/books/book/details/:id</b></code> 
</summary>
<br/>

Get the book object for the <code>id</code> specified.
<br/><br/>
Returns <code>HTTP 200</code> upon succes.

##### Request

Method does not require a request body. Caller only needs to provide a valid <code>id</code> in the path.

##### Response

```
{
	"isbn": "B0833FBNHV",
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"description": "Updated description",
	"publisher": "David Thomas",
	"_id": "6598f2f57732a89e7d248c40",
	"createdAt": "2024-01-06T06:28:05.106Z",
	"updatedAt": "2024-01-06T06:28:05.106Z",
	"__v": 0
}
```

</details>

<details>
<summary>
<code>GET</code> <code><b>/books</b></code> 
</summary>
<br/>

Get an array of book objects.
<br/><br/>
Returns <code>HTTP 200</code> upon succes.

##### Request

This method does not require a request body. Callers have access to search functionality, as well as some rudimentary pagination controls.

Callers can search the collection by providing a key/value pair for each of the fields they wish to search on/for. For example, if a caller wanted to limit results to only those books whose title include the word `book`, the caller would simply need to append `title=book` to the query string.

The pagination features for this API are incomplete. A caller can limit the maximum number of results returned from this method by including `limit=n` in the query string, where `n` is an integer value (**NOTE:** The default limit is `10`).

If the total number of results of the query exceed the limit, the caller can provide a `page=n` value to get another subset of results equal to the value of the `limit` parameter. For all queries, the first subset of results are returned in the first page (i.e. `page=1`).

As an example, if the collection contains thirty books, the caller would be required to set `page=2` to retrieve items eleven through twenty, assuming the limit is `10`. Likewise, if the caller wanted to retrieve the last ten items in the collection, the caller would need to provide `page=3` in the query string to receive items twenty one through thirty.

As this pagination implementation is incomplete, the body of the response does not include the necessary information to fully implement paginated controls in an application consuming this API. A future iteration of this method would provide a wrapper to the response body that includes a total count of records matching the query provided, as well as pagination information informing the caller which page they're currently receiving and if there are additional pages to consume.

##### Response

```
[
  {
    "_id": '6598f2f57732a89e7d248c40',
    "isbn": '978-1680507221',
    "title": 'Book One',
    "author": 'Author One',
    "description": 'Description One',
    "publisher": 'Publisher One',
    "createdAt": '2024-01-06T06:28:05.106Z',
    "updatedAt": '2024-01-06T06:28:05.106Z',
    "__v": 0,
  },
  {
    "_id": '6599a1277732a89e7d248ca4',
    "isbn": '123-4567890',
    "title": 'Book Two',
    "author": 'Author Two',
    "description": 'Description Two',
    "publisher": 'Publisher Two',
    "createdAt": '2024-01-06T18:51:19.674Z',
    "updatedAt": '2024-01-06T18:51:19.674Z',
    "__v": 0,
  },
];
```

</details>

## Tests

### Unit Tests

To run the unit tests for validating JWT authorization and collection endpoints run the following command:

```bash
yarn run test
```

## TODO

This API is not considered feature complete. The API is missing some critical functionality such as pagination, and the ability to refresh the authorization token.
