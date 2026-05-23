---
název: Internet — od kabelu ke stránce
úroveň: 9. ročník ZŠ
předmět: informatika
předpoklady: práce s prohlížečem, intuice o „stahování dat", okrajově dvojková soustava (pro IP adresy)
délka: 50 minut
---

# Internet — od kabelu ke stránce

Komplexní úvod do toho, jak internet skutečně funguje. Cíl: po lekci žák dokáže vyprávět, co se opravdu stane mezi kliknutím na odkaz a&nbsp;tím, než se mu stránka rozsvítí. Rozliší internet od&nbsp;webu, rozebere URL, rozezná podezřelou adresu a&nbsp;ví, proč zámeček v&nbsp;adresním řádku nezaručuje, že webu může věřit.

Tón: praktický, místy detektivní. Reálné české domény a&nbsp;reálné phishingové triky, ne abstraktní `example.com`. Žáci v&nbsp;9. třídě už něco tuší — lekce má spojit střípky do&nbsp;celku.

## Učební cíle
- žák rozliší **internet** (infrastruktura) a **web** (jedna ze služeb nad ním) a uvede další služby internetu (e-mail, video, cloud, hry)
- žák popíše cestu požadavku od kliknutí ke zobrazení stránky: DNS lookup → požadavek na server → odpověď s HTML → stažení CSS/JS/obrázků → vykreslení
- žák rozezná části URL (protokol, subdoména, doména, TLD, cesta, parametry) a využije to k rozpoznání podezřelé adresy
- žák vysvětlí, co dělá DNS a co se stane, když nefunguje
- žák rozliší statický a dynamický web a pojmenuje role frontendu, backendu, databáze a API
- žák zná základní pravidla bezpečnosti: dlouhé heslo, 2FA, ostražitost vůči phishingu, vědomí digitální stopy
- žák ví, že **HTTPS šifruje přenos, ale neověřuje, kdo je na druhé straně**

## Klíčové pojmy

### Infrastruktura a služby
- **Internet** — celosvětová síť propojených sítí. Fyzicky: optické kabely (mezikontinentální vedou po dně oceánu), routery, datová centra, vysílače, satelity.
- **Web (WWW)** — jen jedna ze služeb internetu. Stránky, odkazy, prohlížeče. Vznik 1989, CERN, Tim Berners-Lee.
- Další služby internetu: **e-mail** (SMTP/IMAP), **přenos souborů**, **video a hlas** (VoIP, streaming), **online hry**, **cloud**.
- Analogie: *internet&nbsp;=&nbsp;silnice*, *web&nbsp;=&nbsp;osobní auta*. Po stejných silnicích jezdí i&nbsp;nákladní (e-mail), záchranka (DNS), kamiony (cloudové backupy).

### Adresování
- **IP adresa** — číselný identifikátor zařízení v&nbsp;síti.
  - **IPv4**: `192.168.1.15` — 4 čísla 0–255, celkem ~4,3 miliardy adres (a&nbsp;došly).
  - **IPv6**: `2001:db8::1` — 8 skupin hexadecimálně, ~3,4 · 10³⁸ adres (prakticky neomezené).
  - **veřejná × privátní** — privátní (typicky `192.168.x.x`, `10.x.x.x`) je viditelná jen v&nbsp;domácí síti; veřejnou vidí celý internet.
- **DNS** (Domain Name System) — telefonní seznam internetu. Překládá `seznam.cz` → `77.x.x.x`. Bez DNS bys musel pamatovat čísla.
- **URL** (Uniform Resource Locator) — celá adresa zdroje. Struktura: `https://www.seznam.cz/sport/fotbal?id=123#tabulka`
  - `https://` — protokol
  - `www.` — subdoména
  - `seznam` — doména
  - `.cz` — TLD (top-level domain)
  - `/sport/fotbal` — cesta
  - `?id=123` — parametry (query string)
  - `#tabulka` — kotva v rámci stránky

### Komunikace
- **Server** — počítač, který poskytuje data na požádání. *Číšník v restauraci.*
- **Klient** — zařízení, které data žádá (prohlížeč, mobil, herní konzole). *Host, který si objednává.*
- **Router** — krabice směrující pakety mezi sítěmi. I tvůj domácí Wi-Fi router je router.
- **Paket** — malý kousek dat. Velký soubor se rozdělí na pakety, ty putují různými cestami, na druhé straně se zase složí.
- **Protokol** — pravidla, jak si zařízení povídají. Pro web: **HTTP** (nešifrovaný) a **HTTPS** (šifrovaný).

### Webové stránky
- **HTML** — kostra (text, obrázky, struktura).
- **CSS** — vzhled (barvy, písma, rozložení).
- **JavaScript** — chování (interaktivita, animace, formuláře, dnes i&nbsp;celé aplikace).
- Analogie: *HTML&nbsp;=&nbsp;člověk, CSS&nbsp;=&nbsp;oblečení, JS&nbsp;=&nbsp;co dělá*.
- **Statický web** — server pošle všem stejný hotový soubor (např. tahle lekce).
- **Dynamický web** — server stránku skládá při každém požadavku z&nbsp;**databáze**. Wikipedie, e-shopy, vyhledávač, sociální sítě — pokaždé jiný obsah.
- **Frontend** — to, co vidíš v&nbsp;prohlížeči (HTML, CSS, JS).
- **Backend** — to, co běží na serveru (logika, databáze).
- **API** — způsob, jakým se frontend baví s&nbsp;backendem nebo dva systémy mezi sebou. Posílá zpravidla JSON tam a&nbsp;JSON zpět.

### Bezpečnost
- **HTTPS** — šifruje **přenos** mezi prohlížečem a&nbsp;serverem. Zámeček v&nbsp;adresním řádku znamená *„nikdo cestou data nečte ani nemění"*, ne *„tomuhle webu můžeš věřit"*. Phisher si může pořídit HTTPS certifikát za&nbsp;pár minut zdarma.
- **Silné heslo** — *dlouhé* je důležitější než *složité*. `Pavel123` × `kolo-žralok-oblak-tramvaj`. Délka výrazně překonává míchání znaků.
- **Správce hesel** — jediná dobrá strategie. Sám si stovku unikátních hesel nezapamatuješ.
- **2FA** (dvoufaktor) — heslo + druhý krok (aplikace jako Authy/Google Authenticator, hardwarový klíč, SMS — SMS je nejslabší, ale stále výrazně lepší než nic).
- **Phishing** — falešná stránka nebo zpráva, která loudí přihlášení. Indikátory: tlak na rychlost („do&nbsp;24h jinak…"), divná URL (`seznam-login.cz` × `seznam.cz`), nečekané přílohy, citově laděné výzvy.
- **Cookies** — drobný kousek dat, který si web uloží do&nbsp;tvého prohlížeče.
  - **funkční** (drží přihlášení, košík, jazyk),
  - **analytické** (statistika návštěvnosti),
  - **reklamní / sledovací** (profilování pro reklamu).
- **Digitální stopa** — všechno, co po&nbsp;sobě necháváš: profily, příspěvky, lajky, historie hledání, metadata fotek (často i&nbsp;GPS).
- **Sociální inženýrství** — útok na člověka, ne na techniku. Falešná podpora, falešná soutěž, vydávání se za&nbsp;známého. Lidé bývají nejslabší článek řetězu.

## Příklady

3 řešené + 4 k&nbsp;procvičení. Obtížnost 9.&nbsp;třída.

**Řešené:**
1. **Cesta klikem ke stránce.** Krok po kroku popsat, co se stane od&nbsp;momentu, kdy zadáš `https://cs.wikipedia.org/wiki/Praha`, po vykreslení stránky. Cíl: žák zafixuje sekvenci DNS → požadavek → HTML → další zdroje (CSS, JS, obrázky) → render. Důraz na to, že prohlížeč po obdržení HTML pošle **další požadavky** na zbylé soubory.
2. **Rozbor URL.** Vzít `https://shop.alza.cz/notebook/lenovo-thinkpad?varianta=2&barva=cerna`. Označit protokol, subdoménu, doménu, TLD, cestu, parametry. Pak srovnat s podezřelou `https://alza.shop-login-cz.com/notebook/...` — vysvětlit, proč skutečná doména je `shop-login-cz.com`, ne `alza.cz`, a&nbsp;proč právě poslední dvě části (před první lomítkem) určují, kdo doménu vlastní.
3. **Phishing — který je pravý?** Tři reálně vypadající příklady (URL/e-mail) — vždy ukázat dvě varianty, jednu pravou a&nbsp;jednu phishingovou. Žák určí a&nbsp;v&nbsp;řešení se rozebere, kde byla stopa (typosquatting, homoglyf, podezřelý TLD, tlak na rychlost…).

**K procvičení:**
4. **IPv4 vs&nbsp;IPv6.** Proč přechod, když IPv4 fungovalo? Spočítej v&nbsp;řádu, kolik adres je 2³² a&nbsp;kolik 2¹²⁸. Kolikrát víc?
5. **Statický × dynamický.** Které z&nbsp;těchto webů jsou typicky statické a&nbsp;které dynamické? Wikipedie, blog se třemi články na vlastní doméně, e-shop, chatovací aplikace, GitHub Pages stránka třídy, online banking. Odůvodni.
6. **HTTPS mýtus.** Stránka má v&nbsp;adresním řádku zámeček (HTTPS). Znamená to, že je důvěryhodná?
7. **Síla hesla.** Seřaď od nejslabšího po nejsilnější: `kocka`, `K0cka!`, `Pavel1234`, `kolo-prochazka-zelena-louka`, `qWeRtY1!`. Krátce odůvodni.

## Interaktivní prvky

Lekce má **4 interaktivní widgety** + závěrečný kvíz. Klíčové jsou „Anatomie URL" a&nbsp;„Phishing detektiv" — kolem nich postav výklad bezpečnosti.

- [x] **Anatomie URL** — textové pole s&nbsp;URL, widget barevně rozliší jednotlivé části (protokol / subdoména / doména / TLD / cesta / parametry / kotva) a&nbsp;ke každé ukáže krátkou nápovědu, čím je. Předpřipravené ukázky k&nbsp;přepnutí: `https://www.seznam.cz`, `https://shop.alza.cz/notebook?id=42#popis`, podezřelá `https://alza-login.shop-cz.com/secure/`. Když žák napíše vlastní URL, widget reaguje živě. Po označení částí widget zvýrazní, kterou část používá podvodník k&nbsp;oklamání (typicky doménu&nbsp;+&nbsp;TLD). *(střední složitost — implementovat přímo, je to klíčová interaktivita)*

- [x] **Cesta klikem ke stránce** — animovaná vizualizace. Vlevo prohlížeč, vpravo schéma sítě (DNS server, web server, případně CDN). Tlačítko „Zobrazit stránku" spustí animaci: paket s&nbsp;dotazem putuje k&nbsp;DNS, vrací se s&nbsp;IP, pak k&nbsp;web serveru, vrací se HTML, pak prohlížeč pošle další požadavky (CSS, JS, obrázky), nakonec render. Každý krok má krátký popisek pod schématem. Posuvník rychlosti animace. *(složitější — static-fallback ukáže 5–6 SVG ikonek se šipkami a&nbsp;číslovanými popisky kroků; tlačítko „Otevřít interaktivní verzi" lazy-mountne plnou animaci)*

- [x] **Phishing detektiv** — mini hra. Widget ukáže URL nebo e-mail (s&nbsp;hlavičkou odesílatele, předmětem, krátkým úryvkem). Žák klikne **Pravé** nebo **Podvod**. Po kliknutí: zelený / červený rámeček + 1–2 věty vysvětlení, kde byla stopa. 6–8 příkladů, postupně se obtížnost zvyšuje (poslední přesvědčivě phishingové). Skóre se počítá a&nbsp;na konci se ukáže. Příklady mixovat: typosquatting (`alza-login.com`), homoglyf (cyrilice „а" místo latinky „a"), podezřelý dlouhý TLD (`alza.com.security-check.shop`), tlakový text v&nbsp;e-mailu, ale i&nbsp;naprosto legitimní zprávy, aby žák nezačal panikařit u&nbsp;všeho. *(střední složitost — implementovat přímo, je to nejzábavnější část lekce)*

- [x] **Síla hesla** — vstupní pole, žák píše heslo. Widget v&nbsp;reálném čase:
  - barevný pruh (červená → oranžová → zelená)
  - odhad doby prolomení hrubou silou („instantně" / „5&nbsp;hodin" / „300&nbsp;let" / „déle než stáří vesmíru")
  - 1 věta proč („krátké, jen číslice" / „slovníkové slovo" / „dobrá délka, náhodná slova")
  Algoritmus: jednoduchý odhad entropie podle délky a&nbsp;velikosti znakové sady, minus penalty za zjevně slovníková slova (mít zabudovaný malý seznam ~200 nejčastějších českých slov a&nbsp;jmen). *Důležité: heslo se nikam neposílá, vše počítá prohlížeč.* (Říct to žákům — zabíjí to dva mýty najednou.) *(jednoduché — implementovat přímo)*

- [x] **Závěrečný kvíz** — 6 otázek s&nbsp;výběrem:
  1. Internet a&nbsp;web jsou: *to samé / internet je infrastruktura, web je služba nad ní / opačně / web je předchůdce internetu*
  2. K&nbsp;čemu slouží DNS? *šifruje provoz / převádí doménu na IP / urychluje načítání / blokuje phishing*
  3. V&nbsp;URL `https://maps.google.com/path?q=praha` je doména: *maps / google / google.com / maps.google.com*
  4. HTTPS zaručuje: *bezpečný obsah / šifrovaný přenos / pravdivost informací / ochranu před phishingem*
  5. Které heslo je silnější: `Pavel123!` × `cesnek-mraky-rybnik-televize`?
  6. Pakety: *putují vždy stejnou cestou / jsou velké celé soubory / jsou malé kousky dat, které se na konci složí / existují jen při e-mailu*

## Časté chyby a nedorozumění

- **„Internet&nbsp;=&nbsp;web."** Nejčastější mýlka. Když nejde Facebook, „nejde internet". Realita: web je jen jedna z&nbsp;mnoha služeb. Když nejdou stránky, obvykle stále funguje e-mail, WhatsApp hovory atd.
- **„HTTPS&nbsp;=&nbsp;bezpečná stránka."** Velký mýtus. HTTPS šifruje **přenos** mezi tebou a&nbsp;serverem. Nic neříká o&nbsp;tom, kdo server vlastní ani jestli ti chce lhát. Phisher si může zaplatit certifikát během půl hodiny.
- **„Soukromé okno&nbsp;=&nbsp;jsem anonymní."** Inkognito jen nezapisuje historii do&nbsp;**tvého** prohlížeče. Tvůj poskytovatel, škola, zaměstnavatel, web sám i&nbsp;sledovači stále vidí vše. Anonymita to není.
- **„Složité heslo&nbsp;=&nbsp;silné heslo."** Délka výrazně překonává „zamíchanost". `Aa1!` je slabší než `kolo-zahrada-pekarna-tramvaj-louka`. Útočníci zkouší slovníkové útoky; krátké „složité" heslo padne dřív než dlouhé heslové fráze.
- **„Smazal jsem to, takže to nikdo neuvidí."** Internet je dlouhopaměťový. Smazaný post může být uložený jako screenshot, v&nbsp;cache, archivu (Wayback Machine), nebo na cizím serveru.
- **„Cookies jsou jen sledovači."** Některé cookies sledují kvůli reklamě, ale jiné drží přihlášení, košík nebo nastavení jazyka — bez nich by web nefungoval.
- **„IP adresa&nbsp;=&nbsp;adresa bytu."** IP identifikuje zařízení v&nbsp;síti, ne osobu. Většinou se přiděluje dynamicky (jiná každých pár dní) a&nbsp;více lidí v&nbsp;jedné domácnosti sdílí jednu veřejnou IP.
- **„Pakety jdou pořád stejnou cestou."** Ne. Síť dynamicky volí trasy. Pakety jednoho souboru mohou putovat různými cestami a&nbsp;dorazit i&nbsp;v&nbsp;jiném pořadí — na konci se složí.

## Poznámky pro Claude

- Tón pro 9.&nbsp;třídu: jako bys to vyprávěl staršímu sourozenci. Trochu detektivní. Bez moralizování („buď opatrný!") — místo toho konkrétní situace a&nbsp;„podívej, jak to funguje".
- Reálné domény místo `example.com`: `seznam.cz`, `alza.cz`, `idos.cz`, `mapy.cz`, `wikipedia.org`, `google.com`. Žáci je znají, propojí si to.
- Phishingové příklady musí být realistické, ne karikatury. Skuteční phisheři dělají pixel-perfect kopie. Použij triky: typosquatting (`alza-login.com`), homoglyf (cyrilické „а" místo latinky), podezřelý dlouhý TLD (`alza.com.security-check.shop`), tlak na čas.
- U technických pojmů (server, klient, paket, protokol) přidej i&nbsp;lidskou analogii. *„Server je číšník v&nbsp;restauraci."*
- U widgetu „Síla hesla" výslovně zmiň, že heslo se nikam neposílá — vše počítá tvůj prohlížeč. Hodí se to z&nbsp;hlediska bezpečnosti **i** jako mikro-výklad toho, že JavaScript běží lokálně.
- Délka může vyjít na 50–60&nbsp;min. Pokud se to ukáže jako moc, dobrý dělící bod je mezi blokem „Jak vzniká stránka" a&nbsp;„Bezpečnost" — ta může být druhá samostatná lekce. Primárně se ale snaž to udržet jako jeden celek.
- Vhodné kulturní reference: aféra Cambridge Analytica jako příklad digitální stopy; Spamhaus / DDoS na DNS root servery jako příklad „co se stane, když nefunguje DNS"; Heartbleed jen okrajem, pokud zbyde čas.
