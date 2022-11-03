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

        #url {
          border: 0;
        }

        .hidden {
          display: none;
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

        /* sourced from https://copy-paste-css.com/ */

        .btn {
          cursor: pointer;
          outline: 0;
          display: inline-block;
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          background-color: transparent;
          border: 1px solid transparent;
          padding: 6px 12px;
          font-size: 1rem;
          border-radius: .25rem;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          color: #0d6efd;
          border-color: #0d6efd;
        }

        .btn:hover {
          color: #fff;
          background-color: #0d6efd;
          border-color: #0d6efd;
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
        <input id="url" value="${url}" readonly class="hidden">
        <div>${url}</div>
        <button class="btn" onclick="share()">Share</button>
        <button class="btn" onclick="copy()">Copy</button>
        <button class="btn" onclick="visit()">Visit</button>
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
