# Despliegue

La aplicación se publica en **GitHub Pages** mediante **GitHub Actions**. Cada push a `main`
ejecuta las pruebas, hace el build de producción y publica el sitio.

- **URL de producción:** `https://opt-kor.github.io/Belman-sCalculator/`
- **Workflow:** [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (en la raíz del repo,
  que es donde GitHub lo requiere). En esta carpeta hay una copia de solo lectura
  ([`deploy.yml`](./deploy.yml)) para revisión.

## Configuración por única vez (en GitHub)

1. Ir a **Settings → Pages** del repositorio `OPT-KOR/Belman-sCalculator`.
2. En **Build and deployment → Source**, elegir **GitHub Actions**.
3. Listo. El primer push a `main` (o ejecutar el workflow manualmente desde la pestaña
   **Actions → Desplegar a GitHub Pages → Run workflow**) publica el sitio.

## Cómo funciona el workflow

| Paso | Detalle |
|---|---|
| `actions/checkout@v4` | Descarga el repositorio. |
| `actions/setup-node@v4` | Node 20 con caché de npm. |
| `npm ci` | Instala dependencias del workspace (raíz). |
| `npm test` | Ejecuta la suite de Vitest. Si falla, **no se despliega**. |
| `npm run build` con `GITHUB_PAGES=true` | Build con `base: '/Belman-sCalculator/'` (necesario para un *project site*). Salida: `Fase 2 - Diseño e Implementacion/implementacion/dist`. |
| `actions/upload-pages-artifact@v3` | Sube `dist/` como artefacto de Pages. |
| `actions/deploy-pages@v4` | Publica el artefacto en el entorno `github-pages`. |

## El `base path`

Al ser un *project site* (`usuario.github.io/<repo>/`), los recursos deben resolverse bajo
`/Belman-sCalculator/`. Esto lo controla la variable de entorno `GITHUB_PAGES` en
[`vite.config.js`](../../Fase%202%20-%20Dise%C3%B1o%20e%20Implementacion/implementacion/vite.config.js):

```js
base: process.env.GITHUB_PAGES === 'true' ? '/Belman-sCalculator/' : '/',
```

En local (`npm run dev`) el `base` es `/`; en CI se activa el `base` de Pages.

## Despliegue manual (alternativa sin Actions)

```bash
GITHUB_PAGES=true npm run build
npx gh-pages -d "Fase 2 - Diseño e Implementacion/implementacion/dist"
```

Requiere el paquete `gh-pages` y que en **Settings → Pages** la *Source* sea la rama `gh-pages`.

## Alternativa: Vercel

Si se prefiere Vercel en lugar de Pages:

1. Importar el repo en Vercel.
2. **Root Directory:** `Fase 2 - Diseño e Implementacion/implementacion`.
3. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
4. No definir `GITHUB_PAGES` (Vercel sirve desde la raíz del dominio, `base` debe ser `/`).

## Verificación posterior al despliegue

- [ ] La página carga sin errores 404 en consola (revisar rutas de `assets/`).
- [ ] Las 4 operaciones funcionan.
- [ ] La división entre cero muestra el mensaje de error y se recupera.
- [ ] El teclado físico responde.
