async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Mising URL param", {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 442
    });
  }
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body {
            margin: 0;
            min-height: 100vh;
          }

          p {
            margin: 0;
          }

          #content {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
            flex-direction: column;
            gap: 20px;
          }
        </style>
        <script>
          function getUrl() {
            const copyText = document.getElementById("url");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            return copyText.value
          }

          function visit() {
            if (!getUrl()) {
              return;
            }

            window.location.replace(getUrl());
          }

          function copy () {
            if (!navigator.clipboard) {
              // Doesn't have a clipboard
              return;
            }
            const url = getUrl();
            navigator.clipboard.writeText(url);
          }

          async function share() {
            if (!navigator.share) {
              // Doesn't support sharing.
              return;
            }

            try {
              await navigator.share({
                url: getUrl()
              });
            } catch (err) {
              console.log(err)
            }
          }
        </script>
      </head>
      <body>
        <div id="content">
          <input id="url" value="${url}" readonly>
          <button onclick="visit()">Visit</button>
          <button onclick="copy()">Copy</button>
          <button onclick="share()">Share</button>
        </div>
      </body>
    <html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    }
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
