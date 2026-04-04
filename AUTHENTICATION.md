# Student Health & Wellness Platform

## Authentication System

This platform implements secure authentication with role-based access control (RBAC).

### User Roles

1. **Student** - Access to:
   - Browse health resources
   - Enroll in wellness programs
   - Track personal wellness metrics
   - Submit support requests
   - View fitness and nutrition content

2. **Admin** - Access to:
   - Manage health resources (add, edit, delete)
   - Manage wellness programs
   - View usage analytics and metrics
   - Handle support requests
   - Track platform engagement

### Demo Credentials

For testing purposes, use these credentials:

**Student Accounts:**
- Email: `student@university.edu` | Password: `student123`
- Email: `jane.doe@university.edu` | Password: `password123`

**Admin Accounts:**
- Email: `admin@university.edu` | Password: `admin123`
- Email: `admin2@university.edu` | Password: `admin456`

### Security Features

- ✅ Secure login required for all users
- ✅ Role-based access control (RBAC)
- ✅ Session persistence using localStorage
- ✅ Password visibility toggle
- ✅ Unauthorized access prevention
- ✅ Automatic logout functionality
- ✅ Email validation
- ✅ Protected routes based on user role

### How to Use

1. Navigate to the login page
2. Enter your credentials (email and password)
3. Click "Sign In" to authenticate
4. You will be redirected to your role-specific dashboard:
   - Students → Student Dashboard
   - Admins → Admin Dashboard
5. Click "Logout" in the top-right corner to sign out

### Important Notes

- Users cannot access features outside their role
- All routes are protected and require valid authentication
- Sessions are stored securely in browser localStorage
- Sign-up is disabled for demonstration purposes
- This is a demonstration system with mock authentication

### Architecture

- **Authentication Context** (`AuthContext.tsx`) - Manages auth state globally
- **Mock Auth** (`mockAuth.ts`) - Simulates user database and authentication
- **Login Page** (`LoginPage.tsx`) - User interface for authentication
- **Protected Routes** - Automatic redirection based on auth status and role
- **Role-Based Rendering** - Different dashboards for different roles
