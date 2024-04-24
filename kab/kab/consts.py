# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
    # ("1.13", "2018-12-04"),
    # ("1.14", "2019-03-26"),
    # ("1.15", "2019-06-20"),
    # ("1.16", "2019-09-19"),
    # ("1.17", "2019-12-10"),
    # ("1.18", "2020-03-26"),
    # ("1.19", "2020-08-27"),
    # ("1.20", "2020-12-09"),
    # ("1.21", "2021-04-08"),
    # ("1.22", "2021-08-04"),
    # ("1.23", "2021-12-07"),
    ("1.24", "2022-05-04"),
    ("1.25", "2022-08-23"),
    ("1.26", "2022-12-13"),
    ("1.27", "2023-04-12"),
    ("1.28", "2023-08-15"),
    ("1.29", "2023-12-13"),
    ("1.30", "2024-04-18"),
]
