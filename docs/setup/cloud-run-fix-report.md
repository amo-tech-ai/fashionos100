# Cloud Run Deployment Fix Report - fashionos

**Date**: November 27, 2025  
**Service**: fashionos  
**Project**: gen-lang-client-0132512133  
**Region**: us-west1

---

## 🔍 Root Cause Summary

**Primary Issue**: GCS bucket mount failure due to missing IAM permissions

**Specific Errors**:
1. **GCSFuse mount failure**: `Permission 'storage.objects.list' denied`
2. **Service account**: `339153972938-compute@developer.gserviceaccount.com` lacked bucket access
3. **Container startup failure**: Container couldn't start because GCS volume mount failed, preventing the app from accessing files in `/app/dist`

**Error Chain**:
```
GCS bucket mount fails → Container can't access /app/dist → 
App fails to start → TCP probe fails on port 8080 → 
Revision marked as unhealthy
```

---

## ✅ What Was Changed

### 1. IAM Permission Fix

**Command executed**:
```bash
gcloud storage buckets add-iam-policy-binding \
  gs://ai-studio-bucket-339153972938-us-west1 \
  --member=serviceAccount:339153972938-compute@developer.gserviceaccount.com \
  --role=roles/storage.objectViewer
```

**What this does**:
- Grants the Cloud Run service account `storage.objectViewer` role on the bucket
- This role includes `storage.objects.list` permission required by gcsfuse
- Allows the service account to read objects in the bucket

### 2. Service Update (Triggered New Revision)

**Command executed**:
```bash
gcloud run services update fashionos \
  --region=us-west1 \
  --platform=managed \
  --no-traffic
```

**Result**: Created new revision `fashionos-00007-gtc` that successfully deployed

---

## ✅ Verification

### Service Status
- **Latest Revision**: `fashionos-00007-gtc`
- **Status**: ✅ **Ready** (deployed successfully in 4.26s)
- **Container Health**: ✅ Healthy (became healthy in 1.86s)
- **Service URL**: `https://fashionos-thwmeeyqfa-uw.a.run.app`

### Logs Confirmation
- ✅ "Server listening on port 8080" - App started successfully
- ✅ No GCS mount errors in new revision
- ✅ No permission denied errors

### IAM Policy Verification
```json
{
  "members": [
    "serviceAccount:339153972938-compute@developer.gserviceaccount.com"
  ],
  "role": "roles/storage.objectViewer"
}
```

---

## 📋 Playbook: Prevent This Issue in Future Deployments

### Before Deploying from Google AI Studio

1. **Verify Service Account Permissions**:
   ```bash
   gcloud storage buckets get-iam-policy \
     gs://ai-studio-bucket-339153972938-us-west1 \
     --format=json | grep -A 2 "compute@developer"
   ```
   
   Ensure the service account has `roles/storage.objectViewer` or `roles/storage.objectReader`

2. **Check Bucket Contents Exist**:
   ```bash
   gcloud storage ls \
     gs://ai-studio-bucket-339153972938-us-west1/services/fashionos/version-X/compiled/
   ```
   
   Verify the compiled files exist before deployment

3. **Verify Service Account**:
   ```bash
   gcloud run services describe fashionos \
     --region=us-west1 \
     --format=value(spec.template.spec.serviceAccountName)
   ```
   
   Confirm it's using `339153972938-compute@developer.gserviceaccount.com`

### If Deployment Fails Again

1. **Check Logs for Permission Errors**:
   ```bash
   gcloud logging read \
     'resource.type="cloud_run_revision" AND 
      resource.labels.service_name="fashionos" AND 
      severity>=ERROR' \
     --limit=20 \
     --format=json
   ```

2. **Look for**:
   - `PermissionDenied` errors
   - `storage.objects.list` denied
   - `mount operation failed`

3. **Quick Fix** (if permission issue):
   ```bash
   gcloud storage buckets add-iam-policy-binding \
     gs://ai-studio-bucket-339153972938-us-west1 \
     --member=serviceAccount:339153972938-compute@developer.gserviceaccount.com \
     --role=roles/storage.objectViewer
   ```

4. **Redeploy**:
   - Update service to trigger new revision, OR
   - Redeploy from Google AI Studio

---

## 🔧 Service Configuration (Current)

- **Container Image**: `us-docker.pkg.dev/cloudrun/container/aistudio/applet-proxy`
- **Port**: 8080
- **CPU**: 1000m
- **Memory**: 512Mi
- **Startup Probe**: TCP on port 8080, 240s timeout
- **GCS Volume**: Mounted at `/app/dist` from `services/fashionos/version-6/compiled`
- **Service Account**: `339153972938-compute@developer.gserviceaccount.com`

---

## 📊 Deployment History

| Revision | Status | Created | Issue |
|----------|--------|---------|-------|
| fashionos-00001-62b | ❌ Failed | Nov 21 | GCS mount permission denied |
| fashionos-00002-z7t | ❌ Failed | Nov 21 | GCS mount permission denied |
| fashionos-00003-wdr | ❌ Failed | Nov 21 | GCS mount permission denied |
| fashionos-00004-nbg | ❌ Failed | Nov 24 | GCS mount permission denied |
| fashionos-00005-hgz | ❌ Failed | Nov 27 | GCS mount permission denied |
| fashionos-00006-msz | ❌ Failed | Nov 27 | GCS mount permission denied |
| **fashionos-00007-gtc** | ✅ **Ready** | Nov 27 | **Fixed - IAM permission granted** |

---

## 🎯 Summary

**Problem**: Service account lacked `storage.objects.list` permission on GCS bucket  
**Solution**: Granted `roles/storage.objectViewer` role to service account  
**Result**: Service now deploys successfully and is healthy  
**Time to Fix**: ~5 minutes  
**Prevention**: Ensure service account has bucket permissions before deploying

---

## 🔗 Useful Commands

```bash
# Check service status
gcloud run services describe fashionos --region=us-west1

# View recent logs
gcloud logging read \
  'resource.type="cloud_run_revision" AND 
   resource.labels.service_name="fashionos"' \
  --limit=50 \
  --format=json

# Check bucket IAM
gcloud storage buckets get-iam-policy \
  gs://ai-studio-bucket-339153972938-us-west1

# List revisions
gcloud run revisions list \
  --service=fashionos \
  --region=us-west1
```

