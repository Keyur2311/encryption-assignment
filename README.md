# User Management Microservice

## Overview

The **User Management Microservice** is a Node.js application for managing users. It allows you to:

- Add users with names, emails, and roles (Admin, Editor, Viewer).
- Retrieve users with filtering options (e.g., by role).
- Delete users by their unique ID.

Includes Jest tests for ensuring module functionality.

---

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- MySQL (v8 or later)

### Installation

1. Clone the repository:  
   [https://github.com/Keyur2311/micro-service-assignment](https://github.com/Keyur2311/micro-service-assignment)
2. Navigate to the project directory:
   ```bash
   cd micro-service-assignment
   ```
3. Install required dependencies:
   ```bash
   npm install
   ```
4. Configure the `.env` file with your database credentials:
   ```env
   MYSQL_DB=your_database_name
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   PORT=5000
   JWT_SECRET=your_secret
   ```
5. Create the database in MySQL:
   ```sql
   CREATE DATABASE your_database_name;
   ```
6. Run the application:
   ```bash
   node app.js
   ```

---

## Usage

### Features

- **Add users** with names, emails, and roles.
- **Fetch users** with optional filters by role.
- **Delete users** by their unique ID.

### API Endpoints

| Endpoint             | Method | Description                       | Payload Example                                                    |
| -------------------- | ------ | --------------------------------- | ------------------------------------------------------------------ |
| `/api/users`         | POST   | Add a new user                    | `{ "name": "John", "email": "john@example.com", "role": "Admin" }` |
| `/api/users`         | GET    | Fetch all users or filter by role | `?role=Admin`                                                      |
| `/api/users/:userId` | DELETE | Delete a user by ID               | -                                                                  |

---

## Testing

Run unit tests using Jest to validate functionality:

```bash
npm test
```

**Tests cover:**

- Adding users (with encyption and decryption)
- Fetching users (with and without filters)
- Deleting users
- Handling invalid operations

---

## GitHub Copilot Usage Examples

**1. Adding Users:**  
GitHub Copilot helped generate the `addUser` function, streamlining the creation of users with a unique ID, name, email, and role.

**2. Fetching Users:**  
Copilot provided the logic for retrieving users and applying filters based on roles, improving efficiency.

**3. Writing Jest Tests:**  
Copilot assisted in generating Jest test cases to validate API behavior for adding, fetching, and deleting users.

## Encryption and Decryption

To enhance the security of sensitive user data (like name and email), the following encryption and decryption process is implemented:

At first, when user tries to submit data to server, then the user encrypts the data with server's public key, then the server decrypts the data with it's private key and then server again encrypts the data with
it's public key and then server store data into mySQL. So the encrypted data stored securely in the database.

when any request arrives of fetching the user data then the server first decrypts the data while retrieving the data from the database with it's private key. now server again ecnrypts the data with client's public key while sending the data to user as a response and then client decrypts the data with it's private key to get the original data.

## Other

Used Secret manager **Infisical** for storing the secret keys and environment variables
