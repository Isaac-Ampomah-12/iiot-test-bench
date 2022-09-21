import "./PubSub.css";

function PubSub({ handlePubSubTest, test, isSending}) {
  return (
    <section id="PubSub">
      <h2>Publish & Subscribe Test</h2>
      <form onSubmit={handlePubSubTest}>
        <div className="column">
          <div className="row">
            <div>
              <label htmlFor="publishTopic">Topic:</label>
              <input
                type="text"
                id="publishTopic"
                className="u-full-width"
                name="publishTopic"
                required
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
                required
              ></textarea>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="button-primary">
              {isSending ? 'Sending' : 'Send'}
            </button>
          </div>
        </div>
        <div className="column" id="message">
          <p>{test.message || 'No message'}</p>
        </div>
      </form>
    </section>
  );
}

export default PubSub;
