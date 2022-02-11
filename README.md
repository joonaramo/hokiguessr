# HokiGuessr
A real-time Finnish Elite League (Liiga) goal scorer guessing application. Done as a full-stack school project using React, Node.js and MySQL.

# How to play?
The idea of the game is to guess which players score goals on a Liiga hockey match. Predicting is done with in-game currency called pucks. To earn pucks, you have to guess right goal scorers. By default, each player has a puck return ratio of 2, but admin user can set custom ratios for players.

# Screenshots
![image](https://user-images.githubusercontent.com/8779141/149005020-968d5883-b572-41f6-bbc9-a8cda6b89ab9.png)
![image](https://user-images.githubusercontent.com/8779141/149005070-529088ee-2093-4f3d-9c14-416f7399b392.png)

# Demo
Demo app is available at https://hokiguessr.herokuapp.com

# Technologies used
- Backend
  - Express
  - MySQL
  - Redis 
- Frontend
  - React
  - Tailwind CSS

# Running locally
## Backend
0. Clone the repo, have MySQL and Redis instance running
1. Copy `.env.example` to `.env` and fill in MySQL details and JWT secret
2. `npm install`
3. `npm start`

## Frontend
0. Clone the repo
1. `npm install`
2. `npm start`

# Screencast
[![Screencast](https://img.youtube.com/vi/LbvHkCIjIiY/hq1.jpg)](https://www.youtube.com/watch?v=LbvHkCIjIiY)
