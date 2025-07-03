
## Giriş
Merhaba herkese,

Ben Hazal Şendoğan. 
Fake Store API kullanılarak geliştirilecek bu projede, ürün listeleme, detay sayfaları oluşturmanız ve sepet yapısı kurdum.


## Kurulum

İlk önce git clone ile projeyi indirin. Burada örnek olması amacıyla Desktop'a kurulum yaptım.
```
git clone <project_link>

```

Uygulamayı ayağa kaldırmadan "npm install" komutunu çalıştırın. 


Uygulamayı ayağa kaldırmak için bu komutu kullanın:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Ardından, sonucu görmek için tarayıcıdan bu URL'yi açın: [http://localhost:3000](http://localhost:3000)


## Kullanılan Teknolojiler
Bu uygulamayı Next.js ile geliştirdim.
UI kütüpanesi olarak Prime React Kullandım.
Custom Cssler için CSS kullandım. Çünkü yer aldığım projelerde ayrı CSS dosyalarında stil düzenlemeleri yaptım.
CSS konusunda deneyimlerimi daha iyi gösterebilmek adına bu tür bir uygulamaya gittim.

## Atomic Design

“Atomic Design”, Web Designer olan Brad Frost’un 2016'da yazdığı bir kitapla ortaya çıkardığı bir düşünce, bir tasarım mimarisidir. Çoğu mimari gibi “Atomic Design” da doğadan ilham alınarak oluşturulmuştur. [Atomic Design Nedir? by Evren Vural](https://medium.com/hardwareandro/atomic-design-nedir-5abee8c9f4df).

Bir arayüzü, Atom, Molekül, Organizma, Şablon, Sayfa olmak üzere 5'e böler.
Atom en küçük birimdir (Button, Input). Atomlar Molekülleri oluşturur ( input + buttondan bir molekül oluşur). Moleküller birleşerek organizmaları (navigasyon), Organizmalar da birleşerek Şablonları oluşturur. Bu şablonlar da birleşerek Sayfayı oluşturur. 

Components klasörünün altında atomic design mantığını kullanarak atoms,moleculs ve organisms klasörlerini oluşturdum. 
Button,InputText,ProductImage, Slider ve Dropdown componentler atomic componentlerdir. 
FilterComponent, Header, Pagination ve ProductCard componentleri atomic componentlerin birleşimi ile oluştuğundan molecular componentlerdir.
CartOverlay, ProductDetailDisplay ve ProductList molecular componentlerin birleşimiyle oluştuğu için organizmadır.


## Test Case

npm run test:coverage ile elde ettiğim sonuç aşağıdadır.


----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 9 failed, 4 passed, 13 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        6.203 s
Ran all test suites.

## Sonuç

Daha önce Strapi CMS ve Next.js ile [epara.app](https://epara.app/sq) websitesini geliştirdim.
Bu websitesini de dikkate almanızı rica ederim.





