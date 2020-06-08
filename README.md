## Confirmed Cases
| name                            |   application |   attributes_used | data_type   | geographical   | geospatial   | resolution   | source                                                                                    |
|:--------------------------------|--------------:|------------------:|:------------|:---------------|:-------------|:-------------|:------------------------------------------------------------------------------------------|
| CSSE 2019-nCoV                  |           nan |               nan | CSV         | yes            | no           | state        | [Link](https://github.com/CSSEGISandData/COVID-19)                                        |
| European CDC                    |           nan |               nan | XLSX        | yes            | no           | country      | [Link](https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases)           |
| NYTimes COVID-19 Data           |           nan |               nan | CSV         | yes            | no           | state/county | [Link](https://github.com/nytimes/covid-19-data)                                          |
| USA Facts Coronavirus Locations |           nan |               nan | CSV         | yes            | no           | county       | [Link](https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/)              |
| WHO COVID-19 Situation Reports  |           nan |               nan | PDF         | yes            | no           | country      | [Link](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports) |

## Demographics
| name                                                                               | application                |   attributes_used | data_type   | geographical   | geospatial   | resolution         | source                                                                                                               |
|:-----------------------------------------------------------------------------------|:---------------------------|------------------:|:------------|:---------------|:-------------|:-------------------|:---------------------------------------------------------------------------------------------------------------------|
| COVID tracking associated data                                                     | ACS, Census, KFF, CDC data |               nan | CSV         | yes            | no           | state              | [Link](https://github.com/COVID19Tracking/associated-data)                                                           |
| HDX United States: High Resolution Population Density Maps + Demographic Estimates | Population density         |               nan | GeoTiff     | nan            | nan          | country            | [Link](https://data.humdata.org/dataset/united-states-high-resolution-population-density-maps-demographic-estimates) |
| JHU CSSE Demographic Information                                                   | nan                        |               nan | CSV         | yes            | no           | county             | [Link](https://github.com/JieYingWu/COVID-19_US_County-level_Summaries)                                              |
| US Census American Community Survey                                                | nan                        |               nan | CSV         | yes            | no           | Census Block Group | [Link](https://www.census.gov/programs-surveys/acs)                                                                  |
​

## Hospitals
| name                                                                      | application                          | attributes_used        | data_type     | geographical   | geospatial   | resolution        | source                                                                                                                                                           |
|:--------------------------------------------------------------------------|:-------------------------------------|:-----------------------|:--------------|:---------------|:-------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| COVID-19 CareMap                                                          | Health System Capacity               | nan                    | CSV/GeoJSON   | yes            | yes          | county            | [Link](https://github.com/covidcaremap/covid19-healthsystemcapacity)                                                                                             |
| HIFLD Hospitals                                                           | Hospital Locations                   | nan                    | CSV/Shapefile | yes            | yes          | facility          | [Link](https://hifld-geoplatform.opendata.arcgis.com/datasets/hospitals)                                                                                         |
| HHS Hospitals                                                             | Hospital Ratings                     | nan                    | CSV           | yes            | yes          | county            | [Link](https://healthdata.gov/dataset/hcahps-hospital)                                                                                                           |
| Medicare Timely and Effective Care                                        | Hospital Ratings                     | nan                    | CSV           | yes            | no           | facility          | [Link](https://data.medicare.gov/Hospital-Compare/Timely-and-Effective-Care-Hospital/yv7e-xc69)                                                                  |
| HHS State                                                                 | State Health Ratings                 | nan                    | CSV           | yes            | no           | state             | [Link](https://healthdata.gov/dataset/hcahps-state)                                                                                                              |
| Harvard Global Health Institute COVID-19 Hospital Capacity Estimates 2020 | US Hospital Capacity                 | nan                    | CSV           | yes            | no           | state/some cities | [Link](https://globalepidemics.org/our-data/hospital-capacity/)                                                                                                  |
| Definitive Healthcare: USA Hospital Beds                                  | number/types of beds in US hospitals | staffed beds, icu beds | CSV/Shapefile | yes            | yes          | facility          | [Link](https://coronavirus-resources.esri.com/datasets/definitivehc::definitive-healthcare-usa-hospital-beds/data?geometry=-169.346%2C29.120%2C-37.422%2C52.084) |
| CDC Social Vulnerability Index                                            | nan                                  | nan                    | CSV/Shapefile | yes            | yes          | state             | [Link](https://svi.cdc.gov/data-and-tools-download.html)                                                                                                         |

## Patient Forecasting

| name                                          | application                                                               |   attributes_used | data_type   | geographical   | geospatial   | resolution   | source                                                                                          |
|:----------------------------------------------|:--------------------------------------------------------------------------|------------------:|:------------|:---------------|:-------------|:-------------|:------------------------------------------------------------------------------------------------|
| Columbia COVID-19 Projections                 | forecast (deaths, hospital beds)                                          |               nan | CSV         | yes            | no           | county       | [Link](https://github.com/shaman-lab/COVID-19Projection)                                        |
| IHME COVID-19 Projections                     | forecast (deaths, infections, tests, hospital utilization)                |               nan | CSV         | yes            | no           | state        | [Link](https://covid19.healthdata.org/united-states-of-america)                                 |
| COVID-19 Forecasts: New Hospitalizations      | forecast (infections, active cases, hospitalizations, deaths)             |               nan | CSV         | yes            | no           | state        | [Link](https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/hospitalizations-forecasts.html) |
| DELPHI Epidemiological Case Predictions (MIT) | forecast (infections, active cases, hospitalizations, deaths), Removing mobility as confounding variable             |               nan | CSV         | yes            | no           | state        | [Link](https://www.covidanalytics.io/projections)                                               |
| Reich Lab COVID-19 Forecast Hub               | forecast/groundtruth (deaths)                                             |               nan | CSV         | yes            | no           | state        | [Link](https://github.com/reichlab/covid19-forecast-hub)                                        |
| COVID Tracking Project                        | groundtruth (deaths, hospitalizations, on ventilators, in ICU, recovered) |               nan | CSV/JSON    | yes            | no           | state        | [Link](https://covidtracking.com/data)                                                          |
| CDC Patient Impact and Hospital Capacity      | groundtruth (deaths, hospitalizations,, in ICU, recovered)                |               nan | CSV         | yes            | no           | state        | [Link](https://www.cdc.gov/nhsn/covid19/report-patient-impact.html)                             |
| County-level Socioeconomic Data for Predictive Modeling of Epidemiological Effects               | forecast/groundtruth (features)                                             |               nan | CSV         | yes            | no           | county       | [Link](https://github.com/JieYingWu/COVID-19_US_County-level_Summaries)                                        |
| COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University               | forecast/groundtruth (infections, deaths, etc.)                                             |               nan | CSV         | yes            | no           | county       | [Link](https://github.com/CSSEGISandData/COVID-19)                                        |

## Policies and Interventions
| name                                            | application         |   attributes_used | data_type   | geographical   | geospatial   | resolution   | source                                                                                                     |
|:------------------------------------------------|:--------------------|------------------:|:------------|:---------------|:-------------|:-------------|:-----------------------------------------------------------------------------------------------------------|
| COVID-19 Policies                               | Government Response |               nan | JSON/TSV    | yes            | yes          | state        | [Link](https://covid19policies.com/#US)                                                                    |
| Oxford Government Response Tracker              | Government Response |               nan | CSV         | yes            | no           | country      | [Link](https://www.bsg.ox.ac.uk/research/research-projects/oxford-covid-19-government-response-tracker)    |
| COVID-19 Intervention Data                      | Policy measures     |               nan | CSV         | yes            | no           | county       | [Link](https://github.com/Keystone-Strategy/covid19-intervention-data)                                     |
| NLC COVID-19 Local Action Tracker               | Policy measures     |               nan | CSV         | yes            | no           | city         | [Link](https://covid19.nlc.org/resources/covid-19-local-action-tracker/)                                   |
| Education Week: Coronavirus and School Closures | School closings     |               nan | XLSX        | yes            | no           | state        | [Link](https://www.edweek.org/ew/section/multimedia/map-coronavirus-and-school-closures.html)              |
| MCH COVID-19 Impact: School Closures            | School closings     |               nan | CSV         | yes            | no           | state        | [Link](https://www.mchdata.com/covid19/schoolclosings)                                                     |
| Kaiser Family Foundation                        | State actions       |               nan | CSV         | yes            | no           | state        | [Link](https://www.kff.org/health-costs/issue-brief/state-data-and-policy-actions-to-address-coronavirus/) |
| National Governors Association                  | State actions       |               nan | XLSX        | yes            | no           | state        | [Link](https://www.nga.org/coronavirus/#states)                                                            |

## Social Distancing
| name                                              | application                   |   attributes_used | data_type   | geographical   | geospatial   | resolution   | source                                                               |
|:--------------------------------------------------|:------------------------------|------------------:|:------------|:---------------|:-------------|:-------------|:---------------------------------------------------------------------|
| Google COVID-19 Community Mobility Reports        | Google Maps mobility insights |               nan | PDF         | yes            | no           | county/state | [Link](https://www.google.com/covid19/mobility/)                     |
| Cuebiq Mobility Insights                          | Mobility                      |               nan | nan         | nan            | nan          | nan          | [Link](https://www.cuebiq.com/visitation-insights-covid19/)          |
| Data for Mobility Changes in Response to COVID-19 | Mobility                      |               nan | CSV         | yes            | no           | county       | [Link](https://github.com/descarteslabs/DL-COVID-19)                 |
| Unacast Social Distancing Scoreboard              | Mobility                      |               nan | CSV         | yes            | no           | county       | [Link](https://www.unacast.com/covid19/social-distancing-scoreboard) |
| Facebook COVID-19 Symptom Map                     | nan                           |               nan | nan         | nan            | nan          | nan          | [Link](https://dataforgood.fb.com/docs/covid19/)                     |
| OpenTable State of Industry                       | nan                           |               nan | CSV         | yes            | no           | city/state   | [Link](https://www.opentable.com/state-of-industry)                  |
| SafeGraph Mobility Patterns                       | nan                           |               nan | nan         | nan            | nan          | nan          | [Link](https://docs.safegraph.com/docs/weekly-patterns)              |
