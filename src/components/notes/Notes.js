import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, ListGroup, Col, Row, Container, Spinner } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { getNotes, createNote, updateNote, deleteNote } from '../../services/notes.service';
import './Notes.css';

const Notes = ({ campaignId }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const { data } = await getNotes(campaignId, accessToken);
                setNotes(data);
                if (data.length > 0) {
                    setSelectedNote(data[0]);
                    setContent(data[0].content);
                    setTitle(data[0].title);
                }
            } catch (err) {
                console.error('Failed to fetch notes:', err);
            }
        };

        fetchNotes();
    }, [campaignId, getAccessTokenSilently]);

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
        setContent(note.content);
        setTitle(note.title);
    };

    const extractTitleFromContent = (content) => {
        const firstLine = content.split('\n')[0] || 'Untitled Note';
        return firstLine.replace(/<[^>]*>?/gm, '').trim();
    };

    const handleSave = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const extractedTitle = extractTitleFromContent(content);

            if (selectedNote && selectedNote.id) {
                const updatedNote = { ...selectedNote, content, title: extractedTitle };
                await updateNote(selectedNote.id, updatedNote, accessToken);
                setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
                setTitle(extractedTitle);
            } else {
                const newNote = { title: extractedTitle, content };
                const { data } = await createNote(campaignId, newNote, accessToken);
                setNotes([...notes, data]);
                setSelectedNote(data);
                setTitle(extractedTitle);
            }
        } catch (err) {
            console.error('Failed to save note:', err);
        }
    };

    const handleNewNote = async () => {
        setLoading(true); 
        try {
            const accessToken = await getAccessTokenSilently();
            const newNote = { title: 'New Note', content: '' };
            const { data } = await createNote(campaignId, newNote, accessToken);
            setNotes([...notes, data]);
            setSelectedNote(data);
            setContent('');
            setTitle('New Note');
        } catch (err) {
            console.error('Failed to create note:', err);
        } finally {
            setLoading(false); 
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedNote && selectedNote.id) {
                const accessToken = await getAccessTokenSilently();
                await deleteNote(selectedNote.id, accessToken);
                setNotes(notes.filter(note => note.id !== selectedNote.id));
                setSelectedNote(null);
                setContent('');
                setTitle('');
            }
        } catch (err) {
            console.error('Failed to delete note:', err);
        }
    };

    return (
        <Container fluid >
            <Row style={{ height: '100vh', overflow: 'hidden' }}>
            <Col md={2} style={{ backgroundColor: 'transparent', padding: '20px', overflowY: 'auto'}}>
                <h4><strong>Notes</strong></h4>
                <ListGroup className="mb-3 list-group-flush">
                    {notes.map(note => (
                        <ListGroup.Item 
                            className="noteslist"
                            key={note.id}
                            active={note.id === selectedNote?.id}
                            onClick={() => handleNoteSelect(note)}
                            style={{ cursor: 'pointer' }}
                        >
                            {note.title || 'Untitled Note'}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button 
                    onClick={handleNewNote} 
                    className="mb-3 w-100" 
                    disabled={loading} 
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Create New Note'}
                </Button>
            </Col>

            <Col md={10} className="note-editor" style={{ padding: '20px', overflowY: 'auto' }}>
                <h2 className='campaign-title'><strong>{selectedNote ? title : 'No Note Selected'}</strong></h2>
                {selectedNote ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Button onClick={handleSave} style={{ marginRight: '10px' }}>
                                {selectedNote.id ? 'Save Note' : 'Create Note'}
                            </Button>
                            {selectedNote.id && (
                                <Button onClick={handleDelete} variant="danger">
                                    Delete Note
                                </Button>
                            )}
                        </div>
                        <Editor
                            apiKey={process.env.REACT_APP_TINYMCE_KEY}
                            init={{
                                skin: 'oxide-dark',
                                content_css: 'dark',
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            value={content}
                            onEditorChange={setContent}
                        />
                    </>
                ) : (
                    <p>Please select a note to edit or create a new note.</p>
                )}
            </Col>
        </Row>
        </Container>
    );
};

export default Notes;
