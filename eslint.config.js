import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * The source is TypeScript now, so the config has to cover `.ts`/`.tsx` as
 * well. Before this, `eslint .` matched only `.js`/`.jsx` (of which there are
 * none left), so `npm run lint` exited 0 without linting a single file.
 */
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    /*
     * Everything under `src/components/ui` is vendored verbatim from shadcn/ui
     * (plus the supplied `chat.tsx` and its two helpers). Those files follow
     * upstream conventions that the app-level config disagrees with, so the
     * three rules below are scoped off here rather than rewritten: rewriting
     * them would break their drop-in-replacement property:
     *
     *  - react-refresh/only-export-components: every panel exports the
     *    components plus their `cva` variants from one file.
     *  - @typescript-eslint/no-empty-object-type: the upstream `InputProps` and
     *    `TextareaProps` interfaces extend their DOM props without adding
     *    members.
     *  - no-unused-vars: `chat.tsx` deliberately destructures properties such as
     *    `multiline: _` in order to omit them from the rest object.
     *
     * Nothing else is relaxed here: correctness rules such as the react-hooks
     * checks still apply to these files, which is how the `useComposedRefs`
     * dependency-list bug in chat-utils was found and fixed.
     */
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_$', argsIgnorePattern: '^_' },
      ],
    },
  },
])
