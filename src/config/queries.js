const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "orcidDB",
  password: "1111",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY ORCID ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserByOrcid = (request, response) => {
  const orcid = parseInt(request.params.orcid);

  pool.query(
    "SELECT * FROM users WHERE orcid = $1",
    [orcid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { fullName, orcid, rank, position, section } = request.body;

  pool.query(
    "INSERT INTO users (fullName, orcid, rank, position, section) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [fullName, orcid, rank, position, section],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`User added with ORCID: ${results.rows[0].orcid}`);
    }
  );
};

const deleteUser = (request, response) => {
  const orcid = parseInt(request.params.orcid);

  pool.query(
    "DELETE FROM users WHERE orcid = $1",
    [orcid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ORCID: ${orcid}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserByOrcid,
  createUser,
  deleteUser,
};
