# AI Fix — Issue #3: Cleanup: Remove dead code and unused imports

**Issue body:**

This is an automated issue created by the AI agent to track planned code quality improvements. The AI will fix this in a subsequent run.

---

**AI-proposed fix:**

### Root-cause analysis
The repository has accumulated **code-quality debt** during development: imports that are no longer referenced, functions/variables that are never called, large blocks of commented-out code, and stray `console.log`/`debugger` statements. These artifacts are harmless at runtime but increase bundle size, hurt readability, and make future refactors error-prone. The immediate cause is the absence of an automated linting/formatting step and manual cleanup.

> **Note:** I do not have access to the actual file contents of `Yug-the-pirate-king/Todos-List`, so I cannot give exact line numbers. The fix below is a concrete, repeatable process plus the typical code patterns you should remove. If you paste the project files, I can turn this into a precise patch/PR.

---

### Code changes needed

#### 1. Add linting so dead code is caught automatically
Create or update the project root lint config. For a typical React/Vite/Node project:

**`.eslintrc.json`**
```json
{
  "env": { "browser": true, "es2021": true, "node": true },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "plugins": ["react", "react-hooks", "unused-imports"],
  "rules": {
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "error",
    "no-console": ["warn", { "allow": ["error"] }],
    "no-debugger": "error",
    "no-unreachable": "error"
  },
  "settings": { "react": { "version": "detect" } }
}
```

Then run:
```bash
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unused-imports
npx eslint . --fix
npx prettier --write .
```

#### 2. Manually remove the usual dead-code patterns
Inspect these common files in a Todos app and apply the changes:

| File | Typical dead code to remove |
|------|------------------------------|
| `src/App.js` / `src/App.jsx` | Unused `useEffect`, commented-out state, unused helper imports |
| `src/components/TodoList.*` | Unused props, commented-out `console.log`s |
| `src/components/TodoItem.*` | Unused event handlers, stale `// TODO` notes |
| `src/index.js` | Unused CSS/utility imports |
| `src/utils/*` | Entire files no longer imported anywhere |

Example diff for a React component:

```diff
- import React, { useState, useEffect } from 'react';
+ import { useState } from 'react';
- import { helper } from '../utils/helpers';   // not used
+ import TodoItem from './TodoItem';

export function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');

-  // const archivedTodos = todos.filter(t => t.archived);
-  // console.log('rendering', todos);
-
  return (
    <ul>
      {todos.map(t => <TodoItem key={t.id} todo={t} />)}
    </ul>
  );
}
```

If this is a plain HTML/JS project, the same rules apply in `script.js`:

```diff
- // function oldRender() { ... }
- console.log('loaded');
- var unused = true;
```

#### 3. Verify nothing is broken
```bash
npm test        # or yarn test
npm run build   # ensures no import errors surface at build time
```

---

### Follow-up actions
1. **Open a PR** with a clear title like `chore: remove dead code and unused imports (#3)`.
2. **Add a CI check** (GitHub Actions) that runs `eslint` and `prettier --check` on every pull request so dead code cannot be reintroduced.
3. **Optional:** run `npx depcheck` to remove unused npm dependencies in addition to unused imports.
4. **Close issue #3** once the PR is merged.

If you paste the relevant source files (or the full repo tree), I can generate the exact line-by-line diff for this specific project.
