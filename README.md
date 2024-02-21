# Task Manager API Documentation

## Introduction

Welcome to the Task Manager API documentation. This API allows users to manage tasks, users, and other related operations.

## Base URL

[ https: localhost3000 ] for local usage

## Roles

This API implements role-based access control (RBAC) to restrict access to certain endpoints based on the user's role. There are two roles:

- **Admin**: Admin users have full access to all endpoints.
- **User**: Regular users have restricted access to certain endpoints.

To access endpoints that require authentication, users need to obtain a JWT token by logging in or registering.

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. Users need to include their JWT in the `Authorization` header of each request.

Example:

Authorization: Bearer your_jwt_token_here

## Logger Functionality

The Task Manager API utilizes a logging mechanism to record important events and errors that occur during the execution of the application. The logger captures informational messages, error messages, and other relevant data to facilitate debugging and monitoring of the application.

### Logging Levels

The logger supports different levels of logging, including:

- **Info**: Informational messages about the application's state or operations.
- **Error**: Error messages indicating issues or failures in the application.
- **Debug**: Debugging messages useful for troubleshooting and diagnosing problems during development.

### Log Output

The logger output can be configured to write logs to various destinations, such as the console, files, or external services like log management platforms. In this API, the logger is configured to output logs to both the console and files for easy accessibility and monitoring.

### Log Format

Each log entry includes relevant information such as the timestamp, log level, message, and additional context or data related to the event. The log format is designed to be human-readable and easily parsable for analysis and monitoring purposes.

## Endpoints

### Users

#### Register a New User

- **URL**: `/user/auth/register`
- **Method**: POST
- **Request Body**:
  - `username` (string): The username of the user.
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.

- **Response**:
  - Status Code: 201 (Created)
  - Body:

    ```json
    {
      "_id": "user_id_here",
      "username": "example_user",
      "email": "user@example.com"
    }
    ```

#### Login

- **URL**: `/user/auth/login`
- **Method**: POST
- **Request Body**:
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.

- **Response**:
  - Status Code: 200 (OK)
  - Body:

    ```json
    {
      "token": "jwt_token_here"
    }
    ```

### Tasks

#### Create a New Task

- **URL**: `/task/tasks`
- **Method**: POST
- **Request Body**:
  - `title` (string): The title of the task.
  - `description` (string): The description of the task.

- **Authentication Required**: Yes
- **Response**:
  - Status Code: 201 (Created)
  - Body:

    ```json
    {
      "_id": "task_id_here",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
    ```

#### Get All Tasks

- **URL**: `/task/tasks`
- **Method**: GET
- **Authentication Required**: Yes

- **Response**:
  - Status Code: 200 (OK)
  - Body:

    ```json
    [
      {
        "_id": "task_id_here",
        "title": "Task Title",
        "description": "Task Description",
        "status": "pending"
      },
      {
        "_id": "task_id_here",
        "title": "Task Title",
        "description": "Task Description",
        "status": "completed"
      }
    ]
    ```

#### Get Task by ID

- **URL**: `/task/tasks:taskId`
- **Method**: GET
- **Authentication Required**: Yes

- **Response**:
  - Status Code: 200 (OK)
  - Body:

    ```json
    {
      "_id": "task_id_here",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
    ```

#### Update Task

- **URL**: `/task/tasks:taskId`
- **Method**: PUT
- **Authentication Required**: Yes
- **Request Body**:
  - `title` (string, optional): The updated title of the task.
  - `description` (string, optional): The updated description of the task.
  - `status` (string, optional): The updated status of the task. Can be "pending" or "completed".

- **Response**:
  - Status Code: 200 (OK)
  - Body:

    ```json
    {
      "_id": "task_id_here",
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "status": "completed"
    }
    ```

#### Delete Task

- **URL**: `/task/tasks/:taskId`
- **Method**: DELETE
- **Authentication Required**: Yes

- **Response**:
  - Status Code: 204 (No Content)

### Task Categories

#### Create a New Task Category

- **URL**: `/task/category/task-categories`
- **Method**: POST
- **Request Body**:
  - `name` (string): The name of the task category.

- **Authentication Required**: Yes
- **Response**:
  - Status Code: 201 (Created)
  - Body:

    ```json
    {
      "_id": "task_category_id_here",
      "name": "Category Name"
    }
    ```

#### Get All Task Categories

- **URL**: `/task/category/task-categories`
- **Method**: GET
- **Authentication Required**: Yes

- **Response**:
  - Status Code: 200 (OK)
  - Body:

    ```json
    [
      {
        "_id": "task_category_id_here",
        "name": "Category Name"
      },
      {
        "_id": "task_category_id_here",
        "name": "Category Name"
      }
    ]
    ```

### Password Reset

#### Initiate Password Reset

- **URL**: `/user/auth/forget-password`
- **Method**: POST
- **Request Body**:
  - `email` (string): The email of the user who wants to reset the password.

- **Response**:
  - Status Code: 200 (OK)
  - Body: A confirmation message will be sent to the user's email.

#### Reset Password

- **URL**: `/user/auth/reset-password`
- **Method**: POST
- **Request Body**:
  - `token` (string): The token received in the email after initiating the password reset.
  - `newPassword` (string): The new password to be set.

- **Response**:
  - Status Code: 200 (OK)
  - Body: A confirmation message that the password has been reset successfully.
