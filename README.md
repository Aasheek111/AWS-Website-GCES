# AWS Builders Group GCES React Website

## Run locally

```bash
npm install
npm run dev
```

## Edit website content

Most website content comes from:

```text
public/data/site.json
```

Update events, members, roles, hero text, features, and join text there. You do not need to edit React code for normal content changes.

## Use another JSON file or URL

By default, the site loads:

```text
/data/site.json
```

To test another JSON file, open the website with a `data` query parameter:

```text
http://127.0.0.1:5175/?data=/data/site.json
```

You can also point it to a hosted JSON URL if that server allows browser access:

```text
https://your-domain.com/?data=https://your-domain.com/site.json
```

## Add member photos

Put images in:

```text
public/assets/members/
```

Then add the image path in `public/data/site.json`:

```json
{
  "name": "Member Name",
  "role": "Member Role",
  "image": "/assets/members/member-name.jpg"
}
```

If `image` is missing, the website automatically shows an initials placeholder with the member name as accessible alt text.
# AWS-Website-GCES
