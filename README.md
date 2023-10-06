# Uninus Superapp

## Didalam Repo ini terdapat 11 Aplikasi Berikut

- Akreditasi
- Tracer Alumni
- Evaluasi
- PDDIKTI Neo Feeder
- Management Keuangan
- Management Pegawai
- Management Tata Usaha
- PMB
- SIAKAD (Litera)
- SmartDashboard
- LMS

## Demo Aplikasi

- https://pmb.dev.uninus.ac.id
- https://pmb.dev.admin.uninus.ac.id
- https://siakad.dev.uninus.ac.id
- https://evaluasi.dev.uninus.ac.id
- https://tatausaha.dev.uninus.ac.id
-https://sisfo.akuntansi.dev.uninus.ac.id
- https://sisfo.aset.dev.uninus.ac.id
- https://sisfo.pengeluaran.dev.uninus.ac.id
- https://sisfo.pembayaran.dev.uninus.ac.id
- https://pegawai.dev.uninus.ac.id
- https://tata-usaha.dev.uninus.ac.id
- https://tracer.dev.uninus.ac.id
- https://dashboard.dev.uninus.ac.id

# WAJIB Setup Husky

Untuk bisa menggunakan husky agar berjalan baik dan benar maka perlu di inisialisasi dulu

- Jalankan perintah
  > `yarn husky install`

# Cara Menggunakan GIT dengan Baik dan Benar

### Jika Kamu baru di Project ini maka kamu bisa ke Section Installasi

# Cara Berkontribusi di Project Ini

# Di Mohon jangan PUSH Langsung ke Branch "develop"

## Cara Branching

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git checkout -b "improvement/apa-yang-di-improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git checkout -b "bugfix/apa-yang-di-fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git checkout -b "feature/fitur-apa-yang-di-buat`

## Cara Commit

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git commit -m "improvement: apa yang di improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git commit -m "bugfix: apa yang di fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git commit -m "feature: fitur apa yang di buat`

## Cara Mengatasi Konflik

- 1 Stash dulu kerjaan kamu supaya gak ilang

> `git stash`

- 2 Setelah itu kamu perlu pull perubahan dari branch `develop`

> `git pull origin develop`

- 3 Setelah kamu berhasil melakukan pembaruan dari branch `develop` selanjutnya kamu perlu mengembalikan pekerjaan mu sebelum nya yang ter-_stash_

> `git stash pop`

- 4 Lanjutkan Pekerjaan dengan Semestinya

- 5 Tapi jika ketika melakukan langkah-langkah di atas masih terjadi error konflik atau karena kecerobohan kamu, maka ikuti langkah yang bawah

## Cara Mengatasi Konflik Versi 2

- 1 Pindah dulu ke Branch `develop`

> `git checkout develop`

- 2 Kemudian pull perubahan terbaru dari branch `develop`

> `git pull`

- 3 Kemudian Pindah lagi ke branch yang sedang kamu kerjakan

> `git checkout <branch mu>`

- 4 Selanjutnya kita perlu merge perubahan terbaru dari `develop`

> `git merge origin develop`

## Rekomendasi Kode Editor

Visual Studio Code

### Rekomendasi Extension

- Stylelint
- TailwindCSS Intelesense
- Prettier
- Error Lens
- ESLint

## Setup Project

- Clone Project ini ( Direkomendasikan menggunakan SSH )

  > `git clone git@github.com:himatifdevteam/uninus`

## Install NodeJS dan Yarn

- Anda perlu menginstall dulu NodeJS dan Yarn ( Direkomendasikan menggunakan NodeJS Versi LTS )

  > `npm i -g yarn`

## Install Dependency

- Pasang Dependency

  > `yarn install`

## Menjalankan Aplikasi

- Untuk menjalankan Project _Frontend Akreditasi_ dengan mode **Development** ketik perintah berikut

  > `yarn akreditasi:serve`

- Untuk menjalankan Project _Frontend Akreditasi_ dengan mode **Production** ketik perintah berikut

  > `yarn akreditasi:serve:prod`

- Untuk menjalankan Project _Frontend Evaluasi_ dengan mode **Development** ketik perintah berikut

  > `yarn evaluasi:serve`

- Untuk menjalankan Project _Frontend Evaluasi_ dengan mode **Production** ketik perintah berikut

  > `yarn evaluasi:serve:prod`

- Untuk menjalankan Project _Frontend Management Keuangan_ dengan mode **Development** ketik perintah berikut

  > `yarn keuangan:serve`

- Untuk menjalankan Project _Frontend Management Keuangan_ dengan mode **Production** ketik perintah berikut

  > `yarn keuangan:serve:prod`

- Untuk menjalankan Project _Frontend PDDIKTI NeoFeeder_ dengan mode **Development** ketik perintah berikut

  > `yarn neo-feeder:serve`

- Untuk menjalankan Project _Frontend PDDIKTI NeoFeeder_ dengan mode **Production** ketik perintah berikut

  > `yarn neo-feeder:serve:prod`

- Untuk menjalankan Project _Frontend Management Pegawai_ dengan mode **Development** ketik perintah berikut

  > `yarn pegawai:serve`

- Untuk menjalankan Project _Frontend Management Pegawai_ dengan mode **Production** ketik perintah berikut

  > `yarn pegawai:serve:prod`

- Untuk menjalankan Project _Frontend PMB_ dengan mode **Development** ketik perintah berikut

  > `yarn pmb:serve`

- Untuk menjalankan Project _Frontend PMB_ dengan mode **Production** ketik perintah berikut

  > `yarn pmb:serve:prod`

- Untuk menjalankan Project _Frontend SIAKAD (Litera)_ dengan mode **Development** ketik perintah berikut

  > `yarn siakad:serve`

- Untuk menjalankan Project _Frontend SIAKAD (Litera)_ dengan mode **Production** ketik perintah berikut

  > `yarn siakad:serve:prod`

- Untuk menjalankan Project _Frontend SmartDashboard_ dengan mode **Development** ketik perintah berikut

  > `yarn smart-dashboard:serve`

- Untuk menjalankan Project _Frontend SmartDashboard_ dengan mode **Production** ketik perintah berikut

  > `yarn smart-dashboard:serve:prod`

- Untuk menjalankan Project _Frontend Management Management Tata Usaha_ dengan mode **Development** ketik perintah berikut

  > `yarn tata-usaha:serve`

- Untuk menjalankan Project _Frontend Management Tata Usaha_ dengan mode **Production** ketik perintah berikut

  > `yarn tata-usaha:serve:prod`

- Untuk menjalankan Project _Frontend Tracer Alumni_ dengan mode **Development** ketik perintah berikut

  > `yarn tracer:serve`

- Untuk menjalankan Project _Frontend Tracer Alumni_ dengan mode **Production** ketik perintah berikut

  > `yarn tracer:serve:prod`

- Untuk melakukan Migrate Database **Development** ketik perintah berikut

  > `yarn api:migrate`

- Untuk melakukan Rollback Database ketik perintah berikut

  > `yarn api:migrate:reset`

- Untuk menerapkan perubahan skema ke database ketik perintah berikut

  > `yarn api:db:push`

- Untuk menarik skema dari database yang ada dan perbarui skema Prisma ketik perintah berikut

  > `yarn api:db:pull`

- Untuk menjalankan Prisma Studio ketik perintah berikut

  > `yarn api:studio`

- Untuk menjalankan Project _API_ dengan mode **Development** ketik perintah berikut

  > `yarn api:serve`

- Untuk menjalankan Project _API_ dengan mode **Production** ketik perintah berikut

  > `yarn api:serve:prod`

## Membuild Aplikasi ke Production

- Untuk membuild Project _Akreditasi_ ketik perintah berikut

  > `yarn akreditasi:build`

- Untuk menjalankan Project _Frontend Evaluasi_ dengan mode **Development** ketik perintah berikut

  > `yarn evaluasi:build`

- Untuk menjalankan Project _Frontend Management Keuangan_ dengan mode **Development** ketik perintah berikut

  > `yarn keuangan:build`

- Untuk menjalankan Project _Frontend PDDIKTI NeoFeeder_ dengan mode **Development** ketik perintah berikut

  > `yarn neo-feeder:build`

- Untuk menjalankan Project _Frontend Management Pegawai_ dengan mode **Development** ketik perintah berikut

  > `yarn pegawai:build`

- Untuk menjalankan Project _Frontend PMB_ dengan mode **Development** ketik perintah berikut

  > `yarn pmb:build`

- Untuk menjalankan Project _Frontend SIAKAD (Litera)_ dengan mode **Development** ketik perintah berikut

  > `yarn siakad:build`

- Untuk menjalankan Project _Frontend SmartDashboard_ dengan mode **Development** ketik perintah berikut

  > `yarn smart-dashboard:build`

- Untuk menjalankan Project _Frontend Management Management Tata Usaha_ dengan mode **Development** ketik perintah berikut

  > `yarn tata-usaha:build`

- Untuk menjalankan Project _Frontend Tracer Alumni_ dengan mode **Development** ketik perintah berikut

  > `yarn tracer:build`

- Untuk menjalankan Project _API_ dengan mode **Development** ketik perintah berikut

  > `yarn api:build`

## Development With Nix

Development dengan Nix membuat proses Develop menjadi lebih mudah dan ringkas, semua dependency akan terurus dengan sendirinya, juga independent artinya tidak akan menggangu environment yang lain

- Pasang Nixpkgs

> `sh <(curl -L https://nixos.org/nix/install) --no-daemon`

- Pasang nix-flakes

> `nix-env -iA nixpkgs.nixFlakes`

- Setup nix-flakes \
  Edit file yang ada di `~/.config/nix/nix.conf` atau `/etc/nix/nix.conf` dan tambahkan:

> `experimental-features = nix-command flakes`

- Pasang nix-direnv

> `nix-env -f '<nixpkgs>' -iA nix-direnv`

- Setup nix-direnv

> `source $HOME/.nix-profile/share/nix-direnv/direnvrc`

- Masuk ke folder yang sudah di clone kemudian jalankan perintah berikut

> `direnv allow`

- Dan enjoy tinggal tunggu dependency terinstall dengan sendirinya

## Setup Env

Masuk kedalam folder `apps/nama-apps/` Copy terlebih dahulu `.env.example` kemudian rename ke `.env`
