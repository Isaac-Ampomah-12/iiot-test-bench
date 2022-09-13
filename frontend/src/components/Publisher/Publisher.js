import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../../app/slices/pubSubSlice";

function Publisher() {
  const [pubNumber, setPubNumber] = useState(1);
  const [pubInterval, setPubInterval] = useState(10);
  const [pubTopicLevel, setPubTopicLevel] = useState(1);
  const [msgSize, setMsgSize] = useState(1);

  const performance = useSelector(state => state.pubsub.pub);
  const dispatch = useDispatch();

  useEffect(() => {
    const settings = {
      numberOfPublishers: pubNumber,
      publishTopicLevel: pubTopicLevel,
      publishInterval: pubInterval,
      messageSize: msgSize,
    };
    dispatch(setSettings(settings));
  }, [pubNumber, pubTopicLevel, pubInterval, msgSize, dispatch]);

  return (
    <section id="publisher">
      <h2>Publisher</h2>
      <div className="row">
        <div className="four columns">
          <label htmlFor="no-of-pub">No. of publishers:</label>
          <input
            type="number"
            id="no-of-pub"
            className="u-full-width"
            name="publisherNumber"
            min="1"
            value={pubNumber}
            onChange={({ target }) => setPubNumber(target.value)}
          />
        </div>
        <div className="four columns">
          <div>
            <label htmlFor="topic-levels">Topic Levels:</label>
            <input
              type="number"
              id="topic-levels"
              className="u-full-width"
              min="1"
              value={pubTopicLevel}
              onChange={({ target }) => setPubTopicLevel(target.value)}
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
              <span>{performance.publishCpuUsage || 0}</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Memory:</strong>
              </span>
              <span>{performance.publishMemoryUsage || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ paddingTop: "0" }}>
        <div className="four columns">
          <label htmlFor="message-size" style={{ display: "inline" }}>
            Message Size: &#40;kb&#41;:
          </label>
          <output
            htmlFor="message-size"
            style={{ display: "inline", paddingLeft: "1rem" }}
          >
            {msgSize}
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
              id="message-size"
              className="u-full-width"
              min="1"
              max="1024"
              step="1"
              style={{ marginBottom: "0" }}
              value={msgSize}
              onChange={({target}) => setMsgSize(target.value)}
            />
          </div>
        </div>
        <div className="four columns">
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
              value={pubInterval}
              onChange={({ target }) => setPubInterval(target.value)}
              style={{ marginBottom: "0" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publisher;