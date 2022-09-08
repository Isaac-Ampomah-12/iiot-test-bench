import { useState } from "react";

function Publisher() {
  const [pubNumber, setPubNumber] = useState(0);
  const [pubInterval, setPubInterval] = useState(0);
  const [pubTopicLevel, setPubTopicLevel] = useState(0);

  return (
    <section id="publisher">
      <h2>Publisher</h2>
      <div className="row">
        <div className="three columns">
          <label htmlFor="no-of-pub">No. of publishers:</label>
          <input
            type="number"
            id="no-of-pub"
            className="u-full-width"
            name="publisherNumber"
            min="0"
            value={pubNumber}
            onChange={({ target }) => setPubNumber(target.value)}
          />
        </div>
        <div className="three columns">
          <div>
            <label htmlFor="topic-levels">Topic Levels:</label>
            <input
              type="number"
              id="topic-levels"
              className="u-full-width"
              min="0"
              value={pubTopicLevel}
              onChange={({ target }) => setPubTopicLevel(target.value)}
            />
          </div>
        </div>
        <div className="three columns">
          <label htmlFor="interval" style={{ display: "inline" }}>
            Interval &#40;ms&#41;:
          </label>
          <output
            htmlFor="interval"
            style={{ display: "inline", paddingLeft: "1rem" }}
          >
            {pubInterval}
          </output>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justityContent: "center",
            }}
          >
            <input
              type="range"
              id="interval"
              className="u-full-width"
              min="0"
              max="10000"
              step="100"
              title={pubInterval}
              value={pubInterval}
              onChange={({ target }) => setPubInterval(target.value)}
              style={{ marginBottom: "0" }}
            />
          </div>
        </div>
        <div className="three columns">
          <h3>Performance</h3>
          <div className="info">
            <div className="info-item">
              <span>
                <strong>CPU:</strong>
              </span>
              <span>0</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Memory:</strong>
              </span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publisher;