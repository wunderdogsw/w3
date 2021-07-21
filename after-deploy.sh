aws s3 cp s3://wunderdog-w3 s3://wunderdog-w3 --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=0,must-revalidate --exclude "*" --include "*.html" --recursive

aws s3 cp s3://wunderdog-w3/page-data/ s3://wunderdog-w3/page-data/ --metadata-directive REPLACE --acl public-read \
--cache-control public,max-age=0,must-revalidate --recursive

aws s3 cp s3://wunderdog-w3/static/ s3://wunderdog-w3/static/ --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --recursive

aws s3 cp s3://wunderdog-w3 s3://wunderdog-w3 --metadata-directive REPLACE  --acl public-read \
--cache-control public,max-age=31536000,immutable --exclude "*" --include "*.js" --include "*.css" --recursive