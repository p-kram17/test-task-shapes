## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

or

```bash
npm start
```

The application will be available at `http://localhost:8080` (or the port shown in the terminal).

## Build

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Scripts

- `npm start` / `npm run dev` - Start development server
- `npm run build` - Build for production (includes linting and type checking)
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── controller/     # UI controls
├── core/          # Core game logic (events, factories)
├── model/         # Data models (shapes, world)
├── view/          # Rendering (Pixi.js views)
└── main.ts        # Entry point
```

## Technologies

- **Pixi.js** - 2D WebGL renderer
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
