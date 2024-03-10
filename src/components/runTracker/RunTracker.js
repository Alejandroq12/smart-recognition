import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';

function RunTracker({ userId }) {
  const [runs, setRuns] = useState([]);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`https://afternoon-dawn-26126-1d1d6e776adf.herokuapp.com/run-data/${userId}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (Array.isArray(data)) {
          setRuns(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, [userId]);

  const handleAddRun = () => {
    fetch('https://afternoon-dawn-26126-1d1d6e776adf.herokuapp.com/add-run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        date: new Date().toISOString().slice(0, 10),
        distance_km: distance,
        time_minutes: time,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(runs)) {
        setRuns(prevRuns => [...prevRuns, data]);
        setDistance('');
        setTime('');
      }
    })
    .catch(error => {
      console.error('Error adding run:', error);
    });
  };

  return (
    <div className="pa3 bg-light-gray sans-serif">
      <div className="mw8 center">
        <div className="bg-white br3 shadow-1 pa3 mb3">
          <div className="flex flex-wrap">
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100 w-50-m w-25-l"
              type="number"
              placeholder="Distance (km)"
              value={distance}
              onChange={e => setDistance(e.target.value)}
            />
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100 w-50-m w-25-l"
              type="number"
              placeholder="Time (minutes)"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <button
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue w-100 w-25-m w-15-l"
              onClick={handleAddRun}
            >
              Add Run
            </button>
          </div>
          {error && <div className="red">{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="mt3">
              {runs.length > 0 && (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <LineChart
                    width={Math.min(600, window.innerWidth - 40)} // Set a max width with responsive scaling
                    height={300}
                    data={runs}
                  >
                    <Line type="monotone" dataKey="distance_km" stroke="#8884d8" />
                    <Line type="monotone" dataKey="time_minutes" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </div>
              )}
              <ul className="list pl0">
                {runs.map((run) => (
                  <li key={run.id} className="pa3 pa4-ns bb b--black-20 bg-near-white">
                    {format(new Date(run.date), 'MMM dd, yyyy')}: {parseFloat(run.distance_km).toFixed(1)} km in {Math.floor(run.time_minutes / 60)}:{String(run.time_minutes % 60).padStart(2, '0')} hours
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export default RunTracker;
