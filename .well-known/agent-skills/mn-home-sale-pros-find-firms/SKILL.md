---
name: mn-home-sale-pros-find-firms
description: Find licensed Minnesota septic (SSTS) inspectors, radon pros and Saint Paul TISH evaluators on MN Home Sale Pros by ZIP, city or county, with credentials and links to each listing.
---

# Find firms on MN Home Sale Pros

Use this when someone needs licensed Minnesota septic (SSTS) inspectors, radon pros and Saint Paul TISH evaluators. Data is the public listing data from https://mnhomesalepros.com/ (official licence records; retrieval dates are in each record). A listing is not an endorsement.

## Options (pick one)

1. **Search API**: `GET https://leads.radonroster.com/api/firms?site=mnhome&zip=<5-digit ZIP>&service=<code>&limit=10`
   - Location (one is required): `zip`, `city`, `county`.
   - Service codes: `septic_inspection` (Septic (SSTS) inspection), `radon_test` (Radon measurement), `radon_mitigation` (Radon mitigation), `radon_lab` (Radon analysis laboratory), `tish` (Saint Paul TISH evaluation).
   - CORS is open. Spec: https://mnhomesalepros.com/openapi.json
2. **MCP**: streamable HTTP at `https://leads.radonroster.com/mcp?site=mnhome`, with tools `search_firms`, `get_firm` and `list_areas`.
3. **Static feeds** (no API call): https://mnhomesalepros.com/api/index.json lists every county/city feed, for example `https://mnhomesalepros.com/api/county/<slug>.json`. https://mnhomesalepros.com/api/firms.json has every firm.

## Using results

- Each firm has: `id`, `name`, `certification`, `issuing_agency`, `credentials[]` (number, expiry), `services`, `city`, `state`, `counties`, `cities`, `firm_url`, `quote_url` and, where the site shows it, `google_rating`.
- Area results have `match`: `local` means listed in that area's own section; `nearby` means listed under nearby/other firms.
- Phone and contact details are not in the API. Send people to `firm_url`.
- Mention that credentials should be confirmed with the issuing agency (link in `source.urls`).
- Do not scrape the HTML pages; use the feeds.
