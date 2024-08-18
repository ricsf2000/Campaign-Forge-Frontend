import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Sidebar from '../sidebar/Sidebar';
import Button from 'react-bootstrap/Button';

const Maps = ({ mapImage }) => {
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleMapClick = (event) => {
        event.preventDefault();

        if (event.button === 2) { 
            const { offsetX, offsetY } = event.nativeEvent;
            const newNode = {
                x: offsetX,
                y: offsetY,
                title: "New Node",
                description: "Description of the node",
                npcs: ["NPC 1", "NPC 2"],
                notableCharacteristics: "Notable characteristics of the location",
                questHooks: "Quest hooks related to this location"
            };
            setNodes([...nodes, newNode]);
            setSelectedNode(newNode);
        }
    };

    const handleNodeClick = (node) => {
        setSelectedNode(node); 
    };

    const handleSaveNode = (editedNode) => {
        setNodes(nodes.map(node => 
            node === selectedNode ? editedNode : node
        ));
        setSelectedNode(editedNode);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#00000090' }}>
                <TransformWrapper
                    defaultPositionX={0}
                    defaultPositionY={0}
                    defaultScale={1}
                    limitToBounds={false}
                    centerContent={false} 
                    minScale={0.5} 
                    maxScale={5} 
                >
                    {({ resetTransform, centerView }) => (
                        <>
                            <Button 
                                variant="light" 
                                onClick={() => {
                                    console.log("Recenter button clicked");
                                    resetTransform();
                                    centerView(); 
                                }} 
                                style={{ position: 'relative', top: '10px', left: '10px', zIndex: 1000 }}
                            >
                                Recenter
                            </Button>
                            <TransformComponent>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                    onMouseDown={handleMapClick}
                                    onContextMenu={(e) => e.preventDefault()} 
                                >
                                    <img src={mapImage} alt="Map" 
                                         style={{ 
                                             width: '100%', 
                                             maxHeight: '100%', 
                                             height: 'auto', 
                                             display: 'block', 
                                             objectFit: 'contain'
                                         }} 
                                    />
                                    {nodes.map((node, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                top: node.y,
                                                left: node.x,
                                                width: '10px',
                                                height: '10px',
                                                backgroundColor: 'black',
                                                borderRadius: '50%',
                                                border: '2px solid white',
                                                transform: 'translate(-50%, -50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleNodeClick(node);
                                            }}
                                        />
                                    ))}
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
            <Sidebar selectedNode={selectedNode} onSaveNode={handleSaveNode} /> 
        </div>
    );
};

export default Maps;

