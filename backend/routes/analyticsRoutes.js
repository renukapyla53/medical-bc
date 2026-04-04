const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get counts
router.get('/', (req, res) => {
  const queries = {
    users: 'SELECT COUNT(*) AS total FROM users',
    resources: 'SELECT COUNT(*) AS total FROM resources',
    programs: 'SELECT COUNT(*) AS total FROM programs'
  };

  let results = {};

  db.query(queries.users, (err, userResult) => {
    if (err) return res.status(500).json(err);
    results.users = userResult[0].total;

    db.query(queries.resources, (err, resResult) => {
      if (err) return res.status(500).json(err);
      results.resources = resResult[0].total;

      db.query(queries.programs, (err, progResult) => {
        if (err) return res.status(500).json(err);
        results.programs = progResult[0].total;

        res.json(results);
      });
    });
  });
});

module.exports = router;