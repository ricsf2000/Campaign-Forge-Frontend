import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Sidebar from '../sidebar/Sidebar';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { getMaps, createMap, updateMap } from '../../services/maps.service';
import { addNodeToMap, updateNodeInMap, deleteNodeFromMap } from '../../services/nodes.service'; 

const Maps = ({ campaignId }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [mapId, setMapId] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [mapImage, setMapImage] = useState("");
    const [isEditingURL, setIsEditingURL] = useState(false);
    const [tempURL, setTempURL] = useState("");

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await getMaps(campaignId, accessToken);
                if (response.data && response.data.length > 0) {
                    const mapData = response.data[0];
                    setMapId(mapData.id);
                    setMapImage(mapData.imageUrl);
                    setNodes(mapData.nodes || []);
                } else {
                    const newMapResponse = await createMap(campaignId, { imageUrl: "", nodes: [] }, accessToken);
                    if (newMapResponse.data) {
                        setMapId(newMapResponse.data.id);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch or create map:", error);
            }
        };

        fetchMap();
    }, [campaignId, getAccessTokenSilently]);

    const handleMapClick = async (event) => {
        event.preventDefault();
    
        if (event.button === 2) { 
            const imgElement = event.currentTarget.querySelector('img');
            const { offsetX, offsetY } = event.nativeEvent;
    
            const xPercent = (offsetX / imgElement.offsetWidth) * 100;
            const yPercent = (offsetY / imgElement.offsetHeight) * 100;
    
            const newNode = {
                x: xPercent,
                y: yPercent,
                title: "New Node",
                description: "Description of the node",
                npcs: ["NPC 1", "NPC 2"],
                notableCharacteristics: "Notable characteristics of the location",
                questHooks: "Quest hooks related to this location"
            };
    
            const savedNode = await handleSaveNode(newNode);
            setSelectedNode(savedNode);
        }
    };
    
    

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    const handleSaveNode = async (editedNode) => {
        const accessToken = await getAccessTokenSilently();
    
        if (editedNode.id) {
            await updateNodeInMap(mapId, editedNode.id, editedNode, accessToken);
            
            setNodes(nodes.map(node => node.id === editedNode.id ? editedNode : node));
        } else {
            const response = await addNodeToMap(mapId, editedNode, accessToken);
            if (response.data) {
                const newNode = { ...editedNode, id: response.data.nodes[response.data.nodes.length - 1].id };
                
                setNodes([...nodes, newNode]);
                setSelectedNode(newNode); 
                return newNode;
            }
        }
        
        setSelectedNode(editedNode);
    };
    

    const handleDeleteNode = async (editedNode) => {
        console.log(editedNode)
        if (editedNode && editedNode.id) {
            try {
                const accessToken = await getAccessTokenSilently();
    
                await deleteNodeFromMap(mapId, editedNode.id, accessToken);
                setNodes(nodes.filter(node => node.id !== editedNode.id));
                if (selectedNode?.id === editedNode.id) {
                    setSelectedNode(null);
                }
    
                console.log("Node deleted successfully");
            } catch (error) {
                console.error("Failed to delete node:", error);
            }
        } else {
            console.log("No node selected or node ID is missing");
        }
    };
    

    const handleEditURL = () => {
        setTempURL(mapImage);
        setIsEditingURL(true);
    };

    const handleSaveURL = async () => {
        const url = tempURL.trim();

        if (!url) {
            alert('Please enter a valid URL.');
            return;
        }

        const isValidURL = (str) => {
            try {
                new URL(str);
                return true;
            } catch {
                return false;
            }
        };

        if (!isValidURL(url)) {
            alert('Invalid URL. Please enter a valid URL.');
            return;
        }

        const sanitizedURL = url.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        try {
            const accessToken = await getAccessTokenSilently();
            if (mapId) {
                await updateMap(mapId, { imageUrl: sanitizedURL, nodes, campaignId }, accessToken);
            } else {
                const newMapResponse = await createMap(campaignId, { imageUrl: sanitizedURL, nodes }, accessToken);
                if (newMapResponse.data) {
                    setMapId(newMapResponse.data.id);
                }
            }
            setMapImage(sanitizedURL);
            setIsEditingURL(false);
        } catch (error) {
            console.error("Failed to save map URL:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingURL(false);
        setTempURL("");
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#00000090' }}>
                <div style={{ position: 'relative', top: '10px', left: '10px', zIndex: 1000 }}>
                    {!isEditingURL ? (
                        <>
                            <span style={{ marginRight: '10px', color: 'white' }}>{mapImage || "No map URL set"}</span>
                            <Button variant="light" onClick={handleEditURL}>
                                Edit Map URL
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => setMapImage("")}
                                disabled={!mapImage}
                                style={{ marginLeft: '10px' }}
                            >
                                Clear Map
                            </Button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter map image URL"
                                value={tempURL}
                                onChange={(e) => setTempURL(e.target.value)}
                                style={{ width: '300px', marginRight: '10px' }}
                            />
                            <Button variant="light" onClick={handleSaveURL}>
                                Save
                            </Button>
                            <Button variant="light" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
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
                                    style={{ position: 'relative', width: '100%', height: 'auto' }}
                                    onMouseDown={handleMapClick}
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    {mapImage && (
                                        <img src={mapImage} alt="Map"
                                             style={{
                                                 width: '100%',
                                                 maxHeight: '100%',
                                                 height: 'auto',
                                                 minWidth: '200vh',
                                                 display: 'block',
                                                 objectFit: 'contain'
                                             }}
                                        />
                                    )}
                                    {nodes.map((node, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                top: `${node.y}%`, 
                                                left: `${node.x}%`, 
                                                width: '1.3vh',
                                                height: '1.3vh',
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
            <Sidebar selectedNode={selectedNode} onSaveNode={handleSaveNode} onDeleteNode={handleDeleteNode} />
        </div>
    );
};

export default Maps;
