---
name: mn-home-sale-pros-request-quote
description: Request quotes from licensed Minnesota septic (SSTS) inspectors, radon pros and Saint Paul TISH evaluators for a homeowner via MN Home Sale Pros; the homeowner confirms by email before anything is sent.
---

# Request quotes through MN Home Sale Pros

Only do this when the homeowner asked you to get quotes and agreed to share their name, email (and phone, if given) with up to three certified firms.

## Steps

1. Optionally find a firm first with the search skill or `GET https://leads.radonroster.com/api/firms?site=mnhome&zip=<ZIP>`, and pass its `id` as `firm`.
2. Send `POST https://leads.radonroster.com/api/agent/quote?site=mnhome` with `Content-Type: application/json` and these fields:
   - Required: `name`, `email`, `zip` (zip (MN)), `need`, and `consent: true`.
   - Optional: `phone`, `firm`, `message`, and `agent` (your app's name, shown to the homeowner). 
   - Values for `need`:
   - `septic`: Septic (SSTS) inspection
   - `radon_test`: Radon test
   - `radon_mitigation`: Radon mitigation
   - `tish`: Saint Paul TISH evaluation (Saint Paul ZIPs only)
   - `not_sure`: Not sure (sent to radon testers)
3. You get `202` with `status: "pending_confirmation"`. Tell the homeowner to open the email from MN Home Sale Pros and click **Confirm** within 24 hours.
   - Nothing is sent to any firm until they confirm.
   - They can opt in to occasional tips on that page; you cannot do it for them.
4. After confirmation, the request goes to the chosen firm (if any) plus up to two other nearby certified firms, and the homeowner gets a copy listing who received it.

You can also use the MCP tool `request_quote` at `https://leads.radonroster.com/mcp?site=mnhome`; it follows the same flow.

## Errors

- `422 consent_required`: the homeowner didn't agree. Ask them; never set `consent` yourself.
- `400 <field>`: fix that field.
- `404 no_firms`: no certified firm serves that location or need.
- `429`: rate limited. Don't retry in a loop; wait an hour or send the homeowner to https://mnhomesalepros.com/get-quotes/.

## Spec

https://mnhomesalepros.com/openapi.json
