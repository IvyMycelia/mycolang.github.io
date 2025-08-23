# Myco Programming Language Website

A professional, responsive website for the Myco programming language, featuring modern design, dark themes, and comprehensive documentation.

## 🌟 Features

- **Responsive Design**: Works perfectly on all devices
- **Multiple Themes**: Light, Dark, and hidden Trans theme
- **Professional Layout**: Clean, organized structure
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Fast Loading**: Optimized images and CSS
- **Accessibility**: Proper semantic HTML and ARIA labels

## 🏗️ Project Structure

```
mycolang.org/
├── index.html              # Homepage
├── pages/                  # HTML pages
│   ├── docs.html          # Documentation page
│   ├── grammar.html       # BNF Grammar specification
│   └── downloads.html     # Downloads and installation
├── css/                    # Stylesheets
│   └── main.css           # Main stylesheet
├── js/                     # JavaScript
│   └── main.js            # Main functionality
├── images/                 # Logo and images
│   ├── Myco_Transparent.png
│   └── Myco_Purple.png
├── assets/                 # Favicons and metadata
│   ├── favicon.ico        # Main favicon
│   ├── favicon-16x16.png  # Small favicon
│   ├── favicon-32x32.png  # Standard favicon
│   ├── apple-touch-icon.png # iOS icon
│   ├── site.webmanifest   # PWA manifest
│   └── sitemap.xml        # SEO sitemap
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (for development)

### Installation
1. Clone the repository
2. Open `index.html` in your browser
3. Or serve locally with a web server

### Local Development
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🎨 Customization

### Themes
- **Light Theme**: Default professional appearance
- **Dark Theme**: Modern dark mode
- **Trans Theme**: Hidden theme (type "I V Y")

### Colors
All colors are defined in CSS variables in `css/main.css`:
```css
:root {
    --bg-primary: #ffffff;
    --accent-primary: #10b981;
    --text-primary: #1f2937;
    /* ... more variables */
}
```

### Logo
Replace the logo images in the `images/` directory:
- `Myco_Transparent.png` - Header logo
- `Myco_Purple.png` - Hero section logo

## 📱 Responsive Design

The website automatically adapts to different screen sizes:
- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Single-column layout, optimized touch targets

## 🔧 Technical Details

### CSS Features
- CSS Grid and Flexbox layouts
- CSS Variables for theming
- Keyframe animations
- Media queries for responsiveness

### JavaScript Features
- Theme management
- Mobile menu toggle
- Scroll animations
- Code copy functionality
- Secret theme activation

### SEO Features
- Meta tags and descriptions
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- XML sitemap
- Canonical URLs

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is part of the Myco programming language ecosystem.

## 👨‍💻 Author

**Ivy Mycelia** - Creator of the Myco programming language

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/IvyMycelia/Myco/issues)
- **Documentation**: Check the docs page for language information
- **Community**: Join discussions on GitHub

---

Built with ❤️ for the Myco programming language community.
