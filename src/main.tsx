import { DisplayMode, Engine } from "excalibur";
import { Menu, calculateExPixelConversion } from "./ui";
import { loader } from "./resources";

import * as React from 'react';
import { createContext } from "react";
import { createRoot } from 'react-dom/client';
import App from './App';

const game = new Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    pixelArt: true,
    displayMode: DisplayMode.FitScreen
});

game.screen.events.on('resize', () => calculateExPixelConversion(game.screen));

game.start(loader).then(() => {
    calculateExPixelConversion(game.screen);
    // const menu = new Menu(game.currentScene);
});

export const ExcaliburContext = createContext(game);

const domNode = document.getElementById('menu-root')!;
const root = createRoot(domNode);

root.render(
    <ExcaliburContext.Provider value={game}>
        < App />
    </ExcaliburContext.Provider>
);