# 🚀 Oakcraft CRM - Installation & Setup Guide

Complete step-by-step guide to get your Oakcraft CRM running in minutes!

## ⚙️ System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: v4.4.0 or higher (Local or Atlas)
- **RAM**: Minimum 2GB
- **Storage**: Minimum 500MB
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)

## 🔧 Installation Steps

### Step 1: Install Node.js and npm

#### Windows
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
```bash
node --version
npm --version
```

#### macOS
```bash
brew install node
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

### Step 2: Install & Setup MongoDB

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run installer and follow setup wizard
3. MongoDB will start as a service
4. Verify: `mongod --version`

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64,arm64] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse"
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a new project
4. Create a cluster (M0 tier is free)
5. Create database user with credentials
6. Get connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/database`)
7. Add this to `.env` file

### Step 3: Project Setup

#### Clone/Download Files
```bash
# Create a directory
mkdir oakcraft-crm
cd oakcraft-crm

# Download all files to this directory:
# - oakcraft-crm-frontend.html
# - server.js
# - package.json
# - .env.example
# - README.md
# - INSTALLATION_GUIDE.md
# - scripts-seedDatabase.js
```

#### Install Dependencies
```bash
npm install
```

This will install:
- ✅ Express.js (Web framework)
- ✅ MongoDB & Mongoose (Database)
- ✅ JWT (Authentication)
- ✅ Nodemailer (Email)
- ✅ CORS (Security)
- ✅ bcryptjs (Password hashing)

### Step 4: Environment Configuration

#### Create .env file
```bash
cp .env.example .env
```

#### Edit .env with Your Details

**Minimum Configuration:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/oakcraft-crm

# Or if using MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oakcraft-crm

# JWT
JWT_SECRET=your-super-secret-key-change-this

# Email (Optional - for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Company Info
COMPANY_NAME=Oakcraft Furniture
COMPANY_EMAIL=crm@oakcraft.in
PORT=5000
```

**Complete Configuration:**
See `.env.example` for all available options.

### Step 5: Setup Email Notifications (Gmail)

To enable automated email notifications:

1. **Enable 2-Factor Authentication in Gmail:**
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the generated password

3. **Add to .env:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=paste-your-app-password-here
   ```

### Step 6: Initialize Database

Populate with sample data:

```bash
npm run seed-db
```

This will:
- ✅ Create sample users (Admin, Manager, Sales Reps)
- ✅ Create sample leads in different pipeline stages
- ✅ Setup initial data for testing

**Sample Users Created:**
```
Admin:
  Username: admin
  Password: admin123
  Email: admin@oakcraft.in

Manager:
  Username: rajesh_kumar
  Password: sales123
  Email: rajesh@oakcraft.in

Sales Rep 1:
  Username: priya_singh
  Password: rep123
  Email: priya@oakcraft.in

Sales Rep 2:
  Username: vikram_patel
  Password: rep123
  Email: vikram@oakcraft.in
```

### Step 7: Start the Server

```bash
npm start
```

You should see:
```
🚀 Oakcraft CRM Server running on port 5000
📧 Email notifications enabled
🔐 JWT authentication active
```

## 🌐 Accessing the Application

### Frontend
1. Open `oakcraft-crm-frontend.html` in your browser
   - Use File → Open or
   - Right-click → Open with Browser

2. Login with demo credentials:
   - Username: `admin`
   - Password: `admin123`

### Backend API
- Base URL: `http://localhost:5000`
- Test API: `http://localhost:5000/api/users` (requires auth header)

### MongoDB
```bash
# Access MongoDB shell
mongosh

# Switch to database
use oakcraft-crm

# View collections
show collections

# View sample data
db.users.find()
db.leads.find()
```

## 🔗 API Testing with Postman

1. **Download Postman** from [postman.com](https://www.postman.com/downloads/)

2. **Create New Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

3. **Copy Token** from response

4. **Use Token** in other requests:
   - Header: `Authorization: Bearer {token}`

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
```bash
# Fix: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: "MongoDB connection refused"
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB:
# Windows: Services → MongoDB Server → Start
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"
```bash
# Option 1: Change PORT in .env
PORT=5001

# Option 2: Kill process using port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: "Email not sending"
```bash
# 1. Check EMAIL_USER and EMAIL_PASSWORD in .env
# 2. Verify Gmail app password is correct
# 3. Check Gmail 2FA is enabled
# 4. Check SMTP settings
```

### Issue: "CORS error when opening HTML file"
```
This is normal for local file:// protocol.
Options:
1. Use Live Server extension in VS Code
2. Run simple HTTP server:
   python -m http.server 8000
3. Then open: http://localhost:8000/oakcraft-crm-frontend.html
```

### Issue: "MongoDB Atlas connection timeout"
```
1. Check connection string in .env
2. Add your IP to MongoDB Atlas whitelist
3. Verify credentials are correct
4. Check network connectivity
```

## 📝 File Structure After Setup

```
oakcraft-crm/
├── oakcraft-crm-frontend.html      # Frontend interface
├── server.js                        # Backend server
├── package.json                     # Dependencies
├── package-lock.json                # Dependency lock file
├── .env                             # Configuration (CREATED)
├── .env.example                     # Configuration template
├── node_modules/                    # Dependencies (CREATED)
├── README.md                        # Documentation
├── INSTALLATION_GUIDE.md            # This file
└── scripts-seedDatabase.js          # Database setup
```

## 🚀 Running in Development Mode

For development with auto-reload:

```bash
npm run dev
```

This uses `nodemon` to automatically restart server on file changes.

## 🔐 Security Checklist

Before production deployment:

- [ ] Change `JWT_SECRET` in .env to a strong random value
- [ ] Set `NODE_ENV=production` in .env
- [ ] Update `COMPANY_EMAIL` and email credentials
- [ ] Change demo user passwords
- [ ] Enable HTTPS/SSL certificate
- [ ] Setup firewall rules
- [ ] Regular database backups
- [ ] Monitor error logs
- [ ] Update all dependencies: `npm update`

## 📊 Next Steps

1. **Customize Pipeline:**
   - Go to Pipeline page
   - Click "Customize Stages"
   - Adjust stages for your workflow

2. **Add Your Team:**
   - Go to Employees page
   - Click "+ Add Employee"
   - Add your team members

3. **Setup Integrations:**
   - Go to Integrations page
   - Connect WhatsApp, IndiaMART, etc.
   - Configure API keys

4. **Configure Email:**
   - Go to Settings
   - Add your email configuration
   - Test email notifications

5. **Create Your First Lead:**
   - Go to Leads page
   - Click "+ Add Lead"
   - Start managing your sales pipeline

## 📞 Support

- **Documentation:** See README.md
- **API Docs:** See README.md → API Documentation
- **Troubleshooting:** This guide → Troubleshooting section

## 🎓 Learning Resources

- **Express.js:** [expressjs.com](https://expressjs.com/)
- **MongoDB:** [mongodb.com/docs](https://docs.mongodb.com/)
- **Node.js:** [nodejs.org/en/docs](https://nodejs.org/en/docs/)
- **JWT:** [jwt.io](https://jwt.io/)

## ✅ Verification Checklist

After installation, verify:

- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] MongoDB running and accessible
- [ ] .env file created with correct values
- [ ] Dependencies installed: `npm install` completed
- [ ] Database seeded: `npm run seed-db` completed
- [ ] Server running: `npm start` shows success message
- [ ] Frontend accessible: HTML file opens in browser
- [ ] Login works: Can login with admin/admin123
- [ ] Dashboard loads: Can see metrics and charts

## 🎉 You're Ready!

Your Oakcraft CRM is now fully functional!

**Next:** Login to the frontend and start managing your sales pipeline.

---

**Need Help?**
- Check troubleshooting section above
- Review the README.md file
- Check console for error messages
- Review .env configuration

**Version:** 1.0.0  
**Last Updated:** May 2026
