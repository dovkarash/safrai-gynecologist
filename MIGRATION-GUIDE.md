# Migrating from Messy Config to @bagelink/lint-config

## 🎯 Goal

Transform a project with conflicting, redundant, or outdated lint/format configurations into a clean, centrally-managed setup using `@bagelink/lint-config` (installation code `bun add -d github:bageldb/bagel-lint-config`).

---

## 🔍 Step 1: Audit Your Current Configuration

### Common Configuration Files to Look For:

```bash
# ESLint configs (old and new formats)
.eslintrc
.eslintrc.js
.eslintrc.cjs
.eslintrc.json
.eslintrc.yaml
eslint.config.js
eslint.config.mjs

# Prettier configs
.prettierrc
.prettierrc.js
.prettierrc.cjs
.prettierrc.json
.prettierrc.yaml
prettier.config.js
prettier.config.cjs

# TypeScript configs
tsconfig.json
tsconfig.app.json
tsconfig.node.json
tsconfig.*.json

# Editor configs
.editorconfig

# Ignore files
.eslintignore
.prettierignore

# Package.json configs
{
  "eslintConfig": { ... },
  "prettier": { ... },
  "lint-staged": { ... },
  "husky": { ... },
  "simple-git-hooks": { ... }
}
```

### List All Config Files:

```bash
# Find all lint/format config files
find . -maxdepth 1 -name ".*rc*" -o -name "*.config.*" -o -name "tsconfig*.json" | grep -v node_modules
```

---

## 🚨 Common Problems in Messy Configs

### Problem 1: **Multiple Conflicting Configs**

**Example:**

```
.eslintrc.js       ← Old flat config
eslint.config.js   ← New flat config
package.json       ← Inline "eslintConfig"
```

**Issue:** ESLint reads multiple configs and merges them unpredictably.

---

### Problem 2: **Prettier vs ESLint Conflicts**

**Example:**

```js
// .eslintrc.js
rules: {
  'indent': ['error', 2],           // ESLint wants 2 spaces
  'quotes': ['error', 'double'],    // ESLint wants double quotes
}

// .prettierrc
{
  "useTabs": true,                  // Prettier wants tabs! ❌ CONFLICT
  "singleQuote": true               // Prettier wants single quotes! ❌ CONFLICT
}
```

**Issue:** Saving a file auto-formats with Prettier, then ESLint complains. Endless loop!

---

### Problem 3: **Outdated Dependencies**

**Example:**

```json
{
  "devDependencies": {
    "eslint": "^7.32.0", // 2+ years old!
    "@typescript-eslint/parser": "^4.0.0", // Ancient!
    "eslint-config-airbnb": "^18.0.0", // Outdated
    "tslint": "^6.0.0" // DEPRECATED! ❌
  }
}
```

**Issue:** Missing modern features, security vulnerabilities, incompatible with new tools.

---

### Problem 4: **Duplicate/Conflicting Rules**

**Example:**

```js
// eslint.config.js
export default [
  // Base config
  { rules: { 'no-console': 'error' } },

  // Overrides that contradict each other
  { files: ['*.ts'], rules: { 'no-console': 'warn' } },
  { files: ['**/*.ts'], rules: { 'no-console': 'off' } },

  // Which wins? Who knows! 🤷
]
```

---

### Problem 5: **Missing TypeScript Integration**

**Example:**

```js
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  // But no parserOptions.project!
  // TypeScript-aware rules won't work properly
}
```

**Issue:** Type-aware linting rules fail silently or produce false positives.

---

### Problem 6: **Git Hooks Mess**

**Example:**

```
.husky/              ← Husky v7
  pre-commit
.git/hooks/          ← Husky v4 leftovers
  pre-commit
package.json:
  "husky": { ... }   ← Husky v4 config
  "simple-git-hooks" ← Different hook system! ❌ CONFLICT
```

**Issue:** Multiple hook systems fighting, hooks don't run, or run multiple times.

---

## 🧹 Step 2: Clean Up Your Project

### 2.1: Backup Current Config

```bash
# Create backup directory
mkdir -p .config-backup

# Backup all config files
cp .eslintrc* .config-backup/ 2>/dev/null || true
cp .prettierrc* .config-backup/ 2>/dev/null || true
cp prettier.config.* .config-backup/ 2>/dev/null || true
cp eslint.config.* .config-backup/ 2>/dev/null || true
cp .editorconfig .config-backup/ 2>/dev/null || true
cp tsconfig*.json .config-backup/ 2>/dev/null || true

echo "✅ Config backed up to .config-backup/"
```

---

### 2.2: Remove ALL Old Lint/Format Configs

```bash
# Remove ESLint configs
rm -f .eslintrc .eslintrc.js .eslintrc.cjs .eslintrc.json .eslintrc.yaml
rm -f .eslintignore

# Remove Prettier configs
rm -f .prettierrc .prettierrc.js .prettierrc.cjs .prettierrc.json .prettierrc.yaml
rm -f prettier.config.js prettier.config.cjs
rm -f .prettierignore

# Remove EditorConfig (will be replaced)
rm -f .editorconfig

# Keep existing tsconfig files for now (we'll replace them)
```

---

### 2.3: Remove Inline package.json Configs

Edit `package.json` and remove these sections if they exist:

```json
{
  // ❌ REMOVE THESE:
  "eslintConfig": { ... },
  "prettier": { ... },  // Keep this if it just references a file
  "eslintIgnore": [ ... ],
  "lint-staged": { ... },  // We'll replace this
  "husky": { ... },
  "simple-git-hooks": { ... }  // We'll replace this
}
```

---

### 2.4: Uninstall Old/Conflicting Dependencies

```bash
# Remove deprecated tools
bun remove tslint tslint-config-prettier

# Remove old ESLint dependencies
bun remove eslint-config-airbnb eslint-config-standard \
  eslint-plugin-import eslint-plugin-node eslint-plugin-promise

# Remove old/redundant packages
bun remove @eslint/js @types/eslint typescript-eslint \
  eslint-plugin-oxlint oxlint

# Remove old TypeScript configs
bun remove @vue/tsconfig

# Remove old git hooks (if using Husky, keep for now)
# bun remove husky  # Only if migrating from Husky
```

---

### 2.5: Remove Husky (if applicable)

If you're using Husky and want to migrate to simple-git-hooks:

```bash
# Remove Husky
bun remove husky

# Remove Husky hooks directory
rm -rf .husky

# Clean up git hooks
rm -rf .git/hooks/*
```

---

## 📦 Step 3: Install @bagelink/lint-config

### 3.1: Install Core Packages

```bash
bun add -d @bagelink/lint-config \
  eslint prettier typescript vue-tsc \
  eslint-config-prettier eslint-plugin-vue globals \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser \
  simple-git-hooks lint-staged
```

**Note:** These ESLint packages are **peer dependencies** and cannot be removed. See `DEPENDENCY-EXPLANATION.md` for details.

---

### 3.2: Run Auto-Setup

```bash
bunx bagel-lint-setup
```

This automatically copies:

- `.prettierignore`
- `.editorconfig`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `.vscode/settings.json`
- `.vscode/extensions.json`

---

### 3.3: Create eslint.config.js

```bash
echo "export { default } from '@bagelink/lint-config/eslint'" > eslint.config.js
```

That's it! Just 1 line.

---

### 3.4: Update package.json

Add these sections to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prepare": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "bunx --bun lint-staged"
  },
  "lint-staged": {
    "*.{js,mjs,cjs,ts,mts,cts,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md,html,css,scss}": ["prettier --write"]
  },
  "prettier": "@bagelink/lint-config/prettier"
}
```

---

### 3.5: Setup Git Hooks

```bash
bun run prepare
```

---

## 🔧 Step 4: Handle Custom Rules & Overrides

### If You Had Custom ESLint Rules:

**Before:**

```js
// .eslintrc.js
module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-console': 'off', // Your custom rule
    'vue/multi-word-component-names': 'off', // Already in bagel-lint-config!
    '@typescript-eslint/no-explicit-any': 'warn', // Already in bagel-lint-config!
    'custom-rule': 'error', // Actually custom
  },
}
```

**After:**

```js
// eslint.config.js
import bagelConfig from '@bagelink/lint-config/eslint'

export default [
  ...bagelConfig,
  // Add ONLY your truly custom rules
  {
    rules: {
      'no-console': 'off', // Override bagel-lint-config if needed
      'custom-rule': 'error', // Your custom rule
    },
  },
]
```

**Tip:** Start with just importing the config, run `bun run lint`, and only add overrides if you actually need them!

---

### If You Had Custom Prettier Config:

**Before:**

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all"
}
```

**After:**

bagel-lint-config uses:

- `printWidth: 100` (close to your 120)
- `singleQuote: true` ✅ Same
- `semi: false` ✅ Same
- `trailingComma: 'all'` ✅ Same

If you MUST have 120 width:

```js
// prettier.config.cjs
const bagelPrettier = require('@bagelink/lint-config/prettier')

module.exports = {
  ...bagelPrettier,
  printWidth: 120, // Your override
}
```

Then in package.json:

```json
{
  "prettier": "./prettier.config.cjs" // Point to your file instead
}
```

---

### If You Had Custom TypeScript Config:

The auto-copied configs cover 99% of cases. If you need customization:

**Example: Add path aliases**

```json
// tsconfig.app.json (already copied, just edit)
{
  "compilerOptions": {
    // ... existing config ...
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"] // Add your custom paths
    }
  }
}
```

---

## 🐛 Step 5: Fix Common Issues

### Issue: "Cannot find module '@bagelink/lint-config/eslint'"

**Cause:** Package not installed or old version cached.

**Fix:**

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lock
bun install
bunx bagel-lint-setup
```

---

### Issue: ESLint errors about type definitions

**Example:**

```
error TS2688: Cannot find type definition file for 'eslint__eslintrc'
```

**Cause:** TypeScript is picking up ESLint config files.

**Fix:** Already handled in bagel-lint-config tsconfig files via:

```json
{
  "compilerOptions": {
    "types": [] // Prevents auto-inclusion of @types packages
  },
  "exclude": ["**/node_modules", "**/.*"] // Excludes config files
}
```

If still having issues, check your tsconfig files match the auto-copied ones.

---

### Issue: Prettier and ESLint fighting

**Symptoms:**

- Save file → formatted
- ESLint immediately shows errors
- Fix ESLint → format changes back

**Cause:** Formatting rules not disabled in ESLint.

**Fix:** bagel-lint-config includes `eslint-config-prettier` which disables ALL formatting rules. Verify:

```bash
# Check that eslint-config-prettier is installed
bun pm ls | grep eslint-config-prettier
```

If not installed:

```bash
bun add -d eslint-config-prettier
```

---

### Issue: Git hooks not running

**Symptoms:**

- Committing doesn't trigger lint-staged
- No pre-commit hook runs

**Fix:**

```bash
# Reinstall hooks
bun run prepare

# Verify hook exists
cat .git/hooks/pre-commit

# Test manually
bunx lint-staged
```

---

### Issue: TypeScript errors in dependencies

**Example:**

```
node_modules/@bagelink/sdk/src/index.ts(215,46): error TS2550:
Property 'replaceAll' does not exist on type 'string'
```

**Cause:** TypeScript lib version too old.

**Fix:** Already handled in bagel-lint-config via:

```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"], // Includes modern features
    "skipLibCheck": true // Skip checking node_modules
  }
}
```

---

### Issue: Import order/sorting warnings

**Cause:** You might have had `eslint-plugin-import` with auto-sorting.

**Options:**

1. **Remove the plugin** (recommended - less complexity)
2. **Add it to your local config:**

```js
// eslint.config.js
import bagelConfig from '@bagelink/lint-config/eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  ...bagelConfig,
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          /* your config */
        },
      ],
    },
  },
]
```

---

## ✅ Step 6: Verify Everything Works

### 6.1: Run All Checks

```bash
# Type check
bun run type-check

# Lint
bun run lint

# Format check
bun run format:check

# Or run all at once
bun run check  # If you have this script
```

---

### 6.2: Fix Auto-Fixable Issues

```bash
# Auto-fix ESLint issues
bun run lint:fix

# Auto-format with Prettier
bun run format
```

---

### 6.3: Test Git Hooks

```bash
# Stage a file
git add package.json

# Try to commit (should trigger lint-staged)
git commit -m "test"

# If it runs, hooks are working! ✅
# Cancel with Ctrl+C if you don't want to commit
```

---

### 6.4: Address Remaining Warnings

After migration, you might see new warnings that were hidden before. This is **good**—your linter is now catching real issues!

**Common warnings:**

- `Unexpected console statement` - Remove `console.log` or disable for dev
- `Unexpected any` - Add proper TypeScript types
- `Unused variables` - Remove or prefix with `_`

---

## 📊 Before & After Comparison

### Before (Messy Project):

```
Config Files: 12
├── .eslintrc.js (158 lines)
├── .eslintrc.json (backup? 89 lines)
├── .eslintignore (15 lines)
├── eslint.config.js (conflicting! 45 lines)
├── .prettierrc (12 lines)
├── prettier.config.js (conflicting! 34 lines)
├── .prettierignore (22 lines)
├── .editorconfig (conflicting! 18 lines)
├── tsconfig.json (42 lines)
├── tsconfig.app.json (67 lines)
├── tsconfig.node.json (38 lines)
└── package.json inline configs (45 lines)

Total: 585 lines of config
Conflicts: Prettier vs ESLint (indent, quotes)
Issues: Multiple ESLint configs, outdated deps
Maintenance: Nightmare 🔥
```

---

### After (Clean with bagel-lint-config):

```
Manual Config Files: 1
└── eslint.config.js (1 line)

Auto-Copied Files: 7
├── tsconfig.json (auto-managed)
├── tsconfig.app.json (auto-managed)
├── tsconfig.node.json (auto-managed)
├── .prettierignore (auto-managed)
├── .editorconfig (auto-managed)
├── .vscode/settings.json (auto-managed)
└── .vscode/extensions.json (auto-managed)

Package.json: 3 small sections
├── prettier reference (1 line)
├── simple-git-hooks (3 lines)
└── lint-staged (8 lines)

Total: 1 line of manual config
Conflicts: None ✅
Issues: None ✅
Maintenance: Update one package! 🎉
```

---

## 🎯 Post-Migration Checklist

- [ ] All old config files removed
- [ ] Old dependencies uninstalled
- [ ] `@bagelink/lint-config` installed
- [ ] `bunx bagel-lint-setup` completed
- [ ] `eslint.config.js` created (1 line)
- [ ] `package.json` updated (3 sections)
- [ ] `bun run prepare` executed
- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes (or only warnings)
- [ ] `bun run format:check` passes
- [ ] Git hooks trigger on commit
- [ ] `.config-backup/` removed (once confirmed working)
- [ ] Team notified of new setup
- [ ] CI/CD updated (if needed)

---

## 🚀 Updating Other Projects

Once you've successfully migrated one project, migrating others is faster:

### Quick Migration Script:

```bash
#!/bin/bash
# migrate-to-bagel-lint.sh

echo "🧹 Cleaning old configs..."
rm -f .eslintrc* .prettierrc* prettier.config.* .eslintignore .prettierignore .editorconfig

echo "📦 Installing @bagelink/lint-config..."
bun add -d @bagelink/lint-config eslint prettier typescript vue-tsc \
  eslint-config-prettier eslint-plugin-vue globals \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser \
  simple-git-hooks lint-staged

echo "⚙️  Setting up..."
bunx bagel-lint-setup

echo "📝 Creating eslint.config.js..."
echo "export { default } from '@bagelink/lint-config/eslint'" > eslint.config.js

echo "✅ Done! Now:"
echo "1. Update package.json (add simple-git-hooks, lint-staged, prettier)"
echo "2. Run: bun run prepare"
echo "3. Test: bun run lint && bun run format"
```

---

## 💡 Tips & Best Practices

### 1. **Start Fresh on Branches**

```bash
git checkout -b migrate-to-bagel-lint-config
# Do migration
# Test thoroughly
git add -A
git commit -m "chore: migrate to @bagelink/lint-config"
```

### 2. **Commit Auto-Fixes Separately**

```bash
# After migration, auto-fix everything
bun run lint:fix
bun run format

# Commit separately
git add -A
git commit -m "style: auto-fix with new lint config"
```

This makes it clear which changes are from config vs auto-fixes.

### 3. **Document for Your Team**

Add to your project README:

```markdown
## Development Setup

We use [@bagelink/lint-config](https://github.com/bageldb/bagel-lint-config) for unified linting and formatting.

After `bun install`, everything is pre-configured. Just code!

- `bun run lint` - Check for issues
- `bun run format` - Format code
- Pre-commit hooks automatically lint & format
```

### 4. **Update CI/CD**

Update your CI config to use the new scripts:

```yaml
# .github/workflows/ci.yml
- name: Type Check
  run: bun run type-check

- name: Lint
  run: bun run lint

- name: Format Check
  run: bun run format:check
```

---

## 🆘 Need Help?

### Common Questions:

**Q: Can I keep some of my old rules?**  
A: Yes! Add overrides to your `eslint.config.js`. But try the defaults first—you might not need them.

**Q: Will this break my CI/CD?**  
A: Only if CI uses old script names. Update to use `bun run lint` and `bun run format:check`.

**Q: What about monorepos?**  
A: Install `@bagelink/lint-config` in each package, or use workspace-level install with local overrides.

**Q: Can I use this with npm/yarn instead of bun?**  
A: Yes! Just replace `bun` with `npm` or `yarn` in all commands.

**Q: The auto-fix changed thousands of files!**  
A: That's normal if you had conflicting configs. Commit the auto-fix separately with a clear message.

---

## 📈 Results You Can Expect

After migration, you should see:

✅ **~99% reduction** in configuration code  
✅ **Zero conflicts** between Prettier and ESLint  
✅ **Consistent formatting** across all projects  
✅ **Faster onboarding** for new developers  
✅ **Easier maintenance** - update one package instead of many files  
✅ **Modern best practices** baked in  
✅ **Type-safe** TypeScript setup  
✅ **Working git hooks** that catch issues pre-commit

---

**Last Updated:** December 2025  
**Maintainer:** BagelDB Team  
**Questions?** Open an issue on [bagel-lint-config](https://github.com/bageldb/bagel-lint-config)
