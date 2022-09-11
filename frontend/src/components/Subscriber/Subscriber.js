import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../app/slices/pubSubSlice";

function Subscriber() {
  const [subNumber, setSubNumber] = useState(0);
  const [subTopicLevel, setTopicLevel] = useState(0);

  const performance = useSelector(state => state.subscribe.stats.performance);
  const dispatch = useDispatch();

  useEffect(() => {
    const settings = {
      numberOfSubscribers: subNumber,
      subscriptionTopicLevel: subTopicLevel,
    };
    dispatch(setSettings(settings));
  }, [subNumber, subTopicLevel, dispatch]);
  
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
              min="0"
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
              min="0"
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
              <span>{performance.cpu}</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Memory:</strong>
              </span>
              <span>{performance.memory}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscriber;
