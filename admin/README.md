# Admin Panel Documentation

## Overview

The Admin Panel is a secure, lightweight content management system (CMS) for the byprasiddha website. It allows administrators to easily manage poems, articles, eBooks, and photos without any coding knowledge.

## Features

### 🔐 Authentication & Security
- **Secure Login System**: Username/password authentication with session management
- **Password Hashing**: Client-side password hashing for secure storage
- **Session Management**: Auto-logout after 1 hour of inactivity
- **Brute-Force Protection**: Maximum 5 login attempts with 15-minute lockout
- **XSS Protection**: Input sanitization on all forms
- **CSRF Considerations**: Token-based protection ready for implementation

### 📊 Dashboard
- **Statistics Overview**: Real-time count of poems, articles, eBooks, and photos
- **Quick Actions**: One-click access to add new content
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations

### ✍️ Content Management
- **Poetry**: Add, edit, and delete poems with title, author, content, and tags
- **Articles**: Manage articles with title, author, excerpt, content, and tags
- **eBooks**: Organize eBooks with title, author, genre, description, and tags
- **Photography**: Upload photos with drag-and-drop, add titles, captions, and tags

### 🎨 User Interface
- **Sidebar Navigation**: Easy access to all content sections
- **Modal Forms**: Beautiful modal dialogs for adding/editing content
- **Toast Notifications**: Real-time feedback for all actions
- **Empty States**: Helpful messages when no content exists
- **Mobile-First**: Fully responsive design that works on all devices

## Getting Started

### Default Credentials
```
Username: admin
Password: admin123
```

**Important**: Change these credentials in production!

### Accessing the Admin Panel

1. Navigate to `/admin/` or `/admin/login.html`
2. Enter your credentials
3. Click "Sign In"

## Usage Guide

### Managing Poetry

1. Click "Poetry" in the sidebar or "Add Poetry" quick action
2. Click "Add New Poem" button
3. Fill in the form:
   - **Title** (required): The poem's title
   - **Author** (optional): Author name
   - **Content** (required): The poem text
   - **Tags** (optional): Comma-separated tags
4. Click "Save Poem"

To edit or delete, click the respective icons on the poem card.

### Managing Articles

1. Click "Articles" in the sidebar or "Add Article" quick action
2. Click "Add New Article" button
3. Fill in the form:
   - **Title** (required): Article title
   - **Author** (optional): Author name
   - **Excerpt** (optional): Brief summary
   - **Content** (required): Full article text
   - **Tags** (optional): Comma-separated tags
4. Click "Save Article"

### Managing eBooks

1. Click "eBooks" in the sidebar or "Add eBook" quick action
2. Click "Add New eBook" button
3. Fill in the form:
   - **Title** (required): eBook title
   - **Author** (optional): Author name
   - **Genre** (optional): Book genre
   - **Description** (required): Book description
   - **Tags** (optional): Comma-separated tags
4. Click "Save eBook"

### Managing Photos

1. Click "Photography" in the sidebar or "Upload Photo" quick action
2. Click "Upload Photos" button
3. Upload photo:
   - Click the upload area or drag-and-drop an image
   - Supported formats: PNG, JPG, GIF
   - Maximum size: 5MB
4. Fill in details:
   - **Title** (required): Photo title
   - **Caption** (optional): Photo description
   - **Tags** (optional): Comma-separated tags
5. Click "Upload Photo"

## Technical Details

### File Structure
```
/admin/
├── index.html              # Redirects to login.html
├── login.html              # Login page
├── dashboard.html          # Main dashboard
├── config.yml              # Netlify CMS config (legacy)
├── styles/
│   ├── login.css          # Login page styles
│   ├── dashboard.css      # Dashboard styles
│   └── modal.css          # Modal component styles
└── scripts/
    ├── auth.js            # Authentication module
    ├── login.js           # Login page logic
    ├── dashboard.js       # Dashboard logic
    ├── content-manager.js # Content CRUD operations
    └── modal.js           # Modal management
```

### Data Storage

Content is stored in the browser's localStorage with the following structure:

```javascript
{
  "poetry": [
    {
      "id": "unique-id",
      "title": "Poem Title",
      "author": "Author Name",
      "content": "Poem content...",
      "tags": "tag1, tag2",
      "dateCreated": "2025-12-31T00:00:00.000Z",
      "dateModified": "2025-12-31T00:00:00.000Z"
    }
  ],
  "articles": [...],
  "ebooks": [...],
  "photos": [...]
}
```

### Session Management

Sessions are stored in localStorage with:
- **Username**: Admin username
- **Timestamp**: Login time
- **Session ID**: Unique session identifier

Sessions expire after:
- 1 hour of inactivity
- Manual logout
- Browser close (optional based on "Remember me")

### Security Features

#### Password Hashing
Passwords are hashed using a simple hash function for demonstration. In production:
```javascript
// Current (demo):
hashPassword(password) // Simple hash for client-side

// Production (recommended):
bcrypt.hash(password, 10) // Server-side with bcrypt
```

#### XSS Protection
All user inputs are sanitized:
```javascript
sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
```

#### Login Attempt Limiting
- Maximum 5 failed attempts
- 15-minute lockout after max attempts
- Automatic reset after successful login

## Customization

### Changing Default Credentials

Edit `/admin/scripts/auth.js`:

```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    passwordHash: 'your-hashed-password'
};
```

Generate hash:
```javascript
auth.hashPassword('your-new-password').then(console.log);
```

### Styling

All styles use CSS variables for easy theming. Edit the `:root` section in CSS files:

```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --error-color: #ef4444;
    /* ... more variables */
}
```

### Session Timeout

Change session timeout in `/admin/scripts/auth.js`:

```javascript
const AUTH_CONFIG = {
    SESSION_TIMEOUT: 3600000, // Change this (in milliseconds)
    // ...
};
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight**: No external dependencies
- **Fast**: Pure JavaScript, no build process
- **Efficient**: Optimized animations and transitions
- **Responsive**: Instant feedback on all actions

## Production Considerations

### Security Enhancements
1. **Move to Server-Side Authentication**: Implement proper backend authentication
2. **Use HTTPS**: Always serve over secure connection
3. **Database Storage**: Replace localStorage with proper database
4. **API Rate Limiting**: Implement server-side rate limiting
5. **CSRF Tokens**: Add CSRF protection for all forms
6. **Content Security Policy**: Implement CSP headers

### Recommended Stack for Production
- **Backend**: Node.js/Express, Python/Django, or PHP/Laravel
- **Database**: PostgreSQL, MySQL, or MongoDB
- **Authentication**: JWT tokens or session cookies
- **File Storage**: AWS S3, Cloudinary, or similar
- **Hashing**: bcrypt or Argon2

## Troubleshooting

### Cannot Login
- Check credentials: `admin` / `admin123`
- Clear browser localStorage
- Check browser console for errors
- Ensure JavaScript is enabled

### Session Expires Too Quickly
- Check AUTH_CONFIG.SESSION_TIMEOUT setting
- Check for browser localStorage restrictions
- Try "Remember me" option

### Photos Not Uploading
- Check file size (max 5MB)
- Use supported formats: PNG, JPG, GIF
- Check browser localStorage quota
- Try clearing old data

### Data Lost After Refresh
- Check browser localStorage support
- Check storage quota
- Verify data is being saved (check browser console)

## Support

For issues or questions:
1. Check browser console for errors
2. Review this documentation
3. Contact system administrator

## Changelog

### Version 1.0.0 (2025-12-31)
- Initial release
- Complete authentication system
- Full content management for poetry, articles, eBooks, photos
- Responsive design
- Security features: XSS protection, login limiting, session management

## License

This admin panel is part of the byprasiddha website project.
