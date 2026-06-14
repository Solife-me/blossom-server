# About

Blossom Server is a content-addressed blob server for the Blossom protocol. This
StartOS package runs the Deno implementation from `hzrd149` with local blob
storage on the StartOS data volume and StartOS-managed actions.

# Access

Use the addresses shown in the service Interfaces section. The Web UI interface
opens the landing page. API clients use the same base URL for endpoints such as
`/upload`, `/mirror`, `/:sha256`, and `/report`.

# Configuration

Use the `Configure Blossom Server` action to:

1. Set an optional public domain override for blob descriptor URLs and BUD-11
   `server` tag validation.
2. Tune upload, mirror, list, media, report, and prune behavior.
3. Edit storage retention rules. An empty rule list accepts any MIME type with
   no expiry.
4. Enable the admin dashboard and set credentials. If you leave the dashboard
   password blank, StartOS generates one.

Use the `Show Dashboard Credentials` action to view the current admin dashboard
username and password.

# Storage and Backups

This package uses local storage only. Blob data, the SQLite database, generated
credentials, and generated service configuration are stored in the main StartOS
data volume and included in normal StartOS backups.
