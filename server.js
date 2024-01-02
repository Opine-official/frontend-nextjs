const fs = require("fs");
const https = require("https");
const next = require("next");
const httpProxyMiddleware = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      if (req.url.startsWith("/api/")) {
        httpProxyMiddleware({
          target: "https://localhost:3000",
          secure: false,
        })(req, res);
      } else {
        handle(req, res);
      }
    })
    .listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on https://localhost:3000");
    });
});
