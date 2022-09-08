import { useState } from "react";

function Publisher() {
  const [pubNumber, setPubNumber] = useState(0);
  
  return (
    <section id="publisher">
      <h2>Publisher</h2>
      <form id="publisher-settings">
        <div className="row">
          <div className="four columns">
            <div>
              <label htmlFor="no-of-pub">No. of publishers:</label>
              <input
                type="number"
                id="no-of-pub"
                className="u-full-width"
                name="publisherNumber"
                min="0"
                value={pubNumber}
                onChange={({target}) => setPubNumber(target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Publisher;