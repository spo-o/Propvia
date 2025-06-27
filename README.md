# Express TypeScript Project Setup
## DO THESE STEPS

# Install Dependencies

```bash
npm init -y  
npm install express-validator  
npm install --save-dev @types/cors  
npx tsc --init  
npm install --save-dev typescript ts-node-dev @types/node @types/express  
npm install express cors dotenv @supabase/supabase-js
```

# tsconfig.json:
## Replace the whole file (if not create)

```bash
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  }
}
```

# package.json (scripts section):
## Just the scripts part
```bash
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "ts-node-dev --respawn src/app.ts"
}
```
Testing SaveScenarioRoute api