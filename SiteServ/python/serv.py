from flask import Flask, request, jsonify
from flask_cors import CORS
import heapq

app = Flask(__name__)
CORS(app)

## ტესტური კოდი შეიძლება შეიცვალოს

TERRAIN_COSTS = {
    "city": 0,
    "road": 5,
    "mountain": 50,
    "swamp": 100,
    "empty": 30
}

def find_cities(grid):
    cities = []
    for x in range(len(grid)):
        for y in range(len(grid[0])):
            if grid[x][y] == "city":
                cities.append((x, y))
    return cities

def get_neighbors(x, y, grid):
    neighbors = []
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]):
            neighbors.append((nx, ny))
    return neighbors

def isConected(grid, start, end):
    h, w = len(grid), len(grid[0])
    visited = [[False] * w for _ in range(h)]
    stack = [start]

    while stack:
        x, y = stack.pop()
        visited[x][y] = True

        if (x, y) == end:
            return True

        for nx, ny in get_neighbors(x, y, grid):
            if not visited[nx][ny] and grid[nx][ny] in ["city", "road"]:
                stack.append((nx, ny))

    return False

def dijkstra(grid, start):
    h, w = len(grid), len(grid[0])
    dist = { (x, y): float('inf') for x in range(h) for y in range(w) }
    prev = {}
    dist[start] = 0
    pq = [(0, start)]  

    while pq:
        cost, (x, y) = heapq.heappop(pq)

        if cost > dist[(x, y)]:
            continue

        for nx, ny in get_neighbors(x, y, grid):
            new_cost = cost + TERRAIN_COSTS.get(grid[nx][ny], 3)  
            if new_cost < dist[(nx, ny)]:
                dist[(nx, ny)] = new_cost
                prev[(nx, ny)] = (x, y)
                heapq.heappush(pq, (new_cost, (nx, ny)))

    return prev 

def build_roads(grid):
    cities = find_cities(grid)
    if len(cities) < 2:
        return grid 
    
    for i in range(len(cities)):
        prev = dijkstra(grid, cities[i])    

        for j in range(i + 1, len(cities)):
            path = []
            current = cities[j]
            while current in prev:
                path.append(current)
                current = prev[current]
            for x, y in path:
                if grid[x][y] not in ["city"]:
                    grid[x][y] = "road"


    return grid

@app.route('/process_grid', methods=['POST'])
def process_grid():
    data = request.json
    grid = data.get("grid")

    if not grid:
        return jsonify({"error": "Нет данных"}), 404

    updated_grid = build_roads(grid)
    return jsonify({"grid": updated_grid})

if __name__ == '__main__':
    app.run(debug=True)
