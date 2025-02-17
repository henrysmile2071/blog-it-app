# Blog-It-App <!-- omit in toc -->

RESTful API for a simplified blogging platform with `Node.js Express` framework using `Sequelize` with `PostgreSQL` database.

## Contents <!-- omit in toc -->

- [Includes](#includes)
- [Getting Started](#getting-started)
- [Local Setup](#local-setup)
- [Tests \& Coverage](#tests--coverage)
- [Migrations](#migrations)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [References](#references)

## Includes

- **ES6** `import/export` implemented with `type: "module"` in `package.json`
- **Error handling** middlewares implemented
- `Tests` added with `mocha` configuration
- Code-coverage using Node.js' built in functionality `c8`
- `Eslint`
- `winston` logger
- `Swagger` documentation
- Pagination for getAll posts
- `Helmet` for security
- `jsonwebtoken` for authentication
- `bcrypt` password hashing before storing to database

- **PostgreSQL**

## Getting Started

You can download or clone this repo using below command:

```sh
git clone https://github.com/henrysmile2071/blog-it-app.git
```

## Local Setup

- After cloning enter into folder.
- Install dependencies

  ```sh
  npm install
  ```

- Copy `.env.example` file content `.env` file.

  ```sh
  cp .env.example .env
  ```

- Run locally

  ```sh
  npm run local
  ```

- [Swagger Documentation](http://localhost:3000/api-docs/#)

## Tests & Coverage

- Run tests *(unit/integration)*

  ```sh
  npm test
  ```

- Run tests with coverage

  ```sh
  npm run coverage
  ```

## Migrations

- Running Migrations

  ```sh
  npm run migration
  ```

- Undoing Migrations

  ```sh
  npm run migration:undo
  ```

## Environment Variables

| Variable | Description              | Default Value |
| -------- | ------------------------ | ------------- |
| DB_HOST  | Database connection host | `localhost`   |
| DB_PORT  | Database port            | `5432`        |
| DB_NAME  | Database name            | `postgres`    |
| DB_USER  | Database username        | `postgres`    |
| DB_PASS  | Database password        | `postgres`    |
| JWT_SECRET | jwt secret             | `your_super_secret_key` |
| JWT_EXPIRES_IN | jwt expiry time    | `1h`          |

> NOTE: These environment variables are already passed to `npm run local` and `npm test` scripts under `package.json` with their default values. You can update as per your need.

## Endpoints

<!-- Register User -->
<details>
    <summary>Register User</summary>

  ```sh

  curl --location --request POST 'localhost:3000/v1/api/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "testUser",
      "email": "test@example.com",
      "password": "passwordexample",
  }'
  ```

</details>

<!-- Login User -->
<details>
    <summary>Login User</summary>

    ```sh
    # Request
    
    curl --location --request POST 'localhost:3000/v1/api/login'\
    --header 'Content-Type: application/json' \
    --data-raw '{
      "email": "test@example.com",
      "password": "passwordexample",
    }'
    #Response

    {
      "success": true,
      "body": 
      {
        "token": "JWT_token"
      }
    }

    ```

</details>

<!-- Create Post -->
<details>
    <summary>Create New Post</summary>

    ```sh
    
    # Request
    
    curl --location --request POST 'localhost:3000/v1/api/posts'\
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQG1haWwuY29tIiwiaWF0IjoxNzM5NzYzMzkwLCJleHAiOjE3Mzk3NjY5OTB9.zxkKIbzPFMDd1iitVFcNmy1V5G8LM_cKTfgwzeHCovA' \
    --data-raw '{
      "title": "Lorem ipsum",
      "content": "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    }'
    #Response

    {
      "success": true
    }

    ```
    
</details>

<!-- Get All Posts -->
<details>
    <summary>Get all posts</summary>
    
    ```sh

    # Request

    curl --location --request GET 'localhost:3000/v1/api/posts?page=1&limit=10'

    # Response

    {
      "success": true,
      "body": {
        "currentPage": 1,
        "totalPages": 1,
        "totalPosts": "4",
        "limit": 10,
        "data": [
            {
              "title": "Lorem Upsum",
              "content": "lorum upsum di get loeit",
              "author": "Lawrence",
              "createdAt": "2025-02-17T03:38:46.730Z"
            },
            {
              "title": "Lorem Upsum",
              "content": "lorum upsum di get loeit",
              "author": "Lawrence",
              "createdAt": "2025-02-17T03:37:09.206Z"
            },
            {
              "title": "Lorem Upsum Cola",
              "content": "lorum upsum di get loeit pettis nomour",
              "author": "Lawrence",
              "createdAt": "2025-02-17T03:01:14.714Z"
            },
            {
              "title": "Lorem Upsum",
              "content": "lorum upsum di get loeit",
              "author": "Lawrence",
              "createdAt": "2025-02-16T16:29:52.780Z"
            }
        ]
      }
    }
    
    ```
    
</details>

## References

- [Sequelize ORM](https://sequelize.org/v6/)