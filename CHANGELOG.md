# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.1-alpha.10](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.9...v0.0.1-alpha.10) (2021-02-05)


### Features

* add german translation to app ([0d6932a](https://github.com/crutchcorn/GitShark/commit/0d6932ad3530f8bef49c2fb84cf8faeb0d4724e7))
* enhanced error handling UI and reporting experience ([ed9303e](https://github.com/crutchcorn/GitShark/commit/ed9303e65f0920baeac1c9506e59df3654683ed8))


### Bug Fixes

* cards with arrows are no longer a different height from cards without ([013ec14](https://github.com/crutchcorn/GitShark/commit/013ec1430cf13ac769380e85d39e93452bc55fc3))
* copy commit sha now works as-expected ([cfc4b38](https://github.com/crutchcorn/GitShark/commit/cfc4b384026167a75fe978e32b9621f65fb5fc66))
* sheet view can now properly scroll ([7d07358](https://github.com/crutchcorn/GitShark/commit/7d07358a2f3bcd87b36dd2e74cb89cedb859e557))

### [0.0.1-alpha.9](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.8...v0.0.1-alpha.9) (2021-01-26)


### Bug Fixes

* commiting no longer throws errors ([135c729](https://github.com/crutchcorn/GitShark/commit/135c7298df7a2ea615529717ea176aa1c7040bdd))
* discard newly created file now deletes it ([18134d1](https://github.com/crutchcorn/GitShark/commit/18134d193313ab3df5aba4318672437474fa1603))
* fixed fetch not behaving as-expected ([a76abfc](https://github.com/crutchcorn/GitShark/commit/a76abfc39cd916e3526f74a185e78902f6680e0d))
* run git log once a project is pulled ([5aaf0cf](https://github.com/crutchcorn/GitShark/commit/5aaf0cfae80a1e23a8d617a9e93b20c8bb0e3d7b))
* set last updated property properly ([93a7565](https://github.com/crutchcorn/GitShark/commit/93a75656f3d5b71dfe87862999a29cd63d1fd010))
* staging files no longer throws errors ([edcdb33](https://github.com/crutchcorn/GitShark/commit/edcdb33c2f3c46310ea7167b4203d45849da01c8))

### [0.0.1-alpha.8](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.7...v0.0.1-alpha.8) (2021-01-26)

### Features

* added early error boundaries for file change errors ([e635be9](https://github.com/crutchcorn/GitShark/commit/e635be9b766db91df91250b1e406177cc8cb41ea))
* added early error boundaries for git log errors ([b44fef7](https://github.com/crutchcorn/GitShark/commit/b44fef7c86d4b5f3570548c0243a96e0e1c9a1a3))
* added early error boundaries for unknown errors and branch errors ([6cf859c](https://github.com/crutchcorn/GitShark/commit/6cf859c7b05883076c98a24f1b942fa3bda3ec18))
* initial work to enable translations in the app ([ae8011e](https://github.com/crutchcorn/GitShark/commit/ae8011ef3e3b04fe08092dd93784c2988da55e13))
* made repo list dual column ([6e465a5](https://github.com/crutchcorn/GitShark/commit/6e465a5ebaceab876924ec7c7f89bb68da93acc5))


### Bug Fixes

* change branch with staged items now functions as-expected ([a165e8f](https://github.com/crutchcorn/GitShark/commit/a165e8fddb0dad0ecdff97fd217c3cdb81d540b7)), closes [#67](https://github.com/crutchcorn/GitShark/issues/67)
* commit details page now shows full list of changed items ([a15a0f0](https://github.com/crutchcorn/GitShark/commit/a15a0f09aaecf9ee821acea5326afdc3f149d01b)), closes [#45](https://github.com/crutchcorn/GitShark/issues/45)
* crash no longer occurs when user fetches twice in a row ([0a2e996](https://github.com/crutchcorn/GitShark/commit/0a2e99610118d740352f3dfbe848f6d8a6783b78)), closes [#51](https://github.com/crutchcorn/GitShark/issues/51)
* dark mode now applies properly to dialog text ([6afc221](https://github.com/crutchcorn/GitShark/commit/6afc221956abe23befaa61d2c8f78ee83d352a11))
* fixed bug in opening git details on large projects ([b8129d6](https://github.com/crutchcorn/GitShark/commit/b8129d67d233ea6d3c7392710806131a86cf8b90))
* fixed OOM errors when trying to run push ([4f38e67](https://github.com/crutchcorn/GitShark/commit/4f38e671bd94cd55ebc6b2573eff9fbb791c95e4))
* pull no longer crashes app on large repos, no more 404s on pull ([c889703](https://github.com/crutchcorn/GitShark/commit/c88970359f42206e81abc5c9856fdcfaee6003a6))
* stage split view now centers properly on tablets ([09de9b1](https://github.com/crutchcorn/GitShark/commit/09de9b14aa9bfea1c90217ec0931f3661880b385))

### [0.0.1-alpha.7](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.6...v0.0.1-alpha.7) (2021-01-06)


### Bug Fixes

* navigation bar not being transparent on new versions of Android ([b3c9401](https://github.com/crutchcorn/GitShark/commit/b3c940169bd34823cb5381806b32ae5a63ea28ed))

### [0.0.1-alpha.6](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.5...v0.0.1-alpha.6) (2021-01-06)

### Bug Fixes

* fab rendering issues on iOS ([07523d9](https://github.com/crutchcorn/GitShark/commit/07523d9403003b005a03530fc34ab9b30855582b))
* fixed checking out branch on large repos ([51d2eee](https://github.com/crutchcorn/GitShark/commit/51d2eeed0aa30f74f88b60c4531be16eb73e94e1))
* github login works on higher end devices ([fcd9431](https://github.com/crutchcorn/GitShark/commit/fcd943164aa4e7f54dc3eb54351468fdde5c03e0))
* iOS clone bug ([18543d8](https://github.com/crutchcorn/GitShark/commit/18543d87339269997ff4d663d6a96028a27c0a4f))
* parent directory of cloned repo is no longer modified ([61f15a1](https://github.com/crutchcorn/GitShark/commit/61f15a1c5ba207045ed76ef5735f7cff7ca91a33))
* prevent crashing when discarding file changes in large repos ([089fa2e](https://github.com/crutchcorn/GitShark/commit/089fa2e68d160de7400fa46f92749ed050f04969))
* update git log once branch changes ([bf90bf4](https://github.com/crutchcorn/GitShark/commit/bf90bf4df1e56904b0ccf3a68a1d0fc7057b1c2d))

### [0.0.1-alpha.5](https://github.com/crutchcorn/GitShark/compare/v0.0.1-alpha.4...v0.0.1-alpha.5) (2020-08-24)


### Features

* add Remote functionality ([f287955](https://github.com/crutchcorn/GitShark/commit/f287955c4906b0c21be1289a83304813c09670cc))


### Bug Fixes

* remotes don't all expand when one does now ([164fa52](https://github.com/crutchcorn/GitShark/commit/164fa522baa21a8f23f15140fdd9d311525e7e24))

### [0.0.1-alpha.4](https://github.com/oceanbit-dev/GitShark/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2020-08-15)


### Bug Fixes

* "New repository" FAB now displays correct color values ([aeaacbd](https://github.com/oceanbit-dev/GitShark/commit/aeaacbd86d90f968b8d6c2516bbe53c9e3cdf135)), closes [#42](https://github.com/oceanbit-dev/GitShark/issues/42)
* clone works on public repos without logging into GitHub now ([9ac88db](https://github.com/oceanbit-dev/GitShark/commit/9ac88db657a05dffb4ff30be298abe9a64863eca))
* user's GitHub name now shows proper color in dark mode ([558f044](https://github.com/oceanbit-dev/GitShark/commit/558f044ec95982ac9ff18e030f0ddbb9a0188d29))

### Performance Improvements

* improve git log performance by upwards of 13x ([9f20492](https://github.com/oceanbit-dev/GitShark/commit/9f204923a6fed0ec299a16bc127739420dd83dd8))
* increase git status performance by 4x ([dc78917](https://github.com/oceanbit-dev/GitShark/commit/dc789177af2e3314cc4d894b8914f83fcff81653))
* increase performance of commit and UI sync ([0d442fe](https://github.com/oceanbit-dev/GitShark/commit/0d442fefedd3426868ff3b1f8f06f61c585e41a6))

### [0.0.1-alpha.3](https://github.com/oceanbit-dev/GitShark/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2020-08-11)


### Bug Fixes

* commit details back button now works ([f5d670f](https://github.com/oceanbit-dev/GitShark/commit/f5d670f66087ac166e6ceb4605b659eaeb3bd7ae)), closes [#43](https://github.com/oceanbit-dev/GitShark/issues/43)
* commit details screen should now load changes ([0995d5d](https://github.com/oceanbit-dev/GitShark/commit/0995d5dfd6466aa82f59b5939d3f19d71284fb4d))
* display real author and committer data in details ([dbd3dd2](https://github.com/oceanbit-dev/GitShark/commit/dbd3dd2259916fbff57bf2a29375a86de0a2e6d9))
* temporarily disable ref list in commit details ([2260f8d](https://github.com/oceanbit-dev/GitShark/commit/2260f8d805f99d272b3798b5da0d280e4a9082a8))

### [0.0.1-alpha.2](https://github.com/oceanbit-dev/GitShark/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2020-08-08)


### Features

* added cloning private github repos ([6bb2092](https://github.com/oceanbit-dev/GitShark/commit/6bb2092a4c7d05dee1c99252ce5ace3a07aa6f57))


### Bug Fixes

* fix cloning on larger projects ([7ce438c](https://github.com/oceanbit-dev/GitShark/commit/7ce438ce9c982ea5cd1ec18ebb039dee119b0c42))
* fixed an error that was thrown after initial clone ([3a49bf8](https://github.com/oceanbit-dev/GitShark/commit/3a49bf81e9ad4c3e96925fc1e2206b1914e40f50))

### 0.0.1-alpha.1 (2020-07-28)
