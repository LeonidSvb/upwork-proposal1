Создай лендинг с артефактами и layout компонентами. 
Используй приложенные guides. Тематика: [любая ниша].


# LAYOUT CSS QUICK REFERENCE FOR ChatGPT

## 🎨 BRAND CUSTOMIZATION
Change these 3 variables for any niche:
```css
:root {
  --brand-primary: #3b82f6;    /* Main color */
  --brand-secondary: #8b5cf6;  /* Secondary */
  --brand-accent: #10b981;     /* Accent */
}
```

**Examples**: Healthcare `#0ea5e9, #22c55e, #06b6d4` | Finance `#1e40af, #3730a3, #059669` | Restaurant `#dc2626, #ea580c, #65a30d`

## 📋 CORE COMPONENTS

### **LAYOUT STRUCTURE**
- `navbar` + `container` + `navbar-brand` - Header
- `hero` + `hero-content` - Main section  
- `section` + `container` - Content sections
- `footer` - Bottom section

### **BUTTONS**: `btn btn-primary btn-lg`
- **Styles**: `primary`, `secondary`, `outline`, `accent`
- **Sizes**: `sm`, `lg`, `xl` (default medium)

### **CARDS**: `card`, `feature-card`, `pricing-card`
- Add `featured` class to pricing cards for highlight

### **GRIDS**: `grid grid-3` (auto-responsive 2/3/4 columns)

### **PROCESS STEPS**: `process-steps` with `process-step` (horizontal with arrows)

### **STATS**: `stats` + `stats-grid` + `stat-item` (big numbers section)

### **TESTIMONIALS**: `testimonial-grid` + `testimonial-card` (no photos needed)

### **FAQ**: `faq-list` + `faq-item` (CSS-only accordion)

## 🔧 QUICK UTILITIES
- **Spacing**: `mt-1` to `mt-5`, `py-1` to `py-5`
- **Colors**: `.text-primary`, `.bg-primary`, `.text-muted`
- **Layout**: `.text-center`, `.flex-center`, `.container`

## ✅ USAGE RULES
- Always use `.container` for content
- Include `.section` for proper spacing  
- Customize brand colors via CSS variables
- Use with artifacts.css for complete system
- Mobile-first responsive design included
