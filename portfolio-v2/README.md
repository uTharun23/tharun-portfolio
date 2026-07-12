# Full-Stack Portfolio v2 (Angular + Node.js)

This is a modern, production-ready full-stack portfolio application. It migrates the original vanilla website into a modular Angular 20+ frontend and a Node.js + Express.js backend with an MVC + Service Layer architecture.

---

## Folder Structure
- **`client/`**: Angular frontend application using Standalone Components, Signals, SCSS, and lazy loading.
- **`server/`**: Express API backend facilitating Contact Forms, Guestbook Signatures, and Analytics tracking.

---

## How to View and Run the Output Locally

Follow these steps to start the application on your computer:

### Step 1: Start the Backend API Server
1. Open a terminal (PowerShell or Command Prompt).
2. Navigate to the server folder:
   ```bash
   cd "portfolio-v2/server"
   ```
3. Start the Node.js server:
   ```bash
   npm start
   ```
   *Note: If you have `nodemon` installed and want hot-reloads during editing, you can run `npm run dev` instead.*
4. The server will boot and log:
   `Server is running in development mode on port 5000`
   *(It will fall back automatically to the local JSON database `uploads/local_db.json` if MongoDB is not locally running).*

---

### Step 2: Start the Angular Frontend Client
1. Open a second terminal window.
2. Navigate to the client folder:
   ```bash
   cd "portfolio-v2/client"
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```
4. The CLI will compile the lazy chunk bundles and start a local server, logging:
   `➜  Local:   http://localhost:4200/`

---

### Step 3: Open in Browser
1. Open your web browser.
2. Navigate to the local address:
   [**http://localhost:4200**](http://localhost:4200)
3. You will see the brand-new, modern portfolio app in action!

---

## Environment Configuration

If you want to configure real email notifications or database persistence, update the `.env` file in the `server/` directory:
- **`PORT`**: Port number for Express server (default `5000`).
- **`MONGO_URI`**: Connection string to a MongoDB database.
- **`EMAIL_USER` / `EMAIL_PASS`**: SMTP credentials to send contact message alert emails.
