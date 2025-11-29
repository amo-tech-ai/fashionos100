# Post-Installation Steps for gcloud CLI

## 1. Verify Installation

After the installation completes, verify gcloud is working:

```bash
# Reload your shell configuration
source ~/.bashrc

# Or start a new terminal session, then:
gcloud --version
```

## 2. Initialize gcloud

```bash
gcloud init
```

This will:
- Prompt you to log in
- Let you select or create a project
- Set default compute region/zone

## 3. Authenticate for Application Default Credentials

```bash
gcloud auth application-default login
```

This is required for the MCP server to work properly.

## 4. Verify Authentication

```bash
gcloud auth list
```

You should see your account listed as ACTIVE.

## 5. Set Up MCP Configuration

```bash
cd /home/sk/fashionos100
cp .cursor/mcp.json.template .cursor/mcp.json
```

## 6. Restart Cursor

Close and reopen Cursor to load the MCP configuration.

## 7. Test MCP Connection

After restarting Cursor, the gcloud MCP server should auto-connect. You can verify by:
- Checking Cursor's MCP panel
- Asking me to list GCP projects or resources

## Troubleshooting

If `gcloud` command is not found after installation:

```bash
# Add to PATH manually (if needed)
export PATH=$PATH:~/google-cloud-sdk/bin

# Or add to ~/.bashrc permanently
echo 'export PATH=$PATH:~/google-cloud-sdk/bin' >> ~/.bashrc
source ~/.bashrc
```

