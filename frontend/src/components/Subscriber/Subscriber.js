import { useState } from "react";

function Subscriber() {
  const [subNumber, setSubNumber] = useState(0);
  const [subTopicLevel, setTopicLevel] = useState(0);

  return (
    <section>
      <h2>Subscriber</h2>
      <div className="row">
        <div className="four columns">
          <div>
            <label htmlFor="no-of-sub">No. of subscribers:</label>
            <input
              type="number"
              id="no-of-sub"
              className="u-full-width"
              value={subNumber}
              onChange={({ target }) => setSubNumber(target.value)}
            />
          </div>
        </div>
        <div className="four columns">
          <div>
            <label htmlFor="topic-levels">Topic Levels:</label>
            <input
              type="number"
              id="topic-levels"
              className="u-full-width"
              value={subTopicLevel}
              onChange={({ target }) => setTopicLevel(target.value)}
            />
          </div>
        </div>
        <div className="four columns">
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

export default Subscriber;
