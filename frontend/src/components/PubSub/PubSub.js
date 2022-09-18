import "./PubSub.css";

function PubSub() {
  return (
    <section id="PubSub">
      <h3>Publish & Subscribe</h3>
      <form>
        <div className="column">
          <div className="row">
            <div>
              <label for="publishTopic">Topic:</label>
              <input
                type="text"
                id="publishTopic"
                className="u-full-width"
                name="publishTopic"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default PubSub;
