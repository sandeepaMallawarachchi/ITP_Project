# Hendrik's Tea Management System

![image](https://github.com/sandeepaMallawarachchi/ITP_Project/assets/126542051/157b32e1-e314-47e2-9cf6-896286e581f1)


Hendrik's Tea Factory Management System, a comprehensive web-based application that is transforming the management and production of tea. Its seamless integration and user friendly features enable producers to increase sales, manage payments, organize deliveries, supervise employees, keep an eye on inventories, and optimize supply chain operations.

## Our Web Application

The sales module of the system is primarily responsible for managing client contacts, tracking orders, and providing analytical insights to support strategic decision-making. The 
finance module manages spending, produces reports, and uses automated accounting and invoicing to provide financial transparency.The delivery module simplifies logistics for effective shipment tracking and route optimization, while the payment module facilitates safe transactions through a variety of gateways. Workforce management is made easier by the staff module, while procurement procedures and stock levels are kept at ideal levels by the supply and inventory departments.

## Getting Started

### Libraries


The MERN stack is a popular technology stack used for building dynamic web applications. It consists of four main components:

1. MongoDB: A NoSQL database that stores data in a flexible, JSON-like format. It is schema-less, which means it allows for easy integration of different data types and structures.

2. Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side logic and handling HTTP requests.

3. React.js: React is a JavaScript library for building dynamic and interactive user interfaces for web applications. It's maintained by Facebook and offers features like a virtual DOM for efficient rendering, JSX for composing UI components within JavaScript, and a component-based architecture for building reusable UI elements. With support for unidirectional data flow and React Hooks for managing component state, React provides a concise and powerful way to develop modern web applications.

4. Node.js: A JavaScript runtime environment that executes JavaScript code outside of a web browser. It allows developers to build scalable and high-performance server-side applications. Node.js uses an event-driven, non-blocking I/O model, making it efficient for handling multiple concurrent requests.

### Dependencies

#### Frontend

    "@fortawesome/fontawesome-svg-core": "^6.5.1",
    "@fortawesome/free-brands-svg-icons": "^6.5.1",
    "@fortawesome/free-regular-svg-icons": "^6.5.1",
    "@fortawesome/free-solid-svg-icons": "^6.5.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "apexcharts": "^3.48.0",
    "axios": "^1.6.7",
    "firebase": "^10.11.0",
    "flowbite": "^2.3.0",
    "flowbite-react": "^0.7.3",
    "history": "^5.3.0",
    "pdfmake": "^0.2.10",
    "html2canvas": "^1.4.1",
    "html2pdf": "^0.0.11",
    "html2pdf.js": "^0.10.1",
    "jspdf": "^2.5.1",
    "react": "^18.2.0",
    "react-apexcharts": "^1.4.1",
    "react-dom": "^18.2.0",
    "react-google-charts": "^4.0.1",
    "react-icons": "^5.0.1",
    "react-router-dom": "^6.22.0",
    "react-scripts": "^5.0.1",
    "react-to-print": "^2.15.1",
    "recharts": "^2.12.4",
    "sweetalert2": "^11.10.8",
    "web-vitals": "^2.1.4"

#### Backend

    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "db": "^6.0.0",
    "dotenv": "^16.4.1",
    "express": "^4.18.2",
    "express-session": "^1.18.0",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "moment": "^2.30.1",
    "mongo": "^0.1.0",
    "mongoose": "^5.13.22",
    "nodemailer": "^6.9.12",
    "nodemon": "^3.0.3",
    "react-to-print": "^2.15.1"
    
### Installing

Download Zip file and open it using **visual studio code** software. You can download it [here](https://code.visualstudio.com/download).

Check your computer or laptop already intalled Node using **command promt**

    Node --verson

If your computer don't have node you should [download](https://nodejs.org/en) and intall node

navigate to **backend** folder

    cd backend
   
navigate to **frontend** folder

    cd frontend
   
You can install above dependenceis one by one on terminal or using(install both in frontend and backend separately)

    npm i

### Executing program

* Frontend
  ```
  cd frontend
  ```
  ```
  npm start
  ```
  
* Backend
  ```
  cd backend
  ```
  ```
  npm start
  ```

# Things To Change

### Mongo DB connection

1. Create a account and cluster on [mogodb atlas](https://www.mongodb.com/cloud/atlas/register)
2. Replace MONGODB_URL with your url ( Backend --> .env --> MONGODB_URL)

### Emails

Replace below Emails and Password with yours ( Backend --> .env )

    ```
    USER=gun...@gmail.com
    EMAIL_USERNAME=sandeepa...@gmail.com
    EMAIL_PASSWORD=******
    PASS=******
    REGISTRATION_EMAIL=sandeepa...@gmail.com
    REGISTRATION_PASSWORD=******
    ```
