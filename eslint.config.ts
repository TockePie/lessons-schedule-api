import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parserOptions: {
        projectService: true, // Enables type-aware linting via TS project service
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins come first
            ['^node:'],
            // NestJS and other npm packages
            ['^@nestjs', '^@?\\w'],
            // Internal modules and aliases
            ['^(@|src)(/.*|$)'],
            // Side effect imports
            ['^\\u0000'],
            // NestJS application modules
            [
              '^@(modules|controllers|services|entities|repositories|pipes|guards|interceptors|filters|decorators|dto|interfaces)(/.*|$)'
            ],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$']
          ]
        }
      ]
    }
  },
  eslintConfigPrettier,
  eslintNestJs.configs.flatRecommended
])
