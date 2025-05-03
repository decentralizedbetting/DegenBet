"use client";

import { useState } from 'react';
import { 
  PriceChart, 
  ProgressBar, 
  StatsCard, 
  DataTable, 
  Skeleton, 
  SkeletonMarketCard,
  Tooltip 
} from './ui/DataDisplay';

// Demo data for price chart
const generateChartData = (days = 30) => {
  const data = [];
  const now = new Date();
  let price = 45000 + Math.random() * 5000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Add some randomness to the price
    price = price + (Math.random() - 0.5) * 1000;
    
    data.push({
      timestamp: date.getTime(),
      price
    });
  }
  
  return data;
};

// Demo data for table
const tableData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 48235.67, change: 2.4 },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3521.89, change: -1.2 },
  { id: 3, name: 'Solana', symbol: 'SOL', price: 143.25, change: 5.7 },
  { id: 4, name: 'Cardano', symbol: 'ADA', price: 1.24, change: 0.8 },
  { id: 5, name: 'Polkadot', symbol: 'DOT', price: 21.56, change: -0.5 },
];

export function DataDisplayDemo() {
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Data Display Components</h1>
      
      {/* Loading toggle */}
      <div className="mb-8">
        <button 
          onClick={toggleLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isLoading ? 'Show Components' : 'Show Skeletons'}
        </button>
      </div>
      
      {/* Price Charts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Price Charts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <Skeleton variant="rect" height={250} rounded="xl" className="mb-4" />
              <Skeleton variant="rect" height={250} rounded="xl" className="mb-4" />
            </>
          ) : (
            <>
              <PriceChart 
                data={generateChartData(30)} 
                width={400} 
                height={200}
              />
              <PriceChart 
                data={generateChartData(14)} 
                width={400} 
                height={200}
                color="#10b981" 
                fillColor="rgba(16, 185, 129, 0.1)"
              />
            </>
          )}
        </div>
      </section>
      
      {/* Progress Bars Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Progress Bars</h2>
        <div className="space-y-6 max-w-3xl">
          {isLoading ? (
            <>
              <Skeleton variant="rect" height={30} rounded="lg" className="mb-4" />
              <Skeleton variant="rect" height={30} rounded="lg" className="mb-4" />
              <Skeleton variant="rect" height={30} rounded="lg" className="mb-4" />
              <Skeleton variant="rect" height={30} rounded="lg" className="mb-4" />
            </>
          ) : (
            <>
              <ProgressBar 
                value={75} 
                max={100} 
                label="Liquidity Pool Capacity" 
                color="blue" 
                size="md"
              />
              <ProgressBar 
                value={30} 
                max={100} 
                label="Market Resolution Progress" 
                color="green" 
                size="md"
              />
              <ProgressBar 
                value={90} 
                max={100} 
                label="Volume Target" 
                color="purple" 
                size="lg"
              />
              <ProgressBar 
                value={15} 
                max={100} 
                label="Risk Level" 
                color="red" 
                size="sm"
              />
            </>
          )}
        </div>
      </section>
      
      {/* Stats Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Statistics Cards</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <Skeleton variant="card" height={130} />
              <Skeleton variant="card" height={130} />
              <Skeleton variant="card" height={130} />
              <Skeleton variant="card" height={130} />
            </>
          ) : (
            <>
              <StatsCard 
                title="Total Volume" 
                value="$1.2M" 
                change={12.5} 
                trend="up"
                icon="/icons/chart.svg"
              />
              <StatsCard 
                title="Active Users" 
                value="8,234" 
                change={4.2} 
                trend="up"
                icon="/icons/users.svg"
                iconBg="green"
              />
              <StatsCard 
                title="Success Rate" 
                value="94%" 
                change={1.3} 
                trend="down"
                icon="/icons/chart-pie.svg"
                iconBg="red"
              />
              <StatsCard 
                title="Average ROI" 
                value="18.7%" 
                change={5.9} 
                trend="up"
                icon="/icons/trending-up.svg"
                iconBg="purple"
              />
            </>
          )}
        </div>
      </section>
      
      {/* Data Table Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Data Tables</h2>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton variant="rect" height={50} rounded="xl" />
            <Skeleton variant="rect" height={40} rounded="none" />
            <Skeleton variant="rect" height={40} rounded="none" />
            <Skeleton variant="rect" height={40} rounded="none" />
            <Skeleton variant="rect" height={40} rounded="none" />
            <Skeleton variant="rect" height={40} rounded="none" />
          </div>
        ) : (
          <DataTable 
            data={tableData}
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'symbol', header: 'Symbol' },
              { 
                key: 'price', 
                header: 'Price', 
                render: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              },
              { 
                key: 'change', 
                header: '24h Change', 
                render: (value) => (
                  <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {value >= 0 ? '+' : ''}{value}%
                  </span>
                )
              },
              { 
                key: 'id', 
                header: 'Actions',
                render: () => (
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors">
                    Trade
                  </button>
                )
              }
            ]}
            onRowClick={(row) => console.log('Clicked row:', row)}
          />
        )}
      </section>
      
      {/* Skeleton Loaders Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Skeleton Loaders</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Text Skeletons</h3>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
              <Skeleton variant="text" className="mb-2" />
              <Skeleton variant="text" width="80%" className="mb-2" />
              <Skeleton variant="text" width="60%" className="mb-4" />
              
              <Skeleton variant="text" className="mb-2" />
              <Skeleton variant="text" width="70%" className="mb-2" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Image & Avatar Skeletons</h3>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
              <div className="flex items-center mb-6">
                <Skeleton variant="circle" width={50} height={50} className="mr-4" />
                <div className="flex-1">
                  <Skeleton variant="text" width="60%" className="mb-2" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              
              <Skeleton variant="rect" height={120} rounded="lg" className="mb-3" />
              <Skeleton variant="text" width="80%" className="mb-1" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Card Skeleton</h3>
            <SkeletonMarketCard />
          </div>
        </div>
      </section>
      
      {/* Tooltips Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Tooltips</h2>
        <div className="flex space-x-8 p-12 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 justify-center">
          <Tooltip content="This is a tooltip at the top position" position="top">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Hover Me (Top)
            </button>
          </Tooltip>
          
          <Tooltip content="This is a tooltip at the bottom position" position="bottom">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Hover Me (Bottom)
            </button>
          </Tooltip>
          
          <Tooltip content="This is a tooltip at the left position" position="left">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Hover Me (Left)
            </button>
          </Tooltip>
          
          <Tooltip content="This is a tooltip at the right position" position="right">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              Hover Me (Right)
            </button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
} 