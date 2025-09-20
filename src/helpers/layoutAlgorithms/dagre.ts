// dagre.ts
import { getGroupMetadataString, getGroupNodeWidth, getGroupTitle, getReflowGroupNodeHeight } from '../GraphHelper';
import { useAppStore } from '../../state/useAppStore';
import dagre from 'dagre';
import type { Edge, Node } from 'reactflow';
import type { Edge, Node } from '@xyflow/react';
import type { GraphNode } from '../../models/GraphNode';

<<<<<<< Updated upstream
export const layoutDagre = (nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } => {
	const { personsById } = useAppStore.getState();

	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	dagreGraph.setGraph({
		rankdir: 'LR',
		nodseep: 30,
		ranksep: 25
	});

	for (const node of nodes) {
		const nodeData = JSON.parse(node.data.label);

		if (nodeData && nodeData.node) {
			const typedNode = nodeData.node as GraphNode;

			const groupNodeTitleString = getGroupTitle(typedNode.group, true);
			const groupNodeMetadataString = getGroupMetadataString(
				typedNode.groupRoles,
				typedNode.members,
				personsById,
			);

			dagreGraph.setNode(typedNode.group.id.toString(), {
				width: Number(getGroupNodeWidth(groupNodeTitleString, groupNodeMetadataString)),
				height: getReflowGroupNodeHeight(groupNodeMetadataString, groupNodeMetadataString) * 2,
			});
		}
	}

	for (const edge of edges) {
		dagreGraph.setEdge(edge.source, edge.target);
	}

	dagre.layout(dagreGraph);

	const layoutedNodes = dagreGraph
		.nodes()
		.map((node) => {
			const findableNode = nodes.find((n) => n.id === node);

			if (findableNode) {
				return {
					...findableNode,
					position: {
						x: dagreGraph.node(node).x,
						y: dagreGraph.node(node).y,
					},
				};
			}

			// eslint-disable-next-line unicorn/no-useless-undefined
			return undefined;
		})
		.filter((node) => node !== undefined) as Node[];

	return { nodes: layoutedNodes, edges };
=======
/**
 * Datentyp für die Node-Daten: label enthält JSON stringifizierte Daten.
 */
export type PreviewGraphNodeData = {
  label: string;
};

/** Komforttypen für Nodes/Edges in diesem Modul */
export type PreviewNode = Node<PreviewGraphNodeData>;
export type PreviewEdge = Edge;

/**
 * Führt ein Dagre-Layout auf gegebenen Nodes und Edges aus.
 *
 * @param nodes - Die zu layoutenden Knoten mit `data.label` als JSON-String
 * @param edges - Die Kanten, die zwischen den Knoten verbinden
 * @returns Objekt mit neuen Positionen der Knoten und unveränderten Kanten
 */
export const layoutDagre = (
  nodes: PreviewNode[],
  edges: PreviewEdge[]
): { nodes: PreviewNode[]; edges: PreviewEdge[] } => {
  const { personsById } = useAppStore.getState();

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  for (const node of nodes) {
    const nodeData = JSON.parse(node.data.label);

    if (nodeData && nodeData.node) {
      const typedNode = nodeData.node as GraphNode;

      const groupNodeTitleString = getGroupTitle(typedNode.group, true);
      const groupNodeMetadataString = getGroupMetadataString(
        typedNode.groupRoles,
        typedNode.members,
        personsById
      );

      dagreGraph.setNode(typedNode.group.id.toString(), {
        width: Number(getGroupNodeWidth(groupNodeTitleString, groupNodeMetadataString)),
        height: getReflowGroupNodeHeight(groupNodeMetadataString, groupNodeMetadataString) * 2,
      });
    }
  }

  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target);
  }

  dagre.layout(dagreGraph);

  const layoutedNodes: PreviewNode[] = dagreGraph
    .nodes()
    .map((nodeId) => {
      const findableNode = nodes.find((n) => n.id === nodeId);
      if (findableNode) {
        const gnode = dagreGraph.node(nodeId) as { x: number; y: number };
        return {
          ...findableNode,
          position: { x: gnode.x, y: gnode.y },
        };
      }
      // Falls kein passender Node gefunden wird: einfach nicht zurückgeben
      return null;
    })
    .filter((n): n is PreviewNode => n !== null);

  return { nodes: layoutedNodes, edges };
>>>>>>> Stashed changes
};
