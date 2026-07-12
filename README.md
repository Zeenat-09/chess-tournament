# Chess Tournament Management System

A web application to manage chess tournaments, built with SvelteKit and PostgreSQL (hosted on Supabase).

## Features

- **Player Management** — Create, view, update, and delete players
- **Tournament Management** — Create, view, update, and delete tournaments
- **Add Players to Tournaments** — Assign existing players to a specific tournament
- **Random Match System** — Randomly pairs players in a tournament and randomly assigns a winner to each match, saving results to the database
- **Rankings** — Displays 1st, 2nd, and 3rd place based on total wins in a tournament

## Tech Stack

- **Frontend/Backend**: SvelteKit (Svelte 5)
- **Database**: PostgreSQL (hosted on Supabase)
- **Database Driver**: `pg` (node-postgres)

## Database Schema

- `players` — id, name, created_at
- `tournaments` — id, name, status, created_at
- `tournament_players` — join table linking players to tournaments, tracks wins
- `matches` — id, tournament_id, player1_id, player2_id, winner_id, created_at

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Create a `.env` file with your PostgreSQL connection string:
4. Run the SQL scripts to create the required tables (players, tournaments, tournament_players, matches)
5. Run `npm run dev` to start the development server
6. Visit `http://localhost:5173/players` to get started

## Pages

- `/players` — Manage players
- `/tournaments` — Manage tournaments
- `/tournaments/[id]` — View a specific tournament: add players, generate matches, view results and rankings
