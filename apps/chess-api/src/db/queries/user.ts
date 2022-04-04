import { User } from "@chess/utils";
import { camelCaseObj } from "../../helpers/camelCaseObj";

module.exports = (db) => {
  // USER QUERIES
  const getUserByEmail = function (email: String): User | null {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result: any) => {
        if (result) {
          return camelCaseObj(result.rows[0]);
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id: number): User | null {
    return db
      .query(
        `
      SELECT * FROM users WHERE id = $1;`,
        [id]
      )
      .then((result: any) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const addUser = function (user: User): User {
    const queryParams = [
      user.userName,
      user.firstName,
      user.lastName,
      user.email,
      user.rating,
      user.password,
    ];

    return db
      .query(
        `INSERT INTO users (user_name, first_name, last_name, email,rating, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
        queryParams
      )
      .then((result: any) => {
        return camelCaseObj(result.rows[0]);
      });
  };

  const updateUserInfo = function (id: number, user: User): User | null {
    const queryParams = [
      id,
      user.userName,
      user.firstName,
      user.lastName,
      user.email,
      user.rating,
      user.password,
    ];

    return db
      .query(
        `
          UPDATE users
          SET user_name = $2 ,
              first_name = $3 ,
              first_name  = $4,
              email = $5,
              rating = $6,
              password = $7
          
          WHERE id = $1
    RETURNING *;`,
        queryParams
      )
      .then((result: any) => {
        if (result) {
          return camelCaseObj(result.rows[0]);
        } else {
          return null;
        }
      });
  };
  return { getUserByEmail, addUser, updateUserInfo, getUserById };
};
