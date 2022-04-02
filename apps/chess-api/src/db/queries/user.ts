module.exports = (db) => {
  // USER QUERIES
  const getUserByEmail = function (email: String) {
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
    const values = [
      user.first_name,
      user.last_name,
      user.address,
      user.neighborhood,
      user.borrower,
      user.lender,
      user.email,
      user.cash_balance_cents,
      user.phone,
      user.password,
    ];

    return db
      .query(
        `INSERT INTO users (first_name, last_name, address, neighborhood, 
            borrower, lender, email, cash_balance_cents, phone, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
