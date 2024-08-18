import React, { useState } from 'react';
import {Button } from 'react-bootstrap';

const Sidebar = ({ selectedNode, onSaveNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNode, setEditedNode] = useState(selectedNode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNode(prevNode => ({
            ...prevNode,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        onSaveNode(editedNode);
    };

    React.useEffect(() => {
        setEditedNode(selectedNode);
        setIsEditing(false);
    }, [selectedNode]);

    return (
        <div
            style={{
                width: '250px',
                backgroundColor: '#111',
                color: 'white',
                padding: '15px',
                overflowY: 'auto',
                zIndex: 1000
            }}
        >
            <h4>Location Information</h4>
            {selectedNode ? (
                <div>
                    {isEditing ? (
                        <>
                            <Button variant='secondary' className="mb-3 me-3"  onClick={handleSave}>Save</Button>
                            <Button variant='secondary' className="mb-3"  onClick={() => setIsEditing(false)}>Cancel</Button>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={editedNode.title || ""}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={editedNode.description || ""}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                NPCs:
                                <input
                                    type="text"
                                    name="npcs"
                                    value={editedNode.npcs.join(", ") || ""}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Notable Characteristics:
                                <textarea
                                    name="notableCharacteristics"
                                    value={editedNode.notableCharacteristics || ""}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Quest Hooks:
                                <textarea
                                    name="questHooks"
                                    value={editedNode.questHooks || ""}
                                    onChange={handleChange}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <Button variant='secondary' className="mb-3" onClick={() => setIsEditing(true)}>Edit</Button>
                            <p><strong>Title:</strong> {selectedNode.title}</p>
                            <p><strong>Description:</strong> {selectedNode.description}</p>
                            <p><strong>NPCs:</strong> {selectedNode.npcs.join(", ")}</p>
                            <p><strong>Notable Characteristics:</strong> {selectedNode.notableCharacteristics}</p>
                            <p><strong>Quest Hooks:</strong> {selectedNode.questHooks}</p>
                        </>
                    )}
                </div>
            ) : (
                <p>No node selected</p>
            )}
        </div>
    );
};

export default Sidebar;
