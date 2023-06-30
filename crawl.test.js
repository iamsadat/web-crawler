const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://roadmap.sh/cyber-security";
  const actual = normalizeURL(input);
  const expected = "roadmap.sh/cyber-security";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://roadmap.sh/cyber-security/";
  const actual = normalizeURL(input);
  const expected = "roadmap.sh/cyber-security";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://ROADmap.sh/cyber-security/";
  const actual = normalizeURL(input);
  const expected = "roadmap.sh/cyber-security";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://roadmap.sh/cyber-security";
  const actual = normalizeURL(input);
  const expected = "roadmap.sh/cyber-security";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTML = `
  <html>
    <body>
        <a href="https://youtube.com">Youtube</a>
    </body>
  </html>`;
  const inputBaseURL = "https://youtube.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://youtube.com/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/path/">Youtube</a>
    </body>
  </html>`;
  const inputBaseURL = "https://youtube.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://youtube.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTML = `
    <html>
      <body>
          <a href="https://youtube.com/videos/">Youtube</a>
          <a href="/comments/">Videos</a>
      </body>
    </html>`;
  const inputBaseURL = "https://youtube.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = [
    "https://youtube.com/videos/",
    "https://youtube.com/comments/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
