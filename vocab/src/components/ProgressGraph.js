import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../ApiCall/userContext';
import { Box } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProgressGraph() {
  const { userId } = useContext(UserContext);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (!userId) {
          console.log('User ID required');
          setError('User ID is required');
          return; // Early return if userId is not available
        }

        const response = await axios.get('http://localhost:5000/p/progress', {
          params: { userId },
        });

        const levels = response.data.levels || [];
        const progress = response.data.totalProgress || 0;

        // Prepare the data for the graph by calculating the average progress of each level
        const data = levels.map((level, index) => {
          const totalModuleValue = level.modules.reduce((sum, module) => sum + module.value, 0);
          const averageProgress = totalModuleValue / level.modules.length;

          return {
            name: `Level ${index + 1}`,
            progress: averageProgress, // Set the average progress for the level
          };
        });

        setProgressData(data);
      } catch (err) {
        setError(`Error: ${err.response ? err.response.data.error : err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  if (loading) {
    return <Box>Loading progress...</Box>;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box sx={{ width: '80%', height: '400px' }}>
      <h3>User Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={progressData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" stroke="#FF5733" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ProgressGraph;
