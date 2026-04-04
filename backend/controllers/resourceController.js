const db = require('../config/db');

// Get all resources
exports.getResources = (req, res) => {
  const sql = 'SELECT * FROM resources';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching resources', error: err });
    }
    res.json(result);
  });
};

// Add new resource
exports.addResource = (req, res) => {
  const { title, category, content } = req.body;

  const sql = 'INSERT INTO resources (title, category, content) VALUES (?, ?, ?)';
  db.query(sql, [title, category, content], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding resource', error: err });
    }
    res.json({ message: 'Resource added successfully', id: result.insertId });
  });
};

// Update resource
exports.updateResource = (req, res) => {
  const { id } = req.params;
  const { title, category, content } = req.body;

  const sql = 'UPDATE resources SET title = ?, category = ?, content = ? WHERE id = ?';
  db.query(sql, [title, category, content, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating resource', error: err });
    }
    res.json({ message: 'Resource updated successfully' });
  });
};

// Delete resource
exports.deleteResource = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM resources WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting resource', error: err });
    }
    res.json({ message: 'Resource deleted successfully' });
  });
};