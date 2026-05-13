// ==================== OAKCRAFT CRM - BACKEND ====================
// Technology: Node.js + Express + MongoDB + JWT
// Author: Oakcraft Furniture
// Created: 2026-05-13

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ==================== DATABASE CONNECTION ====================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oakcraft-crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Database connection error:', err));

// ==================== DATABASE SCHEMAS ====================

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'sales_rep', 'production', 'qc'], required: true },
    reportsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: null }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Lead Schema
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    stage: {
        type: String,
        enum: ['enquiry', 'quotation', 'order', 'production', 'qc', 'dispatch'],
        default: 'enquiry'
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, default: 0 },
    leadSource: { type: String, enum: ['indiamart', 'justdial', 'direct', 'referral', 'website', 'phone'], default: 'direct' },
    notes: { type: String, default: '' },
    expectedDelivery: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Activity Log Schema
const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    entityType: { type: String, enum: ['lead', 'user', 'pipeline'], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    description: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// Email Template Schema
const emailTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    triggerEvent: { type: String, enum: ['lead_assigned', 'new_user', 'lead_stage_change', 'quotation_sent'], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Integration Schema
const integrationSchema = new mongoose.Schema({
    platform: { type: String, enum: ['whatsapp', 'indiamart', 'justdial', 'meta', 'google'], required: true },
    isConnected: { type: Boolean, default: false },
    apiKey: { type: String, encrypted: true },
    lastSyncAt: { type: Date, default: null },
    syncFrequency: { type: Number, default: 3600 }, // seconds
    settings: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Lead = mongoose.model('Lead', leadSchema);
const Activity = mongoose.model('Activity', activitySchema);
const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);
const Integration = mongoose.model('Integration', integrationSchema);

// ==================== EMAIL SERVICE ====================
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail(to, subject, html) {
    try {
        await transporter.sendMail({
            from: 'crm@oakcraft.in',
            to,
            subject,
            html
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// ==================== PASSWORD GENERATOR ====================
function generatePassword(firstName, lastName) {
    const initials = firstName.charAt(0) + lastName.charAt(0);
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `Oak${initials.toUpperCase()}@${randomNum}`;
}

// ==================== JWT AUTHENTICATION ====================
const SECRET_KEY = process.env.JWT_SECRET || 'oak-craft-secret-key-2026';

function generateToken(user) {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: '24h' }
    );
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// ==================== ROLE AUTHORIZATION ====================
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    };
}

// ==================== ROUTES ====================

// ==================== AUTHENTICATION ====================

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'User account is inactive' });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== USER MANAGEMENT ====================

// Get all users
app.get('/api/users', verifyToken, authorize('admin', 'manager'), async (req, res) => {
    try {
        const users = await User.find({ status: 'active' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
app.get('/api/users/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new user
app.post('/api/users', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const { name, email, mobile, role, reportsTo } = req.body;
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ') || firstName;

        const username = firstName.charAt(0).toLowerCase() + lastName.toLowerCase();
        const password = generatePassword(firstName, lastName);

        const user = new User({
            username,
            password,
            name,
            email,
            mobile,
            role,
            reportsTo
        });

        await user.save();

        // Send email with credentials
        await sendEmail(
            email,
            'Welcome to Oakcraft CRM',
            `<h2>Account Created</h2>
             <p>Hello ${name},</p>
             <p>Your account has been created in Oakcraft CRM.</p>
             <p><strong>Username:</strong> ${username}</p>
             <p><strong>Password:</strong> ${password}</p>
             <p>Please login and change your password immediately.</p>`
        );

        // Log activity
        new Activity({
            user: req.user.id,
            action: 'USER_CREATED',
            entityType: 'user',
            entityId: user._id,
            description: `User ${name} created with role ${role}`
        }).save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user
app.put('/api/users/:id', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete (deactivate) user
app.delete('/api/users/:id', verifyToken, authorize('admin'), async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { status: 'inactive' });

        new Activity({
            user: req.user.id,
            action: 'USER_DELETED',
            entityType: 'user',
            entityId: req.params.id
        }).save();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== LEAD MANAGEMENT ====================

// Get all leads
app.get('/api/leads', verifyToken, async (req, res) => {
    try {
        let query = Lead.find();

        // Filter by assigned user if not admin/manager
        if (req.user.role === 'sales_rep') {
            query = query.find({ assignedTo: req.user.id });
        }

        // Filter by stage if provided
        if (req.query.stage) {
            query = query.find({ stage: req.query.stage });
        }

        const leads = await query.populate('assignedTo', 'name email').populate('createdBy', 'name');
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get lead by ID
app.get('/api/leads/:id', verifyToken, async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name');
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create lead
app.post('/api/leads', verifyToken, authorize('admin', 'manager', 'sales_rep'), async (req, res) => {
    try {
        const { name, company, email, phone, stage, assignedTo, amount, leadSource } = req.body;

        const lead = new Lead({
            name,
            company,
            email,
            phone,
            stage: stage || 'enquiry',
            assignedTo,
            amount,
            leadSource: leadSource || 'direct',
            createdBy: req.user.id
        });

        await lead.save();

        // Send assignment email
        const assignedUser = await User.findById(assignedTo);
        if (assignedUser) {
            await sendEmail(
                assignedUser.email,
                `New Lead Assigned: ${name}`,
                `<h2>New Lead Assignment</h2>
                 <p>You have been assigned a new lead:</p>
                 <p><strong>Company:</strong> ${company}</p>
                 <p><strong>Contact:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Amount:</strong> ₹${amount}</p>`
            );
        }

        // Log activity
        new Activity({
            user: req.user.id,
            action: 'LEAD_CREATED',
            entityType: 'lead',
            entityId: lead._id,
            description: `Lead ${name} from ${company} created`
        }).save();

        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update lead
app.put('/api/leads/:id', verifyToken, async (req, res) => {
    try {
        const { stage, notes, expectedDelivery, assignedTo } = req.body;

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            {
                stage,
                notes,
                expectedDelivery,
                assignedTo,
                updatedAt: new Date()
            },
            { new: true }
        );

        // Log activity
        new Activity({
            user: req.user.id,
            action: 'LEAD_UPDATED',
            entityType: 'lead',
            entityId: lead._id,
            description: `Lead ${lead.name} updated. New stage: ${stage}`
        }).save();

        // Send stage change notification email
        if (stage) {
            const assignedUser = await User.findById(lead.assignedTo);
            if (assignedUser) {
                await sendEmail(
                    assignedUser.email,
                    `Lead Stage Changed: ${lead.name}`,
                    `<h2>Lead Status Update</h2>
                     <p>Lead <strong>${lead.name}</strong> has been moved to <strong>${stage}</strong> stage.</p>`
                );
            }
        }

        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete lead
app.delete('/api/leads/:id', verifyToken, authorize('admin', 'manager'), async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);

        new Activity({
            user: req.user.id,
            action: 'LEAD_DELETED',
            entityType: 'lead',
            entityId: req.params.id
        }).save();

        res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== DASHBOARD ANALYTICS ====================

// Get dashboard metrics
app.get('/api/dashboard/metrics', verifyToken, async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const enquiries = await Lead.countDocuments({ stage: 'enquiry' });
        const orders = await Lead.countDocuments({ stage: 'order' });
        const production = await Lead.countDocuments({ stage: 'production' });
        const dispatched = await Lead.countDocuments({ stage: 'dispatch' });

        const totalRevenue = await Lead.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const pipelineBreakdown = await Lead.aggregate([
            { $group: { _id: '$stage', count: { $sum: 1 } } }
        ]);

        res.json({
            totalLeads,
            enquiries,
            orders,
            production,
            dispatched,
            totalRevenue: totalRevenue[0]?.total || 0,
            pipelineBreakdown
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get sales by employee
app.get('/api/dashboard/sales-by-employee', verifyToken, async (req, res) => {
    try {
        const salesData = await Lead.aggregate([
            { $match: { stage: 'dispatch' } },
            { $group: { _id: '$assignedTo', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } }
        ]);

        res.json(salesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== INTEGRATIONS ====================

// Get all integrations
app.get('/api/integrations', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const integrations = await Integration.find();
        res.json(integrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connect integration
app.post('/api/integrations/:platform/connect', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const { apiKey, settings } = req.body;

        let integration = await Integration.findOne({ platform: req.params.platform });

        if (integration) {
            integration.isConnected = true;
            integration.apiKey = apiKey;
            integration.settings = settings;
            integration.lastSyncAt = new Date();
        } else {
            integration = new Integration({
                platform: req.params.platform,
                isConnected: true,
                apiKey,
                settings
            });
        }

        await integration.save();

        res.json({ message: `${req.params.platform} integration connected successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ACTIVITY LOG ====================

// Get activity logs
app.get('/api/activities', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const activities = await Activity.find()
            .populate('user', 'name email')
            .sort({ timestamp: -1 })
            .limit(100);
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== REPORTS ====================

// Monthly revenue report
app.get('/api/reports/monthly-revenue', verifyToken, async (req, res) => {
    try {
        const data = await Lead.aggregate([
            { $match: { stage: 'dispatch' } },
            {
                $group: {
                    _id: {
                        year: { $year: '$updatedAt' },
                        month: { $month: '$updatedAt' }
                    },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Conversion rate report
app.get('/api/reports/conversion-rate', verifyToken, async (req, res) => {
    try {
        const total = await Lead.countDocuments();
        const converted = await Lead.countDocuments({ stage: 'dispatch' });
        const rate = total > 0 ? ((converted / total) * 100).toFixed(2) : 0;

        res.json({
            total,
            converted,
            rate: `${rate}%`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Oakcraft CRM Server running on port ${PORT}`);
    console.log(`📧 Email notifications enabled`);
    console.log(`🔐 JWT authentication active`);
});
