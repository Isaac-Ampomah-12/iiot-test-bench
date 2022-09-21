import "./PubSub.css";

function PubSub({ handlePubSubTest, test, isSending}) {
  return (
    <section id="PubSub">
      <h2>Publish & Subscribe Test</h2>
      <form onSubmit={handlePubSubTest}>
        <div className="row">
          <div>
            <div>
              <label htmlFor="publishTopic">Publish Topic:</label>
              <input
                type="text"
                id="publishTopic"
                className="u-full-width"
                name="publishTopic"
                required
              />
            </div>
            <div>
              <label htmlFor="publishMessage">Publish Message:</label>
              <textarea
                id="publishMessage"
                className="u-full-width"
                name="publishMessage"
                placeholder="Enter message here"
                required
              ></textarea>
            </div>
            <div className="buttons">
              <button type="submit" className="button-primary column">
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
          <div>
            <label>Subscribe Message:</label>
            <div id="message">
              <p>{test.message || "No message"}</p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default PubSub;
