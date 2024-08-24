import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Sidebar = ({ selectedNode, onSaveNode, onDeleteNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNode, setEditedNode] = useState(selectedNode);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'npcs') {
            const newNpcs = [...editedNode.npcs];
            newNpcs[index] = value;
            setEditedNode(prevNode => ({
                ...prevNode,
                npcs: newNpcs,
            }));
        } else {
            setEditedNode(prevNode => ({
                ...prevNode,
                [name]: value,
            }));
        }
    };

    const handleAddNpc = () => {
        setEditedNode(prevNode => ({
            ...prevNode,
            npcs: [...prevNode.npcs, ""],
        }));
    };

    const handleRemoveNpc = (index) => {
        setEditedNode(prevNode => ({
            ...prevNode,
            npcs: prevNode.npcs.filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        onSaveNode(editedNode);
    };

    const handleDelete = () => {
        setIsEditing(false);
        onDeleteNode(editedNode)
    }

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
                            <Button variant='secondary' className="mb-3 me-3" onClick={handleSave}>Save</Button>
                            <Button variant='secondary' className="mb-3 me-3" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button variant='danger' className="mb-3" onClick={handleDelete}>Delete Node</Button>
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
                                {editedNode.npcs.map((npc, index) => (
                                    <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
                                        <input
                                            type="text"
                                            name="npcs"
                                            value={npc || ""}
                                            onChange={(e) => handleChange(e, index)}
                                            style={{ flexGrow: 1 }}
                                        />
                                        <Button variant="danger" onClick={() => handleRemoveNpc(index)} style={{ marginLeft: '5px' }}>X</Button>
                                    </div>
                                ))}
                                <Button variant="primary" onClick={handleAddNpc}>Add NPC</Button>
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
                            <p><strong>NPCs:</strong></p>
                                <ul>
                                    {selectedNode.npcs.map((npc, index) => (
                                        <li key={index}>{npc}</li>
                                    ))}
                                </ul>
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
