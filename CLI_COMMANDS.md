<!-- Angular CLI Commands Reference for ASVS Application -->

# Angular CLI Commands Reference

## Project Setup Commands

### Initial Project Creation
```bash
# Create a new Angular 21 application
ng new asvs-security-app --standalone

# Navigate to project
cd asvs-security-app

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
```

## Component Generation Commands

### Atoms
```bash
# Button component
ng generate component components/atoms/button --skip-tests --standalone

# Badge component
ng generate component components/atoms/badge --skip-tests --standalone

# Card component
ng generate component components/atoms/card --skip-tests --standalone

# Input component
ng generate component components/atoms/input --skip-tests --standalone

# Tag component
ng generate component components/atoms/tag --skip-tests --standalone
```

### Molecules
```bash
# Search Bar component
ng generate component components/molecules/search-bar --skip-tests --standalone

# Category Card component
ng generate component components/molecules/category-card --skip-tests --standalone

# Level Filter component
ng generate component components/molecules/level-filter --skip-tests --standalone
```

### Organisms
```bash
# Header component
ng generate component components/organisms/header --skip-tests --standalone

# Requirement Card component
ng generate component components/organisms/requirement-card --skip-tests --standalone

# Requirement List component
ng generate component components/organisms/requirement-list --skip-tests --standalone

# Category Grid component
ng generate component components/organisms/category-grid --skip-tests --standalone
```

### Pages
```bash
# Dashboard page
ng generate component pages/dashboard --skip-tests --standalone
```

## Service Generation

```bash
# Generate ASVS service
ng generate service services/asvs --skip-tests
```

## Development Commands

```bash
# Start development server (with auto-open in browser)
ng serve --open

# Start development server (specific port)
ng serve --port 4200

# Build for production
ng build

# Build with optimization
ng build --configuration=production

# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Lint the project
ng lint

# Format code
ng lint --fix
```

## Configuration Files

### Tailwind CSS Setup

Created `tailwind.config.ts`:
```typescript
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      // Custom theme configuration
    }
  }
}
```

### PostCSS Configuration

Created `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Global Styles

Updated `src/styles.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## File Structure Commands

### Create directories manually
```bash
# Create component folders
mkdir -p src/app/components/atoms/{button,badge,card,input,tag}
mkdir -p src/app/components/molecules/{search-bar,category-card,level-filter}
mkdir -p src/app/components/organisms/{header,requirement-card,requirement-list,category-grid}
mkdir -p src/app/pages/dashboard
mkdir -p src/app/models
mkdir -p src/app/services
mkdir -p src/assets/data
```

## NPM/Package Commands

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# List installed packages
npm list

# Clear npm cache
npm cache clean --force
```

## Build and Deployment

```bash
# Development build
npm run build

# Production build with optimizations
npm run build -- --configuration=production

# Build with budget warnings
npm run build -- --configuration=production --stats-json

# Watch mode (rebuilds on file changes)
npm run watch

# View build size analysis
npx ng build --configuration=production --stats-json
```

## Testing Commands

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage report
npm run test -- --code-coverage

# Run specific test file
npm run test -- --include='**/dashboard.component.spec.ts'
```

## Code Quality Commands

```bash
# TypeScript compilation check
npx tsc --noEmit

# Format code with prettier
npx prettier --write src/

# Check code formatting
npx prettier --check src/

# Run ESLint
npx ng lint

# Fix ESLint errors
npx ng lint --fix
```

## Useful Development Shortcuts

```bash
# Generate complete feature (component + routing)
ng generate @schematics/angular:application myapp --routing

# Generate routing module
ng generate module app-routing --flat --module=app

# Generate guard
ng generate guard guards/auth

# Generate resolver
ng generate resolver resolvers/data

# Generate interceptor
ng generate interceptor interceptors/http
```

## Docker Commands (If applicable)

```bash
# Build Docker image
docker build -t asvs-security-app .

# Run Docker container
docker run -p 80:4200 asvs-security-app

# Build for production in Docker
docker build -t asvs-security-app:prod --target=production .
```

## Common Development Workflows

### Creating a New Atom Component
```bash
# Generate component
ng generate component components/atoms/my-atom --skip-tests --standalone

# Edit the generated file to add inputs, outputs, and styling
```

### Creating a New Molecule Component
```bash
# Generate component
ng generate component components/molecules/my-molecule --skip-tests --standalone

# Import related atom components
# Combine atoms in the template
```

### Creating a New Organism Component
```bash
# Generate component
ng generate component components/organisms/my-organism --skip-tests --standalone

# Import molecules and atoms
# Build complex interactions
```

### Adding a Service
```bash
# Generate service
ng generate service services/my-service --skip-tests

# Inject into components with inject() function

# Import and provide in component's standalone decorator
```

## Performance Optimization Commands

```bash
# Analyze bundle size
npm run build -- --configuration=production --stats-json
npx webpack-bundle-analyzer dist/*/stats.json

# Check for unused code
npx unused-exports src/

# Generate lighthouse report
npx lighthouse http://localhost:4200 --view
```

## Troubleshooting Commands

```bash
# Clear Angular cache
rm -rf .angular/cache
ng cache clean

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install

# Check TypeScript errors
npx tsc --noEmit

# Check Angular version
ng version

# Check compatibility
npm outdated
```

## Git Workflow (If using version control)

```bash
# Initialize git
git init

# Add files
git add .

# Commit changes
git commit -m "feat: add atomic components for ASVS app"

# Create branch
git checkout -b feature/search-functionality
```

## Documentation Generation

```bash
# Generate Compodoc documentation
npm install --save-dev @compodoc/compodoc

# Create documentation
npx compodoc -p tsconfig.json -d docs

# Serve documentation
npx compodoc -p tsconfig.json -s
```

---

## Quick Start

```bash
# 1. Clone/Setup project
git clone <repo>
cd asvs-security-app

# 2. Install dependencies
npm install

# 3. Install Tailwind
npm install -D tailwindcss postcss autoprefixer

# 4. Start development
npm start

# 5. Open in browser
# http://localhost:4200
```

## Useful Links

- [Angular CLI Documentation](https://angular.dev/cli)
- [Angular Component Patterns](https://angular.dev/guide/components)
- [Tailwind CSS CLI](https://tailwindcss.com/docs/installation)
- [TypeScript CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
