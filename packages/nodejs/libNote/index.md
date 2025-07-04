#### npm-run-all
串行执行
```bash
npm run clean
  && npm run build:css
  && npm run build:js
  && npm run build:html
```
npm-run-all 简化
```bash
npm-run-all clean build:*
```
并行执行
```bash
npm-run-all --parallel clean build:*
```

#### concurrently & wait-on
并行执行
```json
{
  "scripts": {
    "dev": "concurrently \"pnpm run dev2\" \"pnpm run dev1\""
  }
}
```
实现串行执行
```json
{
  "scripts": {
    "dev": "concurrently \"pnpm run dev1\" \"wait-on http://localhost:3000 && pnpm run dev2\""
  }
}
```
