# DeckGL IconLayer - Angular 18 Baseline (Working)

Baseline project demonstrating that DeckGL's `IconLayer` renders correctly in Angular 18.

## Purpose

This project serves as a **control/baseline** to prove that the IconLayer rendering issue is specific to Angular 19+. The exact same DeckGL code that fails in Angular 19 works perfectly in Angular 18.

### Expected Behavior (and Actual!)

- ✅ **ScatterplotLayer**: Renders correctly (red circles visible)
- ✅ **IconLayer**: Renders correctly (blue camera icons visible)

## Environment

- **Angular**: 18.2.21
- **DeckGL**: 9.0.33 (exact source project version)
- **Mapbox GL**: 2.9.0 (exact source project version)
- **Node**: v25.2.1

## Comparison

| Feature | Angular 18 | Angular 19 |
|---------|------------|------------|
| ScatterplotLayer | ✅ Works | ✅ Works |
| IconLayer | ✅ Works | ❌ Broken |
| TextLayer | ✅ Works | ❌ Broken |
| Workaround needed | No | Yes (loader registration) |

## Reproduction Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your Mapbox access token**
   - Sign up for a free account at https://account.mapbox.com/
   - Create an access token
   - Open `src/app/app.component.ts`
   - Replace `YOUR_MAPBOX_ACCESS_TOKEN_HERE` with your actual token

3. **Run the development server**
   ```bash
   npm start
   ```

4. **Open browser**
   - Navigate to http://localhost:4200
   - You should see:
     - ✅ Red circles (ScatterplotLayer)
     - ✅ Blue camera icons (IconLayer)
   - Check console for "BOTH render correctly" message

## Code Structure

- `src/app/app.component.ts`: **Identical code** to Angular 19 project
  - Same ScatterplotLayer configuration
  - Same IconLayer configuration with SVG camera icons
  - Same Mapbox GL setup
  - **No workarounds or fixes needed!**

## Key Findings

1. **Same code works in Angular 18** - The issue is introduced in Angular 19
2. **No loader registration needed** - Angular 18 doesn't strip DeckGL's loader registration
3. **No Zone.js accommodations needed** - Default Angular 18 configuration works fine
4. **Using source project versions** - DeckGL 9.0.33 and Mapbox GL 2.9.0 (exact versions from working project)

## Notes

- This is the **baseline/control** project
- Default Angular 18 configuration is used
- No modifications or workarounds applied
- Demonstrates the issue is Angular 19-specific

## Related Projects

See the companion Angular 19 reproduction project (`deckgl-iconlayer-repro`) that demonstrates the broken behavior with the same code.
