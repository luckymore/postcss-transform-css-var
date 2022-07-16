const postcss = require("postcss");
const syntaxLess = require("postcss-less");
const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
    syntax: syntaxLess
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("can convert variables in css", async () => {
  await run(
    ":root { --color: black; --size: 15px; } div { --size: 20px; background: var(--color); font-size: var(--size) } p { font-size: var(--size) }",
    " @color: black; @size: 15px; div { @size: 20px; background: @color; font-size: @size } p { font-size: @size }",
    {}
  );
});

it("can convert variables in less", async () => {
  await run(
    `:root { --color: black; }
    @prefix: ~'flyfly';
    .@prefix {
      &-foo {
        --color: red;
        // --c: 10px;
        &-bar {
          background: var(--color, blue);
        }
      }
    }
    `,
    ` @color: black;
    @prefix: ~'flyfly';
    .@prefix {
      &-foo {
        @color: red;
        // --c: 10px;
        &-bar {
          background: @color;
        }
      }
    }
    `,
    {}
  );
});

