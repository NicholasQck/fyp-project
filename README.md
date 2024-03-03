# fyp-project

Steps to run the program:

1. Download node.js (v20.10.0).
2. Download postgresql database 15.
3. Create a database with the pgadmin app after downloading postgresql 15.
4. Get an API key from the Cohere website for the Co.Generate API through this link: https://cohere.com/
5. Get an API key from the Hugging Face website through this link: https://huggingface.co/inference-api
6. Create a file named ".env" in the server folder directory .../FYP/server
7. Create 6 variables and assign the values as stated:
   ```
   DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME"
   JWT_SECRET = ANY RANDOM STRING
   COHERE_API_KEY = COHERE API KEY FROM 4.
   HF_ACCESS_TOKEN = HUGGING FACE API KEY FROM 5.
   JWT_LIFETIME = 15m
   PORT = 5000
   ```
8. Run the command `npm i` in a terminal at these directories:
   _.../FYP/server_
   _.../FYP/client_
9. Run these commands at _.../FYP/server_ in a terminal : </br>
   `npx prisma migrate dev` </br>
   `npx prisma db seed`
10. Run the command `npm start` at _.../FYP/client_ in a terminal.
11. Run the command `npm run start` at _.../FYP/server_ in a terminal.
12. The program should be up and running on the default browser of the machine.
13. Login to a student account:
    username = 19116185
    password = 12345678
14. Login to a supervisor account:
    username = woanningl
    password = 12345678
15. Login to a coordinator account:
    username = charisk
    password = 12345678
