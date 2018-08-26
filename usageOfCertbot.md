1. > certbot certonly --webroot -w ${webroot-path} -d ${hostname}

// will place a temp file in ${webroot-path}/.well-known/acme-challenge,
// then <let's encrypt> server will fetch this file for validation (fetch ${hostname}/${webroot-path}/.well-known/acme-challenge/????)

2. cert will be saved at /etc/letsencrypt/live/${hostname}/

3. in node/express:
    const options = {
      cert: fs.readFileSync('/etc/letsencrypt/live/${hostname}/fullchain.pem'),
      key: fs.readFileSync('/etc/letsencrypt/live/${hostname}/privkey.pem')
    };