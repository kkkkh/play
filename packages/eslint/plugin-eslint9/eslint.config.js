// eslint.config.js
import { defineConfig } from "eslint/config";
import lodash from "./eslint-plugin-lodash.js";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		/*
			ignorePatterns 旧版 eslintrc 配置里使用的
			v9.27.0
			ignorePatterns 弃用
			.eslintignore 也不被支持了（ ESLintIgnoreWarning: The ".eslintignore" file is no longer supported.）
		*/
		ignores: ["eslint-plugin-*.js"],// ignores配置
		// 参考：https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
		// 参考：https://eslint.org/docs/latest/use/configure/ignore
		plugins: {
			lodash,
		},
		rules: {
			"lodash/scope-test": "off",
			"lodash/no-global-import-lodash": "error",
		},
	},
]);
