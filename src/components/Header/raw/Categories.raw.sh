#!/bin/bash
curl -X GET --header "Accept: application/json" "http://news.cnyes.cool/api/v3/categories" | jq -S '.items|=sort_by(.slug)' > CategoriesProd.raw.json
curl -X GET --header "Accept: application/json" "http://news.beta.cnyes.cool/api/v3/categories" | jq -S '.items|=sort_by(.slug)' > CategoriesBeta.raw.json
