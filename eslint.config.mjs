import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/*.js", "**/*.d.ts"]), {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "commonjs",
    },
    ignores: [
        "*.*js",
        "*.d.ts"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-var-requires": ["off"],
        "@typescript-eslint/no-inferrable-types": ["off"],
        indent: ["off", "tab"],
        "linebreak-style": ["warn", "unix"],
        "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],

        quotes: ["warn", "single", {
            allowTemplateLiterals: true,
        }],

        semi: ["warn", "always"],
        "comma-dangle": ["warn", "always-multiline"],
    },
}]);