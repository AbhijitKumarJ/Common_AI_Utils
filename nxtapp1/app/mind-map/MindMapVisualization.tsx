'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  level: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface MindMapVisualizationProps {
  mindMap: any;
  onClose: () => void;
}

export default function MindMapVisualization({ mindMap, onClose }: MindMapVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !mindMap) return;

    const width = Math.min(800, window.innerWidth - 40);
    const height = Math.min(600, window.innerHeight - 100);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .call(d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
        g.attr("transform", event.transform);
      }));

    svg.selectAll('*').remove();

    const g = svg.append("g");

    const nodes: Node[] = [];
    const links: Link[] = [];

    const addNodesAndLinks = (obj: any, parentId: string | null = null, depth: number = 0) => {
      Object.entries(obj).forEach(([key, value]) => {
        nodes.push({ id: key, group: depth, level: depth + 1 });
        if (parentId) {
          links.push({ source: parentId, target: key, value: 1 });
        }
        if (typeof value === 'object' && value !== null) {
          addNodesAndLinks(value, key, depth + 1);
        }
      });
    };

    addNodesAndLinks(mindMap);

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', (d) => d3.schemeCategory10[d.group % 10]);

    const text = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => `${d.level}. ${d.id}`)
      .attr('font-size', 10)
      .attr('dx', 8)
      .attr('dy', 3)
      .attr('fill', 'white');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      text
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    // Add drag behavior
    node.call(d3.drag<SVGCircleElement, Node>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [mindMap]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-gray-800 p-4 rounded-lg" style={{ maxHeight: 'calc(100vh - 40px)' }}>
        <button
          className="mb-4 px-2 py-1 bg-red-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}