<p align="center"><img alt="pix-utils" src="https://raw.githubusercontent.com/thalesog/pix-utils/master/assets/logo-pix.png" width="128px" /></p>

# <p align="center">Pix-Utils<p>

<p align="center">

  <a href="https://www.npmjs.com/package/pix-utils" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/pix-utils.svg?style=for-the-badge&color=blueviolet&logo=npm">
  </a>
<a href="https://circleci.com/gh/thalesog/pix-utils">
    <img alt="build status" src="https://img.shields.io/circleci/build/gh/thalesog/pix-utils/master?style=for-the-badge&color=blueviolet&logo=CircleCI">
  </a>
  <a href="https://github.com/thalesog/pix-utils/blob/master/LICENSE" target="blank">
<img src="https://img.shields.io/github/license/thalesog/pix-utils?style=for-the-badge&color=blueviolet" alt="github-profile-readme-generator license" />
</a><br />
<a href="https://github.com/thalesog/pix-utils/fork" target="blank">
<img src="https://img.shields.io/github/forks/thalesog/pix-utils?style=for-the-badge&color=blueviolet" alt="github-profile-readme-generator forks"/>
</a>
<a href="https://github.com/thalesog/pix-utils/stargazers" target="blank">
<img src="https://img.shields.io/github/stars/thalesog/pix-utils?style=for-the-badge&color=blueviolet" alt="github-profile-readme-generator stars"/>
</a>
<a href="https://github.com/thalesog/pix-utils/issues" target="blank">
<img src="https://img.shields.io/github/issues/thalesog/pix-utils?style=for-the-badge&color=blueviolet" alt="github-profile-readme-generator issues"/>
</a>
<a href="https://github.com/thalesog/pix-utils/pulls" target="blank">
<img src="https://img.shields.io/github/issues-pr/thalesog/pix-utils?style=for-the-badge&color=blueviolet" alt="github-profile-readme-generator pull-requests"/>
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
import { createStaticPix } from 'pix-utils';

const pix = createStaticPix({
  merchantName: 'Thales Ogliari',
  merchantCity: 'Sao Miguel do Oeste',
  pixKey: 'nubank@thalesog.com',
  infoAdicional: 'Gerado por Pix-Utils',
  transactionAmount: 1,
  txid: '',
});

pix.toBRCode();
// 00020126650014br.gov.bcb.pix0119nubank@thalesog.com0220Gerado por Pix-Utils52040000530398654041.005802BR5914Thales Ogliari6015SAO MIGUEL DO O62070503***6304059A
```

### Create Dynamic Pix

```ts
import { createDynamicPix } from 'pix-utils';

const pix = createDynamicPix({
  merchantName: 'Thales Ogliari',
  merchantCity: 'Sao Miguel do Oeste',
  url: 'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87',
});

pix.toBRCode();
//  00020126740014br.gov.bcb.pix2552payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e875204000053039865802BR5914Thales Ogliari6015SAO MIGUEL DO O62070503***63040C64
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

# 🛣️ Roadmap

- [x] Generate payments based on parameters
  - [x] Static
  - [x] Dynamic
- [x] Parse and validate EMV Codes
- [x] Export generated/parsed payment to Image
- [x] Export generated/parsed payment to EMV Code
- [x] Fetch, parse and validate remote payloads from dynamic payments
  - [ ] Verify if has already expired
- [ ] Improve tests
- [ ] Doccumentation with all methods, parameters and some examples
- [x] Beautiful README with shields and stuff
- [ ] Add dynamic payment tests

# 🍰 Contributing

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Create a branch, add commits, and [open a pull request](https://github.com/thalesog/pix-utils/compare).

# 📝 License

This project is under [MIT](https://github.com/thalesog/pix-utils/blob/master/LICENSE) license.

#

<p align="center">
 Developed with 💚 by <a href="https://github.com/thalesog">@thalesog</a> 🇧🇷
</p>
