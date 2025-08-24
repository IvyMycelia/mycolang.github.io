# 🍄 Myco Language Website

A professional, comprehensive website for the Myco programming language, built with modern web technologies and featuring beautiful animations, responsive design, and comprehensive documentation.

## 🌟 Features

- **Modern Design**: Professional layout similar to python.org with forest/mushroom aesthetic
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Animations**: Smooth scroll effects, hover animations, and entrance animations
- **Comprehensive Documentation**: Complete language reference with examples
- **BNF Grammar**: Formal language specification and syntax rules
- **Code Examples**: Interactive code blocks with syntax highlighting and copy functionality
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Performance Optimized**: Efficient CSS and JavaScript with smooth animations

## 📁 File Structure

```md
mycolang.org/
├── index.html          # Main homepage
├── docs.html           # Documentation page
├── grammar.html        # BNF grammar and syntax rules
├── css/
│   └── main.css       # Main stylesheet with all components
├── js/
│   └── main.js        # Main JavaScript functionality
├── README.md           # This file
└── CNAME              # Custom domain configuration
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. Clone or download the website files
2. Open `index.html` in your web browser
3. The website will work immediately with all features

### Local Development

For development and testing:

1. Use a local web server (e.g., Python's `http.server` or Node.js `live-server`)
2. Make changes to HTML, CSS, or JavaScript files
3. Refresh your browser to see changes

## 🎨 Design System

### Color Palette

- **Primary**: `#8B5A2B` (Forest Brown)
- **Secondary**: `#228B22` (Forest Green)
- **Accent**: `#FF6B35` (Mushroom Orange)
- **Dark**: `#2C1810` (Deep Brown)
- **Light**: `#F5F5DC` (Cream)

### Typography

- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono (Google Fonts)

### Components

- **Cards**: Feature cards, documentation cards, step cards
- **Buttons**: Primary, secondary, and outline button styles
- **Code Blocks**: Syntax-highlighted code containers with copy functionality
- **Navigation**: Fixed header with smooth scrolling and mobile menu

## 🔧 Customization

### Adding New Pages

1. Create a new HTML file (e.g., `tutorial.html`)
2. Copy the header and footer structure from existing pages
3. Add your content in the main section
4. Update navigation links in all pages

### Modifying Styles

- Edit `css/main.css` to change colors, fonts, or layout
- CSS variables are defined in `:root` for easy customization
- Responsive breakpoints are at 768px and 480px

### Adding JavaScript Features

- Edit `js/main.js` to add new functionality
- The `MycoWebsite` class provides a structured approach
- All event listeners and animations are organized by feature

## 📱 Responsive Design

The website is fully responsive with three main breakpoints:

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grid layouts)
- **Mobile**: <768px (stacked layout, mobile menu)

## 🎭 Animations

### Entrance Animations

- `fade-in`: Simple fade-in effect
- `slide-in`: Slide up from bottom
- `scale-in`: Scale up from 90%
- `scroll-reveal`: Reveal elements as they scroll into view

### Interactive Animations

- Hover effects on cards and buttons
- Smooth transitions for all interactive elements
- Parallax scrolling effects
- Typing animations for hero text

## 🔍 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Features Used**: CSS Grid, Flexbox, CSS Variables, ES6+ JavaScript
- **Fallbacks**: Graceful degradation for older browsers

## 📚 Content Management

### Adding Features

1. Edit `index.html` to add new feature cards
2. Update the features grid in the CSS if needed
3. Add corresponding documentation in `docs.html`

### Updating Code Examples

1. Edit the code blocks in `index.html` and `docs.html`
2. Ensure proper syntax highlighting classes are applied
3. Test copy functionality for new code blocks

### Documentation Updates

1. Edit `docs.html` to add new sections
2. Update the sidebar navigation
3. Add corresponding grammar rules in `grammar.html` if needed

## 🚀 Deployment

### GitHub Pages

1. Push your website files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Set custom domain if desired (update CNAME file)

### Other Hosting

- Upload files to any web hosting service
- Ensure all file paths are correct
- Test all functionality after deployment

## 🐛 Troubleshooting

### Common Issues

- **CSS not loading**: Check file paths and ensure `css/main.css` exists
- **JavaScript errors**: Check browser console for error messages
- **Mobile menu not working**: Ensure `js/main.js` is properly loaded
- **Animations not working**: Check if JavaScript is enabled

### Performance Issues

- **Slow animations**: Reduce animation complexity in CSS
- **Large file sizes**: Minify CSS and JavaScript for production
- **Image loading**: Optimize and compress images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This website is part of the Myco Language project and follows the same licensing terms.

## 🙏 Acknowledgments

- **IvyMycelia**: Creator of the Myco programming language
- **Google Fonts**: Typography (Inter, JetBrains Mono)
- **Modern Web Standards**: CSS Grid, Flexbox, ES6+

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Discord**: Join the Myco community
- **Documentation**: Check the docs for detailed information

---

Built with 🍄 and ❤️ for the Myco programming language community.
