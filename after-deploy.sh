#!/bin/sh
# please see Gatsby caching guidelines: https://www.gatsbyjs.com/docs/caching/
aws s3 cp s3://wunderdog-w3 s3://wunderdog-w3 --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=0,must-revalidate --exclude "*" --include "*.html" --recursive --content-type text/html

aws s3 cp s3://wunderdog-w3/page-data/ s3://wunderdog-w3/page-data/ --metadata-directive REPLACE --acl public-read \
--cache-control public,max-age=0,must-revalidate --recursive --exclude "*" --include "*.json" --content-type application/json

# need to set files in static directory seperately to set the right content-type for each
aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive --exclude "*" --include "*.png" --content-type image/png

aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive --exclude "*" --include "*.woff" --content-type font/woff

aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive --exclude "*" --include "*.woff2" --content-type font/woff2

aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive --exclude "*" --include "*.ttf" --content-type font/ttf

aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive --exclude "*" --include "*.eot" --content-type application/vnd.ms-fontobject

aws s3 cp s3://wunderdog-w3 s3://wunderdog-w3 --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --exclude "*" --include "*.js" --content-type text/js --recursive

aws s3 cp s3://wunderdog-w3 s3://wunderdog-w3 --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --exclude "*" --include "*.css" --content-type text/css --recursive