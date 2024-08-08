
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Type note in input and click Save
    Browser->>Server: POST /new_note
    activate Server
    Note left of Server: Server processes the request and redirects
    Server-->>Browser: HTTP 302 Redirect to /notes
    deactivate Server

    Note right of Browser: Browser reloads the Notes page
    
    Browser->>Server: GET /notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server
    
    Browser->>Server: GET /main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server
    
    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server
    
    Note right of Browser: Browser executes JavaScript to fetch JSON data
    
    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON data
    deactivate Server

    Note right of Browser: Browser renders notes based on JSON data
