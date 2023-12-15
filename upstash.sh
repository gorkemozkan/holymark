#!/bin/bash



if [ -f .env ]; then
  export $(cat .env | grep -v ^# | xargs)
fi


if [ -z "$UPSTASH_REST_API_URL" ] || [ -z "$UPSTASH_REST_API_BEARER_TOKEN" ]; then
  echo "Error: Required environment variables are not set."
  exit 1
fi




curl "$UPSTASH_REST_API_URL$1" \
  -H "Authorization: Bearer $UPSTASH_REST_API_BEARER_TOKEN"
