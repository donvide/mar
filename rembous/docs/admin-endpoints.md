# Admin Refund Status API

## Endpoint
- `POST /.netlify/functions/update-refund-status`

## Auth
Use header:
- `x-admin-token: <REFUND_ADMIN_TOKEN>`

Set `REFUND_ADMIN_TOKEN` in Netlify site environment variables.

## Allowed statuses
- `received`
- `review`
- `scheduled`
- `paid`
- `rejected`

## Request body
```json
{
  "reference": "RMB-20260303-123456",
  "status": "scheduled"
}
```

## Example cURL
```bash
curl -X POST "https://<your-site>.netlify.app/.netlify/functions/update-refund-status" \
  -H "Content-Type: application/json" \
  -H "x-admin-token: <YOUR_ADMIN_TOKEN>" \
  -d '{"reference":"RMB-20260303-123456","status":"paid"}'
```
