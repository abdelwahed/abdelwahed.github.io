#!/bin/bash
# Start local CMS editing environment

echo "🚀 Starting CMS editing environment..."
echo ""

# Start decap-server in background
echo "Starting Decap CMS proxy..."
npx decap-server &
DECAP_PID=$!

# Wait a moment for decap-server to start
sleep 2

# Start Astro dev server
echo "Starting Astro dev server..."
echo ""
echo "✅ CMS will be available at: http://localhost:4321/admin/"
echo "✅ Site preview at: http://localhost:4321/"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

npm run dev

# When npm run dev stops, also stop decap-server
kill $DECAP_PID 2>/dev/null

