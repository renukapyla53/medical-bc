const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all programs
router.get('/', (req, res) => {
  db.query('SELECT * FROM programs', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add program
router.post('/', (req, res) => {
  const { name, description } = req.body;
  db.query(
    'INSERT INTO programs (name, description) VALUES (?, ?)',
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Program added' });
    }
  );
});

// Update program
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  db.query(
    'UPDATE programs SET name=?, description=? WHERE id=?',
    [name, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Program updated' });
    }
  );
});

// Delete program
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM programs WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Program deleted' });
  });
});

module.exports = router;