
Future
======

A manual todo list


### high urgency

- handle clug slug input better, lowercase letter note

### high impact, low complexity

- language detection badge
- migration for club post count
- migration for user action base
- use latest post as twitter card image

### high impact, high complexity

- post view
- allow users to reply and provide feedback to posts
- global post and club search
- web interface for adding featured clubs and posts
- club moderators (hide post)
- activity stream on user profile
- site notification
- twitter card image with quotation on them
- dudao web, a proxy for content extraction and mobile reading
- better content extraction
- convert addleaf to a categorized news site, direct traffic to rubu
- content embed for easy viewing
- ability to move post
- fix in-app browsers on android systems (wechat etc.)
- server process using pm2 (multi-thread)
- handle share content from closed site (weibo etc.)
- re-design homepage to focus on content
- soft delete for one-click action
- look into firefox extension

### low impact, low complexity

- disable capitalization for names like ios
- footer links, privacy and terms
- menu items are too bold or large
- inline css for main pages
- user logout
- re-sync user profile data
- redirect mai3.me to rubu.me
- logrotate
- refresh csrf secret, invalidate older csrf token
- opengraphc cache should include user uid and club slug to prevent abuse
- allow image proxy to cache at different location
- redirection for external links
- automate database backup
- favorites list for user profile
- redis client retry backoff time

### high complexity

- how do we collect interesting content consistently and do it everyday
- web app flow on ios
- additional oauth providers
- change create post to single step flow
- update font stack for better mixed language content
- offer more customization, such as image selection, when creating post
- rubu app, a content cache and sharing platform
- connecting multiple oauth profile to the same local account
- high availability group for azure
- mongodb cluster

### third-party

- bug in chrome canary causes fetch to return garbled utf-8
- chrome m44 only have black/white emoji support on windows
