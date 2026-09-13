#!/usr/bin/env bash
set -euo pipefail

base_url="${STAGING_BASE_URL:-https://staging.rejuvonix.com}"
base_url="${base_url%/}"

home_status="$(curl --fail --silent --show-error --max-time 30 --output /dev/null --write-out '%{http_code}' "${base_url}/")"
[[ "${home_status}" == "200" ]] || { echo "homepage returned ${home_status}" >&2; exit 1; }

health="$(curl --fail --silent --show-error --max-time 30 "${base_url}/api/health")"
[[ "${health}" == '{"status":"ok"}' ]] || { echo "unexpected health response: ${health}" >&2; exit 1; }

if [[ "${base_url}" == https://* ]]; then
  http_url="http://${base_url#https://}"
  redirect="$(curl --silent --show-error --max-time 30 --head "${http_url}" | awk 'tolower($1)=="location:" {print $2}' | tr -d '\r')"
  [[ "${redirect}" == https://* ]] || { echo "HTTP did not redirect to HTTPS" >&2; exit 1; }
fi

echo "staging smoke passed: homepage=${home_status} health=${health}"
