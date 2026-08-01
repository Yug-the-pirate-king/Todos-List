# AI Fix — Issue #5: Cleanup: Remove dead code and unused imports

**Issue body:**

This is an automated issue created by the AI agent to track planned code quality improvements. The AI will fix this in a subsequent run.

---

**AI-proposed fix:**

**Root cause**

The codebase has accumulated leftover artifacts from earlier iterations—unused imports, stale variables, commented-out code, and functions that are no longer called. These dead-code blocks do not break the app, but they increase maintenance friction, bundle size, and noise during code review. The fix is a focused cleanup pass, followed by enabling lint rules that prevent the problem from recurring.

---

**Recommended fix**

Because I cannot inspect the exact repo state, first run a static-analysis pass to find the real occurrences, then delete them. The examples below show the *pattern* of changes you should apply.

### 1. Detect the dead code

If this is a JS/React project:

```bash
npx eslint src --ext .js,.jsx,.ts,.tsx \
  --rule 'no-unused-vars: error' \
  --rule 'no-unreachable: error'
```

If it is a Python project:

```bash
pip install autoflake flake8
autoflake --remove-all-unused-imports --remove-unused-variables --in-place --recursive .
flake8
```

### 2. Apply the cleanup (representative changes)

**File: `src/App.js`**
```diff
-import React, { useState, useEffect } from 'react';
+import React, { useState } from 'react';
 import TodoList from './components/TodoList';
-import { v4 as uuid } from 'uuid';
 
 function App() {
   const [todos, setTodos] = useState([]);
-  // const [filter, setFilter] = useState('all');
 
   return (
     <div className="App">
```

**File: `src/components/TodoList.js`**
```diff
-import React from 'react';
-import PropTypes from 'prop-types';
 import TodoItem from './TodoItem';
 
 function TodoList({ todos, onToggle, onDelete }) {
-  const unusedHelper = () => todos.length;
-
   return (
     <ul>
       {todos.map(todo => (
```

**File: `src/components/TodoItem.js`**
```diff
-import React from 'react';
-
-function TodoItem({ todo, onToggle, onDelete, /* oldProp */ }) {
+function TodoItem({ todo, onToggle, onDelete }) {
   return (
     <li>
       <span>{todo.text}</span>
-      {/* <button onClick={() => console.log('legacy handler')}>Old</button> */}
       <button onClick={() => onToggle(todo.id)}>Toggle</button>
       <button onClick={() => onDelete(todo.id)}>Delete</button>
```

**File: `src/index.js`**
```diff
 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import App from './App';
-import './unused.css';
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<App />);
```

### 3. Create the PR

```bash
git checkout -b cleanup/remove-dead-code-issue-5
# make the deletions
npm test          # or pytest
npm run build     # verify bundle still compiles
git commit -m "cleanup: remove dead code and unused imports (#5)"
git push origin cleanup/remove-dead-code-issue-5
```

Title the PR **“Cleanup: Remove dead code and unused imports”** and in the body reference issue `#5`.

---

**Follow-up actions**

1. **Enforce linting in CI** so unused imports/vars are caught before merge. Example GitHub Actions step:
   ```yaml
   - run: npm ci
   - run: npx eslint src --ext .js,.jsx,.ts,.tsx --max-warnings 0
   ```
2. **Add a pre-commit hook** (`husky` + `lint-staged` for JS, or `pre-commit` for Python) to reject dead code locally.
3. **Keep the cleanup scoped**—do not mix functional changes with this PR to make review easy.
4. **Verify tests and production build** pass after deletion to confirm nothing was accidentally referenced reflectively or by dynamic import.

If you paste the current contents of `src/App.js` and the component files, I can provide exact line-by-line diffs for this specific repository.
