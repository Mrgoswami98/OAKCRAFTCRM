# 🔗 Oakcraft CRM - Integration Setup Guide

Complete guide to setup and configure third-party integrations for automated lead generation and communications.

## 📋 Table of Contents
1. [WhatsApp Integration](#whatsapp-integration)
2. [IndiaMART Integration](#indiamart-integration)
3. [Justdial Integration](#justdial-integration)
4. [Meta (Facebook/Instagram) Integration](#meta-integration)
5. [Google Business Integration](#google-business-integration)
6. [Email Automation](#email-automation)

---

## 💬 WhatsApp Integration

### Purpose
Automatically send lead notifications and updates via WhatsApp Business API.

### Setup Steps

1. **Create WhatsApp Business Account**
   - Visit [business.facebook.com](https://business.facebook.com)
   - Sign in with your Facebook account
   - Go to Apps & Games → Create App

2. **Select WhatsApp as Product**
   - App Type: Business
   - App Name: Oakcraft CRM
   - App Purpose: Customer communications

3. **Get API Credentials**
   - Go to Settings → Basic
   - Copy App ID and App Secret
   - Generate Access Token

4. **Configure in CRM**

Edit `.env` file:
```env
WHATSAPP_BUSINESS_PHONE_ID=your-phone-id
WHATSAPP_API_KEY=your-whatsapp-api-token
WHATSAPP_WEBHOOK_URL=https://your-domain.com/webhooks/whatsapp
```

5. **Setup Webhook**
   - In CRM → Integrations → WhatsApp
   - Click "Configure Webhook"
   - Verify token with WhatsApp

6. **Test Connection**
```bash
curl -X GET "https://graph.instagram.com/v14.0/me?access_token=YOUR_TOKEN"
```

### Features Available
- ✅ Send lead assignment notifications
- ✅ Update customers on order status
- ✅ Send reminders and follow-ups
- ✅ Two-way messaging capability
- ✅ Media sharing (images, documents)

### Message Templates

**Lead Assignment:**
```
Hi {CustomerName},

You have been assigned a new lead from {Company}.

Details:
- Product: {ProductType}
- Budget: ₹{Amount}
- Contact: {SalesRepName}

Reply STOP to unsubscribe.
```

**Order Status Update:**
```
Hi {CustomerName},

Your order #{OrderID} is now in {Stage} stage.

Expected Delivery: {DeliveryDate}
Status: {DetailedStatus}

For questions, contact: {ContactNumber}
```

---

## 🏪 IndiaMART Integration

### Purpose
Automatically fetch leads from IndiaMART platform and import into CRM.

### Setup Steps

1. **Create IndiaMART Business Account**
   - Go to [indiamart.com/seller](https://seller.indiamart.com)
   - Register as a seller
   - Complete business verification

2. **Get API Access**
   - Go to Account Settings → API Integration
   - Click "Generate API Key"
   - Copy API Key and API Secret

3. **Configure in CRM**

Edit `.env` file:
```env
INDIAMART_API_KEY=your-api-key
INDIAMART_API_SECRET=your-api-secret
INDIAMART_SELLER_ID=your-seller-id
INDIAMART_SYNC_FREQUENCY=3600  # seconds (1 hour)
```

4. **Setup Auto-Sync**

In CRM → Settings → Integrations:
```
Platform: IndiaMART
Status: Active
Sync Frequency: Every 1 hour
Import Categories: Leads, RFQs, Inquiries
Auto-assign: Sales Rep (round-robin)
```

5. **Test Sync**
```bash
curl -X GET "https://api.indiamart.com/v2/inquiries?api_key=YOUR_KEY"
```

### Features Available
- ✅ Automatic lead import (hourly)
- ✅ RFQ (Request for Quote) capture
- ✅ Customer inquiry management
- ✅ Bulk lead import/export
- ✅ Lead source tracking

### Sync Configuration

```javascript
{
  "autoSync": true,
  "syncFrequency": 3600,
  "leadCategories": [
    "furniture",
    "office_furniture",
    "modular_furniture"
  ],
  "fieldMapping": {
    "indiamart_inquirer_name": "name",
    "indiamart_company": "company",
    "indiamart_email": "email",
    "indiamart_phone": "phone",
    "indiamart_requirement": "notes"
  },
  "autoAssign": {
    "enabled": true,
    "method": "round_robin",
    "toRole": "sales_rep"
  }
}
```

---

## 📱 Justdial Integration

### Purpose
Import leads from Justdial classified portal directly into your CRM.

### Setup Steps

1. **Justdial Business Account**
   - Visit [justdial.com/businessprofile](https://www.justdial.com/businessprofile)
   - Create or upgrade business account
   - Complete profile verification

2. **API Registration**
   - Go to Account → Integration → Justdial API
   - Apply for API access
   - Wait for approval (24-48 hours)

3. **Get Credentials**
   - API Key: Available in Integration dashboard
   - API Endpoint: `https://api.justdial.com/v1/`

4. **Configure in CRM**

Edit `.env` file:
```env
JUSTDIAL_API_KEY=your-justdial-api-key
JUSTDIAL_API_ENDPOINT=https://api.justdial.com/v1/
JUSTDIAL_BUSINESS_ID=your-business-id
JUSTDIAL_LEAD_LIMIT=50  # max leads per sync
JUSTDIAL_SYNC_FREQUENCY=1800  # 30 minutes
```

5. **Enable Integration**

In CRM → Integrations → Justdial:
- Click "Connect"
- Enter API Key
- Select lead categories
- Enable auto-sync

6. **Verify Connection**
```bash
curl -X GET "https://api.justdial.com/v1/leads" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Features Available
- ✅ Real-time lead capture
- ✅ Inquiry management
- ✅ Review management
- ✅ Category-based filtering
- ✅ Lead quality scoring

### Lead Categories
- Office Furniture
- Home Furniture
- Commercial Furniture
- Custom Furniture Design
- Furniture Dealers
- Modular Furniture

---

## 📘 Meta Integration

### Purpose
Capture leads from Facebook and Instagram, sync customer interactions, and run targeted ads.

### Setup Steps

1. **Create Meta Business Account**
   - Visit [business.facebook.com](https://business.facebook.com)
   - Sign up with business email
   - Create workspace

2. **Create Facebook App**
   - Apps → Create App
   - App Type: Business
   - App Name: Oakcraft CRM Integration
   - Add Products: Facebook Login, Lead Ads, Messaging

3. **Setup Lead Ads**
   - Facebook → Ads Manager → Lead Ads
   - Create lead form
   - Add custom fields:
     - Company Name
     - Budget Range
     - Contact Method (Phone/Email/WhatsApp)
     - Project Timeline

4. **Get API Credentials**
   - App ID: Available in App Settings
   - App Secret: Generate in Settings → Basic
   - Access Token: Generate from Business Settings

5. **Configure in CRM**

Edit `.env` file:
```env
META_APP_ID=your-app-id
META_APP_SECRET=your-app-secret
META_ACCESS_TOKEN=your-access-token
META_PAGE_ID=your-facebook-page-id
META_LEAD_FORM_ID=your-lead-form-id
META_WEBHOOK_URL=https://your-domain.com/webhooks/meta
```

6. **Setup Webhook**
```bash
curl -X POST "https://graph.instagram.com/v14.0/{PAGE_ID}/subscribed_apps" \
  -d "access_token=YOUR_TOKEN"
```

### Features Available
- ✅ Facebook Lead Ads integration
- ✅ Instagram DM management
- ✅ Messenger chatbot
- ✅ Lead form auto-import
- ✅ Audience targeting
- ✅ Ad performance tracking

### Lead Form Fields Configuration
```javascript
{
  "formId": "your_form_id",
  "fields": [
    { "id": "email", "label": "Email Address", "type": "EMAIL" },
    { "id": "phone_number", "label": "Phone Number", "type": "PHONE_NUMBER" },
    { "id": "full_name", "label": "Full Name", "type": "FULL_NAME" },
    { "id": "company_name", "label": "Company Name", "type": "TEXT" },
    { "id": "budget", "label": "Budget Range", "type": "DROPDOWN" },
    { "id": "timeline", "label": "Project Timeline", "type": "RADIO" }
  ]
}
```

---

## 🔍 Google Business Integration

### Purpose
Capture leads from Google Business Profile, manage reviews, and optimize local search visibility.

### Setup Steps

1. **Create Google Business Profile**
   - Visit [google.com/business](https://www.google.com/business/)
   - Sign in with Google account
   - Create or claim business profile
   - Verify business address and phone

2. **Get Google API Credentials**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project: "Oakcraft CRM"
   - Enable APIs:
     - Google My Business API
     - Google Leads API (if available)
     - Places API

3. **Create Service Account**
   - Go to Credentials → Create Credentials
   - Service Account
   - Download JSON key file

4. **Configure in CRM**

Edit `.env` file:
```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_API_KEY=your-api-key
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_BUSINESS_ACCOUNT_ID=your-account-id
GOOGLE_LOCATION_ID=your-location-id
GOOGLE_WEBHOOK_URL=https://your-domain.com/webhooks/google
```

5. **Setup Lead Capture Form**

Add this to your website:
```html
<form id="google-lead-form">
  <input type="text" placeholder="Your Name" required>
  <input type="email" placeholder="Your Email" required>
  <input type="tel" placeholder="Your Phone" required>
  <textarea placeholder="Your Message"></textarea>
  <button type="submit">Get Free Quote</button>
</form>

<script>
  document.getElementById('google-lead-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Auto-imported to Google My Business
    // Synced to Oakcraft CRM
  });
</script>
```

6. **Enable Lead Sync**

In CRM → Integrations → Google:
- Status: Active
- Sync Leads: Enabled
- Sync Reviews: Enabled
- Sync Q&A: Enabled

### Features Available
- ✅ Google My Business leads
- ✅ Website lead forms
- ✅ Review management
- ✅ Q&A responses
- ✅ Local search insights
- ✅ Customer messaging

---

## 📧 Email Automation

### Purpose
Automatic email notifications for leads, customers, and team members.

### Setup Steps

1. **Gmail Configuration** (Already covered in INSTALLATION_GUIDE.md)

2. **Configure Email Templates**

In CRM → Settings → Email Templates:

**Template 1: New Lead Assignment**
```
Subject: New Lead Assigned: {LeadName}

Hi {SalesRepName},

You have been assigned a new lead:

Lead Name: {LeadName}
Company: {CompanyName}
Email: {Email}
Phone: {Phone}
Estimated Budget: ₹{Amount}
Lead Source: {Source}

Next Steps:
1. Contact the lead within 24 hours
2. Schedule a meeting or call
3. Send quotation within 3 days

Best regards,
Oakcraft CRM Team
```

**Template 2: Lead Status Update**
```
Subject: Lead Status Update: {LeadName} - {NewStage}

Hi {CustomerName},

We're happy to update you on your inquiry:

Current Status: {NewStage}
Expected Next Step: {NextStep}
Assigned Representative: {RepName}
Contact: {RepPhone}

Timeline: {Timeline}

We'll keep you updated every step of the way!

Best regards,
Oakcraft Furniture Team
```

**Template 3: Quotation Sent**
```
Subject: Your Custom Furniture Quotation - {QuotationID}

Dear {CustomerName},

Thank you for your interest in Oakcraft Furniture!

We're pleased to send you a customized quotation for your project.

Quotation Details:
- Project: {ProjectName}
- Amount: ₹{QuotationAmount}
- Valid Until: {ValidDate}
- Payment Terms: {PaymentTerms}

Next Steps:
1. Review the quotation
2. Let us know if you have any questions
3. Confirm to proceed with order

Download Quotation: {QuotationLink}

Contact our sales team:
Email: {SalesEmail}
Phone: {SalesPhone}

Best regards,
Oakcraft Furniture
```

3. **Configure Email Settings**

In CRM → Settings → Email Configuration:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=crm@oakcraft.in
SMTP_PASSWORD=app-password
FROM_EMAIL=crm@oakcraft.in
FROM_NAME=Oakcraft CRM
```

4. **Enable Automated Triggers**

- [ ] Send credentials when adding new user
- [ ] Send notification when lead assigned
- [ ] Send update when lead stage changes
- [ ] Send reminder emails (configurable)
- [ ] Send monthly reports

---

## 🔐 API Rate Limits & Best Practices

| Platform | Rate Limit | Recommendation |
|----------|-----------|-----------------|
| WhatsApp | 1,000 msg/day | Sync hourly |
| IndiaMART | 1,000 req/day | Sync every 1-2 hours |
| Justdial | 500 leads/day | Sync every 30 minutes |
| Meta | 200 req/min | Sync every 15 minutes |
| Google | 100 req/day | Sync hourly |

## ⚠️ Important Security Notes

1. **Never commit API keys** - Keep in `.env` file
2. **Use environment variables** - Don't hardcode credentials
3. **Rotate API keys regularly** - Change every 90 days
4. **Monitor API usage** - Check for unusual activity
5. **Use HTTPS webhooks** - Encrypt all data in transit
6. **Validate webhook signatures** - Prevent spoofing
7. **Limit API scopes** - Request minimum permissions needed

## 🧪 Testing Integrations

### Test WhatsApp
```bash
curl -X POST "https://graph.instagram.com/v14.0/me/messages" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"messaging_product":"whatsapp","to":"919999999999","type":"text","text":{"body":"Test"}}'
```

### Test IndiaMART
```bash
curl -X GET "https://api.indiamart.com/v2/inquiries?api_key=YOUR_KEY" \
  -H "Content-Type: application/json"
```

### Test Meta
```bash
curl -X GET "https://graph.instagram.com/v14.0/me?access_token=TOKEN"
```

### Test Email
```javascript
// In CRM Settings
const testEmail = {
  to: "test@example.com",
  subject: "Test Email from Oakcraft CRM",
  template: "test"
};
// Click "Send Test Email"
```

---

## 📊 Integration Dashboard

View all active integrations in CRM → Integrations:

- Connection status (Connected/Disconnected)
- Last sync time
- Data synced (leads count, messages, etc.)
- Errors and warnings
- Quick action buttons (sync, test, configure)

---

## 🆘 Troubleshooting Integrations

### WhatsApp Not Receiving Messages
- Check phone number format (with country code)
- Verify API token is valid
- Check webhook URL is accessible
- Review WhatsApp API logs

### IndiaMART Leads Not Syncing
- Verify API key credentials
- Check seller ID is correct
- Ensure account is verified
- Check API rate limits

### Meta Leads Not Importing
- Verify access token has appropriate permissions
- Check lead form is active
- Ensure webhook is configured
- Review Meta API logs

### Google Business Leads Missing
- Check Google Business Profile is verified
- Ensure API key has required permissions
- Verify location ID is correct
- Check service account has access

### Email Not Sending
- Verify SMTP settings in .env
- Check sender email is correct
- Ensure app-specific password is valid
- Review email logs

---

## 📞 Support & Documentation

- **WhatsApp API Docs:** [developers.facebook.com/docs/whatsapp](https://developers.facebook.com/docs/whatsapp/)
- **IndiaMART API:** [seller.indiamart.com/api](https://seller.indiamart.com/api)
- **Justdial API:** [justdial.com/api](https://www.justdial.com/api)
- **Meta Platform:** [developers.facebook.com](https://developers.facebook.com/)
- **Google API:** [developers.google.com](https://developers.google.com/)

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
