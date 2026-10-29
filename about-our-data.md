---
title: "About Our Data | MN Home Sale Pros"
description: "Where MN Home Sale Pros listings come from: MPCA SSTS, MDH radon and Saint Paul TISH records, retrieval dates, source terms and how the data was cleaned."
canonical: https://mnhomesalepros.com/about-our-data/
---

# About our data

* **SSTS:** MPCA public REST API [licensed-businesses](https://services.pca.state.mn.us/api/doc/v1/ssts/licensed-businesses) (3,713 business records), retrieved 2026-10-12. Kept businesses with a Current license and an inspector, intermediate inspector or advanced inspector designation: 337 kept after 5 duplicate license numbers were dropped. Expired records (2,400 of 3,713 overall) are excluded. The same data is listed on the Minnesota Geospatial Commons. Terms: public government data, with no license stated on the API. Confirm before launch.
* **Radon:** MDH [Radon Service Providers](https://radon.web.health.state.mn.us/serviceProviders.jsf) (Measurement, Mitigation, Analysis Laboratory; single-family service type), paged through the public search on 2026-10-12: 343 + 114 + 14 rows. Grouped into 265 businesses by company name + ZIP. Websites appear as printed by MDH and weren't fetched. No expiry dates are shown, so the list is MDH's current roster.
* **Saint Paul TISH:** approved evaluator table on [stpaul.gov](https://www.stpaul.gov/departments/safety-inspections/rent-buy-sell-property/selling-or-buying-properties/truth-sale-housing), 37 evaluators.
* **Other cities:** point-of-sale programs in nine cities, each linked to the official city page and checked 2026-10-13. Minneapolis evaluators: the city's own finder.
* County comes from MPCA's county field, or ZIP via GeoNames (CC BY 4.0). Log: data/cleanup-log.csv.
