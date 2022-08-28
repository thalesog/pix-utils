<p align="center"><img alt="pix-utils" src="./examples/example-react/public/logo-pix.png" width="128px" /></p>

# <p align="center">Pix-Utils<p>

<p align="center">
  <a
    href="https://github.com/thalesog/pix-utils/blob/master/LICENSE"
    target="blank"
  >
    <img
      src="https://img.shields.io/github/license/thalesog/pix-utils?style=for-the-badge&color=blueviolet"
      alt="License"
    />
  </a>
  <a href="https://github.com/thalesog/pix-utils/stargazers" target="blank">
    <img
      src="https://img.shields.io/github/stars/thalesog/pix-utils?style=for-the-badge&color=blueviolet"
      alt="Stars"
    />
  </a>
  <br />
  <a href="https://www.npmjs.com/package/pix-utils" target="_blank">
    <img
      src="https://img.shields.io/npm/v/pix-utils.svg?style=for-the-badge&color=blueviolet&logo=npm"
      alt="Version"
    />
  </a>
  <a
    href="https://github.com/thalesog/pix-utils/actions/workflows/release.yaml"
  >
    <img
      src="https://img.shields.io/github/workflow/status/thalesog/pix-utils/Release?style=for-the-badge&color=blueviolet&logo=GitHub"
      alt="Build Status"
    />
  </a>
</p>

> Pix-Utils is a set of tools to parse, generate and validate payments of Brazil Instant Payment System (Pix), making fast and simple to handle charges and proccess then in your project.

# 🚀 Usage

### Install the package in your project

```sh
yarn add pix-utils
```

### Create Static Pix

```ts
import { createStaticPix, hasError } from 'pix-utils';

const pix = createStaticPix({
  merchantName: 'Thales Ogliari',
  merchantCity: 'Sao Paulo',
  pixKey: 'nubank@thalesog.com',
  infoAdicional: 'Gerado por Pix-Utils',
  transactionAmount: 1,
});

if (!hasError(pix)) {
  const brCode = pix.toBRCode();
  // 00020126650014br.gov.bcb.pix0119nubank@thalesog.com0220Gerado por Pix-Utils52040000530398654041.005802BR5914Thales Ogliari6009Sao Paulo62070503***63046069
}
```

### Create Dynamic Pix

```ts
import { createDynamicPix, hasError } from 'pix-utils';

const pix = createDynamicPix({
  merchantName: 'Thales Ogliari',
  merchantCity: 'Sao Paulo',
  url: 'https://pix.thalesogliari.com.br',
});

if (!hasError(pix)) {
  const brCode = pix.toBRCode();
  // 00020126540014br.gov.bcb.pix2532https://pix.thalesogliari.com.br5204000053039865802BR5914Thales Ogliari6009SAO PAULO62070503***63043FD3
}
```

### Throw errors

By default, pix-utils wont throw an error when parsing an invalid pix, but you can enable it by using the `throwIfError` function.

```js
import { createDynamicPix } from 'pix-utils';

const pix = createDynamicPix({
  merchantName: 'Thales Ogliari',
  merchantCity: 'Sao Paulo',
  url: 'https://pix.thalesogliari.com.br',
}).throwIfError();

const brCode = pix.toBRCode();
// 00020126540014br.gov.bcb.pix2532https://pix.thalesogliari.com.br5204000053039865802BR5914Thales Ogliari6009SAO PAULO62070503***63043FD3
```

### Parse BRCode

```js
const pix = parsePix(
  '00020126650014br.gov.bcb.pix0119nubank@thalesog.com0220Gerado por Pix-Utils52040000530398654041.005802BR5914Thales Ogliari6015SAO MIGUEL DO O62070503***6304059A'
);

// {
//   type: 'STATIC',
//   merchantCategoryCode: '0000',
//   transactionCurrency: '986',
//   countryCode: 'BR',
//   merchantName: 'Thales Ogliari',
//   merchantCity: 'SAO MIGUEL DO O',
//   pixKey: 'nubank@thalesog.com',
//   transactionAmount: 1,
//   infoAdicional: 'Gerado por Pix-Utils',
//   txid: '***',
//   toBRCode: [Function: toBRCode],
//   toImage: [Function: toImage]
// }
```

### Export to Base64 Image

```js
const pix = parsePix(
  '00020126650014br.gov.bcb.pix0119nubank@thalesog.com0220Gerado por Pix-Utils52040000530398654041.005802BR5914Thales Ogliari6015SAO MIGUEL DO O62070503***6304059A'
);

pix.toImage();
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAAAklEQVR4AewaftIAAAwHSURBVO3BQW4sy7LgQDKh/W...
```

# 🍰 Contributing

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Create a branch, add commits, and [open a pull request](https://github.com/thalesog/pix-utils/compare).

# 📝 License

This project is under [MIT](https://github.com/thalesog/pix-utils/blob/master/LICENSE) license.

#

<p align="center">
 Developed with 💚 by <a href="https://github.com/thalesog">@thalesog</a> 🇧🇷
</p>
