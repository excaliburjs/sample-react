import * as React from "react";
import { ExcaliburContext } from "./main";
import { useContext, useEffect, useState } from "react";
import { Actor, Color, vec, Vector } from "excalibur";
import { IdleAnimation } from "./resources";

export default function ExcaliburUiApp() {
    const [visible, setVisible] = useState(false);
    const [worldPos, setWorldPos] = useState(Vector.Zero);
    const [screenPos, setScreenPos] = useState(Vector.Zero);
    const engine = useContext(ExcaliburContext);
    useEffect(() => {
        const pointerSubscription = engine.input.pointers.on('down', (evt) => {
            setVisible(true);
            setWorldPos(engine.screen.pageToWorldCoordinates(vec(evt.pagePos.x, evt.pagePos.y)));
            setScreenPos(evt.pagePos);
        });

        // return cleanup
        return () => {
            pointerSubscription.close();
        }
    });

    function addUnit() {
        const actor = new Actor({
            pos: worldPos,
            scale: vec(2, 2),
            color: Color.Red
        });
        actor.graphics.use(IdleAnimation);
        engine.currentScene.add(actor);
        setVisible(false);
    }

    function removeUnit() {
        for (let actor of engine.currentScene.actors) {
            if (actor.graphics.bounds.contains(worldPos)) {
                actor.kill();
            }
        }
        setVisible(false);
    }

    return (
        <div 
            className="menu" 
            style={{
                position: 'absolute',
                visibility: visible ? 'visible' : 'hidden',
                width: '100px',
                left: screenPos.x + 'px',
                top: screenPos.y + 'px'
            }}>
            <h3>Menu</h3>
            <button onClick={addUnit}>Add Unit</button>
            <button onClick={removeUnit}>Remove Unit</button>
        </div>
    );
}
