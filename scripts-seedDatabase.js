// ==================== DATABASE SEEDING SCRIPT ====================
// Populates MongoDB with sample data for testing

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oakcraft-crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
    seedDatabase();
}).catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
});

// Define Schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    mobile: String,
    role: String,
    reportsTo: mongoose.Schema.Types.ObjectId,
    status: String,
    createdAt: Date,
    lastLogin: Date
});

const leadSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    stage: String,
    assignedTo: mongoose.Schema.Types.ObjectId,
    amount: Number,
    leadSource: String,
    notes: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: mongoose.Schema.Types.ObjectId
});

const User = mongoose.model('User', userSchema);
const Lead = mongoose.model('Lead', leadSchema);

async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Lead.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create users
        const adminPassword = await bcrypt.hash('admin123', 10);
        const salesPassword = await bcrypt.hash('sales123', 10);
        const repPassword = await bcrypt.hash('rep123', 10);

        const admin = await User.create({
            username: 'admin',
            password: adminPassword,
            name: 'Admin User',
            email: 'admin@oakcraft.in',
            mobile: '9999999999',
            role: 'admin',
            reportsTo: null,
            status: 'active',
            createdAt: new Date()
        });

        const manager = await User.create({
            username: 'rajesh_kumar',
            password: salesPassword,
            name: 'Rajesh Kumar',
            email: 'rajesh@oakcraft.in',
            mobile: '9876543210',
            role: 'manager',
            reportsTo: admin._id,
            status: 'active',
            createdAt: new Date()
        });

        const rep1 = await User.create({
            username: 'priya_singh',
            password: repPassword,
            name: 'Priya Singh',
            email: 'priya@oakcraft.in',
            mobile: '9999888877',
            role: 'sales_rep',
            reportsTo: manager._id,
            status: 'active',
            createdAt: new Date()
        });

        const rep2 = await User.create({
            username: 'vikram_patel',
            password: repPassword,
            name: 'Vikram Patel',
            email: 'vikram@oakcraft.in',
            mobile: '9999777766',
            role: 'sales_rep',
            reportsTo: manager._id,
            status: 'active',
            createdAt: new Date()
        });

        console.log('✅ Created 4 users');

        // Create leads
        const leads = [
            {
                name: 'ABC Corporation',
                company: 'ABC Corp Ltd',
                email: 'contact@abccorp.com',
                phone: '9876543210',
                stage: 'enquiry',
                assignedTo: rep1._id,
                amount: 50000,
                leadSource: 'indiamart',
                notes: 'Interested in office furniture',
                createdAt: new Date('2026-05-01'),
                updatedAt: new Date('2026-05-01'),
                createdBy: manager._id
            },
            {
                name: 'XYZ Industries',
                company: 'XYZ Industries Ltd',
                email: 'info@xyz.com',
                phone: '9876543211',
                stage: 'quotation',
                assignedTo: rep1._id,
                amount: 75000,
                leadSource: 'justdial',
                notes: 'Quote sent on 2026-04-28',
                createdAt: new Date('2026-04-28'),
                updatedAt: new Date('2026-04-28'),
                createdBy: manager._id
            },
            {
                name: 'PQR Enterprises',
                company: 'PQR Pvt Ltd',
                email: 'business@pqr.com',
                phone: '9876543212',
                stage: 'order',
                assignedTo: rep2._id,
                amount: 120000,
                leadSource: 'direct',
                notes: 'Order confirmed - custom design',
                createdAt: new Date('2026-04-25'),
                updatedAt: new Date('2026-04-25'),
                createdBy: manager._id
            },
            {
                name: 'LMN Retailers',
                company: 'LMN Retail Chain',
                email: 'sales@lmn.in',
                phone: '9876543213',
                stage: 'production',
                assignedTo: rep2._id,
                amount: 95000,
                leadSource: 'referral',
                notes: 'In production - expected 10 days',
                createdAt: new Date('2026-04-20'),
                updatedAt: new Date('2026-04-20'),
                createdBy: manager._id
            },
            {
                name: 'DEF Trading',
                company: 'DEF Trading Co',
                email: 'contact@deftrading.com',
                phone: '9876543214',
                stage: 'qc',
                assignedTo: rep1._id,
                amount: 65000,
                leadSource: 'website',
                notes: 'In QC - final inspection',
                createdAt: new Date('2026-04-15'),
                updatedAt: new Date('2026-04-15'),
                createdBy: manager._id
            },
            {
                name: 'GHI Furnishers',
                company: 'GHI Furnishers Ltd',
                email: 'info@ghifurnishers.com',
                phone: '9876543215',
                stage: 'dispatch',
                assignedTo: rep2._id,
                amount: 85000,
                leadSource: 'indiamart',
                notes: 'Ready for dispatch',
                createdAt: new Date('2026-04-10'),
                updatedAt: new Date('2026-04-10'),
                createdBy: manager._id
            },
            {
                name: 'JKL Enterprises',
                company: 'JKL Enterprises',
                email: 'contact@jklent.com',
                phone: '9876543216',
                stage: 'enquiry',
                assignedTo: rep1._id,
                amount: 45000,
                leadSource: 'phone',
                notes: 'Inquiry for office seating',
                createdAt: new Date('2026-05-05'),
                updatedAt: new Date('2026-05-05'),
                createdBy: manager._id
            },
            {
                name: 'MNO Corporates',
                company: 'MNO Corporate Solutions',
                email: 'procurement@mnogroup.com',
                phone: '9876543217',
                stage: 'quotation',
                assignedTo: rep2._id,
                amount: 150000,
                leadSource: 'referral',
                notes: 'Large order - pending approval',
                createdAt: new Date('2026-05-03'),
                updatedAt: new Date('2026-05-03'),
                createdBy: manager._id
            }
        ];

        await Lead.insertMany(leads);
        console.log('✅ Created 8 sample leads');

        console.log('\n📊 Database seeded successfully!');
        console.log('\n📋 Sample Login Credentials:');
        console.log('   Admin:    username: admin, password: admin123');
        console.log('   Manager:  username: rajesh_kumar, password: sales123');
        console.log('   Sales Rep: username: priya_singh, password: rep123');

        mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
