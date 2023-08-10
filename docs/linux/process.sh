curl -X POST http://localhost:8000/addPostgressCmd -d "id=1"

curl -X POST http://localhost:8000/addPostgressCmd \
   -H "Content-Type: application/json" \
   -d '{"id": 2, "name": "ls", "cmds": ["-l"] }'
