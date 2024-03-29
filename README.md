# MI mit tud?!

Ez a tárhely a HVG Kiadó **_MI mit tud?!_** innovációs ötletpályázatára készült **_Audio teaserek, -a beszélő címlap_** című munka techninkai megoldását tartalmazza.
A pályázat elképzelésének megvalósításán túl fontos szempont volt egy teljes körű, skálázható és megbízható alkalmazás készítése.

Az implementáció a MERN webalkalmazás fejlesztő keretrendszer használata révén valósult meg: 
* Az adatok tárolására a **M**ongoDB szolgál, ami egy dokumentum orientált adatbázis kezelő rendszer.
* A backend kód megírása egy Node.js alapú keretrendszeren, az **E**xpress.js-en keresztül történt.
* Ez a kliens oldalon a népszerű JavaScript könyvtár, a **R**eact komponenseivel kommunikál. 
* A **N**ode.js, mivel lehetővé teszi, hogy a szerver oldali kód is JavaScript-ben íródjon, egységes és összehangolt fejlesztési környzezetet biztosít.  

Az alkalmazás a cikkösszefoglalók létrehozására az OpenAI API mesterséges intelligencia funkcióit használja, amit a Google Text-to-Speech API segítségével szintetizál emberi beszéddé. 

A weboldal a https://hvg-app.herokuapp.com URL címen érhető el.
