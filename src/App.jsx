
import React from "react";
import Sidebar from "./Sidebar.jsx";
import Editor from "./Editor.jsx";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";
import notesLogo from "./noteslogo.png";
import liblogo from "./reactlogo.png";
import Adminpic from "./adminpic.png";
import Info from "./info.jsx";
import Close from "./close.jsx";
import "./styles.css";


export default function App() {
  const [notes, setNotes] = React.useState(()=>{
    return JSON.parse(localStorage.getItem("notes")) || []
  }
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // console.log(notes[0].body.split("\n"))
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // previous code for static sidebar note arrangement
    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
    // Dynamic arrangement of sidebar notes w.r.t last update
    setNotes(oldNotes => {
      const newArray = [];
      for(let i=0; i<oldNotes.length; i++){
        const oldNote = oldNotes[i];
        if(oldNote.id === currentNoteId){
          newArray.unshift({...oldNote, body: text})
        }else{
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId){
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  const [modal, setModal] = React.useState(false);

  function handleClick(){
    setModal(prevState => !prevState);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
      {/* <img src={info} className="info" alt="" /> */}
      <button onClick={handleClick} className="info"><Info /></button>
      {modal && 
        <div className="overlay">
          <div className="modal">
            <div className="header">
            <img src={notesLogo} alt="notesApp" className="noteslogo" />
            <h2 className="modalheading">MyNotes App</h2>
            <button onClick={handleClick} className="closebtn"><Close /></button>
            </div>
            <div className="modalcontent">
              <p>Greetings! and Welcome to my experimental Vite + React based Notes Application build solely to enhance my skills in making an interactive and responsive App! Heres a detailed description of the Technologies used!</p>
              <div className="reactdesc">
                <img src={liblogo} className="reactlogo" alt="react" />  
                <h4 className="desc"><span className="name">React.js,</span> A JavaScript library for building dynamic and interactive user interfaces.</h4>  
              </div>
              <div className="devdesc">
                <img src={Adminpic} className="adminlogo" alt="admin pic" />
                <h4 className="desc"><span className="name">Aman Shahid,</span> Front-End Developer, UI Designer</h4>
              </div>
              <h3><span className="name">Additional Packages/Features:</span></h3>
              <p>localStorage, react-split, react-mde, nanoid, showdown</p>
            </div>
          </div>
        </div>}
    </main>
  );
}
