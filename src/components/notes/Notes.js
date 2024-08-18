import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, ListGroup } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { getNotes, createNote, updateNote, deleteNote } from '../../services/notes.service';
import './Notes.css';

const Notes = ({ campaignId }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

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

    const handleNewNote = () => {
        const newNote = { title: '', content: '' };
        setSelectedNote(newNote);
        setContent('');
        setTitle('');
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
        <div style={{ marginInline: '5vh' }}>
            <h2 className='campaign-title'><strong>Campaign Notes</strong></h2>
            {selectedNote ? (
                <>
                    <div style={{ display: 'flex' }}>
                        <h3 className='ms-3'>{title}</h3>
                        <Button onClick={handleSave} style={{ marginRight: '10px', marginLeft: 'auto' }} className="mb-3">
                            {selectedNote.id ? 'Save Note' : 'Create Note'}
                        </Button>
                        {selectedNote.id && (
                            <Button onClick={handleDelete} variant="danger" className="mb-3 ms-2">
                                Delete Note
                            </Button>
                        )}
                    </div>
                    <Editor
                        apiKey={process.env.REACT_APP_TINYMCE_KEY}
                        value={content}
                        init={{
                            height: 500,
                            menubar: false,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: `
                                undo redo | formatselect | bold italic backcolor |
                                alignleft aligncenter alignright alignjustify |
                                bullist numlist outdent indent | removeformat | help
                            `
                        }}
                        onEditorChange={setContent}
                    />
                </>
            ) : (
                <p>Please select a note to edit or add a new note.</p>
            )}
            <ListGroup className="mt-5 mb-3">
                {notes.map(note => (
                    <ListGroup.Item className='noteslist'
                        key={note.id}
                        active={note.id === selectedNote?.id}
                        onClick={() => handleNoteSelect(note)}
                    >
                        {note.title}
                    </ListGroup.Item>
                ))}
                {notes.length === 0 && <p>No notes available</p>}
            </ListGroup>
            <Button onClick={handleNewNote} className="mb-3">Create New Note</Button>
        </div>
    );
};

export default Notes;
