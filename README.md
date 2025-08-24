# Myco Language Website

A professional website for the Myco programming language with modern design, responsive layout, and comprehensive documentation.

## Features

- Modern, responsive design
- Interactive animations and smooth transitions
- Comprehensive language documentation
- BNF grammar specification
- Code examples with syntax highlighting
- Mobile-friendly navigation
- Dark/light theme system with secret trans theme

## File Structure

```
mycolang.org/
├── index.html          # Homepage
├── docs.html           # Documentation
├── grammar.html        # BNF grammar
├── downloads.html      # Download page
├── css/main.css       # Main stylesheet
├── js/main.js         # JavaScript functionality
└── CNAME              # Domain configuration
```

## Code Syntax Highlighting

The website uses custom CSS-based syntax highlighting for Myco language code examples:

- **Keywords** (`func`, `if`, `end`, `let`, `return`): Purple accent color
- **Functions**: Function names and calls in primary accent color
- **Strings**: Text literals in quotes with string-specific color
- **Numbers**: Numeric values in number-specific color
- **Comments**: Code comments in muted text color
- **Parameters**: Function parameters in parameter-specific color
- **Operators**: Mathematical and logical operators in operator color
- **Punctuation**: Semicolons, colons, parentheses in punctuation color

**Specific Color Codes:**
- **Keywords**: `#ec4899` (accent-secondary)
- **Functions**: `#10b981` (accent-tertiary) 
- **Parameters**: `#a855f7` (accent-primary)
- **Strings**: `#f87171` (red)
- **Numbers**: `#a78bfa` (purple)
- **Comments**: `#cbd5e1` (text-muted)
- **Operators**: `#e2e8f0` (text-secondary)
- **Punctuation**: `#cbd5e1` (text-muted)

Syntax highlighting is applied through CSS classes and works across all code blocks on the site. Colors automatically adapt to the current theme (dark, light, or trans variants).

## Getting Started

1. Clone or download the website files
2. Open `index.html` in a web browser
3. All features work immediately

## Development

- Use a local web server for development
- Edit HTML, CSS, or JavaScript files as needed
- Refresh browser to see changes

## Customization

- **Colors**: Modify CSS variables in `:root`
- **Layout**: Edit `css/main.css` for design changes
- **Functionality**: Add features in `js/main.js`
- **Content**: Update HTML files for new pages or content

## Responsive Design

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grids)
- **Mobile**: <768px (stacked layout, mobile menu)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, Flexbox, CSS Variables, ES6+ JavaScript
- Graceful degradation for older browsers

## Deployment

- **GitHub Pages**: Push to repository and enable Pages
- **Other hosting**: Upload files to any web hosting service
- **Custom domain**: Update CNAME file if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License

Part of the Myco Language project.

## Support

- GitHub Issues for bugs or feature requests
- Check documentation for detailed information

---

Built for the Myco programming language community.
