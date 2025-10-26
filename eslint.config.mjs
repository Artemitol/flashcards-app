import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import { dirname } from "path"
import { fileURLToPath } from "url"
import prettierPlugin from "eslint-plugin-prettier"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    ...compat.extends("prettier"),
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "warn",
        },
    },
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
    },
]

export default eslintConfig
