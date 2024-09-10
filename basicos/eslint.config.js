import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      "@typescript-eslint/naming-convention": [
        "error", // Define a severidade como "erro"
        {
          "selector": "variable", // Aplica a regra a variáveis
          "format": ["camelCase", "UPPER_CASE"], // Permite camelCase e UPPER_CASE
        },
        {
          "selector": "function", // Aplica a regra a funções
          "format": ["PascalCase"], // Permite camelCase e PascalCase
        },
        {
          "selector": "class", // Aplica a regra a classes
          "format": ["PascalCase"], // Permite apenas PascalCase
        },
        // Adicione mais configurações para outros tipos de identificadores, se necessário
      ],
    },
  },
)
