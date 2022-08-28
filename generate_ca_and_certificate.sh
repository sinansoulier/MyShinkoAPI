#!/bin/sh

country="FR"
state="Île-de-France"
city="Cachan"
organization="SinanCorp"
mail="sinan.soulier@gmail.com"
ou="Sinan"
cn_ca="Sinan"
cn_certif="myshinkomiddleware.sinan.org"

mkdir certs;
cd certs;

# Generate key
openssl genrsa -out ca.key 4096

# Generate certificate: self-signed
openssl req -x509 -new -nodes -key ca.key -sha256 -days 2048 -out ca.crt \
    -subj "/C=$country/ST=$state/L=$city/O=$organization/OU=$ou/CN=$cn_ca/emailAddress=$mail"

# Create key
openssl genrsa -out myshinkomiddleware.sinan.key 2048

# Create certificate: CSR
openssl req -new -key myshinkomiddleware.sinan.key -out myshinkomiddleware.sinan.csr \
    -subj "/C=$country/ST=$state/L=$city/O=$organization/OU=$ou/CN=$cn_certif/emailAddress=$mail"

# Checking results
openssl req -in myshinkomiddleware.sinan.csr -noout -text

# Generate .ext config file
cat <<EOF > myshinkomiddleware.sinan.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = localhost.com
DNS.3 = www.localhost.com
DNS.4 = myshinkomiddleware.sinan.org
DNS.5 = *.myshinkomiddleware.sinan.org
EOF

openssl x509 -req -in myshinkomiddleware.sinan.csr -CA ca.crt -CAkey ca.key \
    -CAcreateserial -out myshinkomiddleware.sinan.crt -days 365 -sha256 \
    -extfile myshinkomiddleware.sinan.ext

# Inspect
openssl x509 -in myshinkomiddleware.sinan.crt -noout -text

# Verify
openssl verify -CAfile ca.crt myshinkomiddleware.sinan.crt

rm *.csr *.ext *.srl
rm ca.*
