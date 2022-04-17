DROP TABLE IF EXISTS games CASCADE;

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  white_id INTEGER NOT NULL REFERENCES users(id),
  black_id INTEGER NOT NULL REFERENCES users(id),
  fen VARCHAR(255) NOT NULL,
  fen_history TEXT []
);


-- const gameObject = {
--   id: 1,
--   fen: "",
--   fenHistory: [],
--   status: {
--     loser: {}, //user1
--     winner: {}, //user2
--     draw: {},
--     //additional statistics about the game
--   },