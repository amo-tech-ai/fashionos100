# Google Cloud MCP Setup Guide

## Prerequisites

1. **Install gcloud CLI** (if not already installed):
```bash
# For Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

2. **Authenticate gcloud**:
```bash
gcloud auth login
gcloud auth application-default login
```

## Setup MCP Servers in Cursor

Create or edit `.cursor/mcp.json` in your project root:

```json
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
```

## Verify Setup

1. Restart Cursor after creating the config
2. The MCP servers will auto-connect when needed
3. Check connection: MCP tools should appear in available resources

## Available Tools

Once connected, you can use:
- **gcloud**: Execute gcloud commands via natural language
- **observability**: Query logs, metrics, traces
- **storage**: Manage GCS buckets and objects

## Common Issues

- **gcloud not found**: Install gcloud CLI and ensure it's in PATH
- **Authentication errors**: Run `gcloud auth login`
- **Permission errors**: Check IAM roles for your account

