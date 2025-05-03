"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  type: 'default' | 'eth' | 'sol';
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const HexagonalBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Function to create nodes
    const createNodes = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const nodes: Node[] = [];
      const numNodes = width < 768 ? 10 : 20;

      // Create random nodes
      for (let i = 0; i < numNodes; i++) {
        const size = Math.random() * 10 + 5;
        const type = Math.random() < 0.2 
          ? (Math.random() < 0.5 ? 'eth' : 'sol') 
          : 'default';
        
        nodes.push({
          id: `node-${i}`,
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          type
        });
      }

      // Add specific nodes for Ethereum and Solana logos
      nodes.push({
        id: 'eth-main',
        x: width * 0.3,
        y: height * 0.4,
        size: 32,
        type: 'eth'
      });

      nodes.push({
        id: 'sol-main',
        x: width * 0.7,
        y: height * 0.6,
        size: 32,
        type: 'sol'
      });

      nodesRef.current = nodes;

      // Create connections between nodes
      const connections: Connection[] = [];
      
      // Connect each node to 2-3 closest nodes
      nodes.forEach(node => {
        const otherNodes = [...nodes].filter(n => n.id !== node.id);
        // Sort by distance
        otherNodes.sort((a, b) => {
          const distA = Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2));
          const distB = Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2));
          return distA - distB;
        });
        
        // Connect to 2-3 closest nodes
        const numConnections = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < Math.min(numConnections, otherNodes.length); i++) {
          if (Math.sqrt(Math.pow(otherNodes[i].x - node.x, 2) + Math.pow(otherNodes[i].y - node.y, 2)) < width * 0.3) {
            connections.push({
              from: node.id,
              to: otherNodes[i].id,
              active: Math.random() < 0.3
            });
          }
        }
      });

      // Ensure main nodes are well-connected
      ['eth-main', 'sol-main'].forEach(mainNodeId => {
        const mainNode = nodes.find(n => n.id === mainNodeId);
        if (!mainNode) return;
        
        const numExtraConnections = 5;
        for (let i = 0; i < numExtraConnections; i++) {
          const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
          if (randomNode.id !== mainNodeId) {
            connections.push({
              from: mainNodeId,
              to: randomNode.id,
              active: true
            });
          }
        }
      });

      connectionsRef.current = connections;
      renderNetwork();
    };

    // Function to render the network
    const renderNetwork = () => {
      if (!containerRef.current) return;
      
      // Clear previous elements
      containerRef.current.innerHTML = '';
      
      // Create hexagonal grid background
      const hexGrid = document.createElement('div');
      hexGrid.className = 'hex-grid-bg';
      containerRef.current?.appendChild(hexGrid);

      // Render connections first (so they appear behind nodes)
      connectionsRef.current.forEach(connection => {
        const fromNode = nodesRef.current.find(n => n.id === connection.from);
        const toNode = nodesRef.current.find(n => n.id === connection.to);
        if (!fromNode || !toNode || !containerRef.current) return;
        
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        const connectionEl = document.createElement('div');
        connectionEl.className = `node-connection ${connection.active ? 'node-connection-active' : ''}`;
        connectionEl.style.width = `${distance}px`;
        connectionEl.style.height = '1px';
        connectionEl.style.left = `${fromNode.x}px`;
        connectionEl.style.top = `${fromNode.y}px`;
        connectionEl.style.transform = `rotate(${angle}rad)`;
        
        containerRef.current.appendChild(connectionEl);
        
        // Add data packets on active connections
        if (connection.active && Math.random() < 0.5) {
          const packetEl = document.createElement('div');
          packetEl.className = 'data-packet';
          packetEl.style.left = `${fromNode.x}px`;
          packetEl.style.top = `${fromNode.y}px`;
          packetEl.style.transform = `rotate(${angle}rad)`;
          packetEl.style.animationDelay = `${Math.random() * 3}s`;
          
          containerRef.current.appendChild(packetEl);
        }
      });

      // Render nodes
      nodesRef.current.forEach(node => {
        if (!containerRef.current) return;
        
        const nodeEl = document.createElement('div');
        nodeEl.className = `node ${node.type !== 'default' ? `node-${node.type}` : ''}`;
        nodeEl.style.width = `${node.size}px`;
        nodeEl.style.height = `${node.size}px`;
        nodeEl.style.left = `${node.x - node.size / 2}px`;
        nodeEl.style.top = `${node.y - node.size / 2}px`;
        
        // Add logos to main nodes
        if (node.id === 'eth-main' || node.id === 'sol-main') {
          const logoContainer = document.createElement('div');
          logoContainer.className = 'relative w-full h-full flex items-center justify-center';
          
          const img = document.createElement('img');
          img.src = node.id === 'eth-main' ? '/icons/eth.svg' : '/icons/solana.svg';
          img.alt = node.id === 'eth-main' ? 'Ethereum' : 'Solana';
          img.className = 'w-2/3 h-2/3 object-contain';
          
          logoContainer.appendChild(img);
          nodeEl.appendChild(logoContainer);
        }
        
        containerRef.current.appendChild(nodeEl);
      });
    };

    // Handle window resize
    const handleResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        createNodes();
      });
    };

    createNodes();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="blockchain-network" aria-hidden="true" />
  );
};

export default HexagonalBackground; 