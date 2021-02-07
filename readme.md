# node-auth

First Backend Project is a Authentication in Node.js with security and scalability in mind.

## Features

- login/logout/register + session expiry
- email verification (`"Confirm your email"`)
- password reset (`"Forgot password"`)
- password confirmation (`"Re-enter your password"`)
- persistent login (`"Remember me"`)

## API

| Method    | URI       | Middleware |
| :-------- | :-------- | :--------- |
| POST      | /register | guest      |
| POST      | /login    | guest      |
| POST      | /logout   | auth       |
| GET\|HEAD | /home     | auth       |
