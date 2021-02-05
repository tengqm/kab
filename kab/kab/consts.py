_HTTP_SCHEMES = (
    HS_HTTP,
    HS_HTTPS,
) = (
    "HTTP",
    "HTTPS",
)

HTTP_SCHEMES = [
    (HS_HTTP, HS_HTTP),
    (HS_HTTPS, HS_HTTPS),
]

# Service Authentication Type
SAT_HTTP_BASIC = "HTTP Basic"
SAT_STATIC_BEARER_TOKEN = "Static Bearer Token"
SAT_SSL_CERTS = "SSL Certificates"

AUTH_TYPES = [
    (SAT_HTTP_BASIC, SAT_HTTP_BASIC),
    (SAT_STATIC_BEARER_TOKEN, SAT_STATIC_BEARER_TOKEN),
    (SAT_SSL_CERTS, SAT_SSL_CERTS),
]

# Authentication Request
ARC_GET = "GET"
ARC_POST = "POST"
AUTH_REQUEST_CMD = [
    (ARC_GET, ARC_GET),
    (ARC_POST, ARC_POST),
]

# HTTP DATA LOCATION
HDL_HEADER = "Header"
HDL_BODY = "Body"
HTTP_DATA_LOCATION = [
    (HDL_HEADER, HDL_HEADER),
    (HDL_BODY, HDL_BODY),
]

API_VERSIONS = [
    ("1.13", "2018-12-04"),
    ("1.14", "2019-03-26"),
    ("1.15", "2019-06-20"),
    ("1.16", "2019-09-19"),
    ("1.17", "2019-12-10"),
    ("1.18", "2020-03-26"),
    ("1.19", "2020-08-27"),
    ("1.20", "2020-12-09")
]
