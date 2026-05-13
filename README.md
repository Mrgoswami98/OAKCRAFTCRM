# 🏢 Oakcraft CRM - Advanced Sales Pipeline Management

A comprehensive, enterprise-grade Sales CRM system designed specifically for **Oakcraft Furniture Manufacturing**. Built with modern web technologies, advanced automation, and seamless integrations.

## 🎯 Features

### Core Features
- ✅ **6-Stage Sales Pipeline** - Enquiry → Quotation → Order → Production → QC → Dispatch
- ✅ **Lead Management** - Create, assign, and track all leads
- ✅ **Employee Management** - Add/remove employees with role-based access
- ✅ **Automated Password Generation** - Security-focused format (e.g., OakANK@5654)
- ✅ **Email Automation** - Auto-send credentials and notifications
- ✅ **Role-Based Access Control** - Admin, Manager, Sales Rep, Production, QC roles
- ✅ **Advanced Dashboards** - Real-time metrics and analytics
- ✅ **Pipeline Customization** - Customize stages as per your process

### Advanced Features
- 📊 **Analytics & Reporting** - Revenue trends, conversion rates, employee performance
- 🔗 **Multi-Platform Integration** - WhatsApp, IndiaMART, Justdial, Meta, Google
- 📧 **Email Notifications** - Lead assignments, status updates, reminders
- 🎨 **Beautiful UI** - Wooden theme, fully animated, responsive design
- 🔐 **JWT Authentication** - Secure token-based authentication
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## 🏗️ Architecture

```
Oakcraft CRM
├── Frontend
│   ├── HTML5 / CSS3 / JavaScript
│   ├── Chart.js for analytics
│   ├── Three.js for 3D animations
│   └── localStorage for session management
├── Backend
│   ├── Node.js / Express.js
│   ├── MongoDB (NoSQL)
│   ├── JWT Authentication
│   └── Nodemailer for emails
├── Database
│   ├── Users
│   ├── Leads
│   ├── Activities
│   ├── Email Templates
│   └── Integrations
└── External Integrations
    ├── Email (Gmail/SMTP)
    ├── WhatsApp Business API
    ├── IndiaMART API
    ├── Justdial API
    ├── Meta (Facebook/Instagram)
    └── Google Leads API
```

## 📋 Project Structure

```
oakcraft-crm/
├── oakcraft-crm-frontend.html     # Complete frontend (Single HTML file)
├── server.js                       # Node.js/Express backend
├── package.json                    # Dependencies
├── .env.example                    # Environment configuration
├── README.md                       # This file
├── routes/
│   ├── auth.js                    # Authentication routes
│   ├── users.js                   # User management
│   ├── leads.js                   # Lead management
│   ├── dashboard.js               # Analytics
│   └── integrations.js            # Third-party integrations
├── models/
│   ├── User.js                    # User schema
│   ├── Lead.js                    # Lead schema
│   ├── Activity.js                # Activity log schema
│   ├── EmailTemplate.js           # Email template schema
│   └── Integration.js             # Integration schema
├── middleware/
│   ├── auth.js                    # JWT verification
│   ├── authorization.js           # Role-based access
│   └── errorHandler.js            # Error handling
├── services/
│   ├── emailService.js            # Email sending
│   ├── passwordGenerator.js       # Password generation
│   ├── integrationService.js      # Integration management
│   └── analyticsService.js        # Analytics
├── templates/
│   └── emails/
│       ├── newUser.html           # New user template
│       ├── leadAssigned.html      # Lead assignment template
│       ├── quotationSent.html     # Quotation template
│       └── stageChange.html       # Stage change template
├── public/
│   └── styles.css                 # Additional styling
└── logs/                          # Application logs
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account (for email notifications)

### Step 1: Clone/Download Project
```bash
git clone <repository-url>
cd oakcraft-crm
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/oakcraft-crm
JWT_SECRET=your-secure-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
COMPANY_NAME=Oakcraft Furniture
COMPANY_EMAIL=crm@oakcraft.in
```

### Step 4: Setup Database
```bash
# Option 1: With MongoDB locally
mongod

# Option 2: With MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### Step 5: Seed Initial Data
```bash
npm run seed-db
```

### Step 6: Start Server
```bash
npm start        # Production
npm run dev      # Development (with auto-reload)
```

Server will start on `http://localhost:5000`

### Step 7: Open Frontend
Open `oakcraft-crm-frontend.html` in your browser

**Demo Credentials:**
- Username: `admin` | Password: `admin123`
- Username: `sales_manager` | Password: `sales123`

## 🔐 Authentication & Authorization

### User Roles & Permissions

| Role | Permissions |
|------|------------|
| **Admin** | Full access to all features, user management, settings |
| **Manager** | Create/assign leads, view team performance, manage reports |
| **Sales Rep** | View assigned leads, update lead stages, view own performance |
| **Production** | View orders in production stage, update production status |
| **QC Officer** | View QC stage leads, approve/reject, mark for dispatch |

### Password Generation Format
- **Format:** `{PREFIX}{INITIALS}@{UNIQUE_NUMBER}`
- **Example:** `OakANK@5654` (for Ankush Goswami)
- **Configurable:** Change prefix in settings

## 📊 Sales Pipeline Stages

1. **Enquiry** - New lead inquiry received
2. **Quotation** - Quote sent to customer
3. **Order** - Order confirmed and received
4. **Production** - Manufacturing in progress
5. **Quality Check** - QC inspection stage
6. **Dispatch** - Ready for/completed dispatch

**All stages are customizable** through the CRM interface.

## 📧 Email Automation

### Triggered Emails

| Trigger | Recipient | Content |
|---------|-----------|---------|
| **New User Created** | New Employee | Login credentials & instructions |
| **Lead Assigned** | Assigned Sales Rep | Lead details & contact info |
| **Lead Stage Change** | Assigned User | Notification of stage transition |
| **Quotation Sent** | Customer | Quote details & terms |

### Email Configuration (Gmail)

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Generate app-specific password
4. Add to `.env` as `EMAIL_PASSWORD`

## 🔗 Integration Setup

### WhatsApp Integration
```bash
# Setup WhatsApp Business API
API_ENDPOINT=https://graph.instagram.com/v14.0/me/messages
API_KEY=your-whatsapp-business-api-token
```

### IndiaMART Integration
```bash
# Setup IndiaMART Lead Fetcher
API_ENDPOINT=https://api.indiamart.com/
API_KEY=your-indiamart-api-key
SYNC_FREQUENCY=3600 # seconds
```

### Justdial Integration
```bash
# Setup Justdial Lead Import
API_ENDPOINT=https://api.justdial.com/
API_KEY=your-justdial-api-key
```

### Meta (Facebook/Instagram) Integration
```bash
# Setup Meta Business API
APP_ID=your-meta-app-id
APP_SECRET=your-meta-app-secret
```

### Google Leads Integration
```bash
# Setup Google Business Profile
API_KEY=your-google-api-key
SEARCH_LIMIT=50
```

## 📡 API Documentation

### Authentication

```bash
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Users

```bash
# Get all users
GET /api/users
Headers: { Authorization: "Bearer {token}" }

# Create user
POST /api/users
{
  "name": "John Doe",
  "email": "john@oakcraft.in",
  "mobile": "9999999999",
  "role": "sales_rep",
  "reportsTo": "admin_id"
}

# Update user
PUT /api/users/{id}

# Delete (deactivate) user
DELETE /api/users/{id}
```

### Leads

```bash
# Get all leads
GET /api/leads
GET /api/leads?stage=enquiry

# Get lead by ID
GET /api/leads/{id}

# Create lead
POST /api/leads
{
  "name": "ABC Corporation",
  "company": "ABC Corp",
  "email": "contact@abc.com",
  "phone": "9876543210",
  "stage": "enquiry",
  "assignedTo": "user_id",
  "amount": 50000,
  "leadSource": "indiamart"
}

# Update lead
PUT /api/leads/{id}
{
  "stage": "quotation",
  "assignedTo": "user_id"
}

# Delete lead
DELETE /api/leads/{id}
```

### Dashboard

```bash
# Get dashboard metrics
GET /api/dashboard/metrics

Response:
{
  "totalLeads": 24,
  "enquiries": 8,
  "orders": 5,
  "production": 7,
  "dispatched": 4,
  "totalRevenue": 3500000
}

# Get sales by employee
GET /api/dashboard/sales-by-employee

# Monthly revenue report
GET /api/reports/monthly-revenue

# Conversion rate report
GET /api/reports/conversion-rate
```

## 📊 Dashboard Metrics

The CRM provides real-time analytics:

- **Total Enquiries** - Count of leads in Enquiry & Quotation stages
- **Active Orders** - Orders in Order & Production stages
- **In Production** - Count of leads in Production stage
- **Pending QC** - Leads waiting for quality check
- **Revenue Trends** - Monthly revenue visualization
- **Conversion Rates** - Sales funnel conversion analysis
- **Employee Performance** - Sales and productivity metrics
- **Pipeline Health** - Average days in each stage

## 🎨 UI/UX Features

### Frontend
- **Wooden Color Theme** - Warm, professional wooden palette
- **3D Animated Login** - Three.js 3D cube animation
- **Responsive Design** - Mobile, tablet, desktop compatible
- **Interactive Charts** - Chart.js for beautiful data visualization
- **Smooth Animations** - CSS animations throughout interface
- **Drag-and-drop** - Pipeline cards (ready to implement)
- **Dark/Light modes** - (Future enhancement)

### User Experience
- **Intuitive Navigation** - Clear menu structure
- **Quick Actions** - One-click lead assignment, stage updates
- **Search & Filter** - Fast lead and employee search
- **Modal Dialogs** - Smooth add/edit workflows
- **Toast Notifications** - User feedback messages
- **Real-time Updates** - Dashboard metrics update on action

## 🔒 Security Features

- **JWT Authentication** - Secure token-based login
- **Password Hashing** - bcryptjs encryption
- **Role-Based Access Control** - Endpoint authorization
- **Input Validation** - Express-validator
- **CORS Protection** - Cross-origin request handling
- **Helmet.js** - Security headers (HTTP parameter pollution, XSS protection)
- **Environment Secrets** - .env configuration for sensitive data

## 📝 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  name: String,
  email: String (unique),
  mobile: String,
  role: String (admin|manager|sales_rep|production|qc),
  reportsTo: ObjectId (reference to User),
  status: String (active|inactive),
  createdAt: Date,
  lastLogin: Date
}
```

### Leads Collection
```javascript
{
  _id: ObjectId,
  name: String,
  company: String,
  email: String,
  phone: String,
  stage: String (enquiry|quotation|order|production|qc|dispatch),
  assignedTo: ObjectId (reference to User),
  amount: Number,
  leadSource: String (indiamart|justdial|direct|referral|website|phone),
  notes: String,
  expectedDelivery: Date,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (reference to User)
}
```

### Activity Log Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (reference to User),
  action: String,
  entityType: String (lead|user|pipeline),
  entityId: ObjectId,
  description: String,
  timestamp: Date
}
```

## 🚢 Deployment

### Deploy to Heroku
```bash
heroku login
heroku create oakcraft-crm
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Deploy to AWS
1. Create EC2 instance (Ubuntu)
2. Install Node.js and MongoDB
3. Clone repository
4. Configure environment
5. Use PM2 for process management
6. Setup Nginx reverse proxy

### Deploy to Azure
```bash
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name oakcraft-crm
az webapp deployment source config-zip --resource-group myResourceGroup --name oakcraft-crm --src dist.zip
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB is running: mongod
Verify MONGODB_URI in .env
```

### Email Not Sending
```
Enable "Less secure app access" in Gmail settings
OR use app-specific password from myaccount.google.com/apppasswords
```

### Port Already in Use
```
Change PORT in .env or kill process: lsof -ti:5000 | xargs kill -9
```

### CORS Error
```
Check CORS configuration in server.js
Verify Frontend URL in .env
```

## 📞 Support & Contact

- **Email:** support@oakcraft.in
- **Phone:** +91-XXXXXXXXXX
- **Website:** www.oakcraft.in
- **Documentation:** See API docs above

## 📄 License

MIT License - © 2026 Oakcraft Furniture. All rights reserved.

## 🙏 Acknowledgments

Built with ❤️ using:
- Express.js
- MongoDB
- Chart.js
- Three.js
- Nodemailer
- JWT

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
