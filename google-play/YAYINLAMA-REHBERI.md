# Sınıf Takip — Google Play'de yayınlama rehberi

Uygulama bir web uygulaması (PWA). Google Play'e **Trusted Web Activity (TWA)** olarak girer: Android paketi, `https://dkab-6670.github.io/S-n-f-Takibim/` adresini adres çubuğu olmadan tam ekran açar. Uygulamayı güncellemek için GitHub'a yükleme yapmanız yeterli; Play'e yeni paket göndermeniz gerekmez.

## Bu klasörde hazır olanlar

| Dosya | Nerede kullanılır |
|---|---|
| `play-icon-512.png` | Play Console → Mağaza girişi → Uygulama simgesi (512×512) |
| `feature-graphic-1024x500.png` | Play Console → Mağaza girişi → Öne çıkan grafik |
| `assetlinks.json` | Adres çubuğunu gizlemek için (Adım 4) |
| Aşağıdaki metinler | Mağaza girişi, Veri güvenliği, İçerik derecelendirmesi |

Projede ayrıca şunlar düzeltildi: Android'in simgeyi kesmemesi için ayrı "maskable" simgeler (`icon-maskable-192.png`, `icon-maskable-512.png`), manifest'teki tema rengi sayfayla eşitlendi, gizlilik sayfasındaki silme bölümüne doğrudan bağlantı eklendi (`gizlilik.html#silme`).

---

## Adım 1 — Google Play geliştirici hesabı

1. https://play.google.com/console adresinden hesap açın (tek seferlik 25 USD).
2. Kimlik doğrulamasını tamamlayın.
3. **Önemli:** Kişisel hesaplarda, uygulamayı herkese açmadan önce **en az 12 test kullanıcısıyla 14 gün kapalı test** yapmanız zorunludur. Öğretmen arkadaşlarınızın Gmail adreslerini şimdiden toplayın.

## Adım 2 — Android paketini (.aab) oluşturun

En kolay yol PWABuilder (bilgisayarınıza Java/Android kurmanız gerekmez):

1. https://www.pwabuilder.com adresine `https://dkab-6670.github.io/S-n-f-Takibim/` yazın → **Package For Stores** → **Android** → **Google Play**.
2. Ayarlar:
   - **Package ID:** `io.github.dkab_6670.sinif_takip`
   - **App name:** `Sınıf Takip`, **Short name:** `Sınıf Takip`
   - **Version code:** `1`, **Version name:** `1.0.0`
   - **Signing key:** *Create new*
3. İnen zip içinde: `app-release-bundle.aab`, `signing.keystore`, `signing-key-info.txt`, `assetlinks.json`.

> ⚠️ `signing.keystore` ve `signing-key-info.txt` dosyalarını **kaybetmeyin ve kimseyle paylaşmayın.** Güncelleme yaparken bu anahtar gerekir. GitHub'a yüklemeyin; bir USB belleğe veya şifreli bir bulut klasörüne yedekleyin.

## Adım 3 — Play Console'da uygulamayı oluşturun

**Uygulama oluştur:** Ad `Sınıf Takip`, dil Türkçe, Uygulama, Ücretsiz.

**Uygulama içeriği** bölümündeki her maddeyi doldurun:

- **Gizlilik politikası:** `https://dkab-6670.github.io/S-n-f-Takibim/gizlilik.html`
- **Uygulama erişimi:** "Bazı işlevler kısıtlı" → giriş gerekiyor. Uygulamada e-posta/şifre ile **yalnızca inceleme için bir deneme hesabı** açın, içine birkaç örnek öğrenci ekleyin, e-posta ve şifresini buraya yazın.
- **Reklamlar:** Hayır, reklam içermiyor.
- **Hedef kitle:** Yalnızca **18 yaş ve üzeri**. (Çocukları seçmeyin; uygulama öğretmenler içindir. Çocuk seçilirse "Aileler" politikası devreye girer.)
- **İçerik derecelendirmesi:** Kategori "Yardımcı program, üretkenlik, iletişim veya diğer". Şiddet, cinsellik, kumar, uyuşturucu sorularına **Hayır**. Kullanıcılar birbirleriyle etkileşim kuruyor mu: **Hayır**. Konum paylaşımı: **Hayır**. Dijital satın alma: **Hayır**.
- **Haber uygulaması:** Hayır. **Devlet uygulaması:** Hayır. **Finans / sağlık özellikleri:** Yok.
- **Hesap silme:** Uygulama içinden silinebiliyor: Evet. Web bağlantısı: `https://dkab-6670.github.io/S-n-f-Takibim/gizlilik.html#silme`
- **Veri güvenliği:** aşağıdaki tablo.

### Veri güvenliği formu yanıtları

Genel sorular:
- Kullanıcı verisi topluyor veya paylaşıyor mu? **Evet**
- Veriler aktarım sırasında şifreleniyor mu? **Evet** (HTTPS)
- Kullanıcılar verilerinin silinmesini isteyebiliyor mu? **Evet**

Toplanan veriler (hiçbiri **paylaşılmıyor**; Firebase "hizmet sağlayıcı" sayılır, paylaşım değildir; hiçbiri geçici değil):

| Play kategorisi → tür | Zorunlu mu | Amaç |
|---|---|---|
| Kişisel bilgiler → Ad | Zorunlu | Uygulama işlevselliği, Hesap yönetimi |
| Kişisel bilgiler → E-posta adresi | Zorunlu | Uygulama işlevselliği, Hesap yönetimi |
| Kişisel bilgiler → Telefon numarası (veli) | İsteğe bağlı | Uygulama işlevselliği |
| Kişisel bilgiler → Diğer bilgiler (okul no, sınıf, notlar, yoklama) | Zorunlu | Uygulama işlevselliği |
| Fotoğraflar ve videolar → Fotoğraflar | İsteğe bağlı | Uygulama işlevselliği |
| Dosyalar ve dokümanlar | İsteğe bağlı | Uygulama işlevselliği |
| Cihaz veya diğer kimlikler (App Check / reCAPTCHA) | Zorunlu | Dolandırıcılığı önleme, güvenlik |

Konum, finans, sağlık, mesajlar, kişiler, uygulama etkinliği, web tarama geçmişi: **Toplanmıyor.**

## Adım 4 — Adres çubuğunu gizleme (Digital Asset Links)

Bu adım yapılmazsa uygulama çalışır ama üstte tarayıcı adres çubuğu görünür.

1. Play Console → **Test ve yayınla → Uygulama bütünlüğü → Uygulama imzalama** bölümünden **"Uygulama imzalama anahtarı sertifikası" SHA-256** değerini kopyalayın.
2. PWABuilder'dan inen `signing-key-info.txt` içindeki SHA-256 değerini de alın.
3. Bu klasördeki `assetlinks.json` dosyasında iki `BURAYA_...` yazısını bu değerlerle değiştirin.
4. Dosyanın **alan adının köküne** konması gerekir: `https://dkab-6670.github.io/.well-known/assetlinks.json`
   Bu, `S-n-f-Takibim` deposunda değil, **`Dkab-6670.github.io` adında ayrı bir depoda** olmalı:
   - GitHub'da `Dkab-6670.github.io` adlı herkese açık bir depo açın.
   - İçine `.well-known/assetlinks.json` ve boş bir `.nojekyll` dosyası yükleyin. (`.nojekyll` olmazsa GitHub nokta ile başlayan klasörü yayınlamaz.)
   - Settings → Pages → main dalından yayınlamayı açın.
   - Yeni bir depo açmak mevcut sitenizin adresini değiştirmez.

## Adım 5 — Kapalı test ve yayın

1. **Test ve yayınla → Kapalı test** → yeni sürüm → `app-release-bundle.aab` dosyasını yükleyin.
2. Test kullanıcılarının e-postalarını ekleyin, katılım bağlantısını onlara gönderin. Hepsi bağlantıdan katılıp uygulamayı yüklemeli.
3. 12 kişi 14 gün boyunca testte kaldıktan sonra **Üretim erişimi için başvur**.
4. Onay gelince sürümü **Üretim**'e taşıyın. İnceleme genellikle birkaç gün sürer.

## Mağaza metinleri

**Uygulama adı (en fazla 30):**
Sınıf Takip

**Kısa açıklama (en fazla 80):**
Yoklama, ödev, not, ders planı ve veli mesajlarını tek yerden takip edin.

**Tam açıklama (en fazla 4000):**

Sınıf Takip, öğretmenlerin sınıf içi işlerini tek bir yerde toplayan bir sınıf yönetim uygulamasıdır. Kağıt çizelgelerle uğraşmadan yoklama alın, ödevleri işaretleyin, notları girin ve velilerle kolayca iletişim kurun.

📋 Yoklama
• Tek dokunuşla var/yok işaretleme
• İşaretsizleri toplu "Var" yapma
• Haftalık ve aylık yoklama çıktısı (PDF / Excel)

✍️ Ödev ve ders takibi
• Ödev hızlı işaretleme
• Herkese +1 / −1 puan
• Ezber ve ders puanı takibi

🎲 Ders içi etkinlikler
• Rastgele öğrenci seçme
• Doğru cevaba puan verme
• Haftalık sınıf akvaryumu karnesi ile motivasyon

📝 Plan ve analiz
• Günlük ders planı
• Sınav analizi
• Dönem sonu karnesi

💬 Veli iletişimi
• WhatsApp ile hazır mesaj gönderme
• Veliyi tek dokunuşla arama
• Veli için karne bağlantısı oluşturma

📤 Çıktı ve yedek
• A4 çıktı, PDF ve Excel raporları
• Excel şablonundan öğrenci listesi yükleme
• JSON yedek alma ve yedekten geri yükleme

🔒 Gizlilik
• Reklam yok
• Verileriniz yalnızca sizin hesabınızda saklanır
• Hesabınızı ve tüm verilerinizi uygulama içinden kalıcı olarak silebilirsiniz

Sınıf Takip öğretmenler için tasarlanmıştır. Öğrenci bilgileri yalnızca öğretmen tarafından girilir.

**Kategori:** Eğitim
**İletişim e-postası:** rnk.ibo.66@gmail.com
**Web sitesi:** https://dkab-6670.github.io/S-n-f-Takibim/

## Ekran görüntüleri (sizin çekmeniz gerekiyor)

Play en az **2 telefon ekran görüntüsü** ister (dikey, en az 1080 px genişlik önerilir; 8 taneye kadar).

- Uygulamayı telefonda açın, **gerçek öğrenci adı olmayan** örnek bir sınıfla doldurun (Ali Yılmaz, Ayşe Demir gibi uydurma adlar).
- Önerilen ekranlar: Ana sayfa, Yoklama, Ödev işaretleme, Öğrenci seçme, Karne, Veli mesajı.
- Tablet ekran görüntüsü isteğe bağlıdır.

> Gerçek öğrenci adı, fotoğrafı veya veli telefonu içeren ekran görüntüsü yüklemeyin (KVKK).

## Yayından önce telefonda kontrol edin

- Google ile giriş penceresi uygulama içinde açılıp geri dönüyor mu?
- E-posta/şifre ile giriş çalışıyor mu?
- WhatsApp ve "Ara" düğmeleri ilgili uygulamaları açıyor mu?
- PDF/Excel indirme ve paylaşma çalışıyor mu?
- İnternet kapalıyken uygulama açılıyor mu?
