module.exports = (db) => {
  // USER QUERIES
  const getUserByEmail = function (email: String): String | null {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id) {
    return db
      .query(
        `
      SELECT * FROM users WHERE id = $1;`,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const addUser = function (user) {
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
      .then((result) => {
        return result.rows[0];
      });
  };

  const updateUserInfo = function (id, user) {
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
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };
  return { getUserByEmail, addUser, updateUserInfo, getUserById };
};
