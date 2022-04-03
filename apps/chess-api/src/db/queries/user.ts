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

  // id SERIAL PRIMARY KEY NOT NULL,
  // user_name VARCHAR(255) NOT NULL UNIQUE,
  // first_name VARCHAR(255) NOT NULL,
  // last_name VARCHAR(255) NOT NULL,
  // email VARCHAR(255) NOT NULL UNIQUE,
  // rating INTEGER NOT NULL,
  // password VARCHAR(255) NOT NULL

  const addUser = function (user) {
    const values = [
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
        values
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const updateUserInfo = function (id, object) {
    const queryParams = [
      id,
      object.first_name,
      object.last_name,
      object.address,
      object.neighborhood,
      object.email,
      object.phone,
      object.lender,
      object.borrower,
    ];

    return db
      .query(
        `
          UPDATE users
          SET first_name = $2 ,
              last_name = $3 ,
              address = $4,
              neighborhood = $5,
              email = $6,
              phone = $7,
              lender= $8,
              borrower=$9
          
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
