# Echoes of Gwent

## Téma

Echoes of Gwent je dynamická webová aplikace postavená na základech React frameworku, která nabízí fanouškům Zaklínače možnost ponořit se do digitálního světa oblíbené karetní hry Gwent. Aplikace je navržena tak, aby poskytovala uživatelům interaktivní a vizuálně poutavý herní zážitek, přičemž věrně zachovává pravidla a atmosféru originální hry známé z univerza Zaklínače. Hráči mají k dispozici režim pro jednoho hráče, kde mohou vyzvat umělou inteligenci, nebo se mohou věnovat strategickému zdokonalování svých balíčků prostřednictvím bojů proti rozmanitým protivníkům.

Jedinečným prvkem Echoes of Gwent je hluboce zapojená příběhová kampaň, která hráče provede skrze bohaté narativy inspirované fascinujícím světem Zaklínače. Tato kampaň umožňuje hráčům nejen prozkoumat nové příběhové linie a interagovat s ikonickými postavami, ale také odemykat nové karty, které se stávají klíčovými prvky pro rozvoj jejich balíčků. Postupem příběhu a úspěchy v kampani si hráči otevírají přístup k exkluzivním kartám, které mohou následně využít v solo režimu a v turnajích. Tím se rozšiřují možnosti pro strategickou hru a umožňuje hráčům stále se zdokonalovat a přizpůsobovat své strategie pro různé herní výzvy.

Echoes of Gwent tedy nabízí nejen tradiční zážitek z hraní Gwentu, ale také přidává novou dimenzi strategické hloubky a příběhového prožitku, čímž vytváří bohatý a komplexní herní svět, který je přístupný online bez nutnosti jakékoliv instalace.

## Funkcionalita

- Herní režimy: Solo proti AI nebo tréninkový mód pro zdokonalování strategií a balíčků.
- Vylepšení balíčků: Možnost sbírat karty a vylepšovat svůj balíček skrze výhry nebo výměnu.
- Interaktivní tutoriál: Učení pravidel a strategií Gwentu skrze vedený tutoriál.
- Turnaje a výzvy: Pravidelné eventy pro testování dovedností a získávání unikátních odměn.
- React Router pro navigaci: Snadný přechod mezi různými částmi aplikace.
- Local Storage pro ukládání progressu: Možnost kdykoliv pokračovat ve hře nebo se vrátit k nedokončenému duelu.

## Odkazy pro vývoj

- figma návrh stránek aplikace
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
