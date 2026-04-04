exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@university.edu' && password === '123456') {
    return res.json({
      message: 'Login successful',
      token: 'admin-token',
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@university.edu',
        role: 'admin'
      }
    });
  }

  if (email === 'student@university.edu' && password === '123456') {
    return res.json({
      message: 'Login successful',
      token: 'student-token',
      user: {
        id: 2,
        name: 'Student User',
        email: 'student@university.edu',
        role: 'student'
      }
    });
  }

  return res.status(401).json({
    message: 'Invalid email or password'
  });
};