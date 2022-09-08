import { useState } from "react";

function Subscriber() {
  const [subNumber, setSubNumber] = useState(0);
  
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
              value={subNumber}
              onChange={({ target }) => setSubNumber(target.value)}
            />
          </div>
        </div>
        <div className="four columns">
          <div>
            <label htmlFor="topic-levels">Topic Levels:</label>
            <input type="number" id="topic-levels" defaultValue="0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscriber;
