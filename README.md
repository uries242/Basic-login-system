# Innovative Inc

## Project Overview
A secure Express REST API that handles user authentication. 


## Core functionality
- Accepts a new user’s credentials and create a user record with bcrypt-hashed password,
- Authenticates a returning user’s credentials, validate them against the stored hash, and issues a JWT upon success.


## Tech Stack
- **Runtime:** Node.js
- **Language:** JavaScript (ES Modules)
- **Framework:** Express ^5.2.1
- **Database:** MongoDB + Mongoose ^9.6.2
- **Auth:** jsonwebtoken ^9.0.3
- **Security:** bcrypt ^6.0.0
- **Config:** dotenv ^17.4.2


## Installation
git clone https://github.com/uries242/Basic-login-system
cd [your-repo-name-here]
npm init -y
npm install express mongoose dotenv**
nodemon


## API Endpoints

| Method |      Endpoint         |           Description              |
|--------|-----------------------|------------------------------------|
| POST   | /api/users/register   | Register a new user                |
| POST   | /api/users/login      | Authenticate user and receive JWT  |

**Register request body:**
```json
{
  "username": "yourname",
  "email": "you@email.com",
  "password": "securepass123"
}
```

**Login request body:**
```json
{
  "email": "you@email.com",
  "password": "securepass123"
}
```


# Reflection

## Migrating from CommonJS to ES Modules
The lesson uses ES Module syntax i.e import/export, but my initial code used
CommonJS "require" and "module.exports". Aligning with the lesson meant refactoring
all three files and adding "type": "module" to package.json. Local imports in ESM require the .js extension explicitly e.g.,
import User from '../models/User.js'


## Destructuring vs. namespace imports
In User.js, I imported { Schema, model } from mongoose but then referenced
mongoose.Schema which threw a runtime error since mongoose was never
imported as a namespace. The fix was straightforward once I understood the
distinction: use the destructured names consistently.


## Mongoose pre-save hook and next()
This was the most instructive debugging session of the project. The lesson shows
next() being called inside the pre-save hook, which is the pattern for
Mongoose's callback-style middleware. However, Mongoose 6+ treats async
pre-save functions differently — when the function is async, Mongoose resolves
the hook on promise resolution and does not pass next as a parameter. Calling
next() without declaring it throws "next is not defined", and declaring it as a
parameter but having Mongoose not pass it throws "next is not a function". The
fix was to remove "next" entirely and let the async function handle flow control.


## Resources
- [Mongoose Middleware Docs](https://mongoosejs.com/docs/middleware.html#pre)
- [bcrypt on npm](https://www.npmjs.com/package/bcrypt)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
