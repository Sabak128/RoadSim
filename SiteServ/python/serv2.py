from flask import Flask, request, jsonify
from flask_cors import CORS
import networkx as nx

app = Flask(__name__)
CORS(app)

TERRAIN_COSTS = {
    "city": 0,
    "road": 5,
    "water": 50,
    "mountain": 70,
    "swamp": 100,
    "empty": 30
}

def create_graph(grid):
    G = nx.Graph()
    h, w = len(grid), len(grid[0])
    
    for x in range(h):
        for y in range(w):
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx_, ny_ = x + dx, y + dy
                if 0 <= nx_ < h and 0 <= ny_ < w:
                    cost = TERRAIN_COSTS.get(grid[nx_][ny_], TERRAIN_COSTS["empty"])
                    G.add_edge((x, y), (nx_, ny_), weight=cost)
    return G

def find_cities(grid):
    return [(x, y) for x in range(len(grid)) for y in range(len(grid[0])) if grid[x][y] == "city"]

def build_roads(grid):
    G = create_graph(grid)
    cities = find_cities(grid)
    
    if len(cities) < 2:
        return grid
    
    city_graph = nx.Graph()
    for i in range(len(cities)):
        for j in range(i + 1, len(cities)):
            try:
                path = nx.astar_path(G, source=cities[i], target=cities[j], weight='weight')
                cost = sum(TERRAIN_COSTS.get(grid[x][y], TERRAIN_COSTS["empty"]) for x, y in path)
                city_graph.add_edge(cities[i], cities[j], weight=cost)
            except nx.NetworkXNoPath:
                pass 
    
    mst = nx.minimum_spanning_tree(city_graph, weight='weight')
    
    for u, v in mst.edges():
        try:
            path = nx.shortest_path(G, source=u, target=v, weight='weight')
            for x, y in path:
                if grid[x][y] not in ["city"]:
                    grid[x][y] = "road"
        except nx.NetworkXNoPath:
            pass
    
    return grid

@app.route('/process_grid', methods=['POST'])
def process_grid():
    data = request.json
    TERRAIN_COSTS.update(data.get("terrain_costs", {}))
    grid = data.get("grid")
    
    if not grid:
        return jsonify({"error": "Нет данных"}), 404
    
    updated_grid = build_roads(grid)
    return jsonify({"grid": updated_grid})

if __name__ == '__main__':
    app.run(debug=True)
