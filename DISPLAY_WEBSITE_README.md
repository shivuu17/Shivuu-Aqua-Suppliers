# Shivuu Aqua Supplies - Display Website

This is a display-only informational website for Shivuu Aqua Supplies. The site has been converted to remove all database functionality, login requirements, and form submissions. All customer inquiries are now handled through WhatsApp.

## Features

✅ Static display of products and services  
✅ No database required  
✅ No server backend needed  
✅ All communication via WhatsApp links  
✅ Fully responsive design  
✅ Fast loading times

## Pages

- **Home** - Hero section with product overview and features
- **Products** - Display of available bottle sizes with WhatsApp inquiry link
- **About** - Company story, mission, and team information
- **Contact** - Contact information with WhatsApp and phone links
- **NotFound** - 404 error page

## Setup & Run

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Navigation

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with product overview |
| Products | `/products` | Product catalog with sizes and features |
| About | `/about` | Company information and team |
| Contact | `/contact` | Contact details and WhatsApp chat link |

## WhatsApp Integration

All customer inquiries are handled through WhatsApp. Click any "Chat on WhatsApp" button to connect:
- Pre-filled messages for better communication
- Instant response capability
- Direct business connection

Update the WhatsApp number in `/client/src/utils/constants.js`:

```javascript
BUSINESS_PHONE: "919999999999", // Your WhatsApp Business number
```

## Customization

### Company Information

Edit `/client/src/utils/constants.js`:

```javascript
export const BUSINESS_PHONE = "919999999999";
export const BUSINESS_EMAIL = "info@example.com";
```

### Product Information

Edit product details in:
- `/client/src/pages/Products.jsx` - Update product sizes and specs
- `/client/src/pages/Home.jsx` - Update product listing

### Brand Colors

Edit `/client/tailwind.config.js` to customize colors and theme.

## Technologies Used

- **React 18** - UI framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Vite** - Build tool
- **React Hot Toast** - Notifications

## File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── WhatsAppFloat.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## No Database Required

This is a **static display website** with:
- ✅ No backend server needed
- ✅ No database connections
- ✅ No form submissions to database
- ✅ No authentication/login system
- ✅ No admin panel
- ✅ Pure client-side rendering

All customer communication flows through WhatsApp for immediate, direct contact.

## Deployment

### Deploy to Vercel

```bash
npm run build
# Push to Git repository
# Connect on vercel.com and deploy
```

### Deploy to Netlify

```bash
npm run build
# Drop the 'dist' folder onto netlify.com
# Or connect your Git repository
```

### Deploy to Static Hosting

```bash
npm run build
# Upload contents of 'dist' folder to any static hosting
```

## Support

For questions or customization needs, contact via WhatsApp using the link on the Contact page.

---

**Version**: 2.0 - Display Only  
**Last Updated**: January 2026
