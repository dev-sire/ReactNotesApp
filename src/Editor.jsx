import React from "react";
import ReactMde from "react-mde";
import 'react-mde/lib/styles/css/react-mde-all.css';
import showdown from "showdown";
import "./styles.css";
export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
      <section className="pane editor">
        <ReactMde
          value={currentNote.body}
          onChange={updateNote}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={80}
          heightUnits="vh"
          />
      </section>
  );
}