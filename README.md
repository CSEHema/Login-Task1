# React Login Component – Day 1 Task

## ✅ Features Implemented

### 1. Responsive Login Form UI
- Built using **React.js** and **Bootstrap CSS** for responsiveness.
- Includes:
  - **Email field** (validated)
  - **Password field** (visibility toggle + validation)
  - **Custom CAPTCHA** (alphanumeric)
  - **"Remember Me"** checkbox
  - **Login button**

### 2. Custom CAPTCHA Integration
- CAPTCHA is generated using a secure custom JavaScript function.
- User input must match CAPTCHA to enable login.
- CAPTCHA can be refreshed manually.

### 3. Form Validation & Error Handling
- Email format is validated using regex.
- Password is validated.
- CAPTCHA is validated before checking credentials.
- All invalid inputs show appropriate error messages.

### 4. Simulated Login Authentication
- Login is simulated using **hardcoded credentials**.
- Credentials are encoded before checking to simulate basic security.
- Email and password are validated before matching credentials.

### 5. Routing & Navigation
- **React Router DOM** is used for navigation.
- On successful login, user is redirected to `/dashboard`.
- Dashboard page displays a welcome message.

### 6. State Management
- Managed with React **useState** and **useEffect** hooks.
- "Remember Me" uses **localStorage** to save email across sessions.

### 7. Security Considerations
- Password is hidden by default with toggle option.
- CAPTCHA is validated before allowing login.
- No sensitive information is stored in browser storage.

---

## 🧪 Simulated Credentials
```plaintext
Email: admin@123.com
Password: Psw@1234

