import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CryptoGraphProps {
  loading: boolean;
  data: any[];
  color: string;
}

const CryptoGraph: React.FC<CryptoGraphProps> = ({ loading, data, color }) => {
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Typography variant="h5" style={{ marginTop: 16 }}>Historical Prices (Last 60 Minutes)</Typography>
          <ResponsiveContainer width="100%" height={400} style={{ marginTop: 16 }}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Price" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CryptoGraph;
