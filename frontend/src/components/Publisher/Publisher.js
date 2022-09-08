function Publisher() {
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
                name="publisherNumber"
                defaultValue="0"
                min="0"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Publisher;