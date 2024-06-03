# Bit Logo

**A React component for generating random logos with animated colors.**
## Installation

```bash

npm install bitlogo
```
## Example Usage
```
import React from 'react';
import { BitLogo } from 'bitlogo';
function App() {
  return (
    <div>
      <BitLogo penSize={10} canvasSize={64} colorList={['#f5ffc6ff', '#b4e1ffff', '#ab87ffff']} animationSpeed={1000} />
    </div>
  );
}
export default App;

```
## Props
- `penSize` (number): Size of each pen (default: 10)
- `canvasSize` (number): Size of the canvas (default: 64)
- `colorList` (array): List of colors to use (default: ['#f5ffc6ff', '#b4e1ffff', '#ab87ffff', '#fface4ff', '#c1ff9bff'])
- `animationSpeed` (number): Speed of the animation in milliseconds (default: 1000)