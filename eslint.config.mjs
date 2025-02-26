import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			semi: ["error", "always"],
			"object-curly-newline": ["error", { multiline: true, consistent: true }],
			"react/jsx-curly-newline": [
				"error",
				{ multiline: "consistent", singleline: "consistent" },
			],
		},
	},
];

export default eslintConfig;
