# Project
User Management System

### Overview
This project is a **User Management System** built using **Node.js**, **Express**, **MySQL**, and **EJS** for server-side rendering. It allows you to perform basic **CRUD (Create, Read, Update, Delete)** operations on user data. The system includes:
- A form to **add new users**.
- A table to **display all users**.
- Options to **edit** or **delete** user information.

The application is designed to be simple, efficient, and easy to use, with a clean and modern interface.

---

### Features
1. **Add New User**:
   - A form to input user details such as **username**, **email**, and **password**.
   - Form submission inserts the user data into the MySQL database.

2. **View All Users**:
   - Displays a table of all users with their **ID**, **username**, **email**, and **actions**.
   - Each user row includes buttons to **edit** or **delete** the user.

3. **Edit User**:
   - Allows updating a user's **username**.
   - Requires the user's **password** for verification before updating.

4. **Delete User**:
   - Removes a user from the database permanently.
   - Requires the user's **password** for verification before deletion.

5. **Styling**:
   - Clean and modern design with a **blue and yellow** color scheme.
   - Responsive layout for better usability on different screen sizes.

---

### Technologies Used
- **Frontend**:
  - HTML
  - CSS
  - EJS (Embedded JavaScript Templating)
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MySQL
- **Additional Libraries**:
  - `faker.js` for generating fake user data.
  - `uuid` for generating unique IDs.
  - `method-override` to support HTTP methods like `PATCH` and `DELETE`.

---

### Code Structure
#### 1. **Backend (Node.js + Express)**:
   - **`index.js`**:
     - The main server file that handles routing, database connections, and CRUD operations.
     - Uses **EJS** for rendering views.
     - Connects to a **MySQL** database to store and retrieve user data.

#### 2. **Frontend (EJS + CSS)**:
   - **`views/`**:
     - **`home.ejs`**: Displays the total number of users.
     - **`show.ejs`**: Displays a table of all users.
     - **`new.ejs`**: Contains a form to add a new user.
     - **`edit.ejs`**: Contains a form to edit an existing user's details.
     - **`delete.ejs`**: Handles the deletion of a user (confirmation page).
   - **`public/css/style.css`**: Custom CSS for styling the application.

#### 3. **Database (MySQL)**:
   - A **MySQL** database named `first_app` with a `user` table.
   - The `user` table has the following schema:
     ```sql
     CREATE TABLE user (
       id VARCHAR(36) PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password VARCHAR(255) NOT NULL
     );
     ```

---

### How It Works
1. **Database Connection**:
   - The application connects to a MySQL database using the `mysql2` library.
   - The connection details (host, user, database, password) are configured in the `index.js` file.

2. **Routing**:
   - **`GET /`**: Displays the total number of users on the home page.
   - **`GET /user`**: Fetches all users from the database and displays them in a table.
   - **`GET /user/new`**: Renders a form to add a new user.
   - **`POST /user/new`**: Inserts a new user into the database.
   - **`GET /user/:id/edit`**: Renders a form to edit an existing user's details.
   - **`PATCH /user/:id`**: Updates a user's details in the database.
   - **`GET /user/:id/delete`**: Renders a confirmation page for deleting a user.
   - **`DELETE /user/:id`**: Deletes a user from the database.

3. **User Data**:
   - User data is generated using the `faker.js` library for testing purposes.
   - Each user has a unique `id` generated using the `uuid` library.

4. **Security**:
   - Password verification is required for editing or deleting a user.
   - Passwords are stored in plain text (for simplicity). In a production environment, you should hash passwords using libraries like `bcrypt`.

---

### How to Run the Project
1. **Prerequisites**:
   - Install **Node.js** and **npm**.
   - Install **MySQL** and create a database named `first_app`.
   - Create a `user` table in the database using the schema provided above.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Database**:
   - Update the database connection details in `index.js`:
     ```javascript
     const connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       database: "first_app",
       password: "your_password", // Replace with your MySQL password
     });
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:8080`.

---

### Screenshots
Here are some visual representations of your project:

1. **Home Page**:
   ![Home Page]()
   - Displays the total number of users.

2. **All Users Page**:
   ![All Users Page]()
   - Displays a table of users with **Edit** and **Delete** options.

3. **Add New User Form**:
   ![Add New User Form]()
   - A form to input user details.

4. **Edit User Form**:
   ![Edit User Form](https://via.placeholder.com/800x400.png?text=Edit+User+Form)
   - Prefilled form to update user information.

---

### Future Enhancements Clarifications  

1. **User Authentication**  
   - Add a **login and registration system** so that users must sign in before accessing the application.  
   - Use **Google OAuth** to allow users to log in with their **Google accounts** for added convenience, and security authentication.  

2. **Search and Filter**  
   - Add a **search bar** where users can enter a username or email to find a specific user.  
   - Highlight the **searched user** in the table until the search is reset.  
   - Add **filters** to sort users based on criteria like name and email.  

3. **Responsive Design**  
   - Improve the layout so it works well on **mobile devices** and smaller screens.  
   - Ensure buttons, forms, and tables are adjusted properly to different screen sizes.  

### Repository Structure
```
user-management-system/
├── views/
│   ├── home.ejs       # Home page (displays total number of users)
│   ├── show.ejs       # Displays all users in a table
│   ├── new.ejs        # Form to add a new user
│   ├── edit.ejs       # Form to edit an existing user
│   └── delete.ejs     # Confirmation page for deleting a user
├── public/
│   └── css/
│       └── style.css  # Custom CSS for styling
├── index.js           # Main server file
├── package.json       # Project dependencies
└── README.md          # Project documentation
```


---

This description provides a comprehensive overview of my project and can be used as the README file for the repository. Feel free to let me know if you need any more adjustments!
