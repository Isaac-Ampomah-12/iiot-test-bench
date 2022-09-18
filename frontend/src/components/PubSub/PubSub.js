import "./PubSub.css";

function PubSub() {
  return (
    <section id="PubSub">
      <h3>Publish & Subscribe</h3>
      <form>
        <div className="column">
          <div className="row">
            <div>
              <label htmlFor="publishTopic">Topic:</label>
              <input
                type="text"
                id="publishTopic"
                className="u-full-width"
                name="publishTopic"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="publishMessage">Message:</label>
              <textarea
                id="publishMessage"
                className="u-full-width"
                name="publishMessage"
                placeholder="Enter message here"
              ></textarea>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="button-primary">
              Send
            </button>
          </div>
        </div>
        <div className="column">
          <output htmlFor="publishMessage">Publish Message</output>
        </div>
      </form>
    </section>
  );
}

export default PubSub;
