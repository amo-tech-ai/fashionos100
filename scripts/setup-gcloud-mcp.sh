#!/bin/bash
# Setup script for Google Cloud MCP servers

set -e

echo "🔧 Setting up Google Cloud MCP servers..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Installing..."
    curl https://sdk.cloud.google.com | bash
    exec -l $SHELL
    echo "✅ gcloud CLI installed. Please run 'gcloud init' to configure."
    exit 1
fi

echo "✅ gcloud CLI found: $(gcloud --version | head -n1)"

# Check authentication
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "⚠️  No active gcloud authentication found."
    echo "   Run: gcloud auth login"
    echo "   Then: gcloud auth application-default login"
    exit 1
fi

echo "✅ gcloud authentication active"

# Create MCP config directory if it doesn't exist
mkdir -p .cursor

# Create MCP config file
cat > .cursor/mcp.json << 'EOF'
{
  "mcpServers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "@google-cloud/gcloud-mcp"]
    },
    "observability": {
      "command": "npx",
      "args": ["-y", "@google-cloud/observability-mcp"]
    },
    "storage": {
      "command": "npx",
      "args": ["-y", "@google-cloud/storage-mcp"]
    }
  }
}
EOF

echo "✅ Created .cursor/mcp.json configuration"

# Test MCP server installation
echo "🧪 Testing MCP server installation..."
if npx -y @google-cloud/gcloud-mcp --version &> /dev/null; then
    echo "✅ gcloud-mcp package accessible"
else
    echo "⚠️  Could not verify gcloud-mcp package (this is OK, it will install on first use)"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart Cursor to load MCP configuration"
echo "2. MCP servers will connect automatically when needed"
echo "3. Use MCP tools to interact with Google Cloud"
echo ""
echo "To verify your gcloud setup:"
echo "  gcloud config list"
echo "  gcloud projects list"

