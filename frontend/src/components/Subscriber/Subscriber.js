function Subscriber() {
  return (
    <section>
      <h2>Subscriber</h2>
      <div className="row">
        <div className="four columns">
          <div>
            <label for="no-of-sub">No. of subscribers:</label>
            <input type="number" id="no-of-sub" defaultValue="0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscriber;
